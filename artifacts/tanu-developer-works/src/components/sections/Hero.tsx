import { motion } from "framer-motion";
import { ArrowRight, Check, Smartphone, Zap, Search, MessageCircle, FileText, Map, Calendar, Monitor, LayoutDashboard, Headphones, Phone } from "lucide-react";

const features = [
  { icon: Smartphone, label: "Mobile Responsive Design" },
  { icon: MessageCircle, label: "WhatsApp Integration" },
  { icon: FileText, label: "Contact Forms" },
  { icon: Map, label: "Google Maps Integration" },
  { icon: Zap, label: "Fast Loading Website" },
  { icon: Search, label: "SEO Friendly Structure" },
  { icon: Monitor, label: "Modern Premium UI" },
  { icon: LayoutDashboard, label: "Business Focused Design" },
  { icon: Calendar, label: "Booking System Support" },
  { icon: Headphones, label: "Ongoing Support" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.9 } },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 180, damping: 16 } },
};

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-400/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-green-500/30 text-sm text-green-300 font-semibold mb-6 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
            Pay only if you love the final result.
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-6 dark:text-white text-gray-900"
          >
            We Build Websites That <br />
            <span className="text-gradient-aurora">Businesses Remember.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg md:text-xl dark:text-gray-400 text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Premium web design and development for businesses, startups, creators, and modern brands.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-4"
          >
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full bg-gradient-aurora text-white font-bold tracking-wide hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] transition-all flex items-center gap-2 group"
              data-testid="button-order-website"
              data-interactive
            >
              Order a Website
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={`https://wa.me/918433553501?text=${encodeURIComponent("Hi Tanu, I'd like to book a free call to discuss my project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold tracking-wide transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(34,197,94,0.3)]"
              data-testid="button-book-call"
              data-interactive
            >
              <Phone size={17} />
              Book Free Call
            </a>

            <button
              onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full glass-panel hover:bg-white/10 dark:text-white text-gray-900 font-bold tracking-wide transition-all border dark:border-white/15 border-gray-300 hover:border-primary/40"
              data-testid="button-view-work"
              data-interactive
            >
              View Work
            </button>
          </motion.div>

          {/* Tagline under buttons */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm dark:text-gray-500 text-gray-400 mb-16"
          >
            From idea to launch — design, development, deployment and support included.
          </motion.p>

          {/* Section divider */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mb-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] dark:text-gray-500 text-gray-400 font-semibold mb-2">
              Everything included in every website
            </p>
            <div className="w-16 h-px bg-gradient-aurora mx-auto opacity-60" />
          </motion.div>

          {/* Feature pills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-3"
          >
            {features.map(({ label }) => (
              <motion.div
                key={label}
                variants={pillVariants}
                whileHover={{ scale: 1.06, y: -2 }}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel border dark:border-white/10 border-gray-200 hover:border-primary/40 hover:shadow-[0_0_18px_rgba(59,130,246,0.15)] transition-all duration-300 cursor-default dark:hover:bg-white/5 hover:bg-blue-50"
                data-testid={`feature-pill-${label.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/35 transition-colors">
                  <Check size={11} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                </span>
                <span className="text-sm dark:text-gray-300 text-gray-700 group-hover:dark:text-white group-hover:text-blue-700 transition-colors font-medium whitespace-nowrap">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
