import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"logo" | "text" | "done">("logo");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("text"), 800);
    const timer2 = setTimeout(() => setPhase("done"), 1800);
    const timer3 = setTimeout(() => onComplete(), 2200);

    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 5, 100));
    }, 30);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          data-testid="loading-screen"
        >
          <div className="relative flex flex-col items-center">
            <AnimatePresence mode="wait">
              {phase === "logo" && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="text-6xl font-bold tracking-tighter text-white"
                >
                  TDW
                </motion.div>
              )}
              {phase === "text" && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-3xl font-bold tracking-tight text-white flex flex-col items-center"
                >
                  <span className="text-gradient-aurora">TanuDeveloper Works</span>
                  <span className="text-sm tracking-[0.3em] text-gray-400 mt-2 uppercase font-light">
                    Premium Studio
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="w-48 h-1 bg-white/10 mt-12 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-aurora"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
