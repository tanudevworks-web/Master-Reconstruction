import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Tanu built our restaurant website in just 4 days. The result was beyond our expectations. Bookings have never been higher.",
    name: "Rahul Sharma",
    role: "Restaurant Owner",
    initial: "R",
    accent: "#fb923c",
  },
  {
    quote: "Our clinic bookings increased by 40% after the new website launched. The design is clean, professional, and patient-friendly.",
    name: "Dr. Priya Mehta",
    role: "Healthcare Professional",
    initial: "P",
    accent: "#2dd4bf",
  },
  {
    quote: "Professional, fast, and genuinely world-class design quality. It feels like an agency that charges 10x the price.",
    name: "Arjun Kapoor",
    role: "Startup Founder",
    initial: "A",
    accent: "#60a5fa",
  },
];

export function Testimonials() {
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label">Endorsements</span>
          <h2
            className="font-bold text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.025em" }}
          >
            Client Stories
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="p-7 rounded-2xl glass-panel flex flex-col justify-between hover:border-white/10 transition-all duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-sm text-white/55 leading-relaxed italic mb-6">"{t.quote}"</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                  style={{ background: `${t.accent}22`, border: `1px solid ${t.accent}44` }}
                >
                  <span style={{ color: t.accent }}>{t.initial}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-white/35">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
