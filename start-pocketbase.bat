@echo off
echo ====================================
echo Avvio PocketBase per Immerso nella Pineta
echo ====================================

REM Controlla se la cartella pocketbase esiste
if not exist pocketbase (
    echo La cartella 'pocketbase' non esiste.
    echo Per favore, scarica PocketBase da https://pocketbase.io/docs
    echo ed estrailo nella cartella 'pocketbase' nella root del progetto.
    pause
    exit /b 1
)

cd pocketbase

REM Controlla se l'eseguibile esiste
if not exist pocketbase.exe (
    echo L'eseguibile 'pocketbase.exe' non esiste nella cartella 'pocketbase'.
    echo Per favore, scarica PocketBase da https://pocketbase.io/docs
    echo ed estrailo nella cartella 'pocketbase' nella root del progetto.
    pause
    exit /b 1
)

echo.
echo Avvio PocketBase...
echo.
echo Amministrazione: http://127.0.0.1:8090/_/
echo API: http://127.0.0.1:8090/api/
echo.
echo Premi Ctrl+C per terminare il server
echo.

pocketbase.exe serve

echo PocketBase terminato.
pause
