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
  firebaseError?: string;
}

async function submitToGoogleSheets(
  formType: FormType,
  data: AnyFormData,
): Promise<boolean> {
  const webhookUrl = getSheetsWebhookUrl();
  if (!webhookUrl) return false;

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

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: buildSheetsPayload(sheetName, row),
    });
    console.info("[Sheets]", response.ok ? "✅ Saved" : `❌ HTTP ${response.status}`);
    return response.ok;
  } catch (err) {
    console.warn("[Sheets] Failed:", err);
    return false;
  }
}

async function persistToFirebase(
  formType: FormType,
  data: AnyFormData,
): Promise<{ ok: boolean; error?: string }> {
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
    return { ok: true };
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code ?? "unknown";
    return { ok: false, error: code };
  }
}

export async function submitForm(
  formType: FormType,
  data: AnyFormData,
): Promise<SubmitResult> {
  // Primary store: Firebase
  const fbResult = await persistToFirebase(formType, data);

  // Secondary store: Google Sheets (non-blocking)
  submitToGoogleSheets(formType, data).catch(() => {});

  if (!fbResult.ok) {
    const isPermission = fbResult.error === "permission-denied";
    return {
      success: false,
      message: isPermission
        ? "⚠️ Could not save your message (Firestore permissions). Please contact via WhatsApp."
        : "Something went wrong saving your message. Please try WhatsApp.",
      firebaseError: fbResult.error,
    };
  }

  return {
    success: true,
    message: "Your message has been received. I'll get back to you within 24 hours.",
  };
}
