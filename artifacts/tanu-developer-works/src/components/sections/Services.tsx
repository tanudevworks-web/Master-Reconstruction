import { motion } from "framer-motion";
import { Globe, Utensils, Stethoscope, Briefcase, LayoutTemplate, Code2 } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Business Websites",
    desc: "Professional sites that drive revenue and establish corporate authority.",
    accent: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.2)",
    iconColor: "#60a5fa",
  },
  {
    icon: Utensils,
    title: "Restaurant Websites",
    desc: "Appetizing menus, seamless bookings, and a strong local brand presence.",
    accent: "rgba(249,115,22,0.10)",
    border: "rgba(249,115,22,0.18)",
    iconColor: "#fb923c",
  },
  {
    icon: Stethoscope,
    title: "Clinic Websites",
    desc: "Trust-building healthcare web presence with patient-first UX.",
    accent: "rgba(20,184,166,0.10)",
    border: "rgba(20,184,166,0.18)",
    iconColor: "#2dd4bf",
  },
  {
    icon: Briefcase,
    title: "Portfolio Websites",
    desc: "Showcasing creative work beautifully to land your next big client.",
    accent: "rgba(99,102,241,0.10)",
    border: "rgba(99,102,241,0.18)",
    iconColor: "#818cf8",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Pages",
    desc: "High-converting single-page experiences for campaigns and products.",
    accent: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.16)",
    iconColor: "#f472b6",
  },
  {
    icon: Code2,
    title: "Custom Solutions",
    desc: "Bespoke web development architecture for unique business needs.",
    accent: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.16)",
    iconColor: "#4ade80",
  },
];

export function Services() {
  return (
    <section id="services" className="py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="section-label">Capabilities</span>
          <h2
            className="font-bold text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.025em" }}
          >
            What We Build
          </h2>
          <p className="text-white/40 text-base leading-relaxed">
            Engineered for performance, designed for impact. We deliver premium digital products across industries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group p-7 rounded-2xl glass-panel transition-all duration-300 cursor-default"
              style={{ "--hover-border": s.border } as React.CSSProperties}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = s.border;
                (e.currentTarget as HTMLDivElement).style.background = s.accent;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "";
                (e.currentTarget as HTMLDivElement).style.background = "";
              }}
              data-testid={`service-card-${s.title.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: s.accent, border: `1px solid ${s.border}` }}
              >
                <s.icon size={20} style={{ color: s.iconColor }} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
