const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'commit-export-web.html'));
});

// API endpoint to extract git commits
app.post('/api/extract-commits', async (req, res) => {
    try {
        const { projectPath, authorName, sinceDate, untilDate } = req.body;
        
        // Validate inputs
        if (!projectPath || !authorName || !sinceDate) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: projectPath, authorName, or sinceDate'
            });
        }
        
        // Check if directory exists and is a git repository
        if (!fs.existsSync(projectPath)) {
            return res.status(400).json({
                success: false,
                error: 'Project directory does not exist'
            });
        }
        
        const gitDir = path.join(projectPath, '.git');
        if (!fs.existsSync(gitDir)) {
            return res.status(400).json({
                success: false,
                error: 'Directory is not a git repository'
            });
        }
        
        // Get project name
        const projectName = path.basename(projectPath);
        const projectPrefix = `Project ${projectName.toUpperCase()}`;
        
        // Prepare git command
        const untilDateParam = untilDate || new Date().toISOString().split('T')[0];
        const gitCommand = `cd "${projectPath}" && git log --reverse --author="${authorName}" --since="${sinceDate}" --until="${untilDateParam}" --pretty=format:"%ad%x09${projectPrefix}%x09%s" --date=short`;
        
        console.log('Executing git command:', gitCommand);
        
        // Execute git command
        exec(gitCommand, (error, stdout, stderr) => {
            if (error) {
                console.error('Git command error:', error);
                return res.status(500).json({
                    success: false,
                    error: `Git command failed: ${error.message}`
                });
            }
            
            if (stderr) {
                console.warn('Git command stderr:', stderr);
            }
            
            if (!stdout || stdout.trim() === '') {
                return res.json({
                    success: true,
                    commits: [],
                    message: 'No commits found for the specified criteria'
                });
            }
            
            // Process the output
            const lines = stdout.trim().split('\n');
            const commits = lines
                .filter(line => line.trim() !== '')
                .filter(line => {
                    // Filter out merge commits
                    const parts = line.split('\t');
                    if (parts.length >= 3) {
                        const message = parts[2];
                        return !message.match(/Merge branch /i) && !message.match(/Merge pull /i);
                    }
                    return false;
                })
                .map(line => {
                    // Remove any commas and clean up
                    return line.replace(/,/g, ' ');
                });
            
            res.json({
                success: true,
                commits: commits,
                totalCount: commits.length,
                projectName: projectName
            });
        });
        
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// API endpoint to validate git repository
app.post('/api/validate-repo', (req, res) => {
    try {
        const { projectPath } = req.body;
        
        if (!projectPath) {
            return res.status(400).json({
                success: false,
                error: 'Project path is required'
            });
        }
        
        // Check if directory exists
        if (!fs.existsSync(projectPath)) {
            return res.json({
                success: false,
                error: 'Directory does not exist'
            });
        }
        
        // Check if it's a git repository
        const gitDir = path.join(projectPath, '.git');
        if (!fs.existsSync(gitDir)) {
            return res.json({
                success: false,
                error: 'Directory is not a git repository'
            });
        }
        
        // Get project name
        const projectName = path.basename(projectPath);
        
        res.json({
            success: true,
            projectName: projectName,
            message: 'Valid git repository'
        });
        
    } catch (error) {
        console.error('Validation error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// API endpoint to get git authors
app.post('/api/get-authors', (req, res) => {
    try {
        const { projectPath } = req.body;
        
        if (!projectPath) {
            return res.status(400).json({
                success: false,
                error: 'Project path is required'
            });
        }
        
        const gitCommand = `cd "${projectPath}" && git log --format='%an' | sort -u`;
        
        exec(gitCommand, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    error: `Failed to get authors: ${error.message}`
                });
            }
            
            const authors = stdout.trim().split('\n').filter(author => author.trim() !== '');
            
            res.json({
                success: true,
                authors: authors
            });
        });
        
    } catch (error) {
        console.error('Authors error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 Git Commit Export Tool Server Started!');
    console.log(`📱 Server running on: http://localhost:${PORT}`);
    console.log(`📁 Serving from: ${__dirname}`);
    console.log('⚡ Press Ctrl+C to stop the server');
    console.log('-'.repeat(50));
    
    // Try to open browser automatically
    const open = require('child_process').exec;
    open(`open http://localhost:${PORT}`, (error) => {
        if (error) {
            console.log('💡 Please open http://localhost:${PORT} in your browser');
        } else {
            console.log('🔗 Opening browser automatically...');
        }
    });
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Server shutting down gracefully...');
    process.exit(0);
});
