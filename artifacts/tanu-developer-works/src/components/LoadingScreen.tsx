import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 700);
    }, 2000);

    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(tick); return 100; }
        return p + Math.random() * 8 + 2;
      });
    }, 40);

    return () => { clearTimeout(finish); clearInterval(tick); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          data-testid="loading-screen"
        >
          {/* Center content */}
          <div className="flex flex-col items-center gap-8">
            {/* Animated logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-5xl font-bold tracking-tighter text-white leading-none">TDW</span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xs tracking-[0.3em] text-white/35 uppercase font-medium"
              >
                TanuDeveloper Works
              </motion.span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-48 h-[1px] bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
