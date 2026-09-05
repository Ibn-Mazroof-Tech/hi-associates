/**
 * SETUP:
 * 1. Create a new Google Sheet. Add this header row exactly:
 *    Date | Ticket ID | Service | Name | Mobile | Email | State | Address | Gazette Reason | New Name | Razorpay Payment ID
 * 2. In the Sheet, go to Extensions → Apps Script.
 * 3. Delete any existing code and paste this whole file in.
 * 4. Click Deploy → New deployment → select type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Click Deploy, authorize the permissions it asks for, then copy the
 *    Web App URL (ends in /exec).
 * 6. Paste that URL into `googleSheetWebhookUrl` in data/site.ts.
 *
 * NOTE ON "Name" vs Gazette applications: for every service the "Name"
 * column holds the applicant's full name. For Gazette Notification
 * specifically, the website collects "Old Name" and "New Name" from the
 * applicant — the Old Name is what gets saved into this same "Name"
 * column (so there's one consistent Name column for every row), and
 * "New Name" is saved separately in its own column. Both are saved in
 * CAPITAL LETTERS.
 *
 * TICKET ID FORMAT: YYYYMMDDXXXX — e.g. 202608250001. The first 8 digits
 * are today's date, and the last 4 digits are a running sequence number
 * for that date (0001, 0002, ...), calculated by counting how many
 * existing rows already start with today's date-part. The website does
 * NOT generate the Ticket ID itself — it is generated here and sent
 * back in the response, so it stays reliably sequential even if many
 * people submit at once.
 *
 * IMPORTANT: If you edit this file after the first deploy, you must
 * redeploy for changes to take effect — Deploy → Manage deployments →
 * pencil icon → Version: "New version" → Deploy. Just saving the file
 * does NOT update the live /exec URL.
 *
 * REGISTRATION FEE: every Apply Now submission is charged a fixed fee
 * via Razorpay on the website BEFORE this webhook is ever called — the
 * "Razorpay Payment ID" column is simply that payment's ID for your
 * records. If a payment fails or is cancelled, this webhook is never
 * called at all, so you won't see incomplete/unpaid rows here.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const tz = Session.getScriptTimeZone();

    const now = new Date();
    const dateOnly = Utilities.formatDate(now, tz, "dd/MM/yyyy");
    const datePart = Utilities.formatDate(now, tz, "yyyyMMdd");

    // Count existing rows whose Ticket ID (column B) already starts with
    // today's date-part, to work out the next sequence number.
    const values = sheet.getDataRange().getValues();
    let countToday = 0;
    for (let i = 1; i < values.length; i++) { // skip header row
      const existingTicket = String(values[i][1] || "");
      if (existingTicket.indexOf(datePart) === 0) countToday++;
    }
    const sequence = ("0000" + (countToday + 1)).slice(-4);
    const ticketId = datePart + sequence;

    sheet.appendRow([
      dateOnly,
      ticketId,
      data.service || "",
      String(data.name || "").toUpperCase(),
      data.mobile || "",
      data.email || "",
      data.state || "",
      data.address || "",
      data.gazetteReason || "",
      String(data.newName || "").toUpperCase(),
      data.razorpayPaymentId || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", ticketId: ticketId }))
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
