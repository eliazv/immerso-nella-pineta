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
    return createResponse({
      success: false,
      message: "Errore iCal: " + err.toString(),
    });
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
  var checkInCol = findColumnIndex(headers, [
    "Check-in",
    "check-in",
    "CheckIn",
    "Arrivo",
    "Data arrivo",
  ]);
  var checkOutCol = findColumnIndex(headers, [
    "Check-out",
    "check-out",
    "CheckOut",
    "Partenza",
    "Data partenza",
  ]);
  var otaCol = findColumnIndex(headers, ["OTA", "ota", "Canale", "Channel"]);
  var nottiCol = findColumnIndex(headers, ["Notti", "notti", "Nights"]);
  var adultiCol = findColumnIndex(headers, [
    "Adulti",
    "adulti",
    "Adults",
    "Persone",
  ]);
  var bambiniCol = findColumnIndex(headers, ["Bambini", "bambini", "Children"]);
  var animaliCol = findColumnIndex(headers, ["Animali", "animali", "Pets"]);
  var totClienteCol = findColumnIndex(headers, [
    "Totale cliente",
    "TotaleCliente",
    "Total",
  ]);
  var fuoriOtaCol = findColumnIndex(headers, [
    "Fuori OTA",
    "FuoriOTA",
    "Extra OTA",
  ]);
  var costoNottiCol = findColumnIndex(headers, [
    "Costo notti",
    "CostoNotti",
    "Room cost",
  ]);
  var puliziaCole = findColumnIndex(headers, [
    "Pulizia",
    "pulizia",
    "Cleaning",
  ]);
  var scontiCol = findColumnIndex(headers, ["Sconti", "sconti", "Discount"]);
  var soggTaxCol = findColumnIndex(headers, [
    "Soggiorno Tax",
    "SoggiornoTax",
    "City Tax",
    "Tassa di soggiorno",
  ]);
  var otaTaxCol = findColumnIndex(headers, [
    "OTA Tax",
    "OTATax",
    "Service Fee",
  ]);
  var cedolareCol = findColumnIndex(headers, [
    "Cedolare secca",
    "CedolareSecca",
    "Cedolare Secca (21%)",
  ]);
  var totaleCol = findColumnIndex(headers, [
    "Totale",
    "totale",
    "Total Income",
  ]);
  var noteCol = findColumnIndex(headers, ["Note", "note", "Notes"]);

  var events = [];

  for (var i = 0; i < data.length; i++) {
    var nome = nomeCol >= 0 ? (data[i][nomeCol] || "").toString().trim() : "";
    if (!nome) continue;

    var checkInRaw = checkInCol >= 0 ? data[i][checkInCol] : "";
    var checkOutRaw = checkOutCol >= 0 ? data[i][checkOutCol] : "";

    var checkInDate = normalizeSheetDate(checkInRaw);
    var checkOutDate = normalizeSheetDate(checkOutRaw);

    if (!checkInDate || !checkOutDate) continue;

    // Estrae tutti i campi
    var ota = otaCol >= 0 ? (data[i][otaCol] || "").toString().trim() : "";
    var notti =
      nottiCol >= 0 ? (data[i][nottiCol] || "").toString().trim() : "";
    var adulti =
      adultiCol >= 0 ? (data[i][adultiCol] || "").toString().trim() : "";
    var bambini =
      bambiniCol >= 0 ? (data[i][bambiniCol] || "").toString().trim() : "";
    var animali =
      animaliCol >= 0 ? (data[i][animaliCol] || "").toString().trim() : "";
    var totCliente =
      totClienteCol >= 0
        ? (data[i][totClienteCol] || "").toString().trim()
        : "";
    var fuoriOta =
      fuoriOtaCol >= 0 ? (data[i][fuoriOtaCol] || "").toString().trim() : "";
    var costoNotti =
      costoNottiCol >= 0
        ? (data[i][costoNottiCol] || "").toString().trim()
        : "";
    var pulizia =
      puliziaCole >= 0 ? (data[i][puliziaCole] || "").toString().trim() : "";
    var sconti =
      scontiCol >= 0 ? (data[i][scontiCol] || "").toString().trim() : "";
    var soggTax =
      soggTaxCol >= 0 ? (data[i][soggTaxCol] || "").toString().trim() : "";
    var otaTax =
      otaTaxCol >= 0 ? (data[i][otaTaxCol] || "").toString().trim() : "";
    var cedolare =
      cedolareCol >= 0 ? (data[i][cedolareCol] || "").toString().trim() : "";
    var totale =
      totaleCol >= 0 ? (data[i][totaleCol] || "").toString().trim() : "";
    var note = noteCol >= 0 ? (data[i][noteCol] || "").toString().trim() : "";

    // Costruisce il titolo: Nome [OTA] - Appartamento
    var summary = nome;
    if (ota) summary += " [" + ota + "]";
    if (apartmentName) summary += " - " + apartmentName;

    // Costruisce la descrizione con tutti i dettagli disponibili.
    // I singoli valori vengono escaped; le righe vengono unite con \n (iCal newline).
    var desc = [];

    // Sezione ospiti
    if (notti) desc.push("Notti: " + notti);
    if (adulti) desc.push("Adulti: " + adulti);
    if (bambini && bambini !== "0") desc.push("Bambini: " + bambini);
    if (animali && animali !== "0") desc.push("Animali: " + animali);

    // Sezione economica (solo se ci sono dati finanziari)
    var hasFinancial = totCliente || costoNotti || pulizia || totale;
    if (hasFinancial) {
      desc.push("---");
      if (totCliente) desc.push("Tot. Cliente: " + formatCurrency(totCliente));
      if (fuoriOta && fuoriOta !== "0")
        desc.push("Fuori OTA: " + formatCurrency(fuoriOta));
      if (costoNotti) desc.push("Costo Notti: " + formatCurrency(costoNotti));
      if (pulizia && pulizia !== "0")
        desc.push("Pulizia: " + formatCurrency(pulizia));
      if (sconti && sconti !== "0")
        desc.push("Sconti: -" + formatCurrency(sconti));
      if (soggTax && soggTax !== "0")
        desc.push("Tassa Soggiorno: " + formatCurrency(soggTax));
      if (otaTax && otaTax !== "0")
        desc.push("OTA Tax: " + formatCurrency(otaTax));
      if (cedolare && cedolare !== "0")
        desc.push("Cedolare Secca: " + formatCurrency(cedolare));
      if (totale) desc.push("Totale Netto: " + formatCurrency(totale));
    }

    if (note) {
      desc.push("---");
      desc.push("Note: " + escapeICalText(note));
    }

    // Unisce le righe con \n (carattere di escape iCal per i newline nella DESCRIPTION)
    var descStr = desc
      .map(function (line) {
        // Le righe "---" non hanno caratteri speciali da escapare
        if (line === "---") return line;
        // Escape solo i caratteri speciali iCal (,;\\) ma non le parentesi monetarie
        return line
          .replace(/\\/g, "\\\\")
          .replace(/;/g, "\\;")
          .replace(/,(?![0-9])/g, "\\,");
      })
      .join("\\n");

    events.push({
      uid: generateUID(nome, formatDateForICal(checkInDate)),
      summary: summary,
      description: descStr,
      dtstart: formatDateForICal(checkInDate),
      dtend: formatDateForICal(checkOutDate),
      dtstamp: new Date(),
    });
  }

  return events;
}

