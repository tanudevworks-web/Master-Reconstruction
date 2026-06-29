import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Tanu built our restaurant website in just 4 days. The result was beyond our expectations. Bookings have never been higher.",
    name: "Rahul Sharma",
    role: "Restaurant Owner",
    initial: "R",
    color: "from-orange-400 to-red-500",
  },
  {
    quote: "Our clinic bookings increased by 40% after the new website launched. The design is clean, professional, and patient-friendly.",
    name: "Dr. Priya Mehta",
    role: "Healthcare Professional",
    initial: "P",
    color: "from-teal-400 to-cyan-500",
  },
  {
    quote: "Professional, fast, and genuinely world-class design quality. It feels like an agency that charges 10x the price.",
    name: "Arjun Kapoor",
    role: "Startup Founder",
    initial: "A",
    color: "from-blue-400 to-purple-500",
  },
];

export function Testimonials() {
  return (
    <section className="py-28 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Endorsements
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
            Client Stories
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass-panel p-7 rounded-3xl border dark:border-white/8 border-gray-200 hover:border-blue-400/40 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote icon */}
                <Quote size={24} className="dark:text-white/10 text-gray-300 mb-3 rotate-180" />

                {/* Quote text */}
                <p className="text-base dark:text-gray-300 text-gray-700 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t dark:border-white/8 border-gray-100">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-bold text-sm text-white flex-shrink-0 shadow-md`}>
                  {t.initial}
                </div>
                <div>
                  <h4 className="font-bold dark:text-white text-gray-900 text-sm">{t.name}</h4>
                  <p className="text-xs dark:text-gray-400 text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
