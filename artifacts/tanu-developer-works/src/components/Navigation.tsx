import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

const links = [
  { name: "About",    href: "#about",    path: "/" },
  { name: "Services", href: "#services", path: "/" },
  { name: "Work",     href: "#work",     path: "/" },
  { name: "Pricing",  href: "#pricing",  path: "/" },
  { name: "Projects", href: "/projects", path: "/projects" },
];

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navigation({ isDark: _isDark, onToggleTheme: _toggle }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (link: (typeof links)[0]) => {
    setOpen(false);
    if (link.path === "/projects") {
      setLocation("/projects");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (window.location.pathname !== "/") {
      setLocation("/");
      setTimeout(() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          paddingTop: scrolled ? "1rem" : "1.5rem",
          paddingBottom: scrolled ? "1rem" : "1.5rem",
          background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); go({ name: "Home", href: "#home", path: "/" }); }}
            className="text-base font-bold tracking-tight z-50 relative text-white"
            data-interactive
            data-testid="nav-logo"
          >
            Tanu<span className="text-gradient-aurora">Developer Works</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => go(link)}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200"
                data-interactive
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => go({ name: "Contact", href: "#contact", path: "/" })}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-white hover:bg-white/90 transition-all"
              data-interactive
              data-testid="nav-cta"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-white z-50 relative"
            onClick={() => setOpen(!open)}
            data-interactive
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center"
            style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(24px)" }}
          >
            <div className="flex flex-col items-center gap-10">
              {links.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => go(link)}
                  className="text-3xl font-bold text-white/80 hover:text-white transition-colors"
                  data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.06 }}
                onClick={() => go({ name: "Contact", href: "#contact", path: "/" })}
                className="mt-4 px-8 py-3 rounded-full bg-white text-black font-bold text-lg"
                data-interactive
              >
                Let's Talk
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
