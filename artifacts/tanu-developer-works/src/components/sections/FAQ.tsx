import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

const FAQS = [
  {
    q: "How much does a website cost?",
    a: "Packages start from ₹999 for a single-page Starter site, ₹1,999 for a Business site (up to 5 pages), and ₹3,999 for a fully custom Premium website. The final price depends on your requirements — contact us for a personalised quote.",
    tag: "Pricing",
  },
  {
    q: "How long does it take to build my website?",
    a: "Starter websites are delivered in 3 days, Business websites in 5 days, and Premium custom websites in 7 days — from the moment requirements are confirmed and the advance payment is received.",
    tag: "Timeline",
  },
  {
    q: "What information do I need to provide?",
    a: "Your business name, logo (if you have one), color preferences, content (text, images, or we can write it for you), and a clear idea of what you want the website to achieve. Everything else is handled.",
    tag: "Process",
  },
  {
    q: "Do you handle hosting and domain?",
    a: "Yes — your website can be hosted on Vercel or Firebase Hosting (both are fast and reliable). Domain registration guidance is included. For custom domains, the domain cost (typically ₹800–₹1,200/year) is separate.",
    tag: "Technical",
  },
  {
    q: "Can I update my website myself after it's done?",
    a: "Absolutely. You'll receive the source code and clear handover documentation. For clients who prefer not to manage updates themselves, a monthly maintenance plan is available.",
    tag: "Support",
  },
  {
    q: "How many revisions are included?",
    a: "Every plan includes 2 revision rounds after the first design is shared. Revisions cover layout changes, color adjustments, content edits, and feature tweaks. Additional revisions beyond that are available at a small hourly rate.",
    tag: "Process",
  },
  {
    q: "How do I make the payment?",
    a: "50% advance is paid before work begins, and 50% is paid after delivery — only when you're happy with the result. Payments are accepted via UPI, bank transfer, or online payment links. No hidden charges.",
    tag: "Pricing",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. Website redesigns are a speciality — whether it's a complete visual overhaul or a performance upgrade. Share your current site link and we'll discuss exactly what needs to change and why.",
    tag: "Services",
  },
  {
    q: "What technologies do you use?",
    a: "React, TypeScript, Tailwind CSS, Framer Motion, Next.js, Firebase (Firestore, Hosting, Auth), and Vercel for deployment. Every website is built with modern, maintainable code — no page builders or templates.",
    tag: "Technical",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Yes — clients are served across India and internationally. Communication happens via WhatsApp, and payment can be arranged accordingly. The majority of clients are from Maharashtra, but geography is no barrier.",
    tag: "General",
  },
];

const TAG_COLORS: Record<string, string> = {
  Pricing: "dark:bg-blue-500/10 dark:text-blue-300 bg-blue-50 text-blue-700",
  Timeline: "dark:bg-purple-500/10 dark:text-purple-300 bg-purple-50 text-purple-700",
  Process: "dark:bg-teal-500/10 dark:text-teal-300 bg-teal-50 text-teal-700",
  Technical: "dark:bg-orange-500/10 dark:text-orange-300 bg-orange-50 text-orange-700",
  Support: "dark:bg-green-500/10 dark:text-green-300 bg-green-50 text-green-700",
  Services: "dark:bg-pink-500/10 dark:text-pink-300 bg-pink-50 text-pink-700",
  General: "dark:bg-gray-500/10 dark:text-gray-300 bg-gray-50 text-gray-700",
};

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 relative">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/6 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Questions &amp; Answers
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-xl mx-auto">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`glass-panel rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-blue-500/40 shadow-[0_0_24px_rgba(59,130,246,0.08)]"
                    : "dark:border-white/8 border-gray-200"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  data-interactive
                >
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      TAG_COLORS[faq.tag] ?? TAG_COLORS.General
                    }`}
                  >
                    {faq.tag}
                  </span>
                  <span className="flex-1 text-sm font-semibold dark:text-white text-gray-900 leading-snug">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      isOpen
                        ? "bg-gradient-aurora text-white"
                        : "dark:bg-white/6 bg-gray-100 dark:text-gray-400 text-gray-500"
                    }`}
                  >
                    <Plus size={14} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm dark:text-gray-400 text-gray-600 leading-relaxed border-t dark:border-white/6 border-gray-100 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-sm dark:text-gray-500 text-gray-500 mb-4">
            Still have questions?
          </p>
          <a
            href="https://wa.me/918433553501?text=Hi%20Tanu%2C%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            data-interactive
          >
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