/**
 * Normalizza una data proveniente da Google Sheets.
 * Supporta Date native, serial number Sheets/Excel e stringhe comuni.
 */
function normalizeSheetDate(value) {
  if (value === null || value === undefined || value === "") return null;

  if (Object.prototype.toString.call(value) === "[object Date]") {
    if (!isNaN(value.getTime())) {
      return new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }
    return null;
  }

  if (typeof value === "number") {
    // Serial date: giorni da 1899-12-30 (compatibile con Sheets/Excel).
    var epoch = new Date(1899, 11, 30);
    var ms = Math.round(value * 24 * 60 * 60 * 1000);
    var d = new Date(epoch.getTime() + ms);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  return parseItalianDate(value.toString());
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

  // Fallback parser JS per stringhe come "Wed Apr 01 2026 ..."
  var jsParsed = new Date(clean);
  if (!isNaN(jsParsed.getTime())) {
    return new Date(
      jsParsed.getFullYear(),
      jsParsed.getMonth(),
      jsParsed.getDate(),
    );
  }

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
      return new Date(
        parseInt(parts2[0], 10),
        parseInt(parts2[1], 10) - 1,
        parseInt(parts2[2], 10),
      );
    }
  }

  return null;
}

/**
 * Invia un riepilogo email degli arrivi di oggi.
 * Configurare ARRIVAL_NOTIFICATION_EMAIL e creare un trigger giornaliero.
 */
