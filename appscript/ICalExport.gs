/**
 * Immerso nella Pineta - Google Apps Script
 * Generazione feed iCal per sincronizzazione calendario
 *
 * Endpoint: ?action=ical&sheet=Affitti3 (o Affitti4, Affitti8, oppure "all")
 * Oppure: ?action=ical&apartment=principale (o secondario, terziario, all)
 *
 * Aggiungere l'URL del feed iCal al proprio calendario (Google Calendar, Apple Calendar, ecc.)
 */

// Incluso in Code.gs tramite lo stesso progetto Apps Script

/**
 * Genera un feed iCal per uno o tutti gli appartamenti
 * Chiamato da doGet quando action=ical
 */
function generateICalFeed(params) {
  var spreadsheetId = params.spreadsheetId || DEFAULT_SPREADSHEET_ID;
  var apartment = params.apartment || "";
  var sheetParam = params.sheet || "";

  // Determina quali fogli includere
  var sheetsToInclude = [];

  if (apartment === "all" || sheetParam === "all") {
    sheetsToInclude = ["Affitti3", "Affitti4", "Affitti8"];
  } else if (apartment) {
    var mapped = SHEET_MAP[apartment];
    if (mapped) sheetsToInclude = [mapped];
  } else if (sheetParam) {
    var mapped2 = SHEET_MAP[sheetParam] || sheetParam;
    sheetsToInclude = [mapped2];
  } else {
    // Default: tutti gli appartamenti
    sheetsToInclude = ["Affitti3", "Affitti4", "Affitti8"];
  }

  try {
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var allEvents = [];

    for (var i = 0; i < sheetsToInclude.length; i++) {
      var sheet = ss.getSheetByName(sheetsToInclude[i]);
      if (sheet) {
        var apartmentName = getApartmentName(sheetsToInclude[i]);
        var events = extractEventsFromSheet(sheet, apartmentName);
        allEvents = allEvents.concat(events);
      }
    }

    var icalContent = buildICalContent(allEvents);

    var output = ContentService.createTextOutput(icalContent);
    output.setMimeType(ContentService.MimeType.TEXT);
    return output;
  } catch (err) {
    return createResponse({ success: false, message: "Errore iCal: " + err.toString() });
  }
}

/**
 * Estrae eventi da un foglio
 */
function extractEventsFromSheet(sheet, apartmentName) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var headers = getHeaders(sheet);
  var data = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();

  var nomeCol = findColumnIndex(headers, ["Nome", "nome", "Name", "Cliente"]);
  var checkInCol = findColumnIndex(headers, ["Check-in", "check-in", "CheckIn", "Arrivo", "Data arrivo"]);
  var checkOutCol = findColumnIndex(headers, ["Check-out", "check-out", "CheckOut", "Partenza", "Data partenza"]);
  var otaCol = findColumnIndex(headers, ["OTA", "ota", "Canale", "Channel"]);
  var nottiCol = findColumnIndex(headers, ["Notti", "notti", "Nights"]);
  var adultiCol = findColumnIndex(headers, ["Adulti", "adulti", "Adults"]);
  var noteCol = findColumnIndex(headers, ["Note", "note", "Notes"]);

  var events = [];

  for (var i = 0; i < data.length; i++) {
    var nome = nomeCol >= 0 ? (data[i][nomeCol] || "").toString().trim() : "";
    if (!nome) continue;

    var checkIn = checkInCol >= 0 ? (data[i][checkInCol] || "").toString().trim() : "";
    var checkOut = checkOutCol >= 0 ? (data[i][checkOutCol] || "").toString().trim() : "";

    if (!checkIn || !checkOut) continue;

    var checkInDate = parseItalianDate(checkIn);
    var checkOutDate = parseItalianDate(checkOut);

    if (!checkInDate || !checkOutDate) continue;

    var ota = otaCol >= 0 ? (data[i][otaCol] || "").toString().trim() : "";
    var notti = nottiCol >= 0 ? (data[i][nottiCol] || "").toString().trim() : "";
    var adulti = adultiCol >= 0 ? (data[i][adultiCol] || "").toString().trim() : "";
    var note = noteCol >= 0 ? (data[i][noteCol] || "").toString().trim() : "";

    var summary = nome + (apartmentName ? " - " + apartmentName : "");
    var description = [];
    if (ota) description.push("OTA: " + ota);
    if (notti) description.push("Notti: " + notti);
    if (adulti) description.push("Adulti: " + adulti);
    if (note) description.push("Note: " + note);

    events.push({
      uid: generateUID(nome, checkIn),
      summary: summary,
      description: description.join("\\n"),
      dtstart: formatDateForICal(checkInDate),
      dtend: formatDateForICal(checkOutDate),
      dtstamp: new Date(),
    });
  }

  return events;
}

