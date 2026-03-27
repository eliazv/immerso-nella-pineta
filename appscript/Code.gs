/**
 * Immerso nella Pineta - Google Apps Script
 * Gestione CRUD delle prenotazioni su Google Sheets
 *
 * Deployment: Pubblica come Web App con accesso "Chiunque"
 * Imposta VITE_GOOGLE_SCRIPT_ENDPOINT nell'app React con l'URL generato.
 */

// ID del foglio Google Sheets (può essere sovrascritto dal parametro nella richiesta)
var DEFAULT_SPREADSHEET_ID = "156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc";

// Mappa dei fogli per appartamento
var SHEET_MAP = {
  principale: "Affitti3",
  secondario: "Affitti4",
  terziario: "Affitti8",
  Affitti3: "Affitti3",
  Affitti4: "Affitti4",
  Affitti8: "Affitti8",
};

// Intestazioni standard del foglio (devono corrispondere all'ordine delle colonne)
var SHEET_HEADERS = [
  "Nome",
  "OTA",
  "Check-in",
  "Check-out",
  "Notti",
  "Adulti",
  "Bambini",
  "Animali",
  "Totale cliente",
  "Fuori OTA",
  "Costo notti",
  "Media a notte",
  "Pulizia",
  "Sconti",
  "Soggiorno Tax",
  "OTA Tax",
  "Cedolare secca",
  "Totale",
  "Note",
];

/**
 * Punto di ingresso per richieste GET
 * Supporta: ?data=<JSON_encoded>
 */
function doGet(e) {
  try {
    var params = e.parameter;

    // Parsing del parametro "data" (JSON codificato)
    if (params.data) {
      var data = JSON.parse(decodeURIComponent(params.data));
      return handleRequest(data);
    }

    // Endpoint iCal: ?action=ical&sheet=Affitti3
    if (params.action === "ical") {
      return generateICalFeed(params);
    }

    return createResponse({
      success: false,
      message: "Nessun parametro valido",
    });
  } catch (err) {
    return createResponse({
      success: false,
      message: "Errore: " + err.toString(),
    });
  }
}

/**
 * Punto di ingresso per richieste POST
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    return handleRequest(data);
  } catch (err) {
    return createResponse({
      success: false,
      message: "Errore POST: " + err.toString(),
    });
  }
}

/**
 * Dispatch delle operazioni in base all'azione
 */
function handleRequest(data) {
  var action = data.action;
  var spreadsheetId = data.spreadsheetId || DEFAULT_SPREADSHEET_ID;
  var sheetName = SHEET_MAP[data.sheet] || data.sheet || "Affitti3";

  try {
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      return createResponse({
        success: false,
        message: "Foglio non trovato: " + sheetName,
      });
    }

    switch (action) {
      case "add":
        return addBooking(sheet, data.booking);
      case "update":
        return updateBooking(sheet, data.booking);
      case "delete":
        return deleteBooking(sheet, data.booking);
      default:
        return createResponse({
          success: false,
          message: "Azione non riconosciuta: " + action,
        });
    }
  } catch (err) {
    return createResponse({
      success: false,
      message: "Errore: " + err.toString(),
    });
  }
}

/**
 * Aggiunge una nuova prenotazione in fondo al foglio
 */
function addBooking(sheet, booking) {
  try {
    var lastRow = sheet.getLastRow();
    var headers = getHeaders(sheet);

    // Costruisce la riga in base alle intestazioni del foglio
    var newRow = buildRowFromBooking(booking, headers);

    sheet.appendRow(newRow);

    return createResponse({
      success: true,
      message: "Prenotazione aggiunta con successo",
      rowIndex: lastRow + 1,
    });
  } catch (err) {
    return createResponse({
      success: false,
      message: "Errore aggiunta: " + err.toString(),
    });
  }
}

/**
 * Aggiorna una prenotazione esistente identificata da rowIndex
 */
function updateBooking(sheet, booking) {
  try {
    // Cerca SEMPRE per nome+check-in (più affidabile del rowIndex proveniente dal client,
    // che potrebbe essere sfasato se il foglio contiene righe vuote)
    var rowIndex = findBookingRow(sheet, booking);

    // Fallback: usa rowIndex del client solo se la ricerca non trova nulla
    if (!rowIndex && booking.rowIndex && booking.rowIndex >= 2) {
      rowIndex = booking.rowIndex;
    }

    if (!rowIndex) {
      return createResponse({
        success: false,
        message: "Prenotazione non trovata nel foglio",
      });
    }

    var headers = getHeaders(sheet);
    var updatedRow = buildRowFromBooking(booking, headers);

    // Aggiorna solo le colonne che hanno dati
    var range = sheet.getRange(rowIndex, 1, 1, updatedRow.length);
    range.setValues([updatedRow]);

    return createResponse({
      success: true,
      message: "Prenotazione aggiornata con successo",
      rowIndex: rowIndex,
    });
  } catch (err) {
    return createResponse({
      success: false,
      message: "Errore aggiornamento: " + err.toString(),
    });
  }
}

/**
 * Elimina una prenotazione identificata da rowIndex
 */
