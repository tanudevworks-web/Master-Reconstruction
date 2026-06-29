import { motion } from "framer-motion";
import { CheckCircle2, Zap, Layout, User } from "lucide-react";

const techStack = [
  "React", "TypeScript", "Tailwind CSS", "Next.js",
  "JavaScript", "HTML5", "CSS3", "Framer Motion",
  "Figma", "Git", "Vite", "Node.js",
];

const philosophy = [
  { icon: Layout, title: "Pixel Perfect",      desc: "Crafted with obsessive precision" },
  { icon: Zap,    title: "Performance First",  desc: "Lightning-fast, optimized for results" },
  { icon: User,   title: "Human-Centered",     desc: "Built for real users, not just clients" },
];

const timeline = [
  { date: "2020", title: "Started Coding",          desc: "Began the journey into web development." },
  { date: "2021", title: "First Commercial Project", desc: "Delivered first freelance business website." },
  { date: "2022", title: "TanuDeveloper Works Founded", desc: "Established the premium creative studio." },
  { date: "2025", title: "Premium Studio Launch",   desc: "Scaling to serve elite clients across India." },
];

const techTags = [
  { name: "React",      top: "8%",   left: "-8%"  },
  { name: "Next.js",   top: "22%",  right: "-6%" },
  { name: "Tailwind",  bottom: "28%", left: "-6%"},
  { name: "TypeScript", bottom: "12%", right: "-8%"},
];

function CodeAnimation() {
  const lines = [
    { color: "#60a5fa", width: 90 },
    { color: "rgba(255,255,255,0.2)", width: 60 },
    { color: "#06b6d4", width: 110 },
    { color: "rgba(255,255,255,0.15)", width: 75 },
    { color: "#60a5fa", width: 55 },
    { color: "rgba(255,255,255,0.2)", width: 95 },
    { color: "#4ade80", width: 70 },
  ];

  return (
    <div className="absolute inset-8 rounded-xl overflow-hidden"
         style={{ background: "#050810", border: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "#080d18" }}>
        <div className="w-2 h-2 rounded-full bg-red-500/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <div className="w-2 h-2 rounded-full bg-green-500/60" />
        <div className="flex-1 mx-3 h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>
      {/* Code lines */}
      <div className="p-5 flex flex-col gap-3">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: l.width, opacity: 1 }}
            transition={{ delay: 1 + i * 0.18, duration: 0.5, ease: "easeOut" }}
            style={{ height: 7, borderRadius: 3, background: l.color }}
          />
        ))}
        {/* Cursor blink */}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ width: 2, height: 9, borderRadius: 1, background: "#60a5fa", marginTop: 2 }}
        />
      </div>
      {/* Status badge */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-14 right-4 px-3 py-2 rounded-xl flex items-center gap-2"
        style={{ background: "#080d18", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: "0 0 4px rgba(74,222,128,0.8)" }} />
        <span className="text-[10px] text-white/50 font-medium whitespace-nowrap">Available for Projects</span>
      </motion.div>
    </div>
  );
}

export function FounderProfile() {
  return (
    <section id="about" className="py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-start">

          {/* Left — Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:sticky lg:top-32"
          >
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl opacity-10 blur-2xl"
                   style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)" }} />
              {/* Card */}
              <div className="absolute inset-0 glass-panel rounded-3xl overflow-hidden">
                <div className="absolute inset-0 opacity-5"
                     style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)" }} />
                <CodeAnimation />
                <div className="absolute bottom-7 left-7 z-20">
                  <h3 className="text-xl font-bold text-white mb-0.5">Tanu Tapase</h3>
                  <p className="text-blue-400 text-xs font-medium tracking-wide">Web Developer & Digital Creator</p>
                </div>
              </div>

              {/* Floating tech badges */}
              {techTags.map((badge, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  className="absolute z-30 px-3 py-1.5 rounded-full text-xs font-bold text-white/70 glass-panel"
                  style={{ top: badge.top, left: (badge as { left?: string }).left, right: (badge as { right?: string }).right, bottom: badge.bottom }}
                >
                  {badge.name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="flex flex-col gap-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Founder Profile</span>
              <h2
                className="font-bold text-white mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
              >
                The Mind Behind<br />TanuDeveloper Works
              </h2>
              <p className="text-white/45 text-base leading-relaxed">
                I architect digital experiences that convert visitors into customers. Every pixel is deliberate, every interaction purposeful. My work sits at the intersection of engineering precision and visual artistry.
              </p>
            </motion.div>

            {/* Philosophy */}
            <div className="grid sm:grid-cols-3 gap-4">
              {philosophy.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-5 rounded-2xl glass-panel hover:border-blue-500/20 transition-all duration-300"
                >
                  <item.icon className="w-6 h-6 text-blue-400 mb-3" />
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-5">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-white/50 hover:text-white/80 hover:border-blue-500/25 transition-all cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <div>
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-7">The Journey</h3>
              <div className="space-y-4 relative before:absolute before:left-5 before:-translate-x-px before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-5"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10"
                         style={{ background: "#050505", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <CheckCircle2 size={15} className="text-blue-400" />
                    </div>
                    <div className="flex-1 p-4 rounded-xl glass-panel hover:border-blue-500/20 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded text-blue-400"
                              style={{ background: "rgba(59,130,246,0.08)" }}>
                          {item.date}
                        </span>
                      </div>
                      <p className="text-xs text-white/40">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
