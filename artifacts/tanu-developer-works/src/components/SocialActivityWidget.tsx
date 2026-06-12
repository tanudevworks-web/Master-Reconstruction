import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NOTIFICATIONS = [
  { text: "Someone from Mumbai requested a demo", time: "2 minutes ago", emoji: "📍" },
  { text: "New business website delivered", time: "Today", emoji: "🚀" },
  { text: "Restaurant owner requested a quote", time: "Recently", emoji: "🍽️" },
  { text: "Dental clinic contacted us", time: "Today", emoji: "🦷" },
  { text: "Website project completed successfully", time: "This week", emoji: "✅" },
  { text: "Gym owner requested a fitness site", time: "1 hour ago", emoji: "💪" },
  { text: "Real estate agent booked a call", time: "3 minutes ago", emoji: "🏠" },
  { text: "Salon website launched live", time: "Today", emoji: "✂️" },
];

export function SocialActivityWidget() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % NOTIFICATIONS.length);
        setVisible(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const notif = NOTIFICATIONS[current];

  return (
    <div className="fixed bottom-6 left-6 z-[100] max-w-[260px]">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass-panel rounded-2xl px-4 py-3 border dark:border-white/10 border-gray-200 shadow-lg flex items-start gap-3"
          >
            <span className="text-xl flex-shrink-0 mt-0.5">{notif.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium dark:text-white text-gray-900 leading-snug">{notif.text}</p>
              <p className="text-[10px] dark:text-gray-500 text-gray-400 mt-0.5">{notif.time}</p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs flex-shrink-0 ml-1"
              aria-label="Dismiss"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
