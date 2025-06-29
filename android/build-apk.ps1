# Script PowerShell per generare APK firmato e copiarlo in una cartella dedicata con timestamp

# Genera l'APK release
./gradlew assembleRelease

# Controlla se la build è andata a buon fine
if ($LASTEXITCODE -eq 0) {
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $src = "app\build\outputs\apk\release\app-release.apk"
    $destDir = "apks"
    $dest = "${destDir}\app-release-$timestamp.apk"
    
    if (!(Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir | Out-Null
    }
    
    Copy-Item $src $dest -Force
    Write-Host "APK generato e copiato in $dest"
} else {
    Write-Host "Errore nella generazione dell'APK."
}
