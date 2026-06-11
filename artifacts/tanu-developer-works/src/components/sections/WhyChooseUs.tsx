import { motion } from "framer-motion";
import { Zap, MessageCircle, BarChart3, Smartphone, Globe, User, Clock, Database } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "3–7 Day Delivery",
    desc: "Your website goes live in days, not months. We work fast without cutting corners.",
    accent: "text-yellow-500",
    bg: "dark:bg-yellow-500/10 bg-yellow-50",
    border: "dark:border-yellow-500/20 border-yellow-100",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Integration",
    desc: "Every website includes a WhatsApp business button so clients reach you instantly.",
    accent: "text-green-500",
    bg: "dark:bg-green-500/10 bg-green-50",
    border: "dark:border-green-500/20 border-green-100",
  },
  {
    icon: BarChart3,
    title: "Google Sheets Automation",
    desc: "Form submissions and leads saved directly to your Google Sheets — no database needed.",
    accent: "text-blue-500",
    bg: "dark:bg-blue-500/10 bg-blue-50",
    border: "dark:border-blue-500/20 border-blue-100",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    desc: "Built for mobile from day one. Looks perfect on every screen, every device.",
    accent: "text-purple-500",
    bg: "dark:bg-purple-500/10 bg-purple-50",
    border: "dark:border-purple-500/20 border-purple-100",
  },
  {
    icon: Globe,
    title: "SEO-Friendly Structure",
    desc: "Clean code, proper headings, fast loading — built to rank on Google from the start.",
    accent: "text-cyan-500",
    bg: "dark:bg-cyan-500/10 bg-cyan-50",
    border: "dark:border-cyan-500/20 border-cyan-100",
  },
  {
    icon: User,
    title: "Direct Developer Access",
    desc: "You work directly with Tanu — no account managers, no delays, no miscommunication.",
    accent: "text-pink-500",
    bg: "dark:bg-pink-500/10 bg-pink-50",
    border: "dark:border-pink-500/20 border-pink-100",
  },
  {
    icon: Clock,
    title: "Business-Focused Design",
    desc: "Every design decision is made to convert visitors into real paying customers.",
    accent: "text-orange-500",
    bg: "dark:bg-orange-500/10 bg-orange-50",
    border: "dark:border-orange-500/20 border-orange-100",
  },
  {
    icon: Database,
    title: "Lead Management Dashboard",
    desc: "Every enquiry is stored securely so customer details are never lost. Track leads, contact requests and business enquiries efficiently.",
    accent: "text-indigo-500",
    bg: "dark:bg-indigo-500/10 bg-indigo-50",
    border: "dark:border-indigo-500/20 border-indigo-100",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Why Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Why Businesses Choose Us
          </h2>
          <p className="dark:text-gray-400 text-gray-600 text-lg">
            Every website is built with one goal — helping your business grow.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="glass-panel rounded-2xl p-6 border dark:border-white/8 border-gray-200 hover:border-blue-300/40 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${v.bg} ${v.border}`}>
                <v.icon size={18} className={v.accent} />
              </div>
              <h3 className="font-bold dark:text-white text-gray-900 mb-2 text-base">{v.title}</h3>
              <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
