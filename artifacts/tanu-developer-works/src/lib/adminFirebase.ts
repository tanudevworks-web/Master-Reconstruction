import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Lead {
  id: string;
  collection: string;
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  businessType?: string;
  service?: string;
  message?: string;
  source?: string;
  deviceType?: string;
  page?: string;
  createdAt: Date | null;
}

const COLLECTIONS = [
  "contact_submissions",
  "ai_chat_leads",
  "lead_forms",
  "discount_leads",
  "demo_requests",
  "quote_requests",
] as const;

function toDate(val: unknown): Date | null {
  if (!val) return null;
  if (val && typeof (val as { toDate?: () => Date }).toDate === "function") {
    return (val as { toDate: () => Date }).toDate();
  }
  if (typeof val === "string" || typeof val === "number") return new Date(val);
  return null;
}

export type CollectionName = (typeof COLLECTIONS)[number];

export async function fetchAllLeads(): Promise<Lead[]> {
  const results: Lead[] = [];
  await Promise.allSettled(
    COLLECTIONS.map(async (col) => {
      try {
        const q = query(collection(db, col), orderBy("createdAt", "desc"), limit(500));
        const snap = await getDocs(q);
        snap.forEach((d) => {
          const data = d.data();
          results.push({
            id: d.id,
            collection: col,
            name: data.name,
            email: data.email,
            phone: data.phone,
            projectType: data.projectType ?? data.businessType ?? data.service,
            businessType: data.businessType,
            service: data.service,
            message: data.message,
            source: data.source ?? col,
            deviceType: data.deviceType,
            page: data.page,
            createdAt: toDate(data.createdAt),
          });
        });
      } catch {
        /* collection may not exist yet — skip */
      }
    }),
  );
  results.sort((a, b) => {
    const ta = a.createdAt?.getTime() ?? 0;
    const tb = b.createdAt?.getTime() ?? 0;
    return tb - ta;
  });
  return results;
}

export async function deleteLead(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}

export function exportToCsv(leads: Lead[]): void {
  const headers = ["Name", "Email", "Phone", "Project Type", "Source", "Collection", "Device", "Date"];
  const rows = leads.map((l) => [
    l.name ?? "",
    l.email ?? "",
    l.phone ?? "",
    l.projectType ?? "",
    l.source ?? "",
    l.collection,
    l.deviceType ?? "",
    l.createdAt ? l.createdAt.toLocaleString("en-IN") : "",
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `tdw-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
