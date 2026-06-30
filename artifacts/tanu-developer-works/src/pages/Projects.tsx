import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink, ArrowLeft, Share2, Copy, Check, MessageCircle, Zap, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { projects, type Project } from "@/data/projects";

const FILTERS = [
  { label: "All", tag: "all" },
  { label: "🦷 Healthcare", tag: "healthcare" },
  { label: "🍽️ Restaurant", tag: "restaurant" },
  { label: "🎮 Gaming", tag: "gaming" },
  { label: "🏋️ Fitness", tag: "fitness" },
  { label: "👗 Fashion", tag: "fashion" },
  { label: "🛒 E-Commerce", tag: "ecommerce" },
];

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 rounded-full dark:bg-white/8 bg-gray-200 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="text-[10px] font-bold dark:text-gray-400 text-gray-500 w-6 text-right">{value}</span>
    </div>
  );
}

function ShareMenu({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const copyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => { setCopied(false); onClose(); }, 1800);
    } catch { /* ignore */ }
  };

  const waShare = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this project by Tanu: ${title}\n${url}`)}`, "_blank");
    onClose();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 6 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-full right-0 mb-2 w-44 rounded-2xl dark:bg-gray-900 bg-white border dark:border-white/10 border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={copyLink} className="w-full flex items-center gap-3 px-4 py-3 text-sm dark:text-gray-200 text-gray-800 dark:hover:bg-white/5 hover:bg-gray-50 transition-colors" data-interactive>
        {copied ? <Check size={14} className="text-green-400 flex-shrink-0" /> : <Copy size={14} className="flex-shrink-0" />}
        {copied ? "Copied!" : "Copy Link"}
      </button>
      <div className="h-px dark:bg-white/8 bg-gray-100 mx-3" />
      <button onClick={waShare} className="w-full flex items-center gap-3 px-4 py-3 text-sm dark:text-gray-200 text-gray-800 dark:hover:bg-white/5 hover:bg-gray-50 transition-colors" data-interactive>
        <MessageCircle size={14} className="text-green-500 flex-shrink-0" />
        Share on WhatsApp
      </button>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [shareOpen, setShareOpen] = useState(false);
  const hasLink = !!project.link.trim();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group glass-panel rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] transition-all duration-300"
      data-testid={`project-card-${project.id}`}
    >
      {/* Thumbnail */}
      <div className={`relative h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* Decorative mockup */}
        <div className="relative z-10 w-48 h-32 rounded-lg bg-black/30 border border-white/10 p-3 backdrop-blur-sm">
          <div className="w-full h-2.5 rounded bg-white/20 mb-2" />
          <div className="w-3/4 h-2 rounded bg-white/15 mb-3" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 rounded bg-white/10" />
            <div className="h-12 rounded bg-white/10" />
          </div>
        </div>

        {/* Category badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-black/50 text-white backdrop-blur-sm border border-white/10">
          {project.icon} {project.category}
        </span>

        {/* Live status badge */}
        <span className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
          {project.status}
        </span>

        {/* Completion date */}
        <span className="absolute bottom-3 right-4 text-[10px] text-gray-400 font-medium">
          {project.completedAt}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Performance scores */}
        <div className="mb-4 space-y-1.5">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={10} className="text-yellow-400" />
            <span className="text-[10px] font-semibold dark:text-gray-500 text-gray-400 uppercase tracking-wide">Performance</span>
          </div>
          <ScoreBar value={project.performance} color="linear-gradient(90deg,#3b82f6,#8b5cf6)" />
          <div className="flex items-center gap-2 mt-1.5 mb-1">
            <TrendingUp size={10} className="text-green-400" />
            <span className="text-[10px] font-semibold dark:text-gray-500 text-gray-400 uppercase tracking-wide">SEO</span>
          </div>
          <ScoreBar value={project.seo} color="linear-gradient(90deg,#10b981,#3b82f6)" />
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-full text-xs font-semibold dark:bg-white/5 bg-black/5 dark:text-gray-300 text-gray-600">
              {t}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          {hasLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-aurora text-white text-sm font-bold hover:shadow-[0_0_16px_rgba(59,130,246,0.4)] transition-all"
              data-interactive
              data-testid={`view-project-${project.id}`}
            >
              View Project
              <ExternalLink size={14} />
            </a>
          )}

          {hasLink && (
            <div className="relative">
              <button
                onClick={() => setShareOpen((o) => !o)}
                className="w-10 h-10 rounded-full dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-500 dark:hover:bg-white/10 hover:bg-gray-200 hover:text-primary dark:hover:text-primary flex items-center justify-center transition-all"
                data-interactive
                aria-label="Share project"
              >
                <Share2 size={15} />
              </button>
              <AnimatePresence>
                {shareOpen && (
                  <ShareMenu url={project.link} title={project.title} onClose={() => setShareOpen(false)} />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.filterTag === activeFilter);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-600 hover:text-primary transition-colors mb-12"
          data-interactive
          data-testid="back-home"
        >
          <ArrowLeft size={16} />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Portfolio
          </div>
          <h1 className="text-5xl md:text-6xl font-bold dark:text-white text-gray-900 mb-5">
            All Projects
          </h1>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-xl">
            A collection of websites built for businesses, clinics, restaurants, and brands across India.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f.tag}
              onClick={() => setActiveFilter(f.tag)}
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.tag
                  ? "text-white shadow-[0_0_16px_rgba(59,130,246,0.35)]"
                  : "dark:text-gray-400 text-gray-600 dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200"
              }`}
              data-interactive
            >
              {activeFilter === f.tag && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-aurora"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="dark:text-gray-400 text-gray-600 mb-5">
            Have a project in mind? Let's build something premium together.
          </p>
          <button
            onClick={() => { setLocation("/"); setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 100); }}
            className="px-8 py-4 rounded-full bg-gradient-aurora text-white font-bold hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] transition-all"
            data-interactive
            data-testid="cta-start-project"
          >
            Start Your Project
          </button>
        </motion.div>
      </div>
    </div>
  );
}
