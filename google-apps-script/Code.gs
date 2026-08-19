/**
 * SETUP:
 * 1. Create a new Google Sheet. Add this header row exactly:
 *    Timestamp | Service | Name | Mobile | Email | Address | Gazette Reason | Old Name | New Name
 * 2. In the Sheet, go to Extensions → Apps Script.
 * 3. Delete any existing code and paste this whole file in.
 * 4. Click Deploy → New deployment → select type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Click Deploy, authorize the permissions it asks for, then copy the
 *    Web App URL (ends in /exec).
 * 6. Paste that URL into `googleSheetWebhookUrl` in data/site.ts.
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

    sheet.appendRow([
      new Date(),
      data.service || "",
      data.name || "",
      data.mobile || "",
      data.email || "",
      data.address || "",
      data.gazetteReason || "",
      data.oldName || "",
      data.newName || "",
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
