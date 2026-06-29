import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Clock, ArrowRight, CheckCircle2, AlertCircle, Phone } from "lucide-react";
import { submitForm, type ContactFormData } from "@/lib/formHandler";

const WHATSAPP_NUMBER = "918433553501";

type FormState = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    const fd = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name:        fd.get("name")        as string,
      email:       fd.get("email")       as string,
      projectType: fd.get("projectType") as string,
      budget:      fd.get("budget")      as string,
      message:     fd.get("message")     as string,
    };
    const result = await submitForm("contact", data);
    if (result.success) {
      setSubmittedName(data.name.split(" ")[0]);
      setFormState("success");
    } else {
      setErrorMsg(result.message);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 10000);
    }
  };

  const fieldCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all placeholder:text-white/20 focus:border-blue-500/40 focus:bg-blue-500/[0.04]";
  const labelCls = "text-xs font-semibold text-white/50 uppercase tracking-widest";

  return (
    <section id="contact" className="py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Get In Touch</span>
            <h2
              className="font-bold text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              Start Your<br />Project.
            </h2>
            <p className="text-white/40 text-base mb-14 leading-relaxed max-w-sm">
              Let's build something remarkable together. Fill out the form or reach out directly.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: MessageSquare,
                  label: "Direct Message",
                  value: "WhatsApp Chat →",
                  href: "https://wa.me/918433553501",
                  color: "rgba(34,197,94,0.10)",
                  iconColor: "#4ade80",
                },
                {
                  icon: Clock,
                  label: "Response Time",
                  value: "Under 24 Hours",
                  href: null,
                  color: "rgba(59,130,246,0.10)",
                  iconColor: "#60a5fa",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-panel"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.color }}
                  >
                    <item.icon size={20} style={{ color: item.iconColor }} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 mb-0.5 font-medium uppercase tracking-widest">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                         className="text-sm font-bold text-white hover:text-blue-400 transition-colors" data-interactive>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-bold text-white">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-3xl glass-panel relative overflow-hidden"
          >
            {/* Subtle accent glow */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-3xl"
                 style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)" }} />

            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center justify-center py-12 text-center gap-5"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                     style={{ background: "rgba(74,222,128,0.10)" }}>
                  <CheckCircle2 size={28} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {submittedName ? `Thanks, ${submittedName}!` : "Message Received!"}
                </h3>
                <p className="text-sm text-white/40 max-w-xs">
                  Your message has been saved. I'll get back to you within 24 hours.
                </p>
                <div className="w-full mt-2 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-xs text-white/25 mb-4">Want a faster reply? Continue on WhatsApp:</p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Tanu, I just submitted a request on your website and would like to discuss my project.")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
                    style={{ background: "#22c55e", boxShadow: "0 4px 16px rgba(34,197,94,0.25)" }}
                    data-interactive
                  >
                    <Phone size={14} />
                    Continue on WhatsApp
                  </a>
                </div>
              </motion.div>

            ) : formState === "error" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10 flex flex-col items-center justify-center py-16 text-center gap-4"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                     style={{ background: "rgba(239,68,68,0.10)" }}>
                  <AlertCircle size={28} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Something went wrong</h3>
                <p className="text-sm text-white/40 max-w-xs">{errorMsg}</p>
              </motion.div>

            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className={labelCls}>Name</label>
                    <input name="name" required type="text" className={fieldCls} placeholder="Rahul Sharma" data-testid="input-name" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelCls}>Email</label>
                    <input name="email" required type="email" className={fieldCls} placeholder="rahul@company.com" data-testid="input-email" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelCls}>Project Type</label>
                  <select name="projectType" required className={fieldCls} data-testid="select-project-type">
                    <option value="">Select a service</option>
                    <option value="business">Business Website</option>
                    <option value="restaurant">Restaurant Website</option>
                    <option value="clinic">Clinic Website</option>
                    <option value="portfolio">Portfolio Website</option>
                    <option value="landing">Landing Page</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="custom">Custom Solution</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelCls}>Budget Range</label>
                  <select name="budget" required className={fieldCls} data-testid="select-budget">
                    <option value="">Select a range</option>
                    <option value="999">₹999 – Starter</option>
                    <option value="1999">₹1,999 – Business</option>
                    <option value="3999">₹3,999 – Premium</option>
                    <option value="custom">Custom Budget</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelCls}>Project Details</label>
                  <textarea name="message" required rows={4} className={fieldCls} placeholder="Tell me about your vision..." data-testid="textarea-message" />
                </div>

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full mt-2 py-4 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 transition-all disabled:opacity-60 text-white text-sm"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)", boxShadow: "0 4px 20px rgba(59,130,246,0.20)" }}
                  data-interactive
                  data-testid="button-submit"
                >
                  {formState === "submitting" ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
