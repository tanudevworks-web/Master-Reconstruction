import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

function getDeviceType(): string {
  return /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";
}

export interface ContactLead {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
}

export interface DemoLead {
  businessType: string;
  source?: string;
}

export interface QuoteLead {
  name: string;
  email?: string;
  phone: string;
  service: string;
  message?: string;
}

export interface ScratchLead {
  name: string;
  phone: string;
  reward: string;
}

export interface DiscountLead {
  name: string;
  phone: string;
}

async function write(collectionName: string, payload: Record<string, unknown>) {
  const record = {
    ...payload,
    page: window.location.pathname,
    deviceType: getDeviceType(),
    createdAt: serverTimestamp(),
  };

  console.info(`[Firebase] Writing to "${collectionName}"...`, {
    keys: Object.keys(record),
  });

  try {
    const ref = await addDoc(collection(db, collectionName), record);
    console.info(`[Firebase] ✅ Saved to "${collectionName}" → ID: ${ref.id}`);
    return ref;
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code ?? "unknown";
    const message = (err as { message?: string })?.message ?? String(err);

    console.error(`[Firebase] ❌ Write to "${collectionName}" failed.`);
    console.error(`  Code: ${code}`);
    console.error(`  Message: ${message}`);

    if (code === "permission-denied") {
      console.error(
        "[Firebase] 🔒 PERMISSION DENIED — Firestore security rules are blocking this write.\n" +
          "Fix: Go to Firebase Console → Firestore Database → Rules → set:\n\n" +
          "rules_version = '2';\n" +
          "service cloud.firestore {\n" +
          "  match /databases/{database}/documents {\n" +
          "    match /{document=**} {\n" +
          "      allow write: if true;\n" +
          "      allow read: if false;\n" +
          "    }\n" +
          "  }\n" +
          "}\n\nThen click Publish.",
      );
    }

    throw err; // re-throw so callers know it failed
  }
}

export function saveContactSubmission(data: ContactLead) {
  return write("contact_submissions", { ...data, source: "contact_form" });
}

export function saveDemoRequest(data: DemoLead) {
  return write("demo_requests", { ...data, source: data.source ?? "demo_section" });
}

export function saveQuoteRequest(data: QuoteLead) {
  return write("quote_requests", { ...data, source: "quote_form" });
}

export function saveScratchCardLead(data: ScratchLead) {
  return write("lead_forms", { ...data, source: "scratch_card" });
}

export function saveDiscountLead(data: DiscountLead) {
  return write("discount_leads", { ...data, source: "exit_intent_popup" });
}

export interface ChatLead {
  name: string;
  email?: string;
  phone?: string;
  projectType?: string;
}

export function saveChatLead(data: ChatLead) {
  return write("chat_leads", { ...data, source: "ai_chatbot" });
}
