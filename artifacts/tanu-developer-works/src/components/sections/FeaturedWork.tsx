import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useLocation } from "wouter";

const projects = [
  {
    title: "SmileDental Clinic",
    category: "Dental Healthcare",
    color: "from-teal-500/20 to-cyan-900/20",
    hoverColor: "group-hover:border-teal-500/50",
    accentColor: "#0d9488",
    mockup: {
      nav: ["Home", "Services", "Doctors", "Book Now"],
      hero: { headline: "Trusted Dental Care", sub: "Advanced dentistry for the whole family", cta: "Book Appointment" },
      stat1: { label: "Happy Patients", value: "2,400+" },
      stat2: { label: "Years Experience", value: "12+" },
      cards: [
        { icon: "🦷", label: "Teeth Cleaning" },
        { icon: "✨", label: "Whitening" },
        { icon: "🔬", label: "X-Ray & Scan" },
      ],
    },
  },
  {
    title: "Spice Garden Restaurant",
    category: "Premium Dining",
    color: "from-orange-500/20 to-red-900/20",
    hoverColor: "group-hover:border-orange-500/50",
    accentColor: "#ea580c",
    mockup: {
      nav: ["Menu", "Reserve", "Gallery", "Contact"],
      hero: { headline: "Authentic Indian Cuisine", sub: "Family recipes passed down since 1985", cta: "Reserve Table" },
      stat1: { label: "Menu Items", value: "80+" },
      stat2: { label: "Avg Rating", value: "4.9 ★" },
      cards: [
        { icon: "🍛", label: "Biryani" },
        { icon: "🔥", label: "Tandoor" },
        { icon: "🍮", label: "Desserts" },
      ],
    },
  },
  {
    title: "NexGen Corporate",
    category: "Business Website",
    color: "from-blue-500/20 to-indigo-900/20",
    hoverColor: "group-hover:border-blue-500/50",
    accentColor: "#2563eb",
    mockup: {
      nav: ["About", "Services", "Portfolio", "Contact"],
      hero: { headline: "Grow Your Business", sub: "Enterprise solutions for modern companies", cta: "Get Started" },
      stat1: { label: "Clients Served", value: "500+" },
      stat2: { label: "Projects Done", value: "1,200+" },
      cards: [
        { icon: "📊", label: "Analytics" },
        { icon: "🔒", label: "Security" },
        { icon: "☁️", label: "Cloud" },
      ],
    },
  },
  {
    title: "Alex Rivera Portfolio",
    category: "Creative Portfolio",
    color: "from-purple-500/20 to-pink-900/20",
    hoverColor: "group-hover:border-purple-500/50",
    accentColor: "#9333ea",
    mockup: {
      nav: ["Work", "About", "Skills", "Hire Me"],
      hero: { headline: "UI/UX Designer", sub: "Crafting beautiful digital experiences", cta: "View Work" },
      stat1: { label: "Projects", value: "45+" },
      stat2: { label: "Clients", value: "30+" },
      cards: [
        { icon: "🎨", label: "UI Design" },
        { icon: "✏️", label: "Branding" },
        { icon: "📱", label: "Mobile" },
      ],
    },
  },
  {
    title: "IronFit Gym",
    category: "Fitness Center",
    color: "from-yellow-500/20 to-amber-900/20",
    hoverColor: "group-hover:border-yellow-500/50",
    accentColor: "#d97706",
    mockup: {
      nav: ["Classes", "Trainers", "Plans", "Join Now"],
      hero: { headline: "Transform Your Body", sub: "Expert coaching and premium equipment", cta: "Start Free Trial" },
      stat1: { label: "Members", value: "1,800+" },
      stat2: { label: "Trainers", value: "25+" },
      cards: [
        { icon: "🏋️", label: "Strength" },
        { icon: "🧘", label: "Yoga" },
        { icon: "🥊", label: "Boxing" },
      ],
    },
  },
  {
    title: "LuxuryNest Realty",
    category: "Real Estate",
    color: "from-emerald-500/20 to-green-900/20",
    hoverColor: "group-hover:border-emerald-500/50",
    accentColor: "#059669",
    mockup: {
      nav: ["Buy", "Rent", "Listings", "Contact"],
      hero: { headline: "Find Your Dream Home", sub: "Premium properties across India's top cities", cta: "Browse Listings" },
      stat1: { label: "Properties", value: "320+" },
      stat2: { label: "Sold This Year", value: "140+" },
      cards: [
        { icon: "🏠", label: "Villas" },
        { icon: "🏢", label: "Apartments" },
        { icon: "🌆", label: "Commercial" },
      ],
    },
  },
];

