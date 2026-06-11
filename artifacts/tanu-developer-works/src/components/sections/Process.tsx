import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Understanding your vision, business goals, and target audience in detail.",
    color: "from-blue-500/20 to-blue-600/10",
    glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  },
  {
    num: "02",
    title: "Planning",
    desc: "Strategic roadmap, wireframes, and clear architecture before a single line of code.",
    color: "from-violet-500/20 to-violet-600/10",
    glow: "group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]",
  },
  {
    num: "03",
    title: "Design",
    desc: "Pixel-perfect visuals matching your brand identity and audience expectations.",
    color: "from-purple-500/20 to-purple-600/10",
    glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
  },
  {
    num: "04",
    title: "Development",
    desc: "Clean, fast, and scalable code built on modern, proven technology stacks.",
    color: "from-pink-500/20 to-pink-600/10",
    glow: "group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]",
  },
  {
    num: "05",
    title: "Launch",
    desc: "Final testing, deployment, and smooth handoff — with ongoing support included.",
    color: "from-rose-500/20 to-rose-600/10",
    glow: "group-hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-3 uppercase">
            Workflow
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
            How We Work
          </h2>
        </motion.div>

        {/* Desktop: horizontal with connector */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <div className="relative mb-0">
            <div className="absolute top-10 left-[calc(10%+20px)] right-[calc(10%+20px)] h-px bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-rose-500/40 z-0" />
          </div>

          <div className="grid lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="group flex flex-col items-center text-center"
              >
                {/* Number bubble */}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center font-black text-xl text-gradient-aurora border dark:border-white/10 border-gray-200 dark:bg-[#0a0a0a] bg-white shadow-md mb-5 transition-all duration-300 relative z-10 ${step.glow}`}
                >
                  {step.num}
                </div>

                {/* Title + desc */}
                <h3 className="text-base font-bold dark:text-white text-gray-900 mb-2">{step.title}</h3>
                <p className="text-xs dark:text-gray-400 text-gray-500 leading-relaxed max-w-[160px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="relative flex gap-5 pb-8 last:pb-0"
            >
              {/* Vertical connector */}
              {i !== steps.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-blue-500/40 to-purple-500/20" />
              )}

              {/* Number bubble */}
              <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-gradient-aurora border dark:border-white/10 border-gray-200 dark:bg-[#0a0a0a] bg-white shadow-sm relative z-10">
                {step.num}
              </div>

              {/* Content */}
              <div className="pt-1 pb-2">
                <h3 className="text-base font-bold dark:text-white text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
