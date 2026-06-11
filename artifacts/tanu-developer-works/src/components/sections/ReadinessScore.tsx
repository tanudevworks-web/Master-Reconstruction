import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "918433553501";

const questions = [
  {
    id: "website",
    label: "Do you have a website?",
    yes: "Great foundation!",
    no: "Missing your most important digital asset.",
    weight: 25,
  },
  {
    id: "whatsapp",
    label: "Do you use WhatsApp Business?",
    yes: "Smart communication tool.",
    no: "Clients can't reach you instantly.",
    weight: 20,
  },
  {
    id: "google",
    label: "Are you on Google Business Profile?",
    yes: "Discoverable on Google Search & Maps.",
    no: "Invisible on local search.",
    weight: 25,
  },
  {
    id: "form",
    label: "Do you have a contact / enquiry form?",
    yes: "Leads flow in automatically.",
    no: "You're losing enquiries daily.",
    weight: 15,
  },
  {
    id: "booking",
    label: "Can clients book or order online?",
    yes: "Generating bookings 24/7.",
    no: "Missing automated revenue.",
    weight: 15,
  },
];

const scoreConfig = (score: number) => {
  if (score >= 80) return { label: "Strong Presence", color: "text-green-500", bar: "bg-green-500", msg: "You're ahead of most local businesses. Let's make you outstanding." };
  if (score >= 50) return { label: "Room to Grow", color: "text-yellow-500", bar: "bg-yellow-500", msg: "Good start. A few upgrades will dramatically boost your reach." };
  return { label: "Needs Attention", color: "text-red-500", bar: "bg-red-500", msg: "Your competitors online are capturing clients you're missing daily." };
};

export function ReadinessScore() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  );
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.values(answers).filter((v) => v !== null).length;
  const total = questions.length;
  const score = submitted
    ? questions.reduce((sum, q) => sum + (answers[q.id] ? q.weight : 0), 0)
    : 0;

  const config = submitted ? scoreConfig(score) : null;

  const canSubmit = answered === total;

  const handleAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const openWhatsApp = () => {
    const missing = questions
      .filter((q) => answers[q.id] === false)
      .map((q) => q.label.replace("Do you", "").trim())
      .join(", ");
    const message = encodeURIComponent(
      `Hi Tanu!\n\nI just scored *${score}/100* on the Website Readiness Quiz.\n\nI'm missing: ${missing || "nothing major"}.\n\nCan you help me improve my online presence?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section id="readiness" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
            Free Audit
          </div>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            How Ready Is Your<br className="hidden sm:block" /> Business Online?
          </h2>
          <p className="dark:text-gray-400 text-gray-600">
            Answer 5 quick questions and get your Business Readiness Score instantly.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          {/* Questions */}
          <div className="space-y-4 mb-8">
            {questions.map((q, i) => {
              const ans = answers[q.id];
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`glass-panel rounded-2xl p-5 border transition-all duration-200 ${
                    ans !== null
                      ? ans
                        ? "dark:border-green-500/30 border-green-400/40 dark:bg-green-500/5 bg-green-50/60"
                        : "dark:border-red-500/20 border-red-400/30 dark:bg-red-500/5 bg-red-50/40"
                      : "dark:border-white/8 border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold dark:text-white text-gray-900 text-sm mb-1">
                        {i + 1}. {q.label}
                      </p>
                      {ans !== null && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`text-xs ${ans ? "text-green-500" : "dark:text-red-400 text-red-500"}`}
                        >
                          {ans ? `✓ ${q.yes}` : `✗ ${q.no}`}
                        </motion.p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleAnswer(q.id, true)}
                        data-interactive
                        className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                          ans === true
                            ? "bg-green-500 text-white"
                            : "dark:bg-white/8 bg-gray-100 dark:text-gray-300 text-gray-700 hover:bg-green-100 hover:text-green-700"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleAnswer(q.id, false)}
                        data-interactive
                        className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                          ans === false
                            ? "bg-red-500 text-white"
                            : "dark:bg-white/8 bg-gray-100 dark:text-gray-300 text-gray-700 hover:bg-red-100 hover:text-red-700"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex justify-between text-xs dark:text-gray-500 text-gray-400 mb-2">
              <span>{answered} of {total} answered</span>
              <span>{Math.round((answered / total) * 100)}%</span>
            </div>
            <div className="h-1.5 dark:bg-white/8 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${(answered / total) * 100}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Submit */}
          {!submitted ? (
            <button
              onClick={() => canSubmit && setSubmitted(true)}
              disabled={!canSubmit}
              data-interactive
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                canSubmit
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:scale-[1.01]"
                  : "dark:bg-white/8 bg-gray-200 dark:text-gray-500 text-gray-400 cursor-not-allowed"
              }`}
            >
              {canSubmit ? "Calculate My Score →" : `Answer all ${total} questions to continue`}
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel rounded-2xl p-7 border dark:border-white/10 border-gray-200 text-center"
              >
                {/* Score ring */}
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="dark:text-white/8 text-gray-200" />
                    <motion.circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="url(#scoreGrad)" strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - score / 100) }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black dark:text-white text-gray-900">{score}</span>
                    <span className="text-xs dark:text-gray-400 text-gray-500">/100</span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${config?.color}`}>{config?.label}</h3>
                <p className="dark:text-gray-400 text-gray-600 text-sm mb-6">{config?.msg}</p>

                {/* Missing items */}
                {questions.filter((q) => answers[q.id] === false).length > 0 && (
                  <div className="dark:bg-white/5 bg-gray-50 rounded-xl p-4 mb-6 text-left">
                    <p className="text-xs font-bold dark:text-gray-300 text-gray-700 mb-2 uppercase tracking-wider">Recommendations</p>
                    <ul className="space-y-1.5">
                      {questions.filter((q) => answers[q.id] === false).map((q) => (
                        <li key={q.id} className="text-sm dark:text-gray-400 text-gray-600 flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">→</span>
                          {q.no}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={openWhatsApp}
                  data-interactive
                  className="w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(34,197,94,0.3)]"
                >
                  <MessageCircle size={16} />
                  Get Free Consultation on WhatsApp
                </button>
                <button
                  onClick={() => { setSubmitted(false); setAnswers(Object.fromEntries(questions.map((q) => [q.id, null]))); }}
                  data-interactive
                  className="mt-3 w-full py-2.5 text-sm dark:text-gray-400 text-gray-500 hover:dark:text-white hover:text-gray-700 transition-colors"
                >
                  Retake quiz
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
