/**
 * Paste into Apps Script, then Deploy → New deployment → Web app:
 *   Execute as: Me  |  Who has access: Anyone
 *
 * Sends URL-encoded fields (e.parameter). Include `form=register` or `form=contact`.
 */
var SPREADSHEET_ID = "1Qa4pJ-_PKED52B5ICwHoJE-EiOmup12O-2ZFNkdEUc4";

/** Tab opened via URL …#gid=389133321 — matches Sheet.getSheetId() */
var CONTACT_SHEET_GID = 389133321;

function doGet() {
  return ContentService.createTextOutput(
    "Pragathi web forms: POST with form=register or form=contact."
  ).setMimeType(ContentService.MimeType.TEXT);
}

function getSheetByGid_(ss, gid) {
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === gid || String(sheets[i].getSheetId()) === String(gid)) {
      return sheets[i];
    }
  }
  throw new Error("No sheet with gid " + gid);
}

/**
 * Reads registration-style fields from form or JSON.
 */
function readRegistrationFields_(e) {
  var type = (e.postData && e.postData.type) || "";
  var body = (e.postData && e.postData.contents) || "";

  if (type.indexOf("application/json") >= 0 && body) {
    var d = JSON.parse(body);
    return {
      name: String(d.name || ""),
      batch: String(d.batch || ""),
      email: String(d.email || ""),
      city: String(d.city || ""),
      linkedin: String(d.linkedin || ""),
      message: String(d.message || ""),
      volunteer:
        d.volunteer === true || d.volunteer === "Yes"
          ? "Yes"
          : String(d.volunteer || ""),
    };
  }

  var p = e.parameter;
  return {
    name: String(p.name || ""),
    batch: String(p.batch || ""),
    email: String(p.email || ""),
    city: String(p.city || ""),
    linkedin: String(p.linkedin || ""),
    message: String(p.message || ""),
    volunteer: String(p.volunteer || ""),
  };
}

function doPost(e) {
  try {
    var p = e.parameter;
    var form = String(p.form || "").toLowerCase();
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (form === "contact") {
      var contactSheet = getSheetByGid_(ss, CONTACT_SHEET_GID);
      contactSheet.appendRow([
        new Date(),
        String(p.name || ""),
        String(p.email || ""),
        String(p.message || ""),
      ]);
      return ContentService.createTextOutput("ok").setMimeType(ContentService.MimeType.TEXT);
    }

    var r = readRegistrationFields_(e);
    var regSheet = ss.getSheets()[0];
    regSheet.appendRow([
      new Date(),
      r.name,
      r.batch,
      r.email,
      r.city,
      r.linkedin,
      r.message,
      r.volunteer,
    ]);

    return ContentService.createTextOutput("ok").setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService
      .createTextOutput("error: " + err)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
