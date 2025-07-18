# Git Commit Export Tool

Tool untuk extract dan grouping git commits berdasarkan author dan tanggal, kemudian export ke Excel.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start server:**
   ```bash
   npm run simple
   ```

3. **Open app:**
   - Buka `standalone-export-tool-enhanced.html` di browser
   - Server: `http://localhost:3001`

## ✨ Features

- 🔄 **Automated Git Extraction**: Extract commits langsung dari project path
- 📊 **Smart Grouping**: Group commits berdasarkan tanggal dan project  
- 📈 **Accumulative Results**: Hasil dari multiple projects ter-akumulasi
- 📄 **Excel Export**: Export hasil grouping ke Excel dengan format rapi
- 🖥️ **Clean Interface**: UI modern dengan feedback real-time
- 📈 **Statistics**: Badge menampilkan total commits dan projects

## 📋 Cara Penggunaan

1. **Jalankan Server**: `npm run simple`
2. **Buka App**: `standalone-export-tool-enhanced.html` di browser
3. **Extract Commits**: 
   - Masukkan project path
   - Pilih date range dan author
   - Klik "Extract & Group Commits"
4. **Review Results**: Lihat hasil grouping yang ditampilkan
5. **Export Excel**: Klik "Download Excel" jika sudah sesuai
6. **Multiple Projects**: Ulangi langkah 3 untuk project lain (hasil akan terakumulasi)

## 🔧 Commands

- `npm start` - Start server (alias untuk `npm run simple`)
- `npm run simple` - Start simple server for standalone app

## 📁 Project Structure

```
export-commit-tool/
├── standalone-export-tool-enhanced.html    # Main app
├── simple-server.js                        # Backend server
├── package.json                            # Dependencies & scripts
└── README.md                               # This file
```

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS (Bootstrap 5), JavaScript
- **Backend**: Node.js, Express
- **Export**: SheetJS (xlsx)
- **Icons**: FontAwesome
