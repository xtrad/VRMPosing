# backup.ps1
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$source = "D:\DOCs\Projects\VRMPosing"
$backupFolder = "D:\DOCs\Projects\VRMPosing_backup_$timestamp"

# Membuat folder backup
New-Item -ItemType Directory -Path $backupFolder

# Copy semua file & folder kecuali node_modules
Get-ChildItem -Path $source -Recurse | Where-Object { $_.FullName -notmatch 'node_modules' } | ForEach-Object {
    $dest = $_.FullName.Replace($source, $backupFolder)
    if ($_.PSIsContainer) {
        New-Item -ItemType Directory -Path $dest -Force
    } else {
        Copy-Item $_.FullName -Destination $dest -Force
    }
}

Write-Host "✅ Backup selesai di $backupFolder"
