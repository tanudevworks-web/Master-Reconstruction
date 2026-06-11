import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useLocation } from "wouter";

const projects = [
  {
    title: "BusinessPro",
    category: "Business Corporate",
    color: "from-blue-500/20 to-blue-900/20",
    hoverColor: "group-hover:border-blue-500/50"
  },
  {
    title: "RestaurantX",
    category: "Premium Dining",
    color: "from-orange-500/20 to-red-900/20",
    hoverColor: "group-hover:border-orange-500/50"
  },
  {
    title: "MedClinic",
    category: "Healthcare Platform",
    color: "from-teal-500/20 to-emerald-900/20",
    hoverColor: "group-hover:border-teal-500/50"
  }
];

function ProjectCard({ project, index }: { project: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full aspect-[4/3] rounded-2xl glass-panel border border-white/10 ${project.hoverColor} transition-colors duration-500 overflow-hidden group cursor-none`}
      data-cursor-text="View Project"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40`} />
      
      {/* Abstract Mockup inside */}
      <div className="absolute inset-8 rounded-xl bg-black/50 border border-white/5 shadow-2xl overflow-hidden transform-gpu translate-z-12 group-hover:scale-105 transition-transform duration-700">
        <div className="w-full h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <div className="p-6">
          <div className="w-1/3 h-4 rounded bg-white/10 mb-6" />
          <div className="w-full h-32 rounded bg-white/5 mb-4" />
          <div className="w-2/3 h-4 rounded bg-white/5" />
        </div>
      </div>

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
