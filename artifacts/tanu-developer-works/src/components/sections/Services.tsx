import { motion } from "framer-motion";
import { Globe, Utensils, Stethoscope, Briefcase, LayoutTemplate, Code2 } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Business Websites",
    desc: "Professional sites that drive revenue and establish corporate authority.",
    iconColor: "text-blue-500",
    bg: "group-hover:bg-blue-500/5",
    border: "group-hover:border-blue-500/40",
  },
  {
    icon: Utensils,
    title: "Restaurant Websites",
    desc: "Appetizing menus, seamless bookings, and a strong local brand presence.",
    iconColor: "text-orange-500",
    bg: "group-hover:bg-orange-500/5",
    border: "group-hover:border-orange-500/40",
  },
  {
    icon: Stethoscope,
    title: "Clinic Websites",
    desc: "Trust-building healthcare web presence with patient-first UX.",
    iconColor: "text-teal-500",
    bg: "group-hover:bg-teal-500/5",
    border: "group-hover:border-teal-500/40",
  },
  {
    icon: Briefcase,
    title: "Portfolio Websites",
    desc: "Showcasing creative work beautifully to land your next big client.",
    iconColor: "text-purple-500",
    bg: "group-hover:bg-purple-500/5",
    border: "group-hover:border-purple-500/40",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Pages",
    desc: "High-converting single-page experiences for campaigns and products.",
    iconColor: "text-pink-500",
    bg: "group-hover:bg-pink-500/5",
    border: "group-hover:border-pink-500/40",
  },
  {
    icon: Code2,
    title: "Custom Solutions",
    desc: "Bespoke web development architecture for unique business needs.",
    iconColor: "text-green-500",
    bg: "group-hover:bg-green-500/5",
    border: "group-hover:border-green-500/40",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="py-28 relative">
      <div className="container mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-5">What We Build</h2>
          <p className="text-lg dark:text-gray-400 text-gray-600">
            Engineered for performance, designed for impact. We deliver premium digital products across industries.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={card}
              whileHover={{ y: -4 }}
              className={`glass-panel p-7 rounded-2xl border dark:border-white/5 border-gray-200 ${service.border} ${service.bg} transition-all duration-300 group relative overflow-hidden cursor-default`}
              data-testid={`service-card-${service.title.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 dark:bg-white/5 bg-gray-100 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={22} className={service.iconColor} />
              </div>
              <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2">{service.title}</h3>
              <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
