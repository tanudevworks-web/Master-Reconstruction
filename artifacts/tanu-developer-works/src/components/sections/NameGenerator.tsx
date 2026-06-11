import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react";

const nameData: Record<string, string[][]> = {
  "Dental Clinic": [
    ["SmileCraft", "Modern dental branding with a craft-forward touch"],
    ["DentalVerse", "Expansive, world-class dental care"],
    ["BrightCare Dental", "Clean, professional, trustworthy"],
    ["ToothSphere", "Comprehensive oral health"],
    ["PureSmile Studio", "Boutique dental experience"],
    ["ClearBite Dental", "Precise, minimalist, premium"],
  ],
  "Salon": [
    ["Velvet Beauty", "Luxury salon with a tactile elegance"],
    ["Glow Studio", "Modern, radiant, energetic"],
    ["Aura Salon", "Premium aura of calm & confidence"],
    ["BlushCo", "Contemporary, feminine, stylish"],
    ["Studio Luxe", "High-end salon positioning"],
    ["Mane & Glow", "Hair-focused, friendly, memorable"],
  ],
  "Restaurant": [
    ["Saffron Table", "Warm, aromatic, authentic"],
    ["The Fork & Craft", "Artisan dining experience"],
    ["Ember Kitchen", "Bold, rustic, full of warmth"],
    ["Savour House", "Inviting, community-focused"],
    ["Platter & Co.", "Contemporary casual dining"],
    ["The Daily Feast", "Approachable everyday dining"],
  ],
  "Gym": [
    ["IronForge", "Powerful, masculine, results-driven"],
    ["PeakForm Studio", "Performance-focused fitness"],
    ["Elevate Gym", "Aspirational, modern, motivating"],
    ["CoreZone", "Core-focused, clean, scientific"],
    ["Vitality Club", "Holistic health & wellness"],
    ["Pulse Fitness", "Energetic, rhythm-driven"],
  ],
  "Real Estate": [
    ["KeyNest Properties", "Home-finding made simple"],
    ["EstateEdge", "Sharp, professional, trusted"],
    ["PremierHomes", "Luxury property positioning"],
    ["DwellCo", "Modern, minimalist, approachable"],
    ["NestFinder", "Friendly, helpful, community"],
    ["VistaProp", "Wide-view, expansive property"],
  ],
  "Clinic": [
    ["MedVia Clinic", "Medical pathway, trust-first"],
    ["WellCore Health", "Core-centric wellness brand"],
    ["LifePoint Clinic", "Life-affirming, pivotal care"],
    ["ClearPath Medical", "Transparent, accessible care"],
    ["HealthNest", "Safe, nurturing, homely"],
    ["VitalCare Clinic", "Vital, energetic, modern"],
  ],
  "Bakery": [
    ["Golden Crumb", "Artisan, warm, crafted"],
    ["The Daily Loaf", "Everyday freshness, trusted"],
    ["ButterBorn", "Rich, handcrafted, indulgent"],
    ["Flourish Bakehouse", "Growth, abundance, warmth"],
    ["Knead & Co.", "Craft-focused, clever wordplay"],
    ["Rise & Bloom", "Fresh start energy, elegant"],
  ],
  "Photography": [
    ["FrameCraft Studio", "Artisan photography, precise"],
    ["Aperture & Co.", "Technical, professional, bold"],
    ["Lumina Studio", "Light-centric, elegant, modern"],
    ["CaptureCo.", "Clean, direct, memorable"],
    ["Vivid Frame Studio", "Colour-forward, vibrant"],
    ["ShutterSage", "Expert, wisdom-driven, calm"],
  ],
};

const businessTypes = Object.keys(nameData);

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg dark:hover:bg-white/10 hover:bg-gray-100 transition-colors"
      data-interactive
      aria-label="Copy name"
    >
      {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} className="dark:text-gray-400 text-gray-400" />}
    </button>
  );
}

export function NameGenerator() {
  const [selected, setSelected] = useState("Dental Clinic");
  const [visibleCount, setVisibleCount] = useState(4);

  const names = nameData[selected] ?? [];
  const visible = names.slice(0, visibleCount);

  const refresh = () => {
    setVisibleCount(4);
    const others = businessTypes.filter((t) => t !== selected);
    setSelected(others[Math.floor(Math.random() * others.length)]);
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Brand Tools
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Need a Website Name?
          </h2>
          <p className="dark:text-gray-400 text-gray-600">
            Select your business type and get professional name ideas instantly.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {businessTypes.map((type) => (
              <button
                key={type}
                onClick={() => { setSelected(type); setVisibleCount(4); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selected === type
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                    : "dark:bg-white/[0.04] bg-white dark:border-white/10 border-gray-200 border dark:text-gray-300 text-gray-700 dark:hover:border-blue-400/40 hover:border-blue-300/60 hover:shadow-sm"
                }`}
                data-interactive
              >
                {type}
              </button>
            ))}
          </div>

          {/* Name cards */}
          <AnimatePresence mode="popLayout">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {visible.map(([name, tagline], i) => (
                <motion.div
                  key={`${selected}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="glass-panel rounded-2xl p-5 border dark:border-white/8 border-gray-200 hover:border-blue-400/30 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-1">
                        {name}
                      </h3>
                      <p className="text-sm dark:text-gray-400 text-gray-500 leading-snug">
                        {tagline}
                      </p>
                    </div>
                    <CopyButton text={name} />
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4">
            {visibleCount < names.length && (
              <button
                onClick={() => setVisibleCount(names.length)}
                className="px-5 py-2.5 rounded-xl border dark:border-white/10 border-gray-200 dark:bg-white/[0.04] bg-white text-sm dark:text-gray-300 text-gray-700 hover:border-blue-400/40 hover:shadow-sm transition-all"
                data-interactive
              >
                See All Names
              </button>
            )}
            <button
              onClick={refresh}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold hover:shadow-md transition-all"
              data-interactive
            >
              <RefreshCw size={14} />
              Try Another Type
            </button>
          </div>

          <p className="text-center text-xs dark:text-gray-500 text-gray-400 mt-6 flex items-center justify-center gap-1.5">
            <Sparkles size={12} />
            Need a full brand identity? Contact us for custom naming, logo, and domain strategy.
          </p>
        </div>
      </div>
    </section>
  );
}
