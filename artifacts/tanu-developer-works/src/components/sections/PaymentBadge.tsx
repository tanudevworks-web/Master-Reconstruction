import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, User, Eye, Zap, MessageCircle } from "lucide-react";

const badges = [
  {
    icon: CreditCard,
    title: "Pay 50% Now",
    subtitle: "50% After Delivery",
    accent: "text-blue-400",
    bg: "dark:bg-blue-500/10 bg-blue-50",
    border: "dark:border-blue-500/20 border-blue-100",
    highlight: true,
  },
  {
    icon: ShieldCheck,
    title: "No Hidden Charges",
    subtitle: "Price agreed upfront",
    accent: "text-green-400",
    bg: "dark:bg-green-500/10 bg-green-50",
    border: "dark:border-green-500/20 border-green-100",
    highlight: false,
  },
  {
    icon: User,
    title: "Direct Developer",
    subtitle: "No middlemen or agencies",
    accent: "text-purple-400",
    bg: "dark:bg-purple-500/10 bg-purple-50",
    border: "dark:border-purple-500/20 border-purple-100",
    highlight: false,
  },
  {
    icon: Eye,
    title: "Transparent Pricing",
    subtitle: "You see exactly what you pay",
    accent: "text-cyan-400",
    bg: "dark:bg-cyan-500/10 bg-cyan-50",
    border: "dark:border-cyan-500/20 border-cyan-100",
    highlight: false,
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    subtitle: "3–7 days guaranteed",
    accent: "text-yellow-400",
    bg: "dark:bg-yellow-500/10 bg-yellow-50",
    border: "dark:border-yellow-500/20 border-yellow-100",
    highlight: false,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    subtitle: "Direct line after launch",
    accent: "text-green-400",
    bg: "dark:bg-green-500/10 bg-green-50",
    border: "dark:border-green-500/20 border-green-100",
    highlight: false,
  },
];

export function PaymentBadge() {
  return (
    <section className="py-14 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-panel rounded-3xl p-8 md:p-10 border dark:border-white/10 border-gray-200 relative overflow-hidden"
        >
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br dark:from-blue-500/5 dark:to-purple-500/5 from-blue-50/60 to-purple-50/60 pointer-events-none rounded-3xl" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div>
                <div className="text-xs font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora uppercase mb-2">
                  Flexible & Fair
                </div>
                <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-900">
                  Payment You Can Trust
                </h3>
              </div>
              <div className="sm:ml-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-green-500/10 bg-green-50 border dark:border-green-500/20 border-green-200">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-bold text-green-500">Risk-Free Process</span>
                </div>
              </div>
            </div>

            {/* Badges grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {badges.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className={`flex items-start gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                    b.highlight
                      ? "dark:bg-gradient-to-br dark:from-blue-500/15 dark:to-purple-500/10 bg-gradient-to-br from-blue-50 to-purple-50 dark:border-blue-500/30 border-blue-200 shadow-[0_2px_12px_rgba(59,130,246,0.12)]"
                      : `${b.bg} ${b.border}`
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${b.bg} border ${b.border}`}
                  >
                    <b.icon size={15} className={b.accent} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${b.highlight ? "dark:text-white text-gray-900" : "dark:text-white text-gray-900"}`}>
                      {b.title}
                    </p>
                    <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5 leading-snug">
                      {b.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 pt-6 border-t dark:border-white/8 border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <p className="text-sm dark:text-gray-400 text-gray-600 text-center sm:text-left">
                🤝 100+ businesses have trusted this payment process — no disputes, ever.
              </p>
              <a
                href={`https://wa.me/918433553501?text=${encodeURIComponent("Hi Tanu, I'd like to discuss pricing and payment for my project.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-aurora text-white text-sm font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all"
                data-interactive
              >
                <MessageCircle size={14} />
                Discuss Payment
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
