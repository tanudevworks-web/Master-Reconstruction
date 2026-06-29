import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

/**
 * Projects data — easy to extend.
 * Replace `image` with a real screenshot URL, `link` with the live project URL.
 * Add new entries to this array — the grid will adapt automatically.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  link: string;
  /** Tailwind gradient for the placeholder thumbnail */
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "restaurant-website",
    title: "Restaurant Website",
    description:
      "A premium dining experience website with online menu, gallery, table reservation system, and WhatsApp ordering integration.",
    category: "Restaurant",
    tech: ["React", "Tailwind", "Firebase"],
    link: " https://serai-fa-premium.vercel.app/ ",
    gradient: "from-orange-500/30 to-red-600/30",
  },
  {
    id: "dental-clinic-website",
    title: "Dental Clinic Website",
    description:
      "Modern healthcare web presence with appointment booking, service listings, doctor profiles, and trust-building testimonials.",
    category: "Healthcare",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    link: "#",
    gradient: "from-blue-500/30 to-cyan-600/30",
  },
  {
    id: "salon-website",
    title: "Salon Website",
    description:
      "Elegant salon & beauty studio website featuring service menu, staff showcase, online booking, and Instagram gallery feed.",
    category: "Beauty & Wellness",
    tech: ["React", "Framer Motion", "Tailwind"],
    link: "#",
    gradient: "from-pink-500/30 to-purple-600/30",
  },
  {
    id: "gym-website",
    title: "Gym Website",
    description:
      "High-energy fitness center website with class schedules, membership plans, trainer profiles, and a motivating visual design.",
    category: "Fitness",
    tech: ["React", "Tailwind", "TypeScript"],
    link: "#",
    gradient: "from-yellow-500/30 to-orange-600/30",
  },
  {
    id: "real-estate-website",
    title: "Real Estate Website",
    description:
      "Premium property listing platform with advanced filters, virtual tour integration, lead capture forms, and interactive maps.",
    category: "Real Estate",
    tech: ["Next.js", "Tailwind", "Firebase"],
    link: "#",
    gradient: "from-green-500/30 to-teal-600/30",
  },
  {
    id: "ecommerce-website",
    title: "E-Commerce Website",
    description:
      "Full-featured online store with product catalog, cart, payment gateway integration, order tracking, and admin dashboard.",
    category: "E-Commerce",
    tech: ["Next.js", "TypeScript", "Stripe"],
    link: "#",
    gradient: "from-purple-500/30 to-blue-600/30",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group glass-panel rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300"
      data-testid={`project-card-${project.id}`}
    >
      {/* Thumbnail placeholder */}
      <div
        className={`relative h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
      >
        <div className="absolute inset-0 backdrop-blur-[1px]" />
        {/* Decorative mockup lines */}
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
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-xs font-semibold dark:bg-white/5 bg-black/5 dark:text-gray-300 text-gray-600"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
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
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Back button */}
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Portfolio
          </div>
          <h1 className="text-5xl md:text-6xl font-bold dark:text-white text-gray-900 mb-5">
            All Projects
          </h1>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-xl">
            A collection of websites built for businesses, clinics, restaurants,
            and brands across India.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
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
            onClick={() => {
              setLocation("/");
              setTimeout(
                () =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" }),
                100,
              );
            }}
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
