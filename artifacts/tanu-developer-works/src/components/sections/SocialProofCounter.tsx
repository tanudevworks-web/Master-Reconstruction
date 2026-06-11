import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, MonitorCheck, MapPin, Star } from "lucide-react";

const counters = [
  {
    icon: Users,
    value: 128,
    suffix: "+",
    label: "Businesses Viewed This Month",
    accent: "text-blue-400",
    iconBg: "dark:bg-blue-500/10 bg-blue-50 border-blue-500/20",
  },
  {
    icon: MonitorCheck,
    value: 250,
    suffix: "+",
    label: "Website Consultations Completed",
    accent: "text-purple-400",
    iconBg: "dark:bg-purple-500/10 bg-purple-50 border-purple-500/20",
  },
  {
    icon: MapPin,
    value: 50,
    suffix: "+",
    label: "Local Businesses Helped",
    accent: "text-green-400",
    iconBg: "dark:bg-green-500/10 bg-green-50 border-green-500/20",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "★",
    label: "Average Client Rating",
    accent: "text-yellow-400",
    iconBg: "dark:bg-yellow-500/10 bg-yellow-50 border-yellow-500/20",
    isDecimal: true,
  },
];

function AnimatedCount({
  target,
  suffix,
  isDecimal,
  active,
}: {
  target: number;
  suffix: string;
  isDecimal?: boolean;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(isDecimal ? parseFloat((ease * target).toFixed(1)) : Math.round(ease * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, isDecimal]);

  return (
    <span className="tabular-nums">
      {isDecimal ? display.toFixed(1) : display}
      {suffix}
    </span>
  );
}

export function SocialProofCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 relative">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border dark:border-white/10 border-gray-200 text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-aurora uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live Social Proof
          </div>
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900">
            Real Numbers. Real Impact.
          </h2>
        </motion.div>

        {/* Counter grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {counters.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass-panel rounded-2xl p-5 md:p-6 flex flex-col items-center text-center border dark:border-white/8 border-gray-200 hover:border-blue-300/40 hover:shadow-[0_4px_24px_rgba(59,130,246,0.08)] transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 ${c.iconBg}`}>
                <c.icon size={18} className={c.accent} />
              </div>
              <div className={`text-3xl md:text-4xl font-bold mb-1 ${c.accent}`}>
                <AnimatedCount
                  target={c.value}
                  suffix={c.suffix}
                  isDecimal={c.isDecimal}
                  active={inView}
                />
              </div>
              <p className="text-xs dark:text-gray-400 text-gray-500 leading-snug font-medium">
                {c.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
