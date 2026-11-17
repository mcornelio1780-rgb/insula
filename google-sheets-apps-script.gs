/**
 * INSULA · Guardar leads de la web en Google Sheets (gratis)
 *
 * 1. Crea una hoja en Google Sheets llamada "Insula Leads".
 * 2. Menú Extensiones → Apps Script. Borra lo que haya y pega TODO este archivo.
 * 3. Guarda (ícono del disquete).
 * 4. Botón "Implementar" → "Nueva implementación" → tipo "Aplicación web".
 *      Ejecutar como: Yo
 *      Quién tiene acceso: Cualquier persona
 *    → Implementar → Autorizar acceso con tu cuenta de Google.
 * 5. Copia la "URL de la aplicación web" (termina en /exec) y pégala en config.js → googleSheetsUrl.
 *
 * Cada vez que alguien envíe el formulario aparece una fila nueva y te llega un aviso al correo.
 */
const AVISO_A = "manyosa@limly.io";   // correo que recibe el aviso de cada lead ("" para desactivar)
const COLUMNAS = ["fecha","nombre","correo","organizacion","pais","sector","mensaje","idioma","origen"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || "{}");
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads")
              || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
    if (hoja.getLastRow() === 0) hoja.appendRow(COLUMNAS);
    const limpio = v => String(v || "").slice(0, 2000).replace(/^[=+\-@]/, "'$&");
    hoja.appendRow([
      new Date(), limpio(d.name), limpio(d.email), limpio(d.org), limpio(d.country),
      limpio(d.sector), limpio(d.msg), limpio(d.lang), limpio(d.source)
    ]);
    if (AVISO_A) {
      MailApp.sendEmail(AVISO_A, "Nuevo lead Insula · " + (d.org || d.name || ""),
        COLUMNAS.slice(1).map((c, i) => c + ": " + [d.name,d.email,d.org,d.country,d.sector,d.msg,d.lang,d.source][i]).join("\n"));
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("Insula leads: OK");
}
