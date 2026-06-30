import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TECHS = [
  {
    name: "React",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
    color: "#61DAFB",
    glow: "rgba(97,218,251,0.3)",
    label: "React",
    sub: "UI Framework",
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9">
        <rect width="24" height="24" rx="3" fill="#3178C6" />
        <path d="M14.5 12H17.5V13.5H16V19H14.5V13.5H13V12H14.5Z" fill="white" />
        <path d="M9 12C7.34315 12 6 13.3431 6 15C6 16.6569 7.34315 18 9 18C9.73458 18 10.4056 17.7365 10.9282 17.2954L10 16.3672C9.72159 16.6093 9.37702 16.75 9 16.75C8.03351 16.75 7.25 15.9665 7.25 15C7.25 14.0335 8.03351 13.25 9 13.25C9.37702 13.25 9.72159 13.3907 10 13.6328L10.9282 12.7046C10.4056 12.2635 9.73458 12 9 12Z" fill="white" />
      </svg>
    ),
    color: "#3178C6",
    glow: "rgba(49,120,198,0.35)",
    label: "TypeScript",
    sub: "Type Safety",
  },
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9">
        <circle cx="12" cy="12" r="12" fill="#000" />
        <path d="M6 17.5V8.5L17.5 20C16.5 20.7 15.3 21.2 14 21.4L6 17.5Z" fill="white" opacity="0.5" />
        <path d="M18 16V7H16V15.5L18 16Z" fill="white" />
        <path d="M6 7H8V17L6 15.5V7Z" fill="white" />
      </svg>
    ),
    color: "#ffffff",
    glow: "rgba(255,255,255,0.2)",
    label: "Next.js",
    sub: "Production Apps",
  },
  {
    name: "Tailwind",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9">
        <path d="M12 6C9.5 6 7.875 7.25 7 9.75C8.25 8.25 9.625 7.625 11.25 8.25C12.1875 8.59375 12.875 9.40625 13.6875 10.3125C14.9375 11.6875 16.375 13.25 19.5 13.25C22 13.25 23.625 12 24.5 9.5C23.25 11 21.875 11.625 20.25 11C19.3125 10.6563 18.625 9.84375 17.8125 8.9375C16.5625 7.5625 15.125 6 12 6ZM4.5 13.25C2 13.25 0.375 14.5 -0.5 17C0.75 15.5 2.125 14.875 3.75 15.5C4.6875 15.84375 5.375 16.65625 6.1875 17.5625C7.4375 18.9375 8.875 20.5 12 20.5C14.5 20.5 16.125 19.25 17 16.75C15.75 18.25 14.375 18.875 12.75 18.25C11.8125 17.90625 11.125 17.09375 10.3125 16.1875C9.0625 14.8125 7.625 13.25 4.5 13.25Z" fill="#38BDF8" />
      </svg>
    ),
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.3)",
    label: "Tailwind CSS",
    sub: "Styling",
  },
  {
    name: "Firebase",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9">
        <path d="M3.89 15.67L6.3 2.31a.5.5 0 01.93-.13l2.47 4.77L3.89 15.67z" fill="#FFA000" />
        <path d="M3.89 15.67l6.12-9.71a.5.5 0 01.87.11L14.5 15.5l-3.72 2.15-6.89-2z" fill="#F57C00" />
        <path d="M14.5 15.5L12.01 9.2a.5.5 0 01.85-.44L20.11 15l-4 2.3a1 1 0 01-1.01.02L14.5 15.5z" fill="#FFCA28" />
        <path d="M3.89 15.67l.35-.2 6.54-11.85.42.81-6.68 10.77-.63.47z" fill="#FFA000" />
      </svg>
    ),
    color: "#FFCA28",
    glow: "rgba(255,202,40,0.3)",
    label: "Firebase",
    sub: "Backend & DB",
  },
  {
    name: "Framer Motion",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9">
        <path d="M4 4h8v8H4z" fill="#a855f7" />
        <path d="M4 12h8l8 8H4z" fill="#7c3aed" />
        <path d="M12 4l8 8H12z" fill="#c084fc" />
      </svg>
    ),
    color: "#a855f7",
    glow: "rgba(168,85,247,0.35)",
    label: "Framer Motion",
    sub: "Animations",
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9">
        <path d="M12 1.85L2.5 7.43v9.14L12 22.15l9.5-5.58V7.43L12 1.85zm-.02 1.73l7.96 4.67v9.27L12 22.15l-7.94-4.63V8.25l7.92-4.67z" fill="#539E43" />
        <path d="M12 3.58L4.06 8.25v7.5L12 20.42l7.94-4.67v-7.5L12 3.58zM8.85 15.1c0 .42-.24.66-.6.66-.35 0-.6-.25-.6-.66v-4.56h1.2v4.56zm2.63.02c0 .41-.27.66-.64.66h-.02c-.36 0-.64-.25-.64-.66v-1.94c0-.4.28-.65.65-.65s.65.25.65.65v1.94zm3.44-1.06c-.2.58-.7.96-1.32.96-.93 0-1.6-.73-1.6-1.8 0-1.07.67-1.8 1.6-1.8.62 0 1.12.38 1.32.96h-1.14c-.08-.2-.21-.3-.38-.3-.3 0-.5.28-.5.64 0 .37.2.65.5.65.17 0 .3-.1.38-.31h1.14z" fill="#539E43" />
      </svg>
    ),
    color: "#539E43",
    glow: "rgba(83,158,67,0.3)",
    label: "Node.js",
    sub: "Server Runtime",
  },
  {
    name: "Figma",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9">
        <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83" />
        <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF" />
        <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E" />
        <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262" />
        <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE" />
      </svg>
    ),
    color: "#1ABCFE",
    glow: "rgba(26,188,254,0.3)",
    label: "Figma",
    sub: "UI Design",
  },
];

