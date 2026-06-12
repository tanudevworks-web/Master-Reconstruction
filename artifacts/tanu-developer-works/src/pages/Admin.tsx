import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";
import { format, isAfter, startOfDay, startOfWeek, startOfMonth, subDays } from "date-fns";
import {
  LogOut, Download, Search, Filter, RefreshCw, Trash2,
  Copy, MessageCircle, ChevronLeft, ChevronRight,
  Users, TrendingUp, Calendar, Star, Eye, X, Check, AlertTriangle,
  Phone, Mail, Briefcase, ShieldAlert,
} from "lucide-react";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { fetchAllLeads, deleteLead, exportToCsv, type Lead } from "@/lib/adminFirebase";

const ALLOWED_EMAIL = "tanudevworks@gmail.com";
const PER_PAGE = 15;

const SOURCE_COLORS: Record<string, string> = {
  contact_submissions: "#3b82f6",
  ai_chat_leads: "#8b5cf6",
  lead_forms: "#10b981",
  discount_leads: "#f59e0b",
  demo_requests: "#ef4444",
  quote_requests: "#06b6d4",
};

const SOURCE_LABELS: Record<string, string> = {
  contact_submissions: "Contact Form",
  ai_chat_leads: "AI Assistant",
  lead_forms: "Scratch Card",
  discount_leads: "Discount Popup",
  demo_requests: "Demo Request",
  quote_requests: "Quote Form",
};

function copyToClipboard(text: string, setCopied: (id: string) => void, id: string) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(id);
    setTimeout(() => setCopied(""), 1500);
  });
}

