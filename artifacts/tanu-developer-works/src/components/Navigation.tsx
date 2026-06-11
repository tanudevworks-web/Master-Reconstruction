import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

const links = [
  { name: "Home", href: "#home", path: "/" },
  { name: "About", href: "#about", path: "/" },
  { name: "Services", href: "#services", path: "/" },
  { name: "Work", href: "#work", path: "/" },
  { name: "Pricing", href: "#pricing", path: "/" },
  { name: "Projects", href: "/projects", path: "/projects" },
  { name: "Contact", href: "#contact", path: "/" },
];

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navigation({ isDark, onToggleTheme }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link: (typeof links)[0]) => {
    setIsOpen(false);
    if (link.path === "/projects") {
      setLocation("/projects");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (window.location.pathname !== "/") {
      setLocation("/");
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(link.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "py-4 backdrop-blur-xl border-b" : "py-6"
        }`}
        style={{
          backgroundColor: isScrolled
            ? isDark
              ? "rgba(5,5,5,0.9)"
              : "rgba(255,255,255,0.9)"
            : "transparent",
          borderBottomColor: isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.08)",
        }}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick({ name: "Home", href: "#home", path: "/" });
            }}
            className="text-xl font-bold tracking-tight z-50 relative"
            data-interactive
            data-testid="nav-logo"
          >
            <span className="dark:text-white text-gray-900">Tanu</span>
            <span className="text-gradient-aurora">Developer Works</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
                className="text-sm font-medium dark:text-gray-300 text-gray-600 hover:text-primary transition-colors"
                data-interactive
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center dark:text-gray-300 text-gray-600 hover:text-primary transition-colors"
              aria-label="Toggle theme"
              data-interactive
              data-testid="theme-toggle"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "moon" : "sun"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick({
                  name: "Contact",
                  href: "#contact",
                  path: "/",
                });
              }}
              className="px-5 py-2.5 rounded-full text-sm font-bold bg-white dark:text-black text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors shadow-sm"
              data-interactive
              data-testid="nav-cta"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3 z-50 relative">
            <button
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center dark:text-gray-300 text-gray-600"
              aria-label="Toggle theme"
              data-interactive
              data-testid="theme-toggle-mobile"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="dark:text-white text-gray-900"
              onClick={() => setIsOpen(!isOpen)}
              data-interactive
              data-testid="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-nav-overlay fixed inset-0 z-30 backdrop-blur-xl flex flex-col items-center justify-center"
            style={{
              backgroundColor: isDark
                ? "rgba(5,5,5,0.97)"
                : "rgba(250,250,255,0.97)",
            }}
          >
            <div className="flex flex-col items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link);
                  }}
                  className="text-2xl font-bold dark:text-white text-gray-900 hover:text-primary transition-colors"
                  data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
