import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { GripVertical, ArrowRight } from "lucide-react";

function OldBusinessMockup() {
  return (
    <div className="w-full h-full bg-[#f5f0e8] flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Noisy background */}
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 20px)" }}
      />
      <div className="relative z-10 text-center w-full max-w-[260px]">
        {/* WhatsApp Status style card */}
        <div className="bg-yellow-400 rounded-lg p-4 mb-4 shadow-md border-4 border-yellow-600">
          <p className="text-black font-black text-lg leading-tight">🏪 SHARMA JI KI DUKAN</p>
          <div className="border-t-2 border-black/20 my-2" />
          <p className="text-black text-xs font-bold">📱 CALL / WHATSAPP</p>
          <p className="text-black text-sm font-black">98765 43210</p>
        </div>
        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm border border-gray-300">
          <p className="text-gray-800 text-xs font-semibold mb-1">🛍️ Hum bechte hain:</p>
          <p className="text-gray-600 text-[10px] leading-relaxed">Kapde, Jute, Bag, Accessories aur bhi bahut kuch... call karo pata karo</p>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-orange-100 border border-orange-300 rounded p-2">
            <p className="text-orange-700 text-[9px] font-bold">📍 Location</p>
            <p className="text-orange-600 text-[9px]">Market ke paas</p>
          </div>
          <div className="flex-1 bg-red-100 border border-red-300 rounded p-2">
            <p className="text-red-700 text-[9px] font-bold">⏰ Timings</p>
            <p className="text-red-600 text-[9px]">Puchh ke aana</p>
          </div>
        </div>
        <p className="text-gray-400 text-[9px] mt-3 italic">No website. No Google listing. No trust.</p>
      </div>
    </div>
  );
}

function NewWebsiteMockup() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] flex flex-col overflow-hidden select-none relative">
      {/* Nav */}
      <div className="flex items-center px-4 py-2.5 border-b border-white/8 flex-shrink-0 bg-black/40 backdrop-blur-sm">
        <div className="text-xs font-black text-transparent bg-clip-text" style={{backgroundImage:"linear-gradient(135deg,#3b82f6,#8b5cf6)"}}>TDW</div>
        <div className="flex-1" />
        {["Services","Work","Pricing"].map(n => (
          <span key={n} className="text-[9px] text-gray-500 ml-3">{n}</span>
        ))}
        <div className="ml-3 px-2 py-0.5 rounded-full text-[9px] font-bold text-white" style={{background:"linear-gradient(135deg,#3b82f6,#8b5cf6)"}}>Hire Me</div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-2 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full blur-3xl opacity-20" style={{background:"#3b82f6"}} />
          <div className="absolute bottom-4 right-1/4 w-24 h-24 rounded-full blur-3xl opacity-15" style={{background:"#8b5cf6"}} />
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold mb-2 border border-white/10 text-gray-400">
            <span className="w-1 h-1 rounded-full bg-green-400 inline-block" />
            Available for projects
          </div>
          <h3 className="text-white font-black text-base leading-tight mb-1">
            Premium Websites<br/>
            <span className="text-transparent bg-clip-text" style={{backgroundImage:"linear-gradient(135deg,#3b82f6,#8b5cf6)"}}>Built to Convert</span>
          </h3>
          <p className="text-gray-500 text-[9px] mb-3 leading-relaxed">React • Firebase • Framer Motion</p>
          <div className="flex gap-2 justify-center">
            <div className="px-3 py-1 rounded-full text-[9px] font-bold text-white" style={{background:"linear-gradient(135deg,#3b82f6,#8b5cf6)"}}>View Portfolio</div>
            <div className="px-3 py-1 rounded-full text-[9px] text-gray-400 border border-white/10">Get Quote</div>
          </div>
        </div>

        {/* Stat chips */}
        <div className="flex gap-2 mt-3 relative z-10">
          {[["128+","Clients"],["4.9★","Rating"],["3 Days","Delivery"]].map(([v,l]) => (
            <div key={l} className="flex flex-col items-center px-2 py-1.5 rounded-xl bg-white/4 border border-white/8">
              <span className="text-[10px] font-black text-white">{v}</span>
              <span className="text-[8px] text-gray-500">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(42); // percent
  const [dragging, setDragging] = useState(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 8), 92);
    setPos(pct);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (dragging) updatePos(e.clientX);
  }, [dragging, updatePos]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (dragging && e.touches[0]) updatePos(e.touches[0].clientX);
  }, [dragging, updatePos]);

  const stop = useCallback(() => setDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
    };
  }, [onMouseMove, onTouchMove, stop]);

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-600/6 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-600/6 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            The Difference
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Before vs After
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-xl mx-auto">
            Drag the slider to see what a professional website does for your business.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Labels */}
          <div className="flex justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
              <span className="text-xs font-bold dark:text-gray-400 text-gray-500">Without a Website</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold dark:text-gray-400 text-gray-500">With TanuDeveloper Works</span>
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative h-[400px] md:h-[440px] rounded-3xl overflow-hidden border dark:border-white/10 border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.2)] cursor-ew-resize select-none"
          >
            {/* After (full width, behind) */}
            <div className="absolute inset-0">
              <NewWebsiteMockup />
            </div>

            {/* Before (clipped to left side) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <div className="absolute inset-0" style={{ width: containerRef.current?.offsetWidth ?? 700 }}>
                <OldBusinessMockup />
              </div>
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)] pointer-events-none"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            />

            {/* Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex items-center justify-center z-20 touch-none"
              style={{ left: `${pos}%` }}
              onMouseDown={(e) => { e.preventDefault(); setDragging(true); }}
              onTouchStart={() => setDragging(true)}
            >
              <GripVertical size={16} className="text-gray-500" />
            </div>

            {/* Hint on first view */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: dragging ? 0 : 1 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 pointer-events-none"
            >
              <ArrowRight size={11} className="text-white rotate-180" />
              <span className="text-white text-[10px] font-medium">Drag to compare</span>
              <ArrowRight size={11} className="text-white" />
            </motion.div>
          </div>

          {/* Bottom stats comparison */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="glass-panel rounded-2xl p-5 border dark:border-red-500/20 border-red-200">
              <p className="text-xs font-bold text-red-500 mb-3 uppercase tracking-wide">Without Website</p>
              <div className="space-y-2">
                {[
                  "Invisible on Google",
                  "Lost to competitors",
                  "Looks unprofessional",
                  "WhatsApp only",
                  "No 24/7 presence",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="text-xs dark:text-gray-400 text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-5 border dark:border-green-500/20 border-green-200">
              <p className="text-xs font-bold text-green-500 mb-3 uppercase tracking-wide">With TanuDeveloper Works</p>
              <div className="space-y-2">
                {[
                  "Ranks on Google",
                  "Stands out from competition",
                  "Instant credibility",
                  "Works 24/7 for you",
                  "Converts visitors to leads",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    <span className="text-xs dark:text-gray-400 text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
