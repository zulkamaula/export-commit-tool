import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Middleware
app.use(express.static(__dirname));
app.use(express.json());

// CORS for local development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Execute git command
app.post('/execute-git', (req, res) => {
    const { projectPath, authorName, sinceDate, untilDate } = req.body;
    
    // Validate inputs
    if (!projectPath || !authorName || !sinceDate) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Check if directory exists
    if (!fs.existsSync(projectPath)) {
        return res.status(400).json({ error: 'Project path does not exist' });
    }
    
    // Check if it's a git repository
    const gitPath = path.join(projectPath, '.git');
    if (!fs.existsSync(gitPath)) {
        return res.status(400).json({ error: 'Not a git repository' });
    }
    
    // Build git command
    let gitCommand = `cd "${projectPath}" && git log --reverse --since="${sinceDate}" --format="%ad%x09%s" --date=format:"%Y-%m-%d"`;
    
    // Add author filter only if not 'all'
    if (authorName && authorName !== 'all') {
        gitCommand = `cd "${projectPath}" && git log --reverse --author="${authorName}" --since="${sinceDate}" --format="%ad%x09%s" --date=format:"%Y-%m-%d"`;
    }
    
    if (untilDate) {
        gitCommand += ` --until="${untilDate}"`;
    }
    
    // Execute git command
    exec(gitCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Git command error:', error);
            return res.status(500).json({ error: `Git command failed: ${error.message}` });
        }
        
        if (stderr) {
            console.warn('Git command stderr:', stderr);
        }
        
        // Process output to add project name
        const projectName = path.basename(projectPath);
        const lines = stdout.trim().split('\n').filter(line => line.trim());
        
        const formattedOutput = lines.map(line => {
            if (line.includes('\t')) {
                const [date, message] = line.split('\t', 2);
                return `${date}\t${projectName}\t${message}`;
            }
            return line;
        }).join('\n');
        
        res.json({ 
            success: true, 
            output: formattedOutput,
            lineCount: lines.length
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Enhanced Git Export Tool Server running at http://localhost:${port}`);
    console.log(`📂 Open: http://localhost:${port}/standalone-export-tool-enhanced.html`);
});
