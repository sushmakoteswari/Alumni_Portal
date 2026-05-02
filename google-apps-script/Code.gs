  /**
  * Pragathi Alumni Web App (Clean + Production Ready)
  *
  * Deploy:
  * - Execute as: Me
  * - Who has access: Anyone
  *
  * After changes: Deploy → New Version → Update
  */

  var SPREADSHEET_ID = "1Qa4pJ-_PKED52B5ICwHoJE-EiOmup12O-2ZFNkdEUc4";
  var CONTACT_SHEET_GID = 389133321;

  /** ---------- Helpers ---------- */

  function jsonResponse_(obj) {
    return ContentService
      .createTextOutput(JSON.stringify(obj))
      .setMimeType(ContentService.MimeType.JSON);
  }

  function textResponse_(text) {
    return ContentService
      .createTextOutput(text)
      .setMimeType(ContentService.MimeType.TEXT);
  }

  function getSheetByGid_(ss, gid) {
    var sheets = ss.getSheets();
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getSheetId() == gid) return sheets[i];
    }
    throw new Error("Sheet not found: " + gid);
  }

  /** ---------- GET: Alumni Directory ---------- */

  function doGet(e) {
    try {
      var action = (e.parameter.action || "").toLowerCase();
      var list = e.parameter.list;

      if (action === "list" || list === "1" || list === "true") {
        var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        var sheet = ss.getSheets()[0];
        var data = sheet.getDataRange().getValues();

        if (data.length === 0) {
          return jsonResponse_({ ok: true, rows: [] });
        }

        var headers = data[0];
        var rows = [];

        for (var i = 1; i < data.length; i++) {
          var row = {};
          var isEmpty = true;

          for (var j = 0; j < headers.length; j++) {
            var key = String(headers[j]).trim();
            if (!key) continue;

            row[key] = data[i][j];
            if (data[i][j] !== "" && data[i][j] != null) isEmpty = false;
          }

          if (!isEmpty) rows.push(row);
        }

        return jsonResponse_({ ok: true, rows: rows });
      }

      return textResponse_("Use POST for forms or GET ?action=list");
    } catch (err) {
      return jsonResponse_({ ok: false, error: String(err) });
    }
  }

  /** ---------- POST: Forms ---------- */

  function doPost(e) {
    try {
      var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

      // ✅ SIMPLE: trust Apps Script parsing
      var p = e.parameter;

      // Debug (optional, remove later)
      Logger.log("PARAMS: " + JSON.stringify(p));

      var form = (p.form || "").toLowerCase();

      /** ---------- CONTACT FORM ---------- */
      if (form === "contact") {
        var sheet = getSheetByGid_(ss, CONTACT_SHEET_GID);

        sheet.appendRow([
          new Date(),
          p.name || "",
          p.email || "",
          p.message || "",
        ]);

        return textResponse_("ok");
      }

      /** ---------- REGISTRATION FORM ---------- */

      var sheet = ss.getSheets()[0];

      sheet.appendRow([
        new Date(),
        p.name || "",
        p.batch || "",
        p.email || "",
        p.city || "",
        p.linkedin || "",
        p.message || "",
        p.volunteer || "",
        p.phone || p.alumni_phone || "", // ✅ FIXED
      ]);

      return textResponse_("ok");

    } catch (err) {
      return textResponse_("error: " + err);
    }
  }