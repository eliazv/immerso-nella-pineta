# Script per eseguire la migrazione da Google Sheets a PocketBase

# Prima di eseguire, assicurati di:
# 1. Avere installato Node.js
# 2. Avere PocketBase in esecuzione su localhost:8090
# 3. Aver creato un account admin in PocketBase
# 4. Aggiornato le credenziali dell'admin nel file migrateToDatabase.js

# Esegui con:
# npm install
# node ./scripts/migrateToDatabase.js

echo "Avvio della migrazione da Google Sheets a PocketBase..."
node ./scripts/migrateToDatabase.js
