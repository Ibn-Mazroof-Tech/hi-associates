/**
 * SETUP — this is a SEPARATE Sheet from the Apply Now one (Code.gs).
 * 1. Create a NEW Google Sheet (different from the enquiries one). Add
 *    this header row exactly:
 *    Date | Ticket ID | Name | Mobile | Remark | Amount | Razorpay Payment ID
 * 2. In the Sheet, go to Extensions → Apps Script.
 * 3. Delete any existing code and paste this whole file in.
 * 4. Click Deploy → New deployment → select type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Click Deploy, authorize the permissions it asks for, then copy the
 *    Web App URL (ends in /exec).
 * 6. Add that URL as GOOGLE_PAYMENTS_SHEET_WEBHOOK_URL in .env.local
 *    (and in Vercel → Project Settings → Environment Variables).
 *
 * NOTE: this only runs AFTER Razorpay has already confirmed the payment
 * succeeded — it's a record-keeping step, not part of taking the
 * payment itself. If this logging ever fails, the person's payment has
 * still gone through; only the Sheet row would be missing, so check
 * Razorpay's own Dashboard as the source of truth if numbers ever
 * don't match.
 *
 * IMPORTANT: If you edit this file after the first deploy, you must
 * redeploy for changes to take effect — Deploy → Manage deployments →
 * pencil icon → Version: "New version" → Deploy. Just saving the file
 * does NOT update the live /exec URL.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const tz = Session.getScriptTimeZone();
    const dateOnly = Utilities.formatDate(new Date(), tz, "dd/MM/yyyy");

    sheet.appendRow([
      dateOnly,
      data.reference || "",
      String(data.name || "").toUpperCase(),
      data.mobile || "",
      data.remark || "",
      data.amount || "",
      data.paymentId || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: lets you open the /exec URL directly in a browser to confirm
 * the deployment is live (should show {"result":"ready"}).
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: "ready" }))
    .setMimeType(ContentService.MimeType.JSON);
}
