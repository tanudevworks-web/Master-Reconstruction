import { SiInstagram, SiGithub, SiWhatsapp } from "react-icons/si";
import { Mail, Linkedin } from "lucide-react";

/** ── Central contact config — edit once, propagates everywhere ── */
export const CONTACT = {
  whatsapp:  "https://wa.me/918433553501",
  instagram: "https://www.instagram.com/tanuuuyyyy?igsh=cDAya3h0YnpxcmFq",
  email:     "mailto:tanudevworks@gmail.com",
  github:    "https://github.com/tanudevworks-web",
  linkedin:  "https://www.linkedin.com/in/tanu-tapase-461405411",
};

const socials = [
  { icon: SiInstagram, href: CONTACT.instagram, label: "Instagram", color: "hover:text-pink-500 hover:border-pink-500/40 hover:shadow-[0_0_16px_rgba(236,72,153,0.3)]" },
  { icon: Linkedin,    href: CONTACT.linkedin,  label: "LinkedIn",  color: "hover:text-blue-400 hover:border-blue-400/40 hover:shadow-[0_0_16px_rgba(59,130,246,0.3)]" },
  { icon: SiGithub,   href: CONTACT.github,    label: "GitHub",    color: "hover:text-white hover:border-white/40 hover:shadow-[0_0_16px_rgba(255,255,255,0.2)]" },
  { icon: SiWhatsapp, href: CONTACT.whatsapp,  label: "WhatsApp",  color: "hover:text-green-400 hover:border-green-400/40 hover:shadow-[0_0_16px_rgba(34,197,94,0.3)]" },
  { icon: Mail,       href: CONTACT.email,     label: "Email",     color: "hover:text-purple-400 hover:border-purple-400/40 hover:shadow-[0_0_16px_rgba(168,85,247,0.3)]" },
];

export function Footer() {
  return (
    <footer className="relative border-t pt-20 pb-10 overflow-hidden dark:bg-[#050505] dark:border-white/10 bg-gray-50 border-gray-200">
      <div className="footer-aurora-line absolute top-0 left-0 right-0 h-[1px] bg-gradient-aurora opacity-40" />

      <div className="container mx-auto px-6 md:px-12">

        {/* Social icons */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 mb-4">
            Let's Connect & Build Something Amazing
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {socials.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className={`group relative w-12 h-12 rounded-full glass-panel flex items-center justify-center dark:text-gray-400 text-gray-500 border dark:border-white/10 border-gray-200 transition-all duration-300 ${color}`}
                data-interactive
              >
                <Icon size={20} />
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold dark:bg-white/10 bg-gray-900 dark:text-white text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-sm">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-16 border-t dark:border-white/5 border-gray-100 pt-14">

          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold tracking-tight mb-3 flex items-center gap-2">
              <span className="dark:text-white text-gray-900">Tanu</span>
              <span className="text-gradient-aurora">Developer Works</span>
            </h2>
            <p className="dark:text-gray-400 text-gray-500 max-w-sm mb-3 text-sm leading-relaxed">
              Building the Web's Most Premium Experiences. Elevating brands through precision engineering and visionary design.
            </p>
            <p className="dark:text-gray-600 text-gray-400 max-w-sm text-xs leading-relaxed italic">
              Thank you Replit ❤️ — Crafted with creativity, innovation, and modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold dark:text-white text-gray-900 mb-5 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home",     href: "#home" },
                { label: "About",    href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Portfolio",href: "#work" },
                { label: "Projects", href: "/projects" },
                { label: "Pricing",  href: "#pricing" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="dark:text-gray-400 text-gray-500 hover:text-primary transition-colors" data-interactive>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold dark:text-white text-gray-900 mb-5 uppercase tracking-wider text-xs">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#contact" className="dark:text-gray-400 text-gray-500 hover:text-primary transition-colors" data-interactive>Start a Project</a></li>
              <li>
                <a href={CONTACT.email} className="dark:text-gray-400 text-gray-500 hover:text-primary transition-colors flex items-center gap-2" data-interactive>
                  <Mail size={13} /> tanudevworks@gmail.com
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="dark:text-gray-400 text-gray-500 hover:text-primary transition-colors flex items-center gap-2" data-interactive>
                  <SiWhatsapp size={13} /> +91 84335 53501
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t dark:border-white/10 border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs dark:text-gray-500 text-gray-400">
          <p>© {new Date().getFullYear()} TanuDeveloper Works. All rights reserved.</p>
          <p>Built with ❤️ and TypeScript · Powered by RT IMMORTALITY</p>
        </div>
      </div>
    </footer>
  );
}
