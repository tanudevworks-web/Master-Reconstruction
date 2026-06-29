export type Intent =
  | "greeting"
  | "pricing"
  | "services"
  | "timeline"
  | "contact"
  | "portfolio"
  | "process"
  | "payment"
  | "buying_intent"
  | "seo"
  | "ecommerce"
  | "firebase"
  | "support"
  | "thanks"
  | "goodbye"
  | "fallback";

export interface BotResponse {
  text: string;
  quickReplies?: string[];
  action?: "collect_lead" | "show_whatsapp";
}

const PATTERNS: Array<{ intent: Intent; patterns: RegExp[] }> = [
  {
    intent: "greeting",
    patterns: [/^(hi|hello|hey|good\s*(morning|afternoon|evening)|namaste|helo|hii)/i],
  },
  {
    intent: "pricing",
    patterns: [
      /price|pricing|cost|how much|budget|₹|rupee|rates?|packages?|plans?|affordable|cheap/i,
    ],
  },
  {
    intent: "services",
    patterns: [
      /service|what (do|can) you (build|make|offer|create)|what.*(website|web)|types? of (website|web|site)/i,
    ],
  },
  {
    intent: "timeline",
    patterns: [
      /how (long|fast|quick|soon|many days)|timeline|delivery|deadline|when (can|will|do)|days?|weeks?|turnaround/i,
    ],
  },
  {
    intent: "contact",
    patterns: [
      /contact|phone|whatsapp|email|reach (out|you|tanu)|get in touch|call|message|talk/i,
    ],
  },
  {
    intent: "portfolio",
    patterns: [
      /portfolio|examples?|work|projects?|previous|showcase|sample|demo/i,
    ],
  },
  {
    intent: "process",
    patterns: [
      /process|steps?|how (do you|does it|does the|it) work|workflow|procedure|method|approach/i,
    ],
  },
  {
    intent: "payment",
    patterns: [
      /payment|pay|advance|installment|upfront|deposit|refund|money back/i,
    ],
  },
  {
    intent: "buying_intent",
    patterns: [
      /i (want|need|would like)|can you build|build (my|a|the)|make (my|a|the)|create (my|a|the)|get (a|my) website|need a website|looking for (a|website)|interested in|start (a|my) (project|website)/i,
    ],
  },
  {
    intent: "seo",
    patterns: [/\bseo\b|search engine|google rank|rank(ing)?|organic traffic|keyword/i],
  },
  {
    intent: "ecommerce",
    patterns: [
      /e-?commerce|online (shop|store|sell|selling)|shop(ping)? cart|product listing|sell (online|products)/i,
    ],
  },
  {
    intent: "firebase",
    patterns: [/firebase|firestore|backend|database|real.?time|hosting/i],
  },
  {
    intent: "support",
    patterns: [
      /support|maintenance|update|change|revisi(on|t)|after (launch|delivery)|ongoing|help/i,
    ],
  },
  {
    intent: "thanks",
    patterns: [/thank(s| you)|great|awesome|perfect|amazing|excellent|superb|wonderful/i],
  },
  {
    intent: "goodbye",
    patterns: [/bye|goodbye|see you|later|take care|cya/i],
  },
];

