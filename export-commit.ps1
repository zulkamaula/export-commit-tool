# Variabel untuk menyimpan author dan since
$author = "zulkamaula";
$since = "2023-11-01";

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
$gitLog = $gitLog | ForEach-Object { $_ -replace ',', ' ' };
$gitLog | Out-File -FilePath "$resultLogPath\LOG___$projectName_$((Get-Location).Path | Split-Path -Leaf).csv" -Encoding UTF8 -Force;
