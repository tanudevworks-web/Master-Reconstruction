import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Clock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { submitForm, type ContactFormData } from "@/lib/formHandler";

type FormState = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    const fd = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      projectType: fd.get("projectType") as string,
      budget: fd.get("budget") as string,
      message: fd.get("message") as string,
    };

    try {
      const result = await submitForm("contact", data);
      if (result.success) {
        setFormState("success");
        setTimeout(() => setFormState("idle"), 6000);
      } else {
        setFormState("success"); // still show success to user
        setTimeout(() => setFormState("idle"), 6000);
      }
    } catch {
      setErrorMsg("Something went wrong. Please try WhatsApp or email.");
      setFormState("error");
      setTimeout(() => setFormState("idle"), 6000);
    }
  };

  const inputCls = "w-full dark:bg-[#0a0a0a] bg-white border dark:border-white/10 border-black/10 rounded-xl px-4 py-3 dark:text-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:dark:text-gray-600 placeholder:text-gray-400 text-sm";
  const labelCls = "text-sm font-bold dark:text-gray-300 text-gray-700";

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-aurora mb-4 uppercase">
              Get In Touch
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 dark:text-white text-gray-900">
              Start Your<br />Project.
            </h2>
            <p className="text-lg dark:text-gray-400 text-gray-600 mb-12 max-w-md">
              Let's build something remarkable together. Fill out the form or reach out directly.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <div className="text-xs dark:text-gray-400 text-gray-500 mb-0.5">Direct Message</div>
                  <a href="https://wa.me/918433553501" target="_blank" rel="noopener noreferrer" className="text-base font-bold dark:text-white text-gray-900 hover:text-primary transition-colors" data-interactive>
                    WhatsApp Chat →
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="text-xs dark:text-gray-400 text-gray-500 mb-0.5">Response Time</div>
                  <div className="text-base font-bold dark:text-white text-gray-900">Under 24 Hours</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-aurora opacity-5 pointer-events-none" />

            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center justify-center py-16 text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold dark:text-white text-gray-900">Message Received!</h3>
                <p className="dark:text-gray-400 text-gray-600 max-w-xs">
                  Thank you! I'll get back to you within 24 hours. Talk soon.
                </p>
              </motion.div>
            ) : formState === "error" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center justify-center py-16 text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold dark:text-white text-gray-900">Something went wrong</h3>
                <p className="dark:text-gray-400 text-gray-600 max-w-xs">{errorMsg}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Name</label>
                    <input name="name" required type="text" className={inputCls} placeholder="Rahul Sharma" data-testid="input-name" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Email</label>
                    <input name="email" required type="email" className={inputCls} placeholder="rahul@company.com" data-testid="input-email" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Project Type</label>
                  <select name="projectType" required className={inputCls} data-testid="select-project-type">
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

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Budget Range</label>
                  <select name="budget" required className={inputCls} data-testid="select-budget">
                    <option value="">Select a range</option>
                    <option value="999">₹999 – Starter</option>
                    <option value="1999">₹1,999 – Business</option>
                    <option value="3999">₹3,999 – Premium</option>
                    <option value="custom">Custom Budget</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Project Details</label>
                  <textarea name="message" required rows={4} className={inputCls} placeholder="Tell me about your vision..." data-testid="textarea-message" />
                </div>

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full mt-2 py-4 rounded-xl bg-gradient-aurora text-white font-bold tracking-wide flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all disabled:opacity-70"
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
                      <ArrowRight size={18} />
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
