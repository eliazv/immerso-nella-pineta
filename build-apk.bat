@echo off
setlocal enabledelayedexpansion

echo ================================
echo Build APK Capacitor - Versione Debug
echo ================================

echo [1/5] Sincronizzazione Capacitor...
call npx cap sync android
echo Sincronizzazione completata - Continuando...

echo [2/5] Verifica cartella android...
if not exist "android" (
    echo ERRORE: Cartella android non trovata
    pause
    exit /b 1
)

echo [3/5] Accesso alla cartella android...
cd android

echo [4/5] Pulizia e build...
call gradlew.bat clean assembleDebug
set BUILD_RESULT=%ERRORLEVEL%

cd ..

if %BUILD_RESULT% equ 0 (
    echo [5/5] Copia APK...
    
    for /f "tokens=*" %%i in ('powershell -Command "Get-Date -Format \"yyyyMMdd-HHmmss\""') do set timestamp=%%i
    
    set src=android\app\build\outputs\apk\debug\app-debug.apk
    set destDir=apk-output
    set dest=!destDir!\app-debug-!timestamp!.apk
    
    if not exist "!destDir!" mkdir "!destDir!"
    
    if exist "!src!" (
        copy "!src!" "!dest!" >nul
        echo.
        echo ================================
        echo ✓ APK generato con successo!
        echo File: !dest!
        echo ================================
    ) else (
        echo ERRORE: APK non trovato in !src!
    )
) else (
    echo ERRORE: Build fallita con codice %BUILD_RESULT%
)

echo.
pause