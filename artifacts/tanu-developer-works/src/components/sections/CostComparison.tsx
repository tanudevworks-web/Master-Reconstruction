import { motion } from "framer-motion";
import { X, Check, Sparkles } from "lucide-react";

const options = [
  {
    label: "Traditional Agency",
    price: "₹20,000 – ₹50,000+",
    pros: [],
    cons: [
      "Long project timelines (4–8 weeks)",
      "High retainer & maintenance fees",
      "Multiple account managers",
      "Impersonal, template-heavy",
    ],
    highlight: false,
    tag: null,
  },
  {
    label: "TanuDeveloper Works",
    price: "Starting ₹999",
    pros: [
      "3–7 day delivery",
      "One-time cost, no hidden fees",
      "Direct access to your developer",
      "Custom-built for your business",
    ],
    cons: [],
    highlight: true,
    tag: "Best Choice",
  },
  {
    label: "Large Dev Company",
    price: "₹50,000 – ₹2,00,000+",
    pros: [],
    cons: [
      "Months of development time",
      "Complex contracts & billing",
      "No direct developer access",
      "Expensive ongoing support",
    ],
    highlight: false,
    tag: null,
  },
];

export function CostComparison() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Value Comparison
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Premium Websites Without<br className="hidden sm:block" /> Premium Agency Pricing
          </h2>
          <p className="dark:text-gray-400 text-gray-600 text-lg">
            You save thousands while still getting a world-class business website.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {options.map((opt, i) => (
            <motion.div
              key={opt.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                opt.highlight
                  ? "bg-gradient-to-b from-blue-600 to-purple-700 border-2 border-blue-400/60 shadow-[0_8px_40px_rgba(59,130,246,0.25)] md:-mt-4"
                  : "dark:bg-white/[0.03] bg-white border dark:border-white/10 border-gray-200 shadow-sm"
              }`}
            >
              {opt.tag && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-blue-700 text-xs font-bold shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles size={10} />
                  {opt.tag}
                </div>
              )}

              <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 ${
                opt.highlight ? "text-blue-200" : "dark:text-gray-500 text-gray-400"
              }`}>
                {opt.label}
              </p>

              <p className={`text-2xl font-black mb-6 ${
                opt.highlight ? "text-white" : "dark:text-white text-gray-900"
              }`}>
                {opt.price}
              </p>

              <div className={`h-px mb-6 ${opt.highlight ? "bg-white/20" : "dark:bg-white/8 bg-gray-100"}`} />

              <ul className="flex-1 space-y-3">
                {(opt.pros.length > 0 ? opt.pros : opt.cons).map((item) => {
                  const isGood = opt.pros.length > 0;
                  return (
                    <li key={item} className="flex items-start gap-3">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isGood
                          ? "bg-white/20 text-white"
                          : "bg-red-500/10 text-red-400"
                      }`}>
                        {isGood ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                      </span>
                      <span className={`text-sm ${
                        opt.highlight
                          ? "text-blue-50"
                          : isGood
                          ? "dark:text-gray-300 text-gray-700"
                          : "dark:text-gray-400 text-gray-500"
                      }`}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
