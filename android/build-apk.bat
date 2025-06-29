@echo off
REM Script batch per generare APK firmato e copiarlo in una cartella dedicata con timestamp

REM Genera l'APK release
call gradlew assembleRelease

REM Controlla se la build è andata a buon fine
if %ERRORLEVEL% equ 0 (
    for /f "tokens=1-4 delims=/ " %%a in ('date /t') do set datestamp=%%d%%b%%c
    for /f "tokens=1-2 delims=: " %%a in ('time /t') do set timestamp=%%a%%b
    set timestamp=%datestamp%-%timestamp%
    set timestamp=%timestamp::=%
    set src=app\build\outputs\apk\release\app-release.apk
    set destDir=apks
    if not exist %destDir% mkdir %destDir%
    set dest=%destDir%\app-release-%timestamp%.apk
    copy /Y %src% %dest%
    echo APK generato e copiato in %dest%
) else (
    echo Errore nella generazione dell'APK.
)