const FLOAT_VARIANTS = [
  { y: [0, -10, 0], duration: 3.2 },
  { y: [0, -14, 0], duration: 2.8 },
  { y: [0, -8, 0], duration: 3.6 },
  { y: [0, -12, 0], duration: 3.0 },
  { y: [0, -10, 0], duration: 3.4 },
  { y: [0, -16, 0], duration: 2.6 },
  { y: [0, -9, 0], duration: 3.8 },
  { y: [0, -13, 0], duration: 2.9 },
];

export function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Built with Modern Tech
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            The tools that make your
            <br />
            <span className="text-gradient-aurora">website exceptional</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Every site I build uses production-grade technology chosen for speed, reliability, and results.
          </p>
        </motion.div>

        {/* Floating tech icons grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
          {TECHS.map((tech, i) => {
            const float = FLOAT_VARIANTS[i % FLOAT_VARIANTS.length];
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{ y: float.y }}
                  transition={{ duration: float.duration, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.06 }}
                  className="group relative glass-panel rounded-2xl p-6 flex flex-col items-center gap-3 cursor-default overflow-hidden transition-colors duration-300"
                  style={
                    {
                      "--glow": tech.glow,
                    } as React.CSSProperties
                  }
                >
                  {/* Hover glow bg */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${tech.glow}, transparent 70%)` }}
                  />

                  {/* Border glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `inset 0 0 0 1px ${tech.color}40` }}
                  />

                  {/* Icon */}
                  <div
                    className="relative z-10 w-16 h-16 flex items-center justify-center rounded-xl"
                    style={{ background: `${tech.glow}` }}
                  >
                    {tech.icon}
                  </div>

                  {/* Labels */}
                  <div className="relative z-10 text-center">
                    <div
                      className="font-bold text-sm leading-tight"
                      style={{ color: tech.color }}
                    >
                      {tech.label}
                    </div>
                    <div className="text-white/40 text-xs mt-0.5">{tech.sub}</div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 transition-all duration-500 rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)` }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-16 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div>
            <div className="text-2xl font-black text-white">Always Learning</div>
            <div className="text-white/50 text-sm mt-1">
              Upgrading skills every month to keep your site ahead of the curve.
            </div>
          </div>

          <div className="flex items-center gap-8">
            {[
              { value: "3+", label: "Yrs Experience" },
              { value: "20+", label: "Projects Live" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-gradient-aurora">{stat.value}</div>
                <div className="text-white/40 text-xs mt-0.5 whitespace-nowrap">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
