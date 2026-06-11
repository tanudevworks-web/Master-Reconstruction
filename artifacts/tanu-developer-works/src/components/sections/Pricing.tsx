import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹999",
    desc: "Perfect for establishing your online presence fast.",
    features: [
      "Single Page Website",
      "WhatsApp Integration",
      "Contact Form",
      "Mobile Responsive Design",
      "Modern Design",
      "3-Day Delivery",
    ],
    cta: "Get Started",
    highlighted: false,
    badge: null,
    checkBg: "bg-green-500/10 text-green-600",
  },
  {
    name: "Business",
    price: "₹1,999",
    desc: "Everything a growing business needs to convert clients.",
    features: [
      "Up To 5 Pages",
      "WhatsApp Integration",
      "Google Sheets Integration",
      "Online Booking System",
      "SEO Basics",
      "Responsive Design",
      "5-Day Delivery",
    ],
    cta: "Start Business Plan",
    highlighted: false,
    badge: "Most Popular",
    checkBg: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "Premium",
    price: "₹3,999",
    desc: "The ultimate digital experience for serious brands.",
    features: [
      "Fully Custom Design",
      "Firebase Ready Architecture",
      "Advanced UI/UX",
      "Premium Animations",
      "Google Business Profile Setup",
      "Priority Support",
      "Custom Features",
      "7-Day Delivery",
    ],
    cta: "Go Premium",
    highlighted: true,
    badge: "Best Value",
    checkBg: "dark:bg-white/20 dark:text-white bg-blue-700/15 text-blue-800",
  },
];

export function Pricing() {
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-6"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Clear Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Investment
          </h2>
          <p className="dark:text-gray-400 text-gray-600">
            Premium quality without the premium agency overhead.
          </p>
        </motion.div>

        {/* Included note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full dark:bg-white/[0.04] bg-white border dark:border-white/8 border-gray-200 text-sm dark:text-gray-300 text-gray-600 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            WhatsApp Integration, Mobile Design, Contact Forms & Google Maps
            included free.
          </span>
        </motion.div>

        {/* Cards grid — pt-8 gives room for badges above each card */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="relative"
            >
              {/* Badge — outside card so it never clips */}
              {plan.badge && (
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1 text-xs font-bold rounded-full whitespace-nowrap shadow-md flex items-center gap-1 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "dark:bg-gray-800 bg-white dark:text-white text-gray-900 border dark:border-white/15 border-gray-200"
                  }`}
                >
                  {plan.highlighted && (
                    <Star size={10} className="fill-current" />
                  )}
                  {plan.badge}
                </div>
              )}

              {/* Card — no overflow-hidden so badge never clips */}
              <div
                className={`flex flex-col h-full rounded-2xl transition-all duration-300 ${
                  plan.highlighted
                    ? "dark:bg-gradient-to-b dark:from-blue-600 dark:to-purple-700 bg-gradient-to-b from-blue-500 to-purple-600 border-2 dark:border-blue-400/60 border-blue-500/80 shadow-[0_8px_40px_rgba(59,130,246,0.3)]"
                    : "dark:bg-white/[0.03] bg-white border dark:border-white/10 border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.09)] hover:border-blue-300/50 dark:hover:border-blue-500/30"
                }`}
                data-testid={`pricing-card-${plan.name.toLowerCase()}`}
              >
                <div className="p-7 flex flex-col flex-1">
                  {/* Plan name */}
                  <p
                    className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${
                      plan.highlighted
                        ? "dark:text-blue-200 text-blue-700"
                        : "dark:text-gray-400 text-gray-500"
                    }`}
                  >
                    {plan.name}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-3">
                    <span
                      className={`text-5xl font-black tracking-tight ${
                        plan.highlighted
                          ? "text-white"
                          : "dark:text-white text-gray-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed mb-7 ${
                      plan.highlighted
                        ? "dark:text-blue-100 text-gray-800"
                        : "dark:text-gray-400 text-gray-500"
                    }`}
                  >
                    {plan.desc}
                  </p>

                  {/* Divider */}
                  <div
                    className={`h-px mb-6 ${plan.highlighted ? "bg-white/25" : "dark:bg-white/8 bg-gray-100"}`}
                  />

                  {/* Features */}
                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.checkBg}`}
                        >
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span
                          className={`text-sm ${
                            plan.highlighted
                              ? "dark:text-blue-50 text-gray-800"
                              : "dark:text-gray-300 text-gray-700"
                          }`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={scrollToContact}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      plan.highlighted
                        ? "bg-white dark:text-blue-700 text-blue-700 hover:bg-blue-50 hover:shadow-md"
                        : "pricing-btn bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md"
                    }`}
                    data-interactive
                    data-testid={`pricing-cta-${plan.name.toLowerCase()}`}
                  >
                    <Zap size={14} />
                    {plan.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 text-sm dark:text-gray-500 text-gray-400"
        >
          All prices are one-time. No monthly fees. No hidden charges. Pay after
          you approve the final design.
        </motion.p>
      </div>
    </section>
  );
}
