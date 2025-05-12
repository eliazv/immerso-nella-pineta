@echo off
echo ===================================
echo  Test della connessione a PocketBase
echo ===================================
echo.
echo Assicurati che il server PocketBase sia in esecuzione
echo in un'altra finestra di terminale (start-pocketbase.bat)
echo.
echo Premi un tasto per continuare...
pause > nul

node scripts/testPocketBase.js

echo.
echo Test completati. Premi un tasto per uscire...
pause > nul
