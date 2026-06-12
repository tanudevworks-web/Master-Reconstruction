import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Check, ChevronDown } from "lucide-react";

const BUSINESS_TYPES = [
  "Restaurant",
  "Dental Clinic",
  "Salon",
  "Gym",
  "Real Estate",
  "E-Commerce",
  "Coaching Institute",
  "Local Business",
];

interface Addon {
  id: string;
  label: string;
  price: number;
  desc: string;
}

const ADDONS: Addon[] = [
  {
    id: "booking",
    label: "Booking System",
    price: 200,
    desc: "Let customers book appointments online",
  },
  {
    id: "sheets",
    label: "Google Sheets Integration",
    price: 300,
    desc: "Auto-save leads to your spreadsheet",
  },
  {
    id: "seo",
    label: "SEO Optimization",
    price: 200,
    desc: "Rank higher on Google",
  },
  {
    id: "blog",
    label: "Blog Section",
    price: 100,
    desc: "Content marketing ready",
  },
  {
    id: "payments",
    label: "Online Payments",
    price: 500,
    desc: "Accept UPI, cards & more",
  },
  {
    id: "gbp",
    label: "Google Business Profile Setup",
    price: 200,
    desc: "Appear professionally on Google Search & Maps",
  },
  {
    id: "firebase",
    label: "Firebase Integration",
    price: 300,
    desc: "Real-time database & auth",
  },
  {
    id: "custom",
    label: "Custom Features",
    price: 500,
    desc: "Any unique requirement",
  },
];

const BASE_PRICE = 999;

export function PriceCalculator() {
  const [selectedBusiness, setSelectedBusiness] = useState<string>("");
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalPrice =
    BASE_PRICE +
    ADDONS.filter((a) => selectedAddons.has(a.id)).reduce(
      (sum, a) => sum + a.price,
      0,
    );

  const getWhatsAppMessage = () => {
    const addonsText =
      selectedAddons.size > 0
        ? ADDONS.filter((a) => selectedAddons.has(a.id))
            .map((a) => `• ${a.label} (+₹${a.price})`)
            .join("\n")
        : "• No add-ons selected";

    const msg = `
    Hi! I'd like to get a quote for my website.

    Business Type: ${selectedBusiness || "Not selected"}

    Selected Features:
    ${addonsText}

    Estimated Price: ₹${totalPrice}

    Could you help me get started?
    `;

    return `https://wa.me/918433553501?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="calculator" className="py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full" />
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Instant Estimate
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Website Price Calculator
          </h2>
          <p className="dark:text-gray-400 text-gray-600 max-w-xl mx-auto">
            Select your business type and the features you need. Get an instant
            estimate and request your exact quote on WhatsApp.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Left: Configurator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Business Type */}
            <div>
              <label className="block text-sm font-bold dark:text-gray-300 text-gray-700 mb-3 uppercase tracking-wider">
                1. Select Your Business Type
              </label>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl glass-panel border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 font-medium hover:border-primary/40 transition-all text-left"
                  data-interactive
                  data-testid="business-type-selector"
                >
                  <span
                    className={
                      selectedBusiness ? "" : "dark:text-gray-500 text-gray-400"
                    }
                  >
                    {selectedBusiness || "Choose your business type…"}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform dark:text-gray-400 text-gray-500 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
                      style={{ transformOrigin: "top" }}
                      className="absolute top-full mt-2 left-0 right-0 z-50 rounded-xl glass-panel border dark:border-white/10 border-gray-200 overflow-hidden shadow-xl"
                    >
                      {BUSINESS_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setSelectedBusiness(type);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors hover:bg-primary/10 ${
                            selectedBusiness === type
                              ? "text-primary dark:bg-blue-500/10 bg-blue-50"
                              : "dark:text-gray-300 text-gray-700"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <label className="block text-sm font-bold dark:text-gray-300 text-gray-700 mb-3 uppercase tracking-wider">
                2. Select Optional Features
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {ADDONS.map((addon) => {
                  const selected = selectedAddons.has(addon.id);
                  return (
                    <motion.button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`group text-left p-4 rounded-xl border transition-all duration-200 ${
                        selected
                          ? "border-blue-500/60 dark:bg-blue-500/10 bg-blue-50 shadow-[0_0_16px_rgba(59,130,246,0.15)]"
                          : "glass-panel dark:border-white/10 border-gray-200 hover:border-blue-400/40"
                      }`}
                      data-interactive
                      data-testid={`addon-${addon.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border transition-all ${
                            selected
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300 dark:border-white/20"
                          }`}
                        >
                          {selected && (
                            <Check
                              size={12}
                              className="text-white"
                              strokeWidth={3}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold dark:text-white text-gray-900">
                              {addon.label}
                            </span>
                            <span className="text-xs font-bold text-blue-400 whitespace-nowrap">
                              +₹{addon.price}
                            </span>
                          </div>
                          <p className="text-xs dark:text-gray-500 text-gray-500 mt-0.5 leading-relaxed">
                            {addon.desc}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Price Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <div className="glass-panel rounded-3xl p-8 border dark:border-white/10 border-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-aurora opacity-5 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-sm font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500 mb-6">
                  Your Estimate
                </h3>

                {/* Base */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="dark:text-gray-300 text-gray-600">
                      Base Website
                    </span>
                    <span className="dark:text-white text-gray-900 font-semibold">
                      ₹{BASE_PRICE}
                    </span>
                  </div>

                  <AnimatePresence>
                    {ADDONS.filter((a) => selectedAddons.has(a.id)).map((a) => (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex justify-between text-sm overflow-hidden"
                      >
                        <span className="dark:text-gray-400 text-gray-500">
                          {a.label}
                        </span>
                        <span className="text-blue-400 font-semibold">
                          +₹{a.price}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t dark:border-white/10 border-gray-200 pt-5 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm dark:text-gray-300 text-gray-600 font-medium">
                      Total Estimate
                    </span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.2, color: "#60a5fa" }}
                      animate={{ scale: 1, color: "inherit" }}
                      className="text-3xl font-black text-gradient-aurora"
                    >
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </motion.span>
                  </div>
                  <p className="text-xs dark:text-gray-500 text-gray-400 mt-1">
                    One-time payment. No hidden fees.
                  </p>
                </div>

                {/* Business type summary */}
                {selectedBusiness && (
                  <div className="mb-6 p-3 rounded-xl dark:bg-white/5 bg-blue-50 border dark:border-white/5 border-blue-100">
                    <p className="text-xs dark:text-gray-400 text-gray-500">
                      <span className="font-semibold dark:text-white text-gray-900">
                        Business:{" "}
                      </span>
                      {selectedBusiness}
                    </p>
                  </div>
                )}

                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:shadow-[0_4px_20px_rgba(34,197,94,0.4)] hover:scale-[1.02] active:scale-100 transition-all"
                  data-interactive
                  data-testid="whatsapp-quote-cta"
                >
                  <MessageCircle size={20} />
                  Get Exact Quote on WhatsApp
                </a>

                <p className="text-center text-xs dark:text-gray-500 text-gray-400 mt-4">
                  Final quote confirmed after discussing requirements.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
