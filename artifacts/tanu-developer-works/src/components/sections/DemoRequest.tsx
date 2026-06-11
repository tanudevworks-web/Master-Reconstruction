import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ExternalLink, Monitor } from "lucide-react";

const WHATSAPP_NUMBER = "918433553501";

const demos = [
  {
    type: "Restaurant",
    emoji: "🍽️",
    desc: "Menu, booking table, WhatsApp orders, gallery",
    color: "from-orange-500/20 to-red-500/10",
    border: "border-orange-400/30 hover:border-orange-400/60",
    accent: "text-orange-500",
  },
  {
    type: "Salon",
    emoji: "✂️",
    desc: "Services, appointment booking, team profiles",
    color: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-400/30 hover:border-pink-400/60",
    accent: "text-pink-500",
  },
  {
    type: "Clinic",
    emoji: "🏥",
    desc: "Doctors, online booking, patient trust signals",
    color: "from-teal-500/20 to-cyan-500/10",
    border: "border-teal-400/30 hover:border-teal-400/60",
    accent: "text-teal-500",
  },
  {
    type: "Gym",
    emoji: "💪",
    desc: "Membership plans, class schedule, trainers",
    color: "from-yellow-500/20 to-amber-500/10",
    border: "border-yellow-400/30 hover:border-yellow-400/60",
    accent: "text-yellow-600",
  },
  {
    type: "Real Estate",
    emoji: "🏠",
    desc: "Property listings, virtual tour links, enquiry",
    color: "from-blue-500/20 to-indigo-500/10",
    border: "border-blue-400/30 hover:border-blue-400/60",
    accent: "text-blue-500",
  },
];

function openWhatsApp(type: string) {
  const message = encodeURIComponent(
    `Hi Tanu,\n\nI would like to see the demo website for:\n*${type} Website*\n\nPlease share the preview. Thank you!`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

export function DemoRequest() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="demos" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Live Previews
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            See Real Website Demos
          </h2>
          <p className="dark:text-gray-400 text-gray-600 text-lg">
            Choose your industry and request a live demo on WhatsApp instantly.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-5xl mx-auto mb-10">
          {demos.map((demo, i) => (
            <motion.button
              key={demo.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              onClick={() => setSelected(demo.type === selected ? null : demo.type)}
              data-interactive
              className={`group flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-200 bg-gradient-to-b ${demo.color} ${demo.border} ${
                selected === demo.type
                  ? "ring-2 ring-blue-400/60 scale-[1.03]"
                  : "dark:border-white/8 hover:scale-[1.02]"
              } dark:bg-white/[0.02] bg-white/80 backdrop-blur-sm`}
            >
              <span className="text-3xl mb-3">{demo.emoji}</span>
              <h3 className={`font-bold text-sm dark:text-white text-gray-900 mb-1.5`}>
                {demo.type}
              </h3>
              <p className="text-xs dark:text-gray-400 text-gray-500 leading-snug">
                {demo.desc}
              </p>
              <div className={`mt-3 flex items-center gap-1 text-xs font-semibold ${demo.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                <Monitor size={11} />
                Select
              </div>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          {selected && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm dark:text-gray-400 text-gray-500 mb-4"
            >
              Requesting demo for: <span className="font-bold dark:text-white text-gray-800">{selected}</span>
            </motion.p>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openWhatsApp(selected ?? "your business type")}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-[0_4px_20px_rgba(34,197,94,0.35)] hover:shadow-[0_6px_28px_rgba(34,197,94,0.45)] transition-all duration-200"
            data-interactive
          >
            <MessageCircle size={18} />
            {selected ? `Request ${selected} Demo on WhatsApp` : "Request a Demo on WhatsApp"}
            <ExternalLink size={14} className="opacity-70" />
          </motion.button>
          <p className="text-xs dark:text-gray-500 text-gray-400 mt-4">
            You'll receive the demo link on WhatsApp within minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