function deleteBooking(sheet, booking) {
  try {
    // Cerca SEMPRE per nome+check-in per evitare di eliminare la riga sbagliata
    var rowIndex = findBookingRow(sheet, booking);

    // Fallback: usa rowIndex del client solo se la ricerca non trova nulla
    if (!rowIndex && booking.rowIndex && booking.rowIndex >= 2) {
      rowIndex = booking.rowIndex;
    }

    if (!rowIndex) {
      return createResponse({
        success: false,
        message: "Prenotazione non trovata nel foglio",
      });
    }

    sheet.deleteRow(rowIndex);

    return createResponse({
      success: true,
      message: "Prenotazione eliminata con successo",
    });
  } catch (err) {
    return createResponse({
      success: false,
      message: "Errore eliminazione: " + err.toString(),
    });
  }
}

/**
 * Recupera le intestazioni del foglio dalla prima riga
 */
function getHeaders(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) return SHEET_HEADERS;
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0];
}

/**
 * Costruisce un array di valori per una riga a partire dall'oggetto booking
 * e dalle intestazioni del foglio
 */
function buildRowFromBooking(booking, headers) {
  // Mappa dei campi del booking alle possibili intestazioni del foglio
  var fieldMap = {
    Nome: ["Nome", "nome", "Name", "Cliente"],
    OTA: ["OTA", "ota", "Canale", "Channel"],
    CheckIn: ["Check-in", "check-in", "CheckIn", "Arrivo", "Data arrivo"],
    CheckOut: [
      "Check-out",
      "check-out",
      "CheckOut",
      "Partenza",
      "Data partenza",
    ],
    Notti: ["Notti", "notti", "Nights", "Durata"],
    adulti: ["Adulti", "adulti", "Adults", "Persone", "Num Adulti"],
    bambini: ["Bambini", "bambini", "Children"],
    animali: ["Animali", "animali", "Pets"],
    TotaleCliente: ["Totale cliente", "TotaleCliente", "Total"],
    FuoriOTA: ["Fuori OTA", "FuoriOTA", "Extra OTA"],
    CostoNotti: ["Costo notti", "CostoNotti", "Room cost"],
    MediaANotte: ["Media a notte", "MediaANotte", "Average"],
    Pulizia: ["Pulizia", "pulizia", "Cleaning"],
    Sconti: ["Sconti", "sconti", "Discount"],
    SoggiornoTax: [
      "Soggiorno Tax",
      "SoggiornoTax",
      "City Tax",
      "Tassa di soggiorno",
    ],
    SoggiornoPagata: [
      "Soggiorno Pagata",
      "SoggiornoPagata",
      "Tassa di soggiorno pagata",
    ],
    OTATax: ["OTA Tax", "OTATax", "Service Fee"],
    CedolareSecca: ["Cedolare secca", "CedolareSecca", "Cedolare Secca (21%)"],
    Totale: ["Totale", "totale", "Total Income"],
    Note: ["Note", "note", "Notes", "Commenti"],
  };

  var row = [];
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i].toString().trim();
    var value = "";

    // Cerca quale campo del booking corrisponde a questa intestazione
    for (var bookingField in fieldMap) {
      var possibleHeaders = fieldMap[bookingField];
      for (var j = 0; j < possibleHeaders.length; j++) {
        if (possibleHeaders[j].toLowerCase() === header.toLowerCase()) {
          value = booking[bookingField] || "";
          break;
        }
      }
      if (value !== "") break;
    }

    row.push(value);
  }

  return row;
}

/**
 * Cerca la riga di una prenotazione nel foglio per nome e check-in
 */
function findBookingRow(sheet, booking) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  var headers = getHeaders(sheet);
  var data = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();

  // Trova le colonne per Nome e Check-in
  var nomeCol = findColumnIndex(headers, ["Nome", "nome", "Name", "Cliente"]);
  var checkInCol = findColumnIndex(headers, [
    "Check-in",
    "check-in",
    "CheckIn",
    "Arrivo",
  ]);

  if (nomeCol === -1) return null;

  for (var i = 0; i < data.length; i++) {
    var rowNome = (data[i][nomeCol] || "").toString().trim();
    var rowCheckIn =
      checkInCol >= 0 ? (data[i][checkInCol] || "").toString().trim() : "";

    if (
      rowNome.toLowerCase() === (booking.Nome || "").toLowerCase() &&
      (checkInCol === -1 || rowCheckIn === (booking.CheckIn || "").trim())
    ) {
      return i + 2; // +2 perché i dati partono dalla riga 2 (riga 1 = intestazioni)
    }
  }

  return null;
}

/**
 * Trova l'indice di una colonna cercando tra nomi alternativi
 */
function findColumnIndex(headers, names) {
  for (var i = 0; i < headers.length; i++) {
    var h = (headers[i] || "").toString().toLowerCase().trim();
    for (var j = 0; j < names.length; j++) {
      if (h === names[j].toLowerCase()) return i;
    }
  }
  return -1;
}

/**
 * Crea una risposta HTTP con headers CORS
 */
function createResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
