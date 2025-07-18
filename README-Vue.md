# 🚀 Git Commit Export Tool - Vue.js Version

Modern, modular Git commit export and grouping tool built with **Vue.js 3** + **TailwindCSS**.

## ✨ Features

- **🎯 Automatic Git Extraction** - Extract commits from any git repository
- **📊 Smart Grouping** - Group commits by date and project
- **🔄 Accumulative Results** - Combine commits from multiple projects
- **🚫 Merge Commit Filtering** - Skip "Merge pull" and "Merge branch" commits
- **📁 Excel Export** - Export grouped results to Excel file
- **🎨 Modern UI** - Clean, responsive interface with TailwindCSS
- **🧩 Modular Architecture** - Vue components and composables

## 🛠 Tech Stack

- **Frontend**: Vue.js 3, TailwindCSS, Vite
- **Backend**: Node.js, Express
- **Export**: SheetJS (xlsx)
- **HTTP Client**: Axios

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Servers

**Terminal 1 - Frontend (Vue.js):**
```bash
npm run dev
```
This starts Vite dev server at `http://localhost:5173`

**Terminal 2 - Backend (API Server):**
```bash
npm run server
```
This starts Express server at `http://localhost:3001`

### 3. Open Application
Navigate to `http://localhost:5173` in your browser.

## 📁 Project Structure

```
src/
├── components/           # Vue Components
│   ├── ExtractForm.vue      # Main extraction form
│   ├── FilterOptions.vue    # Merge commit filter
│   ├── AlertComponent.vue   # Alert notifications
│   ├── ResultsSection.vue   # Display grouped results
│   └── AdvancedOptions.vue  # Manual input fallback
├── composables/         # Vue Composables (Logic)
│   ├── useCommitExtractor.js   # Git extraction logic
│   ├── useCommitProcessor.js   # Commit grouping logic
│   └── useExcelExporter.js     # Excel export logic
├── App.vue             # Main application component
├── main.js             # Application entry point
└── style.css           # TailwindCSS styles
```

## 🎯 Usage

### Automatic Extraction
1. **Enter Project Path** - Absolute path to your git repository
2. **Set Filters** (Optional):
   - Author name
   - Date range (since/until)
   - Skip merge commits checkbox
3. **Click "Extract & Group Commits"**
4. **Review Results** - See commits grouped by date and project
5. **Export to Excel** - Download formatted Excel file

### Manual Input (Fallback)
1. Open **"Advanced Options & Troubleshooting"**
2. Paste raw git log output
3. Expected format: `YYYY-MM-DD    ProjectName    CommitMessage`
4. Click **"Process Manual Input"**

### Accumulative Grouping
- Results from multiple extractions are combined
- Stats badge shows total commits and projects
- Use **"Clear Results"** to reset

## 🔧 Development Scripts

### Development Commands

```bash
# 🚀 RECOMMENDED: Start both frontend + backend together
npm run dev:full

# OR run separately (2 terminals):
# Terminal 1 - Vue development server
npm run dev
# Terminal 2 - Express backend server  
npm run server

# Build for production
npm run build

# Preview production build
npm run preview

# Legacy (HTML version)
npm run simple       # Start simple server for HTML version
```

## 🧩 Architecture

### Components
- **ExtractForm**: Main form with project path, author, dates
- **FilterOptions**: Checkbox for merge commit filtering
- **ResultsSection**: Display grouped commits with stats
- **AdvancedOptions**: Collapsible manual input section
- **AlertComponent**: Success/error notifications

### Composables
- **useCommitExtractor**: Handle git command execution
- **useCommitProcessor**: Parse and group commit data
- **useExcelExporter**: Generate and download Excel files

### Benefits of Modular Architecture
- **Separation of Concerns**: Logic separated from UI
- **Reusability**: Components can be reused
- **Maintainability**: Easy to modify individual parts
- **Testability**: Each composable can be tested independently

## 🔍 Git Commands Used

The tool executes git commands like:
```bash
git log --pretty=format:"%ad%x09%H%x09%s" --date=short --since="2024-01-01" --author="YourName"
```

## 📊 Excel Output Format

| Waktu | Nama Proyek | Hasil Grouping Task |
|-------|-------------|---------------------|
| Senin, 15 Januari 2024 | my-project | my-project<br>• Add new feature<br>• Fix login bug |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding!** 🎉
