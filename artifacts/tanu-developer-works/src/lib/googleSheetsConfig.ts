/**
 * ═══════════════════════════════════════════════════════════════════
 * GOOGLE SHEETS INTEGRATION — TanuDeveloper Works
 * ═══════════════════════════════════════════════════════════════════
 *
 * HOW TO CONNECT (5 steps):
 *
 * 1. Go to https://sheets.google.com — create a new spreadsheet.
 *
 * 2. Open Extensions → Apps Script and paste the code below.
 *
 * 3. Click Deploy → New Deployment → Web App.
 *      Execute as:      Me
 *      Who has access:  Anyone
 *    Copy the generated Web App URL.
 *
 * 4. In Replit Secrets panel, add:
 *      Key:   VITE_SHEETS_WEBHOOK_URL
 *      Value: <paste your Web App URL here>
 *
 * 5. Restart the dev server. Submissions will now log to Sheets.
 *
 * ── APPS SCRIPT (paste into Extensions → Apps Script) ──────────────
 *
 * function doPost(e) {
 *   try {
 *     var data = JSON.parse(e.postData.contents);
 *     var ss   = SpreadsheetApp.getActiveSpreadsheet();
 *     var sheet = ss.getSheetByName(data.sheet) || ss.insertSheet(data.sheet);
 *     if (sheet.getLastRow() === 0) sheet.appendRow(data.headers);
 *     sheet.appendRow(data.row);
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ status: "ok" }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch(err) {
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 *
 * ───────────────────────────────────────────────────────────────────
 */

/** Reads the webhook URL from the VITE_SHEETS_WEBHOOK_URL env secret */
export const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL as
  | string
  | undefined;

// ── Sheet tab names ────────────────────────────────────────────────
export const SHEET_NAMES = {
  contact: "Contact Form",
  demo: "Demo Requests",
  scratch: "Scratch Card Leads",
  quote: "Quote Requests",
} as const;

// ── Column headers ─────────────────────────────────────────────────
export const HEADERS = {
  contact: ["Timestamp", "Name", "Email", "Project Type", "Budget", "Message"],
  demo: ["Timestamp", "Business Type", "Source"],
  scratch: ["Timestamp", "Name", "WhatsApp", "Reward Won"],
  quote: [
    "Timestamp",
    "Name",
    "Phone",
    "Business Type",
    "Pages",
    "Features",
    "Estimated Price",
  ],
} as const;

// ── Timestamp helper ───────────────────────────────────────────────
const ts = () =>
  new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

// ── Row formatters ─────────────────────────────────────────────────
export const formatContactRow = (d: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}): (string | number)[] => [
  ts(),
  d.name,
  d.email,
  d.projectType,
  d.budget,
  d.message,
];

export const formatDemoRow = (d: {
  businessType: string;
  source?: string;
}): (string | number)[] => [ts(), d.businessType, d.source ?? "Website"];

export const formatScratchRow = (d: {
  name: string;
  whatsapp: string;
  reward: string;
}): (string | number)[] => [ts(), d.name, d.whatsapp, d.reward];

export const formatQuoteRow = (d: {
  name: string;
  phone: string;
  businessType: string;
  pages: number;
  features: string[];
  price: number;
}): (string | number)[] => [
  ts(),
  d.name,
  d.phone,
  d.businessType,
  d.pages,
  d.features.join(", "),
  `₹${d.price}`,
];

// Legacy compat aliases used by formHandler.ts
export const getSheetsWebhookUrl = () => {
  console.log("WEBHOOK_URL DEBUG =", WEBHOOK_URL);
  return WEBHOOK_URL;
};
export const buildSheetsPayload = (sheet: string, row: unknown[]) =>
  JSON.stringify({ sheet, row });
export { formatContactRow as formatContactRowLegacy };
export const formatBookingRow = (d: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}): unknown[] => [
  ts(),
  d.name,
  d.email,
  d.phone,
  d.service,
  d.date,
  d.time,
  d.message ?? "",
];
export const formatQuoteRow2 = (d: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): unknown[] => [ts(), d.name, d.email, d.phone, d.service, d.message];

// ── Payload type ───────────────────────────────────────────────────
export type SheetPayload = {
  sheet: string;
  headers: readonly string[];
  row: (string | number)[];
};

/**
 * Submit a row to Google Sheets via Apps Script webhook.
 *
 * Silently no-ops when VITE_SHEETS_WEBHOOK_URL is not set (dev warning only).
 * Uses no-cors mode as required by Apps Script — assumes success if no throw.
 */
export async function submitToGoogleSheets(
  payload: SheetPayload,
): Promise<{ success: boolean; error?: string }> {
  if (!WEBHOOK_URL) {
    if (import.meta.env.DEV) {
      console.info(
        "[Google Sheets] VITE_SHEETS_WEBHOOK_URL is not set.\n" +
          "See src/lib/googleSheetsConfig.ts for setup instructions.",
      );
    }
    return { success: false, error: "Webhook not configured" };
  }
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
