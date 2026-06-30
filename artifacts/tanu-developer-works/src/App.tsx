import { useState, useEffect } from "react";
import { Router, Route, Switch } from "wouter";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ChatBot } from "@/components/ChatBot";
import { SocialActivityWidget } from "@/components/SocialActivityWidget";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { SocialProofCounter } from "@/components/sections/SocialProofCounter";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FounderProfile } from "@/components/sections/FounderProfile";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { DemoRequest } from "@/components/sections/DemoRequest";
import { Process } from "@/components/sections/Process";
import { CostComparison } from "@/components/sections/CostComparison";
import { ReadinessScore } from "@/components/sections/ReadinessScore";
import { Pricing } from "@/components/sections/Pricing";
import { PaymentBadge } from "@/components/sections/PaymentBadge";
import { FAQ } from "@/components/sections/FAQ";
import { NameGenerator } from "@/components/sections/NameGenerator";
import { PriceCalculator } from "@/components/sections/PriceCalculator";
import { ScratchCard } from "@/components/sections/ScratchCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { SocialPresence } from "@/components/sections/SocialPresence";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Projects } from "@/pages/Projects";
import { useTheme } from "@/hooks/useTheme";

// ─── Easter eggs ───────────────────────────────────────────────────────────────
function useEasterEggs() {
  useEffect(() => {
    // Console message
    console.log(
      "%c\n👋 Hey developer! Thanks for inspecting.\n\n" +
        "  Built with ❤️  by TanuDeveloper Works\n" +
        "  React · TypeScript · Tailwind CSS · Framer Motion · Firebase\n\n" +
        "  🚀 Let's build something amazing together.\n" +
        "  📱 WhatsApp: +91 84335 53501\n",
      "color:#8b5cf6;font-size:13px;font-weight:bold;background:#0a0a0a;padding:16px 20px;border-radius:12px;border-left:3px solid #3b82f6;",
    );

    // Konami code: ↑↑↓↓←→←→BA
    const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let idx = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          idx = 0;
          // Flash the page aurora briefly
          const el = document.createElement("div");
          el.style.cssText =
            "position:fixed;inset:0;pointer-events:none;z-index:9999;background:linear-gradient(135deg,rgba(59,130,246,0.15),rgba(139,92,246,0.15));animation:fadeOut 1.5s ease forwards";
          const style = document.createElement("style");
          style.textContent = "@keyframes fadeOut{0%{opacity:1}100%{opacity:0}}";
          document.head.appendChild(style);
          document.body.appendChild(el);
          setTimeout(() => { el.remove(); style.remove(); }, 1600);
          console.log(
            "%c🎉 KONAMI CODE ACTIVATED! You found the easter egg!\nBuilt with obsession by TanuDeveloper Works.",
            "color:#f0abfc;font-size:14px;font-weight:bold;",
          );
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}

// ─── Home page ─────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <main>
      {/* — Awareness — */}
      <Hero />
      <SocialProofCounter />
      <WhyChooseUs />

      {/* — Trust — */}
      <FounderProfile />
      <Services />

      {/* — Proof — */}
      <TechStack />
      <FeaturedWork />
      <BeforeAfterSlider />
      <DemoRequest />

      {/* — Education — */}
      <Process />
      <CostComparison />

      {/* — Engagement — */}
      <ReadinessScore />

      {/* — Conversion — */}
      <Pricing />
      <PaymentBadge />
      <FAQ />
      <NameGenerator />
      <PriceCalculator />

      {/* — Capture — */}
      <ScratchCard />
      <Testimonials />
      <SocialPresence />
      <Contact />
    </main>
  );
}

// ─── App root ──────────────────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true);
  const { isDark, toggle } = useTheme();
  useEasterEggs();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 font-sans transition-colors duration-300">
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <Router>
          <CustomCursor />
          <FloatingWhatsApp />
          <ChatBot />
          <SocialActivityWidget />
          <ExitIntentPopup />
          <Navigation isDark={isDark} onToggleTheme={toggle} />
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/projects" component={Projects} />
          </Switch>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
