import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

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
  },
];

export function Pricing() {
  const toContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pricing" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="section-label">Clear Pricing</span>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.025em" }}
          >
            Investment
          </h2>
          <p className="text-white/40 text-base">Premium quality without the premium agency overhead.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs text-white/40 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: "0 0 4px rgba(74,222,128,0.8)" }} />
            WhatsApp Integration, Mobile Design, Contact Forms & Google Maps included free.
          </span>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto pt-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="relative"
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1 text-[10px] font-bold rounded-full whitespace-nowrap flex items-center gap-1"
                  style={{
                    background: plan.highlighted
                      ? "linear-gradient(135deg,#3b82f6,#06b6d4)"
                      : "rgba(255,255,255,0.07)",
                    color: "#ffffff",
                    border: plan.highlighted ? "none" : "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  {plan.highlighted && <Star size={9} className="fill-current" />}
                  {plan.badge}
                </div>
              )}

              {/* Card */}
              <div
                className="flex flex-col h-full rounded-2xl p-7 transition-all duration-300"
                style={plan.highlighted ? {
                  background: "linear-gradient(160deg, rgba(59,130,246,0.15) 0%, rgba(6,182,212,0.08) 100%)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  boxShadow: "0 0 40px rgba(59,130,246,0.10)",
                } : {
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                data-testid={`pricing-card-${plan.name.toLowerCase()}`}
              >
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3"
                   style={{ color: plan.highlighted ? "rgba(96,165,250,0.9)" : "rgba(255,255,255,0.35)" }}>
                  {plan.name}
                </p>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-black tracking-tight text-white">{plan.price}</span>
                </div>

                <p className="text-sm text-white/40 leading-relaxed mb-6">{plan.desc}</p>

                <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: plan.highlighted ? "rgba(96,165,250,0.15)" : "rgba(255,255,255,0.06)" }}
                      >
                        <Check size={9} strokeWidth={3} className="text-blue-400" />
                      </div>
                      <span className="text-sm text-white/55">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={toContact}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200"
                  style={plan.highlighted ? {
                    background: "linear-gradient(135deg,#3b82f6,#06b6d4)",
                    color: "#ffffff",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.25)",
                  } : {
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                  data-interactive
                  data-testid={`pricing-cta-${plan.name.toLowerCase()}`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 text-xs text-white/25"
        >
          All prices are one-time. No monthly fees. No hidden charges. Pay after you approve the final design.
        </motion.p>

      </div>
    </section>
  );
}
