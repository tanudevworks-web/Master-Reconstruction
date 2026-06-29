import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const features = [
  "Mobile Responsive Design",
  "WhatsApp Integration",
  "Contact Forms",
  "Google Maps",
  "Fast Loading",
  "SEO Friendly",
  "Modern Premium UI",
  "Booking System",
  "Ongoing Support",
];

export function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      {/* Trust badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-10 text-xs font-semibold text-white/60"
        style={{ border: "1px solid rgba(34,197,94,0.2)" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-green-400"
          style={{ boxShadow: "0 0 6px rgba(34,197,94,0.8)", animation: "pulse 2s infinite" }}
        />
        Pay only if you love the final result
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-bold text-white leading-[1.02] tracking-tight mb-6"
        style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "-0.03em" }}
      >
        We Build Websites<br />
        <span className="text-gradient-aurora">Businesses Remember.</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="text-white/45 text-lg md:text-xl mb-12 max-w-xl leading-relaxed"
      >
        Premium web design and development for businesses, startups, creators, and modern brands.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-4"
      >
        <button
          onClick={() => scrollTo("#contact")}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-all group"
          data-testid="button-order-website"
          data-interactive
        >
          Order a Website
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>

        <a
          href={`https://wa.me/918433553501?text=${encodeURIComponent("Hi Tanu, I'd like to book a free call.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all"
          style={{ background: "#22c55e", boxShadow: "0 4px 20px rgba(34,197,94,0.25)" }}
          data-testid="button-book-call"
          data-interactive
        >
          <Phone size={15} />
          Book Free Call
        </a>

        <button
          onClick={() => scrollTo("#work")}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white/60 glass-panel hover:text-white transition-all"
          data-testid="button-view-work"
          data-interactive
        >
          View Work
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-white/25 text-xs mb-16"
      >
        From idea to launch — design, development, deployment and support included.
      </motion.p>

      {/* Included features */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-semibold mb-5">
          Everything included in every website
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {features.map((f, i) => (
            <motion.span
              key={f}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 + i * 0.04 }}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-white/40 glass-panel hover:text-white/70 transition-colors cursor-default"
              data-testid={`feature-pill-${f.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {f}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
