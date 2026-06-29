import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Understanding your vision, business goals, and target audience in detail.",
    color: "#3b82f6",
  },
  {
    num: "02",
    title: "Planning",
    desc: "Strategic roadmap, wireframes, and clear architecture before a single line of code.",
    color: "#06b6d4",
  },
  {
    num: "03",
    title: "Design",
    desc: "Pixel-perfect visuals matching your brand identity and audience expectations.",
    color: "#60a5fa",
  },
  {
    num: "04",
    title: "Development",
    desc: "Clean, fast, and scalable code built on modern, proven technology stacks.",
    color: "#38bdf8",
  },
  {
    num: "05",
    title: "Launch",
    desc: "Final testing, deployment, and smooth handoff — with ongoing support included.",
    color: "#06b6d4",
  },
];

export function Process() {
  return (
    <section id="process" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-label">Workflow</span>
          <h2
            className="font-bold text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.025em" }}
          >
            How We Work
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px"
               style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), rgba(6,182,212,0.15), transparent)" }} />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Number circle */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5 relative z-10 glass-panel transition-all duration-300 group-hover:scale-105"
                  style={{ border: `1px solid ${step.color}28` }}
                >
                  <span className="text-lg font-bold" style={{ color: step.color }}>{step.num}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/35 leading-relaxed max-w-[160px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
