# Git Commit Export Tool - Web Version untuk macOS

Aplikasi web untuk export dan grouping git commit log yang berjalan di macOS sebagai pengganti PowerShell script untuk Windows.

## ✨ Fitur

- 🔍 **Export Commit Otomatis**: Extract git commits langsung dari web interface
- 📊 **Grouping Otomatis**: Group commits by tanggal dan project
- 📁 **Export Excel**: Download hasil grouping dalam format Excel
- 🎨 **Modern UI**: Interface yang clean dan responsive
- 🚀 **Real-time Processing**: Processing data secara real-time
- 🔒 **Local-only**: Semua data tetap di komputer lokal Anda

## 🛠 Instalasi & Setup

### Opsi 1: Menggunakan Node.js (Recommended)

1. **Install Node.js** (jika belum ada):
   ```bash
   # Install menggunakan Homebrew
   brew install node
   
   # Atau download dari https://nodejs.org
   ```

2. **Install Dependencies**:
   ```bash
   cd /Users/zulkariskimauladi/Projects/export-commit-tool
   npm install express cors
   ```

3. **Jalankan Server**:
   ```bash
   npm start
   # atau
   node server.js
   ```

4. **Buka Browser**:
   - Server akan otomatis membuka browser
   - Atau manual buka: `http://localhost:3000`

### Opsi 2: Menggunakan Python (Simple)

1. **Jalankan Python Server**:
   ```bash
   cd /Users/zulkariskimauladi/Projects/export-commit-tool
   python3 server.py
   ```

2. **Buka Browser**: `http://localhost:8000`

## 📋 Cara Penggunaan

### 🎯 **CARA TERMUDAH: Standalone Version (Recommended)**

#### **Langkah 1: Buka Aplikasi**
```bash
# Langsung buka di browser tanpa server
open /Users/zulkariskimauladi/Projects/export-commit-tool/standalone-export-tool.html
```

#### **Langkah 2: Generate Git Command**
1. Di bagian **"Quick Command Generator"**, isi:
   - **Project path**: `/Users/zulkariskimauladi/Projects/nama-project-anda`
   - **Author name**: Nama Anda di git (cek: `git config user.name`)
   - **Since date**: Tanggal mulai (misal: 2024-12-01)
   - **Until date**: Tanggal akhir (misal: 2024-12-31)

2. Klik **"Generate Command"**
3. Klik **"Copy Command"** untuk copy command

#### **Langkah 3: Jalankan di Terminal**
```bash
# Paste command yang sudah di-copy ke Terminal
# Contoh output:
cd "/path/to/project" && git log --reverse --author="Your Name" ...
```

#### **Langkah 4: Import Hasil**
1. **Copy semua output** dari Terminal (Cmd+A, Cmd+C)
2. **Paste** di textarea **"Paste Git Commit Data Here"** di web app
3. Klik **"Process & Group Commits"**
4. Klik **"Download Excel"** untuk download .xlsx

---

### 🔧 **CARA ADVANCED: Full Server Version**

#### 1. Export Commits

1. **Project Path**: Masukkan full path ke repository git Anda
   ```
   Contoh: /Users/zulkariskimauladi/Projects/my-project
   ```

2. **Author Name**: Masukkan nama author seperti yang ada di git config
   ```bash
   # Cek nama author di project:
   git config user.name
   ```

3. **Date Range**: Pilih tanggal mulai dan akhir
   - Since Date: Tanggal mulai commit
   - Until Date: Tanggal akhir (opsional, default: hari ini)

4. **Klik "Export Commits"** untuk extract data

### 2. Grouping & Processing

1. Data commit otomatis muncul di textarea "Raw Commit Data"
2. Atau bisa paste manual data dari file CSV/Excel lama
3. Klik **"Process & Group Commits"** untuk grouping

### 3. Download Hasil

1. Lihat hasil grouping di section "Grouped Results" 
2. Klik **"Download Excel"** untuk download file .xlsx
3. File tersimpan dengan nama: `commit_export_YYYY-MM-DD.xlsx`

## 📁 Format Data

### Input Format (Tab-separated):
```
2024-01-15	Project MYAPP	Initial commit
2024-01-15	Project MYAPP	Add user authentication
2024-01-16	Project MYAPP	Fix login bug
```

### Output Format (Excel):
| Waktu | Nama Proyek | Hasil Grouping Task |
|-------|-------------|-------------------|
| Monday, January 15, 2024 | Project MYAPP | Project MYAPP<br/>• Initial commit<br/>• Add user authentication |

## 🚀 Kelebihan dari Versi Windows

- ✅ **Cross-platform**: Berjalan di macOS, Linux, Windows
- ✅ **No PowerShell required**: Tidak perlu PowerShell
- ✅ **Real-time preview**: Lihat hasil langsung tanpa buka file terpisah
- ✅ **Modern UI**: Interface yang lebih user-friendly
- ✅ **Auto-validation**: Validasi repository dan author otomatis
- ✅ **Better error handling**: Error message yang lebih jelas
- ✅ **Single application**: Semua fitur dalam satu aplikasi

## 🔧 Troubleshooting

### Port sudah digunakan:
```bash
# Kill process di port 3000
lsof -ti:3000 | xargs kill

# Atau ganti port di server.js line: const PORT = 3001;
```

### Git repository tidak ditemukan:
- Pastikan path repository benar
- Pastikan folder adalah git repository (ada folder `.git`)
- Cek permission folder

### Tidak ada commits:
- Cek nama author: `git log --format='%an' | sort -u`
- Cek range tanggal
- Pastikan ada commits dari author tersebut

### Dependencies error:
```bash
# Install ulang dependencies
rm -rf node_modules
npm install
```

## 📂 File Structure

```
export-commit-tool/
├── commit-export-web.html  # Main web application
├── server.js              # Node.js backend server  
├── server.py              # Python simple server
├── package.json           # Node.js dependencies
├── README-Web.md          # This file
├── export-commit.ps1      # Original Windows script
└── grouping-task.html     # Original grouping tool
```

## 🎯 Migration dari Windows

1. **Replace PowerShell workflow**:
   - Windows: Run .ps1 → Copy data → Open HTML → Paste → Process
   - macOS: Open web app → Enter path → Click export → Auto process

2. **Same output format**: File Excel dengan format yang sama

3. **Same grouping logic**: Algoritma grouping tetap sama

## 🔐 Security & Privacy

- ✅ Semua data processing dilakukan secara lokal
- ✅ Tidak ada data yang dikirim ke server eksternal  
- ✅ Git repository hanya diakses read-only
- ✅ File Excel disimpan lokal di komputer Anda

## 📞 Support

Jika ada masalah atau pertanyaan:
- Check troubleshooting section di atas
- Pastikan Node.js/Python terinstall dengan benar
- Pastikan port tidak bentrok dengan aplikasi lain

---

**Happy Coding! 🚀**

*Made with ❤️ for macOS users*
