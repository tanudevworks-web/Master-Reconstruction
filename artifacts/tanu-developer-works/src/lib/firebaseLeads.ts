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

export async function saveContactSubmission(data: ContactLead) {
  return addDoc(collection(db, "contact_submissions"), {
    ...data,
    source: "contact_form",
    page: window.location.pathname,
    deviceType: getDeviceType(),
    createdAt: serverTimestamp(),
  });
}

export async function saveDemoRequest(data: DemoLead) {
  return addDoc(collection(db, "demo_requests"), {
    ...data,
    source: "demo_section",
    page: window.location.pathname,
    deviceType: getDeviceType(),
    createdAt: serverTimestamp(),
  });
}

export async function saveQuoteRequest(data: QuoteLead) {
  return addDoc(collection(db, "quote_requests"), {
    ...data,
    source: "quote_form",
    page: window.location.pathname,
    deviceType: getDeviceType(),
    createdAt: serverTimestamp(),
  });
}

export async function saveScratchCardLead(data: ScratchLead) {
  return addDoc(collection(db, "lead_forms"), {
    ...data,
    source: "scratch_card",
    page: window.location.pathname,
    deviceType: getDeviceType(),
    createdAt: serverTimestamp(),
  });
}

export async function saveDiscountLead(data: DiscountLead) {
  return addDoc(collection(db, "discount_leads"), {
    ...data,
    source: "exit_intent_popup",
    page: window.location.pathname,
    deviceType: getDeviceType(),
    createdAt: serverTimestamp(),
  });
}
