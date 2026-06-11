import {
  getSheetsWebhookUrl,
  SHEET_NAMES,
  buildSheetsPayload,
  formatContactRow,
  formatBookingRow,
} from "@/lib/googleSheetsConfig";
import {
  saveContactSubmission,
  saveDemoRequest,
  saveQuoteRequest,
} from "@/lib/firebaseLeads";

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

async function submitToGoogleSheets(
  formType: FormType,
  data: AnyFormData,
): Promise<SubmitResult> {
  const webhookUrl = getSheetsWebhookUrl();

  if (!webhookUrl) {
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
    sheetName = SHEET_NAMES.demo;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: buildSheetsPayload(sheetName, row),
  });

  if (!response.ok) throw new Error(`Sheets webhook error: ${response.status}`);
  return { success: true, message: "Saved to Google Sheets." };
}

async function persistToFirebase(
  formType: FormType,
  data: AnyFormData,
): Promise<void> {
  try {
    if (formType === "contact") {
      const d = data as ContactFormData;
      await saveContactSubmission({
        name: d.name,
        email: d.email,
        phone: d.phone,
        projectType: d.projectType,
        budget: d.budget,
        message: d.message,
      });
    } else if (formType === "quote") {
      const d = data as QuoteFormData;
      await saveQuoteRequest({
        name: d.name,
        email: d.email,
        phone: d.phone,
        service: d.service,
        message: d.message,
      });
    } else {
      const d = data as BookingFormData;
      await saveDemoRequest({ businessType: d.service, source: "booking_form" });
    }
  } catch (err) {
    console.error("[formHandler] Firebase save error:", err);
  }
}

export async function submitForm(
  formType: FormType,
  data: AnyFormData,
): Promise<SubmitResult> {
  // Always persist to Firebase first (primary store)
  await persistToFirebase(formType, data);

  // Also try Google Sheets (secondary store)
  try {
    await submitToGoogleSheets(formType, data);
  } catch {
    // Sheets failure is non-blocking
  }

  return {
    success: true,
    message: "Your message has been received. I'll get back to you within 24 hours.",
  };
}
