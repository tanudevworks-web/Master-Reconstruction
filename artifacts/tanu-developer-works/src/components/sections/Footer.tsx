import { SiInstagram, SiGithub, SiWhatsapp } from "react-icons/si";
import { Mail, Linkedin } from "lucide-react";

export const CONTACT = {
  whatsapp:  "https://wa.me/918433553501",
  instagram: "https://www.instagram.com/tanuuuyyyy?igsh=cDAya3h0YnpxcmFq",
  email:     "mailto:tanudevworks@gmail.com",
  github:    "https://github.com/tanudevworks-web",
  linkedin:  "https://www.linkedin.com/in/tanu-tapase-461405411",
};

const socials = [
  { icon: SiInstagram, href: CONTACT.instagram, label: "Instagram", glow: "rgba(236,72,153,0.25)" },
  { icon: Linkedin,    href: CONTACT.linkedin,  label: "LinkedIn",  glow: "rgba(59,130,246,0.25)" },
  { icon: SiGithub,   href: CONTACT.github,    label: "GitHub",    glow: "rgba(255,255,255,0.15)" },
  { icon: SiWhatsapp, href: CONTACT.whatsapp,  label: "WhatsApp",  glow: "rgba(34,197,94,0.25)" },
  { icon: Mail,       href: CONTACT.email,     label: "Email",     glow: "rgba(59,130,246,0.25)" },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Connect heading + socials */}
        <div className="text-center mb-16">
          <h2
            className="font-bold text-white mb-8"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            Let's Connect & Build Something Amazing
          </h2>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {socials.map(({ icon: Icon, href, label, glow }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="group relative w-11 h-11 rounded-full glass-panel flex items-center justify-center text-white/40 transition-all duration-300 hover:text-white"
                style={{ "--glow": glow } as React.CSSProperties}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px ${glow}`;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${glow}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "";
                }}
                data-interactive
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-14" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "3.5rem" }}>
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-base font-bold text-white mb-3">
              Tanu<span className="text-gradient-aurora">Developer Works</span>
            </h3>
            <p className="text-white/35 text-sm leading-relaxed max-w-sm mb-3">
              Building the Web's Most Premium Experiences. Elevating brands through precision engineering and visionary design.
            </p>
            <p className="text-white/20 text-xs leading-relaxed italic">
              Thank you Replit ❤️ — Crafted with creativity, innovation, and modern web technologies.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home",      href: "#home" },
                { label: "About",     href: "#about" },
                { label: "Services",  href: "#services" },
                { label: "Portfolio", href: "#work" },
                { label: "Projects",  href: "/projects" },
                { label: "Pricing",   href: "#pricing" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-white/35 hover:text-white/70 transition-colors" data-interactive>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="#contact" className="text-sm text-white/35 hover:text-white/70 transition-colors" data-interactive>
                  Start a Project
                </a>
              </li>
              <li>
                <a href={CONTACT.email} className="text-sm text-white/35 hover:text-white/70 transition-colors flex items-center gap-2" data-interactive>
                  <Mail size={12} /> tanudevworks@gmail.com
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                   className="text-sm text-white/35 hover:text-white/70 transition-colors flex items-center gap-2" data-interactive>
                  <SiWhatsapp size={12} /> +91 84335 53501
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
             style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p className="text-xs text-white/20">© {new Date().getFullYear()} TanuDeveloper Works. All rights reserved.</p>
          <p className="text-xs text-white/20">Built with ❤️ and TypeScript · Powered by RT IMMORTALITY</p>
        </div>

      </div>
    </footer>
  );
}
