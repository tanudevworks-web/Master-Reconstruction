import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { CONTACT } from "./sections/Footer";

const WHATSAPP_URL = `${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Tanu, I visited your website and would like to request a demo.")}`;

export function FloatingWhatsApp() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-[500] w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(34,197,94,0.45)] hover:shadow-[0_6px_32px_rgba(34,197,94,0.55)] transition-all"
        data-interactive
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="text-white" fill="white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30 pointer-events-none" />
      </motion.a>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 180, damping: 20 }}
        className="fixed bottom-6 right-6 z-[500] flex items-end gap-3"
      >
        {/* Tooltip card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ delay: 3, duration: 0.3 }}
          className="dark:bg-gray-900 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border dark:border-white/10 border-gray-200 p-4 max-w-[220px] relative"
        >
          {/* Close */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full dark:bg-gray-700 bg-gray-200 flex items-center justify-center dark:text-gray-300 text-gray-600 hover:bg-red-100 hover:text-red-500 transition-colors"
            aria-label="Dismiss"
            data-interactive
          >
            <X size={12} />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={16} className="text-white" fill="white" />
            </div>
            <div>
              <p className="font-bold text-xs dark:text-white text-gray-900">Tanu Tapase</p>
              <p className="text-[10px] dark:text-gray-400 text-gray-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online now
              </p>
            </div>
          </div>

          <p className="text-xs dark:text-gray-300 text-gray-700 leading-snug mb-3">
            Hi! 👋 Need a website? I reply within minutes on WhatsApp.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setDismissed(true)}
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-xl transition-colors"
            data-interactive
          >
            <MessageCircle size={13} />
            Chat on WhatsApp
          </a>

          {/* Tail */}
          <div className="absolute -bottom-2 right-[52px] w-4 h-4 dark:bg-gray-900 bg-white border-r border-b dark:border-white/10 border-gray-200 rotate-45" />
        </motion.div>

        {/* Floating button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(34,197,94,0.45)] hover:shadow-[0_6px_32px_rgba(34,197,94,0.55)] transition-all flex-shrink-0 relative"
          data-interactive
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={26} className="text-white" fill="white" />
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25 pointer-events-none" />
        </a>
      </motion.div>
    </AnimatePresence>
  );
}
