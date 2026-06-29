import { motion } from "framer-motion";
import { Zap, Smartphone, MessageCircle, Sheet, Search, Sparkles, LayoutDashboard, Headphones } from "lucide-react";

const values = [
  { icon: Zap, label: "Fast Delivery", desc: "Projects in days, not months" },
  { icon: Smartphone, label: "Mobile Friendly", desc: "Perfect on every device" },
  { icon: MessageCircle, label: "WhatsApp Integration", desc: "Direct customer connection" },
  { icon: Sheet, label: "Google Sheets Booking", desc: "Easy reservation management" },
  { icon: Search, label: "SEO Ready Structure", desc: "Built to rank on Google" },
  { icon: Sparkles, label: "Modern Premium Design", desc: "Award-worthy aesthetics" },
  { icon: LayoutDashboard, label: "Business Focused Layout", desc: "Converts visitors to clients" },
  { icon: Headphones, label: "Ongoing Support", desc: "We're with you after launch" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function Stats() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-3 uppercase">
            Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900">
            Why Choose TanuDeveloper Works
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {values.map(({ icon: Icon, label, desc }) => (
            <motion.div
              key={label}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-5 rounded-2xl glass-panel hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] transition-all duration-300 cursor-default"
              data-testid={`value-card-${label.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-500/20 transition-colors">
                <Icon size={20} />
              </div>
              <h4 className="font-bold text-sm dark:text-white text-gray-900 mb-1 leading-tight">{label}</h4>
              <p className="text-xs dark:text-gray-400 text-gray-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
