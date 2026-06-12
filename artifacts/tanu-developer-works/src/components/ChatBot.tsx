import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, RotateCcw } from "lucide-react";
import { detectIntent, getResponse, WELCOME_MESSAGE } from "@/lib/chatKnowledge";
import { saveAiChatLead, type AiChatLead } from "@/lib/firebaseLeads";

const STORAGE_KEY = "tdw-chat-history";
const WHATSAPP = "https://wa.me/918433553501";

function TanuAIIcon({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main 4-pointed sparkle star */}
      <path
        d="M12 2L13.38 10.62L22 12L13.38 13.38L12 22L10.62 13.38L2 12L10.62 10.62L12 2Z"
        fill="white"
        fillOpacity="0.97"
      />
      {/* Small secondary sparkle */}
      <path
        d="M19 4.5L19.72 6.78L22 7.5L19.72 8.22L19 10.5L18.28 8.22L16 7.5L18.28 6.78L19 4.5Z"
        fill="white"
        fillOpacity="0.75"
      />
      {/* Tiny accent dot */}
      <circle cx="5.5" cy="18.5" r="1.1" fill="white" fillOpacity="0.55" />
    </svg>
  );
}

type Role = "user" | "bot";
type LeadStep = "name" | "email" | "phone" | "businessType" | null;

interface Msg {
  id: string;
  role: Role;
  text: string;
  ts: number;
  quickReplies?: string[];
  showWhatsApp?: boolean;
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function BotAvatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.5)]">
      <TanuAIIcon size={14} />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <BotAvatar />
      <div className="flex gap-1 px-4 py-3 rounded-2xl rounded-bl-sm dark:bg-white/8 bg-gray-100 border dark:border-white/8 border-gray-200">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full dark:bg-gray-400 bg-gray-400"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}

function UserBubble({ msg }: { msg: Msg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex flex-col items-end gap-0.5"
    >
      <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-gradient-aurora text-white text-sm leading-relaxed shadow-sm">
        {msg.text}
      </div>
      <span className="text-[10px] dark:text-gray-600 text-gray-400 px-1">{fmtTime(msg.ts)}</span>
    </motion.div>
  );
}

