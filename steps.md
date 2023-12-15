# Pengelompokkan hasil export commit git pada project terkait.

### Langkah-langkah penggunaan

0. Buka file "export-commit.ps1" untuk menyesuaikan variable nama "$author" dan "$since" sebagai tanggal_mulai nya yang ingin export datanya, kemudian simpan penyesuaiannya. 
1. Lalu letakkan file "export-commit.ps1" di dalam folder, lalu klik "Run with Powershell".
2. Kemudian hasil export akan secara otomatis dibuatkan folder "Result-Log" di Dekstop dan file hasil exportnya berupa excel dengan nama "Log__{Nama Project}"
3. Buka file excel hasil exportnya lalu copy 
4. Buka aplikasi web "grouping-task" kemudian paste kan data nya ke text-area aplikasi
5. Kemudian klik tombol "Proses Data", maka hasil grouping commitan berdasarkan waktu dan project berhasil dilakukan.
6. Klik tombol Download Data jika ingin mendownload hasil generate grouping commit-nya.
7. Selamat copas-copas untuk timesheet :x