function DesktopMockup({ mockup, accentColor }: { mockup: typeof projects[0]["mockup"]; accentColor: string }) {
  return (
    <div className="absolute inset-5 rounded-xl bg-[#0d1117] border border-white/10 shadow-2xl overflow-hidden group-hover:scale-[1.03] transition-transform duration-700">
      {/* Browser chrome */}
      <div className="w-full h-7 bg-[#161b22] border-b border-white/8 flex items-center px-3 gap-1.5 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-red-500/70" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <div className="w-2 h-2 rounded-full bg-green-500/70" />
        <div className="mx-2 flex-1 h-3 rounded-sm bg-white/5 max-w-[120px]" />
      </div>
      {/* Site navbar */}
      <div className="w-full h-7 bg-[#0d1117] border-b border-white/5 flex items-center px-4 gap-3">
        <div className="w-12 h-2 rounded-sm" style={{ backgroundColor: accentColor + "cc" }} />
        <div className="flex-1" />
        {mockup.nav.map((n) => (
          <div key={n} className="h-1.5 rounded-sm bg-white/20" style={{ width: `${n.length * 5}px` }} />
        ))}
      </div>
      {/* Hero area */}
      <div className="px-4 pt-4 pb-2">
        <div className="h-2 rounded-sm mb-2 w-3/5" style={{ backgroundColor: accentColor + "99" }} />
        <div className="h-1.5 rounded-sm bg-white/15 mb-1 w-4/5" />
        <div className="h-1.5 rounded-sm bg-white/10 mb-3 w-2/3" />
        <div className="inline-flex h-4 px-3 rounded-sm items-center" style={{ backgroundColor: accentColor }}>
          <div className="h-1 w-10 rounded-sm bg-white/80" />
        </div>
      </div>
      {/* Stats row */}
      <div className="flex gap-2 px-4 pt-1 pb-2">
        <div className="flex-1 rounded-lg bg-white/[0.04] border border-white/8 p-2">
          <div className="h-2.5 rounded-sm mb-1 w-2/3" style={{ backgroundColor: accentColor + "cc" }} />
          <div className="h-1.5 rounded-sm bg-white/20 w-1/2" />
        </div>
        <div className="flex-1 rounded-lg bg-white/[0.04] border border-white/8 p-2">
          <div className="h-2.5 rounded-sm mb-1 w-2/3" style={{ backgroundColor: accentColor + "cc" }} />
          <div className="h-1.5 rounded-sm bg-white/20 w-1/2" />
        </div>
      </div>
      {/* Service cards row */}
      <div className="flex gap-1.5 px-4 pt-1">
        {mockup.cards.map((c) => (
          <div key={c.label} className="flex-1 rounded-lg bg-white/[0.04] border border-white/8 p-2 flex flex-col items-center gap-1">
            <span className="text-[10px]">{c.icon}</span>
            <div className="h-1 rounded-sm bg-white/25 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full aspect-[4/3] rounded-2xl glass-panel border border-white/10 ${project.hoverColor} transition-colors duration-500 overflow-hidden group cursor-none`}
      data-cursor-text="View Project"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40`} />
      <DesktopMockup mockup={project.mockup} accentColor={project.accentColor} />
      <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex justify-between items-end">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{project.category}</p>
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedWork() {
  const [, setLocation] = useLocation();

  const goToProjects = () => {
    setLocation("/projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="work" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
              Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900">Selected Work</h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={goToProjects}
            className="px-6 py-3 rounded-full border dark:border-white/20 border-gray-300 dark:text-white text-gray-900 dark:hover:bg-white dark:hover:text-black hover:bg-gray-900 hover:text-white font-medium transition-all"
            data-interactive
            data-testid="view-all-projects"
          >
            View All Projects
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[2000px]">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
