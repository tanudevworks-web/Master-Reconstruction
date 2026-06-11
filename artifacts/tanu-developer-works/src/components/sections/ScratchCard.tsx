import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Gift } from "lucide-react";

const WHATSAPP_NUMBER = "918433553501";

const rewards = [
  "5% Discount",
  "10% Discount",
  "Free SEO Setup",
  "Free Google Business Setup",
  "Free Consultation Call",
];

function pickReward(): string {
  const sessionKey = "tdw-scratch-reward";
  const existing = sessionStorage.getItem(sessionKey);
  if (existing) return existing;
  const picked = rewards[Math.floor(Math.random() * rewards.length)];
  sessionStorage.setItem(sessionKey, picked);
  return picked;
}

function alreadyScratched(): boolean {
  return !!sessionStorage.getItem("tdw-scratch-done");
}

function markScratched() {
  sessionStorage.setItem("tdw-scratch-done", "1");
}

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(alreadyScratched);
  const [reward] = useState(pickReward);
  const [scratchPct, setScratchPct] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);
  const isDrawing = useRef(false);
  const REVEAL_THRESHOLD = 55;

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Silver scratch layer
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#c0c0c0");
    gradient.addColorStop(0.4, "#e8e8e8");
    gradient.addColorStop(0.6, "#b0b0b0");
    gradient.addColorStop(1, "#d0d0d0");
    ctx.fillStyle = gradient;
    ctx.roundRect(0, 0, canvas.width, canvas.height, 16);
    ctx.fill();
    // "Scratch here" text
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(80,80,80,0.7)";
    ctx.font = "bold 14px 'Space Grotesk', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch here to reveal ✦", canvas.width / 2, canvas.height / 2);
  }, []);

  useEffect(() => {
    if (!revealed) initCanvas();
  }, [revealed, initCanvas]);

  const getScratchPercent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) transparent++;
    }
    return (transparent / (canvas.width * canvas.height)) * 100;
  }, []);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc((x - rect.left) * scaleX, (y - rect.top) * scaleY, 24, 0, Math.PI * 2);
    ctx.fill();
    const pct = getScratchPercent();
    setScratchPct(pct);
    if (pct >= REVEAL_THRESHOLD) {
      markScratched();
      setTimeout(() => setRevealed(true), 300);
    }
  }, [getScratchPercent]);

  const onMouseDown = (e: React.MouseEvent) => { isDrawing.current = true; scratch(e.clientX, e.clientY); };
  const onMouseMove = (e: React.MouseEvent) => { if (isDrawing.current) scratch(e.clientX, e.clientY); };
  const onMouseUp = () => { isDrawing.current = false; };

  const onTouchStart = (e: React.TouchEvent) => { e.preventDefault(); isDrawing.current = true; scratch(e.touches[0].clientX, e.touches[0].clientY); };
  const onTouchMove = (e: React.TouchEvent) => { e.preventDefault(); if (isDrawing.current) scratch(e.touches[0].clientX, e.touches[0].clientY); };
  const onTouchEnd = () => { isDrawing.current = false; };

  const claimOffer = () => {
    if (!name || !phone) return;
    const msg = encodeURIComponent(`Hi Tanu!\n\nI scratched and won: *${reward}*\n\nName: ${name}\nWhatsApp: ${phone}\n\nPlease apply my offer!`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSaved(true);
  };

  return (
    <section id="offer" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Exclusive Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Unlock Your Exclusive Offer
          </h2>
          <p className="dark:text-gray-400 text-gray-600">
            One scratch card per session. Reveal your personalised offer below.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <div className="glass-panel rounded-3xl p-8 border dark:border-white/10 border-gray-200 shadow-[0_4px_32px_rgba(0,0,0,0.08)]">
            {/* Card header */}
            <div className="flex items-center gap-2 mb-6">
              <Gift size={18} className="text-blue-500" />
              <p className="font-bold dark:text-white text-gray-900 text-sm">TanuDeveloper Works — Exclusive Offer</p>
            </div>

            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.div key="scratch" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Reward underneath (visible through scratching) */}
                  <div className="relative rounded-2xl overflow-hidden" style={{ height: 140 }}>
                    {/* Reward layer */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-2xl">
                      <p className="text-3xl font-black text-gradient-aurora mb-1">{reward}</p>
                      <p className="text-xs dark:text-gray-400 text-gray-500">Your reward awaits</p>
                    </div>
                    {/* Scratch canvas on top */}
                    <canvas
                      ref={canvasRef}
                      width={480}
                      height={160}
                      className="absolute inset-0 w-full h-full rounded-2xl cursor-crosshair touch-none select-none"
                      onMouseDown={onMouseDown}
                      onMouseMove={onMouseMove}
                      onMouseUp={onMouseUp}
                      onMouseLeave={onMouseUp}
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                    />
                  </div>
                  {/* Progress */}
                  <div className="mt-4">
                    <div className="h-1 dark:bg-white/8 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${Math.min(scratchPct / REVEAL_THRESHOLD * 100, 100)}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <p className="text-xs dark:text-gray-500 text-gray-400 text-center mt-2">
                      {scratchPct < REVEAL_THRESHOLD ? "Keep scratching…" : "Revealing…"}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  {/* Revealed reward */}
                  <div className="text-center py-6 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border dark:border-white/8 border-blue-200/60">
                    <p className="text-sm dark:text-gray-400 text-gray-500 mb-1">You unlocked</p>
                    <p className="text-3xl font-black text-gradient-aurora mb-1">{reward}</p>
                    <p className="text-xs dark:text-gray-500 text-gray-400">Valid on your next project</p>
                  </div>

                  {!saved ? (
                    <div className="space-y-3">
                      <p className="text-sm dark:text-gray-300 text-gray-700 font-medium mb-3">Claim your offer via WhatsApp:</p>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        data-interactive
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        data-interactive
                      />
                      <button
                        onClick={claimOffer}
                        disabled={!name || !phone}
                        data-interactive
                        className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                          name && phone
                            ? "bg-green-500 hover:bg-green-600 text-white shadow-[0_4px_16px_rgba(34,197,94,0.3)]"
                            : "dark:bg-white/8 bg-gray-200 dark:text-gray-500 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <MessageCircle size={15} />
                        Claim on WhatsApp
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-green-500 font-bold text-lg mb-1">Offer Claimed! 🎉</p>
                      <p className="text-sm dark:text-gray-400 text-gray-500">Check WhatsApp — Tanu will confirm your offer shortly.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