const RESPONSES: Record<Intent, BotResponse[]> = {
  greeting: [
    {
      text: "👋 Hi there! Great to meet you.\n\nI'm Tanu's AI assistant. I can help you with pricing, services, timelines, and getting started on your project.\n\nWhat would you like to know?",
      quickReplies: ["Pricing", "Services", "Timeline", "Contact", "Get a Quote"],
    },
  ],
  pricing: [
    {
      text: "💰 Here are the current packages:\n\n**🚀 Starter — ₹999**\n• Single Page Website\n• WhatsApp Integration\n• Contact Form\n• Mobile Responsive\n• 3-Day Delivery\n\n**🏢 Business — ₹1,999** ⭐ Most Popular\n• Up to 5 Pages\n• WhatsApp + Google Sheets\n• Online Booking System\n• SEO Basics\n• 5-Day Delivery\n\n**💎 Premium — ₹3,999** 🏆 Best Value\n• Fully Custom Design\n• Firebase Architecture\n• Premium Animations\n• Google Business Profile Setup\n• Priority Support\n• 7-Day Delivery\n\nAll plans include 50% payment upfront and 50% after delivery. Which plan interests you?",
      quickReplies: ["Starter Plan", "Business Plan", "Premium Plan", "Get a Quote"],
    },
  ],
  services: [
    {
      text: "🛠️ Here's what Tanu builds:\n\n• **Portfolio Websites** — Showcase your work professionally\n• **Business Websites** — Corporate presence that converts clients\n• **Landing Pages** — High-conversion single-page campaigns\n• **E-Commerce Websites** — Sell products online with ease\n• **Custom Web Applications** — Tailored to your exact needs\n• **Firebase Integrations** — Real-time databases & backend\n• **SEO Optimization** — Rank higher on Google\n• **Performance Optimization** — Blazing fast load times\n\nEvery website includes WhatsApp integration, mobile-first design, and clean code.\n\nWhat type of website are you interested in?",
      quickReplies: ["Portfolio", "Business Website", "E-Commerce", "Landing Page", "Pricing"],
    },
  ],
  timeline: [
    {
      text: "⚡ Delivery is fast and reliable:\n\n• **Starter Plan** → 3 days\n• **Business Plan** → 5 days\n• **Premium Plan** → 7 days\n\nThe timeline begins after requirements are confirmed and the 50% advance is received.\n\nTanu works Monday–Saturday and keeps you updated throughout development via WhatsApp.\n\nNeed it faster? Message directly on WhatsApp to discuss a rush timeline.",
      quickReplies: ["Pricing", "Process", "Contact Tanu", "Get Started"],
    },
  ],
  contact: [
    {
      text: "📞 Here's how to reach Tanu directly:\n\n• **WhatsApp:** +91 84335 53501\n• **Response time:** Under 24 hours (usually within minutes)\n• **Working hours:** Monday–Saturday, 9 AM – 8 PM IST\n\nWhatsApp is the fastest way to get a response. Tanu replies personally — no bots, no middlemen.",
      quickReplies: ["Chat on WhatsApp", "Get a Quote", "Pricing"],
      action: "show_whatsapp",
    },
  ],
  portfolio: [
    {
      text: "🎨 Tanu has built websites across multiple industries:\n\n• Dental Clinics\n• Restaurants & Cafes\n• Corporate Businesses\n• Creative Portfolios\n• Fitness Centers / Gyms\n• Real Estate Agencies\n\nYou can see the portfolio mockups in the **Featured Work** section on this website — just scroll up!\n\nEvery project is built from scratch with custom design, no templates.",
      quickReplies: ["Pricing", "Services", "Get a Quote"],
    },
  ],
  process: [
    {
      text: "🔄 Here's exactly how it works:\n\n1. **Discovery** — Share your requirements via WhatsApp\n2. **Proposal** — Receive a clear quote & timeline\n3. **Advance Payment** — Pay 50% to start\n4. **Design** — See your website design first\n5. **Development** — Full website built to spec\n6. **Review** — Request changes (2 revision rounds included)\n7. **Launch** — Go live!\n8. **Remaining Payment** — Pay the final 50%\n\nYou stay involved at every step. No surprises.",
      quickReplies: ["Pricing", "Contact", "Get a Quote"],
    },
  ],
  payment: [
    {
      text: "💳 Flexible and transparent payment terms:\n\n• **Pay 50% upfront** to begin development\n• **Pay 50% after delivery** — only when you're happy\n• **No hidden charges** — price agreed before we start\n• **UPI, Bank Transfer, and online payments** accepted\n• **No refund disputes** — because we don't start without your approval\n\nThis model ensures you're always protected. 100+ businesses have used this process with zero issues.",
      quickReplies: ["Pricing", "Start a Project", "Contact"],
    },
  ],
  buying_intent: [
    {
      text: "🎉 Excellent! I'd love to help get your website started.\n\nLet me collect a few quick details so Tanu can reach out with a personalised quote.\n\nWhat's your name?",
      action: "collect_lead",
    },
  ],
  seo: [
    {
      text: "🔍 SEO is built into every website from day one:\n\n• Clean semantic HTML structure\n• Proper heading hierarchy (H1, H2, H3)\n• Fast page load speed (Core Web Vitals optimised)\n• Mobile-first responsive design\n• Meta tags & Open Graph setup\n• Google Business Profile setup (Premium plan)\n• Sitemap & robots.txt\n\nThis gives your website the best foundation to rank on Google.\n\nThe **Business** and **Premium** plans include SEO basics.",
      quickReplies: ["Pricing", "Services", "Contact"],
    },
  ],
  ecommerce: [
    {
      text: "🛒 E-Commerce websites are a speciality!\n\nFeatures available:\n• Product listings & categories\n• Shopping cart & checkout\n• WhatsApp order integration\n• Payment gateway integration\n• Mobile-optimised shopping experience\n• Order management system\n\nPricing for e-commerce starts from **₹1,999** and depends on the number of products and features needed.\n\nWant a custom quote for your store?",
      quickReplies: ["Get a Quote", "Contact", "Pricing"],
      action: "show_whatsapp",
    },
  ],
  firebase: [
    {
      text: "🔥 Firebase integration is available on the **Premium plan**:\n\n• Real-time Firestore database\n• Lead capture & management\n• User authentication (if needed)\n• Cloud Functions for backend logic\n• Hosting via Firebase Hosting\n• Secure & scalable architecture\n\nThis is what powers the lead management on this very website!\n\nPerfect for businesses that need a dynamic backend without a traditional server.",
      quickReplies: ["Premium Plan", "Pricing", "Contact"],
    },
  ],
  support: [
    {
      text: "🛡️ Post-launch support is provided:\n\n• **2 revision rounds** included in all plans\n• **30-day bug fixes** — any issues after launch are fixed free\n• **WhatsApp support** — direct line to Tanu\n• **Ongoing updates** available at a maintenance rate\n\nMost websites require minimal maintenance after launch. Tanu ensures everything is stable before handing over.",
      quickReplies: ["Pricing", "Process", "Contact"],
    },
  ],
  thanks: [
    {
      text: "😊 You're welcome! Happy to help.\n\nIs there anything else you'd like to know — pricing, services, or how to get started?",
      quickReplies: ["Pricing", "Services", "Get a Quote", "Contact"],
    },
  ],
  goodbye: [
    {
      text: "👋 Goodbye! Feel free to come back anytime.\n\nIf you're ready to start your project, you can always reach Tanu on WhatsApp: +91 84335 53501\n\nHave a great day! 🙏",
      action: "show_whatsapp",
    },
  ],
  fallback: [
    {
      text: "I'm not sure I understood that completely. Here are some things I can help you with:",
      quickReplies: ["Pricing", "Services", "Timeline", "Contact", "Get a Quote"],
    },
    {
      text: "Hmm, that's outside my knowledge! For specific questions, it's best to chat directly with Tanu on WhatsApp — responses are usually within minutes.",
      quickReplies: ["Contact Tanu", "Pricing", "Services"],
      action: "show_whatsapp",
    },
  ],
};

export function detectIntent(input: string): Intent {
  for (const { intent, patterns } of PATTERNS) {
    if (patterns.some((p) => p.test(input))) return intent;
  }
  return "fallback";
}

export function getResponse(intent: Intent): BotResponse {
  const options = RESPONSES[intent];
  return options[Math.floor(Math.random() * options.length)];
}

export const WELCOME_MESSAGE: BotResponse = {
  text: "👋 Hi! Welcome to TanuDeveloper Works.\n\nI'm here to help you with:\n\n• Website Pricing\n• Development Services\n• Project Timelines\n• Custom Features\n• Contact Information\n\nAsk me anything!",
  quickReplies: ["Pricing", "Services", "Timeline", "Portfolio", "Contact", "Get a Quote"],
};
