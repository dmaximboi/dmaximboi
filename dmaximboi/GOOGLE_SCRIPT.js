// dmaximboi Google Apps Script
// Paste this into Extensions > Apps Script in your Google Sheet
// Deploy as Web App: Execute as Me, Access Anyone

const SHEET_NAME = "Sheet1";
const NOTIFY_EMAIL = "dmaximboi@gmail.com";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME);

    const data = JSON.parse(e.postData.contents);

    const timestamp = new Date().toLocaleString("en-NG", {
      timeZone: "Africa/Lagos"
    });

    sheet.appendRow([
      timestamp,
      data.name    || "",
      data.email   || "",
      data.subject || "",
      data.message || "",
      "Unread"
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "New Message from dmaximboi.vercel.app: " + (data.subject || "No subject"),
      body:
        "You have a new portfolio message.\n\n" +
        "Name:    " + data.name    + "\n" +
        "Email:   " + data.email   + "\n" +
        "Subject: " + data.subject + "\n\n" +
        "Message:\n" + data.message + "\n\n" +
        "Received: " + timestamp
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "maxiM portfolio script is live" }))
    .setMimeType(ContentService.MimeType.JSON);
}