function BotBubble({
  msg,
  onQuickReply,
}: {
  msg: Msg;
  onQuickReply: (r: string) => void;
}) {
  const lines = msg.text.split("\n").filter(Boolean);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex items-end gap-2"
    >
      <BotAvatar />
      <div className="flex flex-col gap-1.5 max-w-[82%]">
        <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm dark:bg-white/8 bg-gray-100 border dark:border-white/8 border-gray-200 text-sm dark:text-gray-100 text-gray-800 leading-relaxed">
          {lines.map((line, i) => {
            const boldified = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
            return (
              <p
                key={i}
                className="mb-0.5 last:mb-0"
                dangerouslySetInnerHTML={{ __html: boldified }}
              />
            );
          })}
        </div>
        {msg.quickReplies && msg.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {msg.quickReplies.map((r) => (
              <button
                key={r}
                onClick={() => onQuickReply(r)}
                className="text-xs px-3 py-1.5 rounded-full border dark:border-blue-500/40 border-blue-400/50 dark:text-blue-300 text-blue-600 dark:hover:bg-blue-500/10 hover:bg-blue-50 transition-all font-medium"
                data-interactive
              >
                {r}
              </button>
            ))}
          </div>
        )}
        {msg.showWhatsApp && (
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors shadow-sm"
            data-interactive
          >
            <MessageCircle size={12} />
            Chat on WhatsApp
          </a>
        )}
        <span className="text-[10px] dark:text-gray-600 text-gray-400 px-1">{fmtTime(msg.ts)}</span>
      </div>
    </motion.div>
  );
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [leadStep, setLeadStep] = useState<LeadStep>(null);
  const [leadData, setLeadData] = useState<Partial<AiChatLead>>({});
  const [hasUnread, setHasUnread] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load persisted messages
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Msg[] = JSON.parse(stored);
        if (parsed.length > 0) {
          setMsgs(parsed);
          setHasUnread(false);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    // Fresh session — show welcome after delay
    const t = setTimeout(() => {
      addBotMsg(WELCOME_MESSAGE.text, WELCOME_MESSAGE.quickReplies);
    }, 400);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist messages
  useEffect(() => {
    if (msgs.length === 0) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-60)));
    } catch {
      /* ignore */
    }
  }, [msgs]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const addBotMsg = useCallback(
    (text: string, quickReplies?: string[], showWhatsApp?: boolean) => {
      setMsgs((prev) => [
        ...prev,
        { id: uid(), role: "bot", text, ts: Date.now(), quickReplies, showWhatsApp },
      ]);
      if (!open) setHasUnread(true);
    },
    [open],
  );

  const processUserInput = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      // Add user message
      setMsgs((prev) => [...prev, { id: uid(), role: "user", text: trimmed, ts: Date.now() }]);
      setInput("");

      setTyping(true);
      const delay = 700 + Math.random() * 600;

      // Lead collection flow
      if (leadStep) {
        await new Promise((r) => setTimeout(r, delay));
        setTyping(false);

        if (leadStep === "name") {
          setLeadData((d) => ({ ...d, name: trimmed }));
          setLeadStep("email");
          addBotMsg(`Nice to meet you, ${trimmed.split(" ")[0]}! 😊\n\nWhat's your email address? (optional — type "skip" to skip)`);
        } else if (leadStep === "email") {
          const email = trimmed.toLowerCase() === "skip" ? undefined : trimmed;
          setLeadData((d) => ({ ...d, email }));
          setLeadStep("phone");
          addBotMsg("Great! What's your WhatsApp / phone number?");
        } else if (leadStep === "phone") {
          setLeadData((d) => ({ ...d, phone: trimmed }));
          setLeadStep("businessType");
          addBotMsg(
            "Almost done! What type of website are you looking for?",
            ["Portfolio", "Business Website", "Restaurant", "Clinic", "E-Commerce", "Landing Page", "Custom"],
          );
        } else if (leadStep === "businessType") {
          const finalData: AiChatLead = { ...leadData, businessType: trimmed, name: leadData.name ?? "Unknown" };
          setLeadData(finalData);
          setLeadStep(null);
          try {
            await saveAiChatLead(finalData);
          } catch {
            /* fail silently */
          }
          addBotMsg(
            `🎉 Thank you, ${finalData.name?.split(" ")[0] ?? ""}!\n\nYour details have been saved. Tanu will personally reach out within **24 hours** with a customised quote.\n\nFor a faster response, you can also chat directly on WhatsApp right now!`,
            ["View Pricing", "More Questions"],
            true,
          );
        }
        return;
      }

      await new Promise((r) => setTimeout(r, delay));
      setTyping(false);

      const intent = detectIntent(trimmed);
      const response = getResponse(intent);

      if (response.action === "collect_lead") {
        setLeadStep("name");
        addBotMsg(response.text);
      } else {
        addBotMsg(
          response.text,
          response.quickReplies,
          response.action === "show_whatsapp",
        );
      }
    },
    [leadStep, leadData, addBotMsg],
  );

  const handleSend = () => { if (input.trim()) processUserInput(input); };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const clearChat = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMsgs([]);
    setLeadStep(null);
    setLeadData({});
    setTimeout(() => addBotMsg(WELCOME_MESSAGE.text, WELCOME_MESSAGE.quickReplies), 200);
  };

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-[104px] right-2 sm:right-6 z-[9998] w-[calc(100vw-16px)] xs:w-[calc(100vw-32px)] sm:w-[390px] max-h-[min(580px,calc(100dvh-180px))] flex flex-col rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden border dark:border-white/10 border-gray-200"
            style={{ backdropFilter: "blur(24px)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 dark:bg-[#0d1117]/95 bg-white/95 border-b dark:border-white/8 border-gray-200 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.5)] flex-shrink-0">
                <TanuAIIcon size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold dark:text-white text-gray-900 leading-none mb-0.5">
                  Tanu AI
                </p>
                <p className="text-[11px] dark:text-gray-400 text-gray-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  Online · usually replies instantly
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="w-8 h-8 rounded-full dark:hover:bg-white/8 hover:bg-gray-100 flex items-center justify-center dark:text-gray-500 text-gray-400 hover:dark:text-gray-200 hover:text-gray-600 transition-colors"
                  data-interactive
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full dark:hover:bg-white/8 hover:bg-gray-100 flex items-center justify-center dark:text-gray-400 text-gray-500 transition-colors"
                  data-interactive
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 dark:bg-[#0a0a0a]/90 bg-gray-50/90 flex flex-col gap-3 min-h-0">
              {msgs.map((msg) =>
                msg.role === "user" ? (
                  <UserBubble key={msg.id} msg={msg} />
                ) : (
                  <BotBubble
                    key={msg.id}
                    msg={msg}
                    onQuickReply={(r) => processUserInput(r)}
                  />
                ),
              )}
              {typing && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 dark:bg-[#0d1117]/95 bg-white/95 border-t dark:border-white/8 border-gray-200 flex-shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={leadStep === "name" ? "Enter your name…" : leadStep === "email" ? "Enter your email…" : leadStep === "phone" ? "Enter your phone…" : "Type a message…"}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm dark:bg-white/6 bg-gray-100 border dark:border-white/8 border-gray-200 dark:text-white text-gray-900 placeholder:dark:text-gray-500 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-aurora flex items-center justify-center text-white disabled:opacity-40 hover:shadow-[0_0_16px_rgba(59,130,246,0.4)] transition-all flex-shrink-0"
                data-interactive
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button — z-[9999] ensures it's always clickable above all popups */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-[88px] right-4 sm:right-6 z-[9999] w-14 h-14 rounded-2xl flex items-center justify-center transition-shadow duration-300 relative overflow-visible"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #7c3aed 50%, #9333ea 100%)",
          boxShadow: open
            ? "0 0 0 2px rgba(139,92,246,0.5), 0 4px 20px rgba(59,130,246,0.5), 0 8px 40px rgba(139,92,246,0.4)"
            : "0 0 0 1px rgba(139,92,246,0.3), 0 4px 24px rgba(59,130,246,0.5), 0 8px 40px rgba(139,92,246,0.35)",
        }}
        data-interactive
        aria-label="Open Tanu AI"
      >
        {/* Glass inner highlight */}
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18 }}
              className="relative z-10"
            >
              <X size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18 }}
              className="relative z-10"
            >
              <TanuAIIcon size={24} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasUnread && !open && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 border-2 dark:border-[#0a0a0a] border-white text-white text-[9px] font-bold flex items-center justify-center z-20"
          >
            1
          </motion.span>
        )}

        {/* Breathing glow ring */}
        {!open && (
          <motion.span
            className="absolute inset-[-4px] rounded-[20px] pointer-events-none"
            style={{ border: "1.5px solid rgba(139,92,246,0.45)" }}
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.button>
    </>
  );
}
