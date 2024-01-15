# Menampilkan pesan selamat datang
Write-Host "Selamat datang! Anda berada di aplikasi Export Git Log to Excel by Zulka" -ForegroundColor Green

# Meminta input dari pengguna untuk author
$author = Read-Host -Prompt "Mohon masukkan nama Author yang digunakan pada project"

# Meminta input dari pengguna untuk tanggal mulai
$since = Read-Host -Prompt "Mohon masukkan tanggal mulai (format: YYYY-MM-DD)"

try {
 # Mendapatkan nama proyek
 $projectName = (Get-Location).Path | Split-Path -Leaf;
 $projectNamePrefix = "Project $($projectName.ToUpper())";

 # Menentukan lokasi result log
 $desktopPath = [Environment]::GetFolderPath("Desktop");
 $resultLogPath = Join-Path $desktopPath "Result-Log";

 # Membuat direktori result log jika belum ada
 if (-not (Test-Path $resultLogPath -PathType Container)) {
 New-Item -ItemType Directory -Path $resultLogPath | Out-Null;
 }

 # Mengubah direktori kerja saat ini ke direktori project terkait
 Set-Location -Path (Get-Location).Path;

 # Mendapatkan log git dan menulisnya ke file
 $gitLog = git log --reverse --author=$author --since=$since --until="$(Get-Date -Format 'yyyy-MM-dd')" --pretty=format:"%ad%x09$projectNamePrefix%x09%s" --date=short;
 if ($null -eq $gitLog -or $gitLog -eq "") {
    throw "Tidak ada log git untuk author '$author' dan tanggal mulai '$since'"
 }
 $gitLog = $gitLog | ForEach-Object { $_ -replace ',', ' ' };
 $gitLog | Out-File -FilePath "$resultLogPath\LOG___$projectName_$((Get-Location).Path | Split-Path -Leaf).csv" -Encoding UTF8 -Force;

 # Menampilkan pesan sukses
 Write-Host "`nExport Log Sukses!" -ForegroundColor Green

 Write-Host "`nNote: `n- Hasil telah ditambahkan ke direktori Desktop/Result-Log.`n- Silahkan COPY semua data dan PASTE ke aplikasi Web Grouping Task." -ForegroundColor Yellow
}
catch {
 # Menampilkan pesan error jika ada
 Write-Host "Terjadi error: $($_.Exception.Message)" -ForegroundColor Red
}

# Menunggu pengguna menekan Enter sebelum keluar
Write-Host "`nTekan Enter untuk keluar"
(Read-Host)
