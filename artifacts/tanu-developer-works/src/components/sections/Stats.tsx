import { motion } from "framer-motion";
import { Zap, Smartphone, MessageCircle, Search, Sparkles, LayoutDashboard, Headphones, Sheet } from "lucide-react";

const values = [
  { icon: Zap,           label: "Fast Delivery",          desc: "Projects in days, not months" },
  { icon: Smartphone,    label: "Mobile Friendly",         desc: "Perfect on every device" },
  { icon: MessageCircle, label: "WhatsApp Integration",    desc: "Direct customer connection" },
  { icon: Sheet,         label: "Google Sheets Booking",   desc: "Easy reservation management" },
  { icon: Search,        label: "SEO Ready Structure",     desc: "Built to rank on Google" },
  { icon: Sparkles,      label: "Modern Premium Design",   desc: "Award-worthy aesthetics" },
  { icon: LayoutDashboard, label: "Business Focused Layout", desc: "Converts visitors to clients" },
  { icon: Headphones,    label: "Ongoing Support",         desc: "We're with you after launch" },
];

export function Stats() {
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label">Why Choose Us</span>
          <h2
            className="font-bold text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            Why TanuDeveloper Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {values.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-5 rounded-2xl glass-panel hover:border-blue-500/20 transition-all duration-300 cursor-default"
              data-testid={`value-card-${label.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                   style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.12)" }}>
                <Icon size={18} className="text-blue-400" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{label}</h4>
              <p className="text-xs text-white/35 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
