import { useState } from "react";
import { Router, Route, Switch } from "wouter";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SocialActivityWidget } from "@/components/SocialActivityWidget";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FounderProfile } from "@/components/sections/FounderProfile";
import { Services } from "@/components/sections/Services";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { DemoRequest } from "@/components/sections/DemoRequest";
import { Process } from "@/components/sections/Process";
import { CostComparison } from "@/components/sections/CostComparison";
import { ReadinessScore } from "@/components/sections/ReadinessScore";
import { Pricing } from "@/components/sections/Pricing";
import { NameGenerator } from "@/components/sections/NameGenerator";
import { PriceCalculator } from "@/components/sections/PriceCalculator";
import { ScratchCard } from "@/components/sections/ScratchCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { SocialPresence } from "@/components/sections/SocialPresence";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Projects } from "@/pages/Projects";
import { useTheme } from "@/hooks/useTheme";

function HomePage() {
  return (
    <main>
      {/* — Awareness — */}
      <Hero />
      <Stats />
      <WhyChooseUs />

      {/* — Trust — */}
      <FounderProfile />
      <Services />

      {/* — Proof — */}
      <FeaturedWork />
      <DemoRequest />

      {/* — Education — */}
      <Process />
      <CostComparison />

      {/* — Engagement — */}
      <ReadinessScore />

      {/* — Conversion — */}
      <Pricing />
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

function App() {
  const [loading, setLoading] = useState(true);
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 font-sans transition-colors duration-300">
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <Router>
          <CustomCursor />
          <FloatingWhatsApp />
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
