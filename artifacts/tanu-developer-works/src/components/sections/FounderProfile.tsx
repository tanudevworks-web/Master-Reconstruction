import { motion } from "framer-motion";
import { CheckCircle2, Zap, Layout, User } from "lucide-react";

/** SVG Developer Illustration — animated, premium, no raster images needed */
function DeveloperIllustration() {
  return (
    <svg
      viewBox="0 0 320 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden
    >
      {/* Background glow */}
      <circle cx="160" cy="200" r="140" fill="url(#bgGlow)" opacity="0.15" />

      {/* Desk surface */}
      <rect
        x="30"
        y="285"
        width="260"
        height="10"
        rx="5"
        fill="url(#deskGrad)"
        opacity="0.7"
      />

      {/* Monitor stand */}
      <rect x="148" y="240" width="24" height="48" rx="4" fill="#1e2a3a" />
      <rect x="120" y="284" width="80" height="6" rx="3" fill="#1a2332" />

      {/* Monitor body */}
      <rect
        x="50"
        y="90"
        width="220"
        height="155"
        rx="12"
        fill="#0d1520"
        stroke="url(#monitorBorder)"
        strokeWidth="2"
      />
      <rect x="60" y="100" width="200" height="135" rx="8" fill="#060d18" />

      {/* Code on screen — lines */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <motion.rect
            x={72 + (i % 2) * 6}
            y={112 + i * 17}
            height="7"
            rx="3"
            fill={i === 2 ? "#60a5fa" : i === 4 ? "#a78bfa" : "#1e3a5f"}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: [50, 90, 70, 110, 60, 95, 80][i], opacity: 1 }}
            transition={{
              delay: 1.2 + i * 0.15,
              duration: 0.6,
              ease: "easeOut",
            }}
          />
          {i === 2 && (
            <motion.rect
              x={140}
              y={112 + i * 17}
              height="7"
              rx="3"
              fill="#34d399"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 40, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            />
          )}
        </g>
      ))}

      {/* Cursor blink */}
      <motion.rect
        x={168}
        y={214}
        width="2"
        height="9"
        rx="1"
        fill="#60a5fa"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Keyboard */}
      <rect
        x="80"
        y="296"
        width="160"
        height="28"
        rx="6"
        fill="#0d1520"
        stroke="#1e2d40"
        strokeWidth="1.5"
      />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((k) => (
        <rect
          key={k}
          x={88 + k * 11}
          y={301}
          width="8"
          height="6"
          rx="2"
          fill="#1a2e44"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => (
        <rect
          key={k}
          x={93 + k * 11}
          y={311}
          width="8"
          height="6"
          rx="2"
          fill="#1a2e44"
        />
      ))}
      <rect x="110" y="321" width="60" height="5" rx="2.5" fill="#1a2e44" />

      {/* Coffee cup */}
      <rect x="270" y="268" width="22" height="24" rx="4" fill="#1a2332" />
      <path
        d="M292 275 Q302 275 302 282 Q302 289 292 289"
        stroke="#2d4a6a"
        strokeWidth="2"
        fill="none"
      />
      <rect x="272" y="265" width="18" height="5" rx="2" fill="#1e3455" />
      <motion.path
        d="M278 258 Q279 252 281 258"
        stroke="#60a5fa"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
        animate={{ opacity: [0.3, 0.8, 0.3], y: [-2, 0, -2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M283 255 Q284 249 286 255"
        stroke="#a78bfa"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
        animate={{ opacity: [0.6, 0.2, 0.6], y: [-2, 0, -2] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />

      {/* Plant */}
      <rect x="26" y="272" width="18" height="16" rx="3" fill="#1a2332" />
      <ellipse cx="35" cy="269" rx="10" ry="14" fill="#14532d" opacity="0.8" />
      <ellipse cx="28" cy="266" rx="8" ry="12" fill="#166534" opacity="0.7" />
      <ellipse cx="42" cy="268" rx="8" ry="11" fill="#15803d" opacity="0.7" />

      {/* Floating notification badge */}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect
          x="195"
          y="55"
          width="100"
          height="32"
          rx="10"
          fill="#0d1520"
          stroke="#1e3a5f"
          strokeWidth="1.5"
        />
        <circle cx="210" cy="71" r="6" fill="#22c55e" opacity="0.9" />
        <rect x="222" y="65" width="50" height="6" rx="3" fill="#1e3a5f" />
        <rect
          x="222"
          y="74"
          width="36"
          height="5"
          rx="2.5"
          fill="#1e3a5f"
          opacity="0.6"
        />
      </motion.g>

      {/* Floating code snippet */}
      <motion.g
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <rect
          x="10"
          y="120"
          width="35"
          height="52"
          rx="8"
          fill="#0d1520"
          stroke="#1e3a5f"
          strokeWidth="1.5"
        />
        <rect
          x="16"
          y="130"
          width="22"
          height="4"
          rx="2"
          fill="#60a5fa"
          opacity="0.8"
        />
        <rect
          x="16"
          y="138"
          width="16"
          height="4"
          rx="2"
          fill="#a78bfa"
          opacity="0.7"
        />
        <rect
          x="16"
          y="146"
          width="20"
          height="4"
          rx="2"
          fill="#34d399"
          opacity="0.7"
        />
        <rect x="16" y="154" width="14" height="4" rx="2" fill="#1e3a5f" />
        <rect
          x="16"
          y="162"
          width="18"
          height="4"
          rx="2"
          fill="#60a5fa"
          opacity="0.5"
        />
      </motion.g>

      {/* Avatar head */}
      <circle cx="160" cy="48" r="26" fill="url(#avatarGrad)" />
      <circle
        cx="160"
        cy="48"
        r="26"
        stroke="url(#avatarBorder)"
        strokeWidth="2"
        fill="none"
      />
      {/* Simple face */}
      <circle cx="152" cy="44" r="3.5" fill="#0d1520" />
      <circle cx="168" cy="44" r="3.5" fill="#0d1520" />
      <path
        d="M152 56 Q160 61 168 56"
        stroke="#0d1520"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Hair */}
      <path d="M134 43 Q136 28 160 26 Q184 28 186 43" fill="#1a0a0a" />
      <path d="M134 43 Q130 38 133 32 Q137 24 145 22" fill="#1a0a0a" />

      {/* Shoulder/body */}
      <path
        d="M120 90 Q130 75 160 72 Q190 75 200 90 L208 92 L112 92 Z"
        fill="#0d1a2e"
      />

      {/* Defs */}
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a2332" stopOpacity="0" />
          <stop offset="30%" stopColor="#1a2332" />
          <stop offset="70%" stopColor="#1a2332" />
          <stop offset="100%" stopColor="#1a2332" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="monitorBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8c8a0" />
          <stop offset="100%" stopColor="#e8a87c" />
        </linearGradient>
        <linearGradient id="avatarBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const techTags = [
  { name: "React", top: "8%", left: "-8%", delay: 0 },
  { name: "Next.js", top: "22%", right: "-6%", delay: 0.4 },
  { name: "Tailwind", bottom: "28%", left: "-6%", delay: 0.8 },
  { name: "TypeScript", bottom: "12%", right: "-8%", delay: 1.2 },
];

const philosophy = [
  {
    icon: Layout,
    title: "Pixel Perfect",
    desc: "Crafted with obsessive precision",
  },
  {
    icon: Zap,
    title: "Performance First",
    desc: "Lightning-fast, optimized for results",
  },
  {
    icon: User,
    title: "Human-Centered",
    desc: "Built for real users, not just clients",
  },
];

const timeline = [
  {
    date: "2020",
    title: "Started Coding",
    desc: "Began the journey into web development.",
  },
  {
    date: "2021",
    title: "First Commercial Project",
    desc: "Delivered first freelance business website.",
  },
  {
    date: "2022",
    title: "TanuDeveloper Works Founded",
    desc: "Established the premium creative studio.",
  },
  {
    date: "2025",
    title: "Premium Studio Launch",
    desc: "Scaling to serve elite clients across India.",
  },
];

export function FounderProfile() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          {/* Portrait Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative lg:sticky lg:top-32"
          >
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-aurora rounded-3xl opacity-20 blur-xl" />

              {/* Card */}
              <div className="absolute inset-0 glass-panel rounded-3xl border border-white/10 dark:border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />

                {/* Developer Illustration */}
                <div className="absolute inset-0 flex items-center justify-center p-4 pt-8">
                  <DeveloperIllustration />
                </div>

                {/* Status Indicator */}
                <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
                  <span className="text-xs font-semibold dark:text-white/90 text-white/90">
                    Available for Projects
                  </span>
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-7 left-7 z-20">
                  <h3 className="text-2xl font-bold text-white mb-0.5">
                    Tanu Tapase
                  </h3>
                  <p className="text-blue-400 text-sm font-medium tracking-wide">
                    Web Developer & Digital Creator
                  </p>
                </div>
              </div>

              {/* Floating tech badges */}
              {techTags.map((badge, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3 + i * 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: badge.delay,
                  }}
                  className="absolute z-30 px-3 py-1.5 rounded-full glass-panel border border-white/15 dark:border-white/15 text-xs font-bold shadow-xl backdrop-blur-md dark:text-white text-gray-800"
                  style={{
                    top: badge.top,
                    left: badge.left,
                    right: (badge as { right?: string }).right,
                    bottom: badge.bottom,
                  }}
                >
                  {badge.name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="flex flex-col gap-14">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
                Founder Profile
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white text-gray-900">
                The Mind Behind
                <br />
                TanuDeveloper Works
              </h2>
              <p className="text-lg dark:text-gray-400 text-gray-600 leading-relaxed">
                I architect digital experiences that convert visitors into
                customers. Every pixel is deliberate, every interaction
                purposeful. My work sits at the intersection of engineering
                precision and visual artistry.
              </p>
            </motion.div>

            {/* Philosophy Cards */}
            <div className="grid sm:grid-cols-3 gap-5">
              {philosophy.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-panel p-6 rounded-2xl hover:border-blue-500/40 transition-all duration-300"
                >
                  <item.icon className="w-7 h-7 text-blue-400 mb-4" />
                  <h4 className="text-base font-bold mb-1.5 dark:text-white text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-sm dark:text-gray-400 text-gray-600">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-5 dark:text-white text-gray-900">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Next.js",
                  "JavaScript",
                  "HTML5",
                  "CSS3",
                  "Framer Motion",
                  "Figma",
                  "Git",
                  "Vite",
                  "Node.js",
                ].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1.5 rounded-full glass-panel text-xs font-semibold dark:text-gray-300 text-gray-700 hover:border-blue-500/50 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)] transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Journey Timeline */}
            <div>
              <h3 className="text-xl font-bold mb-7 dark:text-white text-gray-900">
                The Journey
              </h3>
              <div className="space-y-5 relative before:absolute before:left-5 before:-translate-x-px before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500/30 before:to-transparent">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-5"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 dark:border-white/20 bg-black flex items-center justify-center text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)] z-10">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="flex-1 glass-panel p-4 rounded-xl hover:border-blue-500/40 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold dark:text-white text-gray-900">
                          {item.title}
                        </h4>
                        <span className="text-xs font-medium px-2 py-0.5 rounded dark:bg-white/5 bg-black/5 text-blue-400">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-sm dark:text-gray-400 text-gray-600">
                        {item.desc}
                      </p>
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
