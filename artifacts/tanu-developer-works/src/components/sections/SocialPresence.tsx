import { motion } from "framer-motion";
import { SiInstagram, SiGithub, SiWhatsapp } from "react-icons/si";
import { Mail, Linkedin } from "lucide-react";
import { CONTACT } from "./Footer";

const platforms = [
  {
    name: "Instagram",
    handle: "@tanuuuyyyy",
    icon: SiInstagram,
    url: CONTACT.instagram,
    hoverClass: "hover:border-pink-400/60 hover:shadow-[0_0_24px_rgba(236,72,153,0.2)] hover:text-pink-500",
    iconColor: "text-pink-500",
    bg: "dark:group-hover:bg-pink-500/8 group-hover:bg-pink-50",
  },
  {
    name: "LinkedIn",
    handle: "tanu-tapase",
    icon: Linkedin,
    url: CONTACT.linkedin,
    hoverClass: "hover:border-blue-400/60 hover:shadow-[0_0_24px_rgba(59,130,246,0.2)] hover:text-blue-500",
    iconColor: "text-blue-500",
    bg: "dark:group-hover:bg-blue-500/8 group-hover:bg-blue-50",
  },
  {
    name: "GitHub",
    handle: "tanudevworks-web",
    icon: SiGithub,
    url: CONTACT.github,
    hoverClass: "dark:hover:border-white/40 hover:border-gray-400/60 dark:hover:text-white hover:text-gray-900",
    iconColor: "dark:text-gray-300 text-gray-700",
    bg: "dark:group-hover:bg-white/5 group-hover:bg-gray-100",
  },
  {
    name: "WhatsApp",
    handle: "+91 84335 53501",
    icon: SiWhatsapp,
    url: CONTACT.whatsapp,
    hoverClass: "hover:border-green-400/60 hover:shadow-[0_0_24px_rgba(34,197,94,0.2)] hover:text-green-500",
    iconColor: "text-green-500",
    bg: "dark:group-hover:bg-green-500/8 group-hover:bg-green-50",
  },
  {
    name: "Email",
    handle: "tanudevworks@gmail.com",
    icon: Mail,
    url: CONTACT.email,
    hoverClass: "hover:border-purple-400/60 hover:shadow-[0_0_24px_rgba(168,85,247,0.2)] hover:text-purple-500",
    iconColor: "text-purple-500",
    bg: "dark:group-hover:bg-purple-500/8 group-hover:bg-purple-50",
  },
];

export function SocialPresence() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-3 uppercase">
            Connect
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
            Find Me Online
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {platforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className={`group glass-panel rounded-2xl p-5 border dark:border-white/8 border-gray-200 transition-all duration-300 ${p.hoverClass} ${p.bg} flex flex-col items-center gap-3 text-center`}
              data-interactive
            >
              <div className={`w-10 h-10 rounded-xl dark:bg-white/5 bg-gray-100 flex items-center justify-center transition-colors`}>
                <p.icon size={20} className={`${p.iconColor} transition-colors`} />
              </div>
              <div>
                <p className="font-bold text-sm dark:text-white text-gray-900">{p.name}</p>
                <p className="text-xs dark:text-gray-500 text-gray-400 mt-0.5 truncate max-w-[120px]">{p.handle}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