/**
 * Costruisce il contenuto iCal in formato RFC 5545
 */
function buildICalContent(events) {
  var lines = [];

  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//Immerso nella Pineta//Prenotazioni//IT");
  lines.push("CALSCALE:GREGORIAN");
  lines.push("METHOD:PUBLISH");
  lines.push("X-WR-CALNAME:Immerso nella Pineta - Prenotazioni");
  lines.push("X-WR-TIMEZONE:Europe/Rome");
  lines.push("X-WR-CALDESC:Calendario prenotazioni appartamenti");

  for (var i = 0; i < events.length; i++) {
    var ev = events[i];
    lines.push("BEGIN:VEVENT");
    lines.push("UID:" + ev.uid);
    lines.push("SUMMARY:" + escapeICalText(ev.summary));
    if (ev.description) {
      lines.push("DESCRIPTION:" + ev.description);
    }
    lines.push("DTSTART;VALUE=DATE:" + ev.dtstart);
    lines.push("DTEND;VALUE=DATE:" + ev.dtend);
    lines.push("DTSTAMP:" + formatDateTimeForICal(ev.dtstamp));
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  return lines.join("\r\n");
}

/**
 * Effettua il parsing di una data nel formato DD/MM/YYYY o YYYY-MM-DD
 */
function parseItalianDate(dateStr) {
  if (!dateStr) return null;

  var clean = dateStr.trim();

  // Formato DD/MM/YYYY
  if (clean.indexOf("/") !== -1) {
    var parts = clean.split("/");
    if (parts.length === 3) {
      var d = parseInt(parts[0], 10);
      var m = parseInt(parts[1], 10) - 1;
      var y = parseInt(parts[2], 10);
      if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
        return new Date(y, m, d);
      }
    }
  }

  // Formato YYYY-MM-DD
  if (clean.indexOf("-") !== -1) {
    var parts2 = clean.split("-");
    if (parts2.length === 3 && parts2[0].length === 4) {
      return new Date(parseInt(parts2[0], 10), parseInt(parts2[1], 10) - 1, parseInt(parts2[2], 10));
    }
  }

  return null;
}

/**
 * Formatta una data come YYYYMMDD per iCal (eventi di tutto il giorno)
 */
function formatDateForICal(date) {
  var y = date.getFullYear();
  var m = ("0" + (date.getMonth() + 1)).slice(-2);
  var d = ("0" + date.getDate()).slice(-2);
  return y + m + d;
}

/**
 * Formatta una data+ora come YYYYMMDDTHHmmssZ per iCal
 */
function formatDateTimeForICal(date) {
  var y = date.getUTCFullYear();
  var mo = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  var d = ("0" + date.getUTCDate()).slice(-2);
  var h = ("0" + date.getUTCHours()).slice(-2);
  var mi = ("0" + date.getUTCMinutes()).slice(-2);
  var s = ("0" + date.getUTCSeconds()).slice(-2);
  return y + mo + d + "T" + h + mi + s + "Z";
}

/**
 * Genera un UID univoco per l'evento
 */
function generateUID(nome, checkIn) {
  var clean = (nome + "-" + checkIn).replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  return clean + "@immerso-nella-pineta";
}

/**
 * Restituisce il nome dell'appartamento a partire dal nome del foglio
 */
function getApartmentName(sheetName) {
  switch (sheetName) {
    case "Affitti3": return "Appartamento 3";
    case "Affitti4": return "Appartamento 4";
    case "Affitti8": return "Appartamento 8";
    default: return sheetName;
  }
}

/**
 * Escapes special characters for iCal text fields
 */
function escapeICalText(text) {
  return (text || "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}
