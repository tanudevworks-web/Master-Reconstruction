import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useLocation } from "wouter";

const projects = [
  {
    title: "SmileDental Clinic",
    category: "Dental Healthcare",
    gradient: "linear-gradient(135deg, rgba(20,184,166,0.15), rgba(6,182,212,0.06))",
    border: "rgba(20,184,166,0.2)",
    accent: "#0d9488",
    mockup: {
      nav: ["Home", "Services", "Doctors", "Book Now"],
      hero: { headline: "Trusted Dental Care", cta: "Book Appointment" },
      stats: [{ label: "Happy Patients", value: "2,400+" }, { label: "Years", value: "12+" }],
      cards: [{ icon: "🦷", label: "Cleaning" }, { icon: "✨", label: "Whitening" }, { icon: "🔬", label: "X-Ray" }],
    },
  },
  {
    title: "Spice Garden Restaurant",
    category: "Premium Dining",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(239,68,68,0.06))",
    border: "rgba(249,115,22,0.2)",
    accent: "#ea580c",
    mockup: {
      nav: ["Menu", "Reserve", "Gallery", "Contact"],
      hero: { headline: "Authentic Indian Cuisine", cta: "Reserve Table" },
      stats: [{ label: "Menu Items", value: "80+" }, { label: "Rating", value: "4.9★" }],
      cards: [{ icon: "🍛", label: "Biryani" }, { icon: "🔥", label: "Tandoor" }, { icon: "🍮", label: "Desserts" }],
    },
  },
  {
    title: "NexGen Corporate",
    category: "Business Website",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.14), rgba(99,102,241,0.06))",
    border: "rgba(59,130,246,0.2)",
    accent: "#2563eb",
    mockup: {
      nav: ["About", "Services", "Portfolio", "Contact"],
      hero: { headline: "Grow Your Business", cta: "Get Started" },
      stats: [{ label: "Clients", value: "500+" }, { label: "Projects", value: "1,200+" }],
      cards: [{ icon: "📊", label: "Analytics" }, { icon: "🔒", label: "Security" }, { icon: "☁️", label: "Cloud" }],
    },
  },
  {
    title: "Alex Rivera Portfolio",
    category: "Creative Portfolio",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(236,72,153,0.06))",
    border: "rgba(168,85,247,0.18)",
    accent: "#9333ea",
    mockup: {
      nav: ["Work", "About", "Skills", "Hire Me"],
      hero: { headline: "UI/UX Designer", cta: "View Work" },
      stats: [{ label: "Projects", value: "45+" }, { label: "Clients", value: "30+" }],
      cards: [{ icon: "🎨", label: "UI Design" }, { icon: "✏️", label: "Branding" }, { icon: "📱", label: "Mobile" }],
    },
  },
  {
    title: "IronFit Gym",
    category: "Fitness Center",
    gradient: "linear-gradient(135deg, rgba(234,179,8,0.12), rgba(245,158,11,0.06))",
    border: "rgba(234,179,8,0.18)",
    accent: "#d97706",
    mockup: {
      nav: ["Classes", "Trainers", "Plans", "Join Now"],
      hero: { headline: "Transform Your Body", cta: "Start Free Trial" },
      stats: [{ label: "Members", value: "1,800+" }, { label: "Trainers", value: "25+" }],
      cards: [{ icon: "🏋️", label: "Strength" }, { icon: "🧘", label: "Yoga" }, { icon: "🥊", label: "Boxing" }],
    },
  },
  {
    title: "LuxuryNest Realty",
    category: "Real Estate",
    gradient: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(16,185,129,0.06))",
    border: "rgba(34,197,94,0.18)",
    accent: "#059669",
    mockup: {
      nav: ["Buy", "Rent", "Listings", "Contact"],
      hero: { headline: "Find Your Dream Home", cta: "Browse Listings" },
      stats: [{ label: "Properties", value: "320+" }, { label: "Sold", value: "140+" }],
      cards: [{ icon: "🏠", label: "Villas" }, { icon: "🏢", label: "Apartments" }, { icon: "🌆", label: "Commercial" }],
    },
  },
];

type ProjectType = typeof projects[0];

function MockupScreen({ project }: { project: ProjectType }) {
  const { mockup, accent } = project;
  return (
    <div className="absolute inset-5 rounded-xl overflow-hidden"
         style={{ background: "#050810", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: "#080d18", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
        <div className="flex-1 mx-2 h-2.5 rounded-sm" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>
      {/* Nav */}
      <div className="flex items-center px-4 py-2 gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="w-10 h-1.5 rounded-sm" style={{ background: accent + "bb" }} />
        <div className="flex-1" />
        {mockup.nav.map((n) => (
          <div key={n} className="h-1 rounded-sm" style={{ width: n.length * 4, background: "rgba(255,255,255,0.18)" }} />
        ))}
      </div>
      {/* Hero text */}
      <div className="px-4 pt-3 pb-2">
        <div className="h-2 w-3/5 rounded-sm mb-2" style={{ background: accent + "99" }} />
        <div className="h-1 w-4/5 rounded-sm mb-1" style={{ background: "rgba(255,255,255,0.12)" }} />
        <div className="h-3.5 px-3 rounded-sm mt-3 inline-flex items-center" style={{ background: accent }}>
          <div className="h-1 w-8 rounded-sm" style={{ background: "rgba(255,255,255,0.8)" }} />
        </div>
      </div>
      {/* Stats */}
      <div className="flex gap-2 px-4 py-1">
        {mockup.stats.map((s) => (
          <div key={s.label} className="flex-1 rounded-lg p-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="h-2 w-2/3 rounded-sm mb-1" style={{ background: accent + "bb" }} />
            <div className="h-1 w-1/2 rounded-sm" style={{ background: "rgba(255,255,255,0.18)" }} />
          </div>
        ))}
      </div>
      {/* Cards */}
      <div className="flex gap-1.5 px-4 pt-1">
        {mockup.cards.map((c) => (
          <div key={c.label} className="flex-1 rounded-lg p-2 flex flex-col items-center gap-1"
               style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="text-[9px]">{c.icon}</span>
            <div className="h-1 w-full rounded-sm" style={{ background: "rgba(255,255,255,0.2)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: ProjectType; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y), [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(useSpring(x), [-0.5, 0.5], ["-7deg", "7deg"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        background: project.gradient,
        border: `1px solid rgba(255,255,255,0.06)`,
        backdropFilter: "blur(20px)",
      } as React.CSSProperties}
      onMouseMove={onMove}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = project.border; }}
      onMouseLeave={(e) => {
        onLeave();
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
      }}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group cursor-none"
    >
      <MockupScreen project={project} />

      {/* Reveal overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between items-end"
           style={{
             background: "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.8) 40%, transparent 100%)",
             transform: "translateY(4px)",
             transition: "transform 0.4s ease",
           }}
           onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
      >
        <div>
          <p className="text-[11px] font-medium text-white/40 mb-1">{project.category}</p>
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
        </div>
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 -translate-x-3 group-hover:translate-x-0" style={{ transition: "opacity 0.4s, transform 0.4s" }}>
          <ArrowUpRight size={18} className="text-black" />
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedWork() {
  const [, setLocation] = useLocation();

  return (
    <section id="work" className="py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Portfolio</span>
            <h2
              className="font-bold text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.025em" }}
            >
              Selected Work
            </h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => { setLocation("/projects"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="px-6 py-3 rounded-full glass-panel text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all"
            data-interactive
            data-testid="view-all-projects"
          >
            View All Projects →
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "2000px" }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