function sendTodayArrivalsEmail() {
  var recipient =
    typeof ARRIVAL_NOTIFICATION_EMAIL !== "undefined"
      ? ARRIVAL_NOTIFICATION_EMAIL
      : "";
  if (!recipient) {
    throw new Error(
      "Imposta ARRIVAL_NOTIFICATION_EMAIL nello script (es. il tuo indirizzo Gmail)",
    );
  }

  var ss = SpreadsheetApp.openById(DEFAULT_SPREADSHEET_ID);
  var sheetNames = ["Affitti3", "Affitti4", "Affitti8"];
  var today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  var arrivals = [];

  for (var i = 0; i < sheetNames.length; i++) {
    var sheet = ss.getSheetByName(sheetNames[i]);
    if (!sheet) continue;

    var apartmentName = getApartmentName(sheetNames[i]);
    var lastRow = sheet.getLastRow();
    if (lastRow < 2) continue;

    var headers = getHeaders(sheet);
    var rows = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
    var nomeCol = findColumnIndex(headers, ["Nome", "nome", "Name", "Cliente"]);
    var checkInCol = findColumnIndex(headers, [
      "Check-in",
      "check-in",
      "CheckIn",
      "Arrivo",
      "Data arrivo",
    ]);
    var nottiCol = findColumnIndex(headers, ["Notti", "notti", "Nights"]);
    var otaCol = findColumnIndex(headers, ["OTA", "ota", "Canale", "Channel"]);

    for (var r = 0; r < rows.length; r++) {
      var nome = nomeCol >= 0 ? (rows[r][nomeCol] || "").toString().trim() : "";
      if (!nome || checkInCol < 0) continue;

      var checkIn = normalizeSheetDate(rows[r][checkInCol]);
      if (!checkIn) continue;

      if (checkIn.getTime() === today.getTime()) {
        var notti =
          nottiCol >= 0 ? (rows[r][nottiCol] || "").toString().trim() : "";
        var ota = otaCol >= 0 ? (rows[r][otaCol] || "").toString().trim() : "";
        arrivals.push(
          "- " +
            nome +
            " (" +
            apartmentName +
            ")" +
            (ota ? " - " + ota : "") +
            (notti ? " - " + notti + " notti" : ""),
        );
      }
    }
  }

  if (!arrivals.length) return;

  var body = [
    "Arrivi previsti per oggi:",
    "",
    arrivals.join("\n"),
    "",
    "Generato automaticamente da Immerso nella Pineta",
  ].join("\n");

  MailApp.sendEmail({
    to: recipient,
    subject: "Immerso nella Pineta - Arrivi di oggi",
    body: body,
  });
}

/**
 * Crea (una sola volta) un trigger giornaliero per la notifica arrivi.
 * Esegui manualmente questa funzione una volta dall'editor Apps Script.
 */
function createDailyArrivalNotificationTrigger() {
  var functionName = "sendTodayArrivalsEmail";
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === functionName) {
      return;
    }
  }

  ScriptApp.newTrigger(functionName)
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
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
  var clean = (nome + "-" + checkIn)
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase();
  return clean + "@immerso-nella-pineta";
}

/**
 * Restituisce il nome dell'appartamento a partire dal nome del foglio
 */
function getApartmentName(sheetName) {
  switch (sheetName) {
    case "Affitti3":
      return "Appartamento 3";
    case "Affitti4":
      return "Appartamento 4";
    case "Affitti8":
      return "Appartamento 8";
    default:
      return sheetName;
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

/**
 * Formatta un valore monetario aggiungendo € se non già presente
 */
function formatCurrency(value) {
  var s = (value || "").toString().trim();
  if (!s) return s;
  if (s.indexOf("€") === -1) return "€" + s;
  return s;
}
