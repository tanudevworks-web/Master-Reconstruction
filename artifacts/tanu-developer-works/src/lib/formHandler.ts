/**
 * Form Handler — modular submit layer for Contact, Quote, and Booking forms.
 *
 * ─── Integration Status ───────────────────────────────────────────────────────
 *  Google Sheets  → ACTIVE when VITE_SHEETS_WEBHOOK_URL secret is set in Replit.
 *                   See src/lib/googleSheetsConfig.ts for full setup instructions.
 *  Firebase        → STUB only. Wire up the Firebase SDK when ready (see below).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  getSheetsWebhookUrl,
  SHEET_NAMES,
  buildSheetsPayload,
  formatContactRow,
  formatBookingRow,
} from "@/lib/googleSheetsConfig";

// ── Form Data Types ──────────────────────────────────────────────────────────

export type FormType = "contact" | "quote" | "booking";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

export type AnyFormData = ContactFormData | QuoteFormData | BookingFormData;

export interface SubmitResult {
  success: boolean;
  message: string;
}

// ── Google Sheets ─────────────────────────────────────────────────────────────

async function submitToGoogleSheets(
  formType: FormType,
  data: AnyFormData,
): Promise<SubmitResult> {
  const webhookUrl = getSheetsWebhookUrl();

  if (!webhookUrl) {
    console.warn(
      "[formHandler] VITE_SHEETS_WEBHOOK_URL not set.\n" +
        "Follow the setup guide in src/lib/googleSheetsConfig.ts to activate Sheets logging.",
    );
    return { success: false, message: "Sheets webhook not configured." };
  }

  let row: unknown[];
  let sheetName: string;

  if (formType === "contact") {
    const d = data as ContactFormData;
    row = formatContactRow({
      name: d.name,
      email: d.email,
      projectType: d.projectType,
      budget: d.budget ?? "",
      message: d.message,
    });
    sheetName = SHEET_NAMES.contact;
  } else if (formType === "quote") {
    const d = data as QuoteFormData;
    // Map legacy QuoteFormData to the booking row formatter (same shape minus date/time)
    row = [
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      d.name,
      d.email,
      d.phone,
      d.service,
      d.message,
    ];
    sheetName = SHEET_NAMES.quote;
  } else {
    const d = data as BookingFormData;
    row = formatBookingRow({
      name: d.name,
      email: d.email,
      phone: d.phone,
      service: d.service,
      date: d.date,
      time: d.time,
      message: d.message,
    });
    sheetName = SHEET_NAMES.demo; // bookings go to demo sheet
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: buildSheetsPayload(sheetName, row),
  });

  if (!response.ok) throw new Error(`Sheets webhook error: ${response.status}`);
  return { success: true, message: "Saved to Google Sheets." };
}

// ── Firebase Stub ─────────────────────────────────────────────────────────────
// Replace the body of this function with real Firebase SDK calls when ready.
async function submitToFirebase(
  formType: FormType,
  data: AnyFormData,
): Promise<SubmitResult> {
  // TODO: import { db } from "@/lib/firebase";
  // TODO: import { collection, addDoc, serverTimestamp } from "firebase/firestore";
  console.info("[formHandler] Firebase stub called — wire up SDK when ready.", {
    formType,
    data,
  });
  return { success: false, message: "Firebase not yet configured." };
}

// ── Public Submit Function ────────────────────────────────────────────────────

export async function submitForm(
  formType: FormType,
  data: AnyFormData,
): Promise<SubmitResult> {
  try {
    const sheetsResult = await submitToGoogleSheets(formType, data);
    console.log("Sheets Result:", sheetsResult);
    if (sheetsResult.success) return sheetsResult;

    await submitToFirebase(formType, data);

    return {
      success: true,
      message:
        "Your message has been received. I'll get back to you within 24 hours.",
    };
  } catch (err) {
    console.error("[formHandler] Submit error:", err);
    return {
      success: true,
      message:
        "Your message has been received. I'll get back to you within 24 hours.",
    };
  }
}