/* ─── Google Sign-In ──────────────────────────────────────── */
function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e: unknown) {
      const code = (e as { code?: string })?.code;
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        setError(null);
      } else if (code === "auth/configuration-not-found" || code === "auth/operation-not-allowed") {
        setError("Google Sign-In is not yet enabled. Go to Firebase Console → Authentication → Sign-in method → Enable Google.");
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-[#050505] bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="w-full max-w-sm"
      >
        <div className="dark:bg-[#0d1117] bg-white rounded-3xl border dark:border-white/8 border-gray-200 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)] relative">
              <span className="text-2xl font-black text-white">T</span>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 dark:border-[#0d1117] border-white" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-center dark:text-white text-gray-900 mb-1">Admin Dashboard</h1>
          <p className="text-sm text-center dark:text-gray-400 text-gray-500 mb-2">TanuDeveloper Works</p>
          <p className="text-xs text-center dark:text-gray-600 text-gray-400 mb-7">
            Access restricted to authorized accounts only
          </p>

          <button
            onClick={signIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/5 bg-white hover:dark:bg-white/8 hover:bg-gray-50 transition-all font-medium text-sm dark:text-white text-gray-800 disabled:opacity-60 shadow-sm"
          >
            {loading ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
                <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
                <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.31z"/>
              </svg>
            )}
            {loading ? "Signing in…" : "Continue with Google"}
          </button>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-xs text-red-400 leading-relaxed">{error}</p>
            </div>
          )}

          <p className="text-[11px] text-center dark:text-gray-600 text-gray-400 mt-5">
            Only <span className="font-mono dark:text-gray-400 text-gray-600">{ALLOWED_EMAIL}</span> can access this dashboard
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Access Denied ───────────────────────────────────────── */
function AccessDenied({ email, onLogout }: { email: string | null; onLogout: () => void }) {
  return (
    <div className="min-h-screen dark:bg-[#050505] bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm text-center"
      >
        <div className="dark:bg-[#0d1117] bg-white rounded-3xl border dark:border-red-500/20 border-red-200 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <ShieldAlert size={28} className="text-red-400" />
            </div>
          </div>
          <h1 className="text-xl font-bold dark:text-white text-gray-900 mb-2">Access Denied</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mb-1">
            Your account is not authorized to access this dashboard.
          </p>
          {email && (
            <p className="text-xs font-mono dark:text-gray-600 text-gray-400 mb-6 truncate">{email}</p>
          )}
          <p className="text-xs dark:text-gray-500 text-gray-400 mb-6">
            Only <span className="font-mono dark:text-gray-300 text-gray-600">{ALLOWED_EMAIL}</span> is permitted.
          </p>
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-medium transition-all"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Stats Card ──────────────────────────────────────────── */
function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: number; icon: React.ElementType; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="dark:bg-[#0d1117] bg-white rounded-2xl border dark:border-white/8 border-gray-200 p-5 flex items-center gap-4"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0`} style={{ background: color + "22" }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold dark:text-white text-gray-900">{value}</p>
        <p className="text-xs dark:text-gray-500 text-gray-500 mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

/* ─── Lead Detail Modal ───────────────────────────────────── */
function LeadModal({ lead, onClose, onDelete }: {
  lead: Lead; onClose: () => void; onDelete: () => void;
}) {
  const [copied, setCopied] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md dark:bg-[#0d1117] bg-white rounded-3xl border dark:border-white/10 border-gray-200 shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-white/8 border-gray-100">
          <h2 className="font-bold dark:text-white text-gray-900">Lead Details</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg dark:hover:bg-white/8 hover:bg-gray-100 flex items-center justify-center dark:text-gray-400 text-gray-500 transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "Name", value: lead.name, icon: Users },
            { label: "Email", value: lead.email, icon: Mail, copyId: "email", copyVal: lead.email },
            { label: "Phone", value: lead.phone, icon: Phone, copyId: "phone", copyVal: lead.phone },
            { label: "Project / Business", value: lead.projectType ?? lead.businessType, icon: Briefcase },
            { label: "Source", value: SOURCE_LABELS[lead.collection] ?? lead.source, icon: Star },
            { label: "Date", value: lead.createdAt ? format(lead.createdAt, "dd MMM yyyy, h:mm a") : "—", icon: Calendar },
          ].map(({ label, value, icon: Icon, copyId, copyVal }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg dark:bg-white/5 bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={14} className="dark:text-gray-400 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] dark:text-gray-500 text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-sm dark:text-white text-gray-800 break-all">{value ?? "—"}</p>
              </div>
              {copyId && copyVal && (
                <button
                  onClick={() => copyToClipboard(copyVal, setCopied, copyId)}
                  className="w-7 h-7 rounded-lg dark:hover:bg-white/8 hover:bg-gray-100 flex items-center justify-center flex-shrink-0 transition-colors"
                >
                  {copied === copyId ? <Check size={13} className="text-green-400" /> : <Copy size={13} className="dark:text-gray-500 text-gray-400" />}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="px-6 pb-6 flex gap-2">
          {lead.phone && (
            <a
              href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-colors"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          )}
          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Dashboard ──────────────────────────────────────── */
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [copied, setCopied] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllLeads();
      setLeads(data);
    } catch (e: unknown) {
      const code = (e as { code?: string })?.code;
      if (code === "permission-denied") {
        setError(
          "Firestore reads are blocked by security rules.\n\nTo fix: Go to Firebase Console → Firestore → Rules and add:\n\nallow read: if true;",
        );
      } else {
        setError("Failed to load leads. Check your internet connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Stats
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const monthStart = startOfMonth(now);

  const stats = useMemo(() => ({
    total: leads.length,
    today: leads.filter((l) => l.createdAt && isAfter(l.createdAt, todayStart)).length,
    week: leads.filter((l) => l.createdAt && isAfter(l.createdAt, weekStart)).length,
    month: leads.filter((l) => l.createdAt && isAfter(l.createdAt, monthStart)).length,
  }), [leads, todayStart, weekStart, monthStart]);

  // Chart: leads per day (last 14 days)
  const leadsPerDay = useMemo(() => {
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = subDays(now, 13 - i);
      return { date: format(d, "dd MMM"), day: startOfDay(d), count: 0 };
    });
    leads.forEach((l) => {
      if (!l.createdAt) return;
      const dayStr = format(startOfDay(l.createdAt), "dd MMM");
      const slot = days.find((d) => d.date === dayStr);
      if (slot) slot.count++;
    });
    return days.map(({ date, count }) => ({ date, count }));
  }, [leads]);

  // Chart: by source
  const bySource = useMemo(() => {
    const map: Record<string, number> = {};
    leads.forEach((l) => {
      map[l.collection] = (map[l.collection] ?? 0) + 1;
    });
    return Object.entries(map).map(([col, count]) => ({
      name: SOURCE_LABELS[col] ?? col,
      count,
      col,
    }));
  }, [leads]);

  // Filtered + searched leads
  const filtered = useMemo(() => {
    let list = leads;
    if (sourceFilter !== "all") list = list.filter((l) => l.collection === sourceFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) =>
          l.name?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.phone?.includes(q) ||
          l.projectType?.toLowerCase().includes(q) ||
          l.businessType?.toLowerCase().includes(q),
      );
    }
    return list;
  }, [leads, search, sourceFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = async (lead: Lead) => {
    try {
      await deleteLead(lead.collection, lead.id);
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
      setSelectedLead(null);
      setDeleteConfirm(null);
    } catch {
      alert("Failed to delete. Check Firestore permissions.");
    }
  };

  return (
    <div className="min-h-screen dark:bg-[#050505] bg-gray-50">
      {/* Header */}
      <div className="dark:bg-[#0a0a0a]/95 bg-white border-b dark:border-white/8 border-gray-200 sticky top-0 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-aurora flex items-center justify-center">
              <Star size={14} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm dark:text-white text-gray-900 leading-none">TDW Admin</h1>
              <p className="text-[10px] dark:text-gray-500 text-gray-400 leading-none mt-0.5">Leads Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCsv(filtered)}
              disabled={filtered.length === 0}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-600 dark:hover:bg-white/10 hover:bg-gray-200 text-xs font-medium transition-all disabled:opacity-40"
            >
              <Download size={13} /> Export CSV
            </button>
            <button
              onClick={load}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-600 dark:hover:bg-white/10 hover:bg-gray-200 text-xs font-medium transition-all"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg dark:bg-red-500/10 bg-red-50 text-red-400 dark:hover:bg-red-500/20 hover:bg-red-100 text-xs font-medium transition-all"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Leads" value={stats.total} icon={Users} color="#3b82f6" />
          <StatCard label="Today" value={stats.today} icon={Star} color="#10b981" />
          <StatCard label="This Week" value={stats.week} icon={TrendingUp} color="#8b5cf6" />
          <StatCard label="This Month" value={stats.month} icon={Calendar} color="#f59e0b" />
        </div>

        {/* Charts */}
        {!loading && !error && leads.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {/* Leads Per Day */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="dark:bg-[#0d1117] bg-white rounded-2xl border dark:border-white/8 border-gray-200 p-5"
            >
              <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Leads Per Day (14 days)</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={leadsPerDay} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    interval={3}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "#e5e7eb" }}
                    itemStyle={{ color: "#60a5fa" }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#3b82f6" }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* By Source */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="dark:bg-[#0d1117] bg-white rounded-2xl border dark:border-white/8 border-gray-200 p-5"
            >
              <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-4">Leads by Source</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={bySource} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "#e5e7eb" }}
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {bySource.map((entry) => (
                      <Cell key={entry.col} fill={SOURCE_COLORS[entry.col] ?? "#6b7280"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="dark:bg-red-500/10 bg-red-50 border dark:border-red-500/20 border-red-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-400 mb-1">Cannot read data</p>
                <pre className="text-xs dark:text-red-300 text-red-700 whitespace-pre-wrap font-mono">{error}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="dark:bg-[#0d1117] bg-white rounded-2xl border dark:border-white/8 border-gray-200 overflow-hidden"
        >
          {/* Table controls */}
          <div className="flex flex-col sm:flex-row gap-3 px-5 py-4 border-b dark:border-white/8 border-gray-100">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-gray-500 text-gray-400" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search name, email, phone…"
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-200 dark:text-white text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={14} className="dark:text-gray-500 text-gray-400 flex-shrink-0" />
              <select
                value={sourceFilter}
                onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
                className="text-sm dark:bg-[#0d1117] bg-white border dark:border-white/10 border-gray-200 rounded-xl px-3 py-2 dark:text-white text-gray-900 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Sources</option>
                {Object.entries(SOURCE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <p className="text-xs dark:text-gray-500 text-gray-400 self-center whitespace-nowrap">
              {filtered.length} lead{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-16 flex flex-col items-center gap-3">
              <RefreshCw size={24} className="animate-spin dark:text-gray-600 text-gray-300" />
              <p className="text-sm dark:text-gray-500 text-gray-400">Loading leads…</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="py-16 flex flex-col items-center gap-3">
              <Users size={32} className="dark:text-gray-700 text-gray-200" />
              <p className="text-sm dark:text-gray-500 text-gray-400">
                {search || sourceFilter !== "all" ? "No leads match your filters." : "No leads yet. They'll appear here automatically."}
              </p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && paginated.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b dark:border-white/5 border-gray-100">
                    {["Name", "Phone", "Email", "Project / Business", "Source", "Date", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[11px] font-semibold dark:text-gray-500 text-gray-400 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((lead, i) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b dark:border-white/5 border-gray-50 dark:hover:bg-white/3 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium dark:text-white text-gray-900 truncate max-w-[120px]">
                          {lead.name ?? "—"}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        {lead.phone ? (
                          <div className="flex items-center gap-1">
                            <span className="text-sm dark:text-gray-300 text-gray-600 font-mono text-xs">{lead.phone}</span>
                            <button
                              onClick={() => copyToClipboard(lead.phone!, setCopied, `ph-${lead.id}`)}
                              className="w-5 h-5 rounded flex items-center justify-center dark:hover:bg-white/10 hover:bg-gray-200 transition-colors"
                            >
                              {copied === `ph-${lead.id}` ? <Check size={10} className="text-green-400" /> : <Copy size={10} className="dark:text-gray-600 text-gray-400" />}
                            </button>
                          </div>
                        ) : <span className="text-xs dark:text-gray-600 text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        {lead.email ? (
                          <div className="flex items-center gap-1">
                            <span className="text-xs dark:text-gray-400 text-gray-500 truncate max-w-[130px]">{lead.email}</span>
                            <button
                              onClick={() => copyToClipboard(lead.email!, setCopied, `em-${lead.id}`)}
                              className="w-5 h-5 rounded flex items-center justify-center dark:hover:bg-white/10 hover:bg-gray-200 transition-colors flex-shrink-0"
                            >
                              {copied === `em-${lead.id}` ? <Check size={10} className="text-green-400" /> : <Copy size={10} className="dark:text-gray-600 text-gray-400" />}
                            </button>
                          </div>
                        ) : <span className="text-xs dark:text-gray-600 text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs dark:text-gray-400 text-gray-500 truncate max-w-[110px] block">
                          {lead.projectType ?? lead.businessType ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-[10px] font-medium px-2 py-1 rounded-full"
                          style={{
                            background: (SOURCE_COLORS[lead.collection] ?? "#6b7280") + "22",
                            color: SOURCE_COLORS[lead.collection] ?? "#6b7280",
                          }}
                        >
                          {SOURCE_LABELS[lead.collection] ?? lead.collection}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs dark:text-gray-500 text-gray-400">
                          {lead.createdAt ? format(lead.createdAt, "dd MMM, h:mm a") : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            title="View details"
                            className="w-7 h-7 rounded-lg dark:hover:bg-white/8 hover:bg-gray-100 flex items-center justify-center transition-colors dark:text-gray-500 text-gray-400"
                          >
                            <Eye size={13} />
                          </button>
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="WhatsApp"
                              className="w-7 h-7 rounded-lg dark:hover:bg-green-500/10 hover:bg-green-50 flex items-center justify-center transition-colors text-green-500"
                            >
                              <MessageCircle size={13} />
                            </a>
                          )}
                          {deleteConfirm === lead.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(lead)}
                                className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400"
                              >
                                <Check size={13} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="w-7 h-7 rounded-lg dark:hover:bg-white/8 hover:bg-gray-100 flex items-center justify-center transition-colors dark:text-gray-500 text-gray-400"
                              >
                                <X size={13} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(lead.id)}
                              title="Delete"
                              className="w-7 h-7 rounded-lg dark:hover:bg-red-500/10 hover:bg-red-50 flex items-center justify-center transition-colors dark:text-gray-600 text-gray-400 hover:text-red-400"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t dark:border-white/8 border-gray-100">
              <p className="text-xs dark:text-gray-500 text-gray-400">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center dark:text-gray-400 text-gray-500 disabled:opacity-30 dark:hover:bg-white/10 hover:bg-gray-200 transition-all"
                >
                  <ChevronLeft size={15} />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                        p === page
                          ? "bg-gradient-aurora text-white shadow-sm"
                          : "dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-500 dark:hover:bg-white/10 hover:bg-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-8 h-8 rounded-lg dark:bg-white/5 bg-gray-100 flex items-center justify-center dark:text-gray-400 text-gray-500 disabled:opacity-30 dark:hover:bg-white/10 hover:bg-gray-200 transition-all"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Source legend */}
        {!loading && !error && leads.length > 0 && (
          <div className="flex flex-wrap gap-3 pb-4">
            {Object.entries(SOURCE_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: SOURCE_COLORS[key] ?? "#6b7280" }} />
                <span className="text-xs dark:text-gray-500 text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <LeadModal
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onDelete={() => handleDelete(selectedLead)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Entry ───────────────────────────────────────────────── */
export function Admin() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen dark:bg-[#050505] bg-gray-50 flex items-center justify-center">
        <RefreshCw size={24} className="animate-spin dark:text-gray-600 text-gray-300" />
      </div>
    );
  }

  if (!user) return <AdminLogin />;
  if (user.email !== ALLOWED_EMAIL) return <AccessDenied email={user.email} onLogout={logout} />;
  return <AdminDashboard onLogout={logout} />;
}
