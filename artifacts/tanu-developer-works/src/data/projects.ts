export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  filterTag: string;
  tech: string[];
  link: string;
  gradient: string;
  icon: string;
  status: "Live" | "In Progress";
  completedAt: string;
  performance: number;
  seo: number;
}

export const projects: Project[] = [
  {
    id: "restaurant-website",
    title: "Restaurant Website",
    description: "A premium dining experience website with online menu, gallery, table reservation system, and WhatsApp ordering integration.",
    category: "Restaurant",
    filterTag: "restaurant",
    tech: ["React", "Tailwind", "Firebase"],
    link: "https://serai-fa-premium.vercel.app/",
    gradient: "from-orange-500/30 to-red-600/30",
    icon: "🍽️",
    status: "Live",
    completedAt: "Dec 2024",
    performance: 96,
    seo: 94,
  },
  {
    id: "dental-clinic-website",
    title: "Dental Clinic Website",
    description: "Modern healthcare web presence with appointment booking, service listings, doctor profiles, and trust-building testimonials.",
    category: "Healthcare",
    filterTag: "healthcare",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://somil-dental-clinic.vercel.app/",
    gradient: "from-blue-500/30 to-cyan-600/30",
    icon: "🦷",
    status: "Live",
    completedAt: "Nov 2024",
    performance: 98,
    seo: 96,
  },
  {
    id: "gaming-website",
    title: "Gaming Website",
    description: "PC game compatibility checker featuring system requirement analysis, game comparisons, FPS estimates, and hardware recommendations.",
    category: "Gaming",
    filterTag: "gaming",
    tech: ["React", "Framer Motion", "Tailwind"],
    link: "https://tanugamehub.vercel.app",
    gradient: "from-pink-500/30 to-purple-600/30",
    icon: "🎮",
    status: "Live",
    completedAt: "Jan 2025",
    performance: 94,
    seo: 88,
  },
  {
    id: "gym-website",
    title: "Gym Website",
    description: "High-energy fitness center website with class schedules, membership plans, trainer profiles, and a motivating visual design.",
    category: "Fitness",
    filterTag: "fitness",
    tech: ["React", "Tailwind", "TypeScript"],
    link: "https://aurum-gym.vercel.app/",
    gradient: "from-yellow-500/30 to-orange-600/30",
    icon: "🏋️",
    status: "Live",
    completedAt: "Feb 2025",
    performance: 97,
    seo: 92,
  },
  {
    id: "clothing-website",
    title: "Clothing Website",
    description: "Stylish fashion e-commerce site with product listings, category filters, a clean shopping experience, and a modern visual identity.",
    category: "Fashion",
    filterTag: "fashion",
    tech: ["Next.js", "Tailwind", "Firebase"],
    link: "https://sea-clothing.vercel.app",
    gradient: "from-green-500/30 to-teal-600/30",
    icon: "👗",
    status: "Live",
    completedAt: "Mar 2025",
    performance: 95,
    seo: 90,
  },
  {
    id: "ecommerce-website",
    title: "E-Commerce Website",
    description: "Full-featured online store with product catalog, cart, payment gateway integration, order tracking, and admin dashboard.",
    category: "E-Commerce",
    filterTag: "ecommerce",
    tech: ["Next.js", "TypeScript", "Stripe"],
    link: "https://ecommerce-pro-tanu.vercel.app/",
    gradient: "from-purple-500/30 to-blue-600/30",
    icon: "🛒",
    status: "Live",
    completedAt: "Apr 2025",
    performance: 93,
    seo: 91,
  },
];
