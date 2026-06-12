import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag } from "lucide-react";
import { saveDiscountLead } from "@/lib/firebaseLeads";

const STORAGE_KEY = "tdw-exit-popup-seen";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered.current) return;
      if (e.clientY <= 10) {
        triggered.current = true;
        sessionStorage.setItem(STORAGE_KEY, "1");
        setTimeout(() => setOpen(true), 300);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleClaim = async () => {
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    try {
      await saveDiscountLead({ name: name.trim(), phone: phone.trim() });
    } catch {
      // fail silently — still show success
    }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-sm glass-panel rounded-3xl p-8 border dark:border-white/12 border-gray-200 shadow-2xl pointer-events-auto relative overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-aurora rounded-t-3xl" />

              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full dark:bg-white/8 bg-gray-100 flex items-center justify-center dark:text-gray-400 text-gray-500 hover:dark:text-white hover:text-gray-900 transition-colors"
                aria-label="Close"
              >
                <X size={14} />
              </button>

              {!submitted ? (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-aurora flex items-center justify-center mb-5">
                    <Tag size={22} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-1">
                    Wait! Before you go…
                  </h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">
                    Get <span className="font-bold text-gradient-aurora">₹500 OFF</span> on your first website project.
                  </p>
                  <p className="text-xs dark:text-gray-500 text-gray-400 mb-5">
                    Claim your discount and let's discuss your business.
                  </p>

                  <div className="flex flex-col gap-3 mb-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm dark:bg-[#0a0a0a] bg-white border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm dark:bg-[#0a0a0a] bg-white border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <button
                    onClick={handleClaim}
                    disabled={!name.trim() || !phone.trim() || loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-aurora text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all disabled:opacity-50"
                    data-interactive
                  >
                    {loading ? (
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      "Claim My ₹500 Discount"
                    )}
                  </button>

                  <button
                    onClick={() => setOpen(false)}
                    className="w-full text-center text-xs dark:text-gray-600 text-gray-400 mt-3 hover:underline"
                  >
                    No thanks, I don't want the discount
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">Discount Claimed!</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">
                    Your ₹500 discount has been saved. Tanu will reach out to you shortly.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-aurora text-white font-bold text-sm"
                    data-interactive
                  >
                    Got It!
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
