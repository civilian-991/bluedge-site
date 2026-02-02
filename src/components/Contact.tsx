"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { contactInfo, socialLinks, officeHours, services } from "@/data";

const serviceOptions = services.map(s => s.title);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedService, setSelectedService] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ ...formData, service: selectedService });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="blob morph-blob absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00AEEF] opacity-5" />
        <div className="blob morph-blob absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0077B6] opacity-5" />
        <div className="grid-bg absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <MessageCircle className="w-5 h-5 text-[#00AEEF]" />
            <span className="text-sm text-white/50 uppercase tracking-[0.2em]">
              Get in Touch
            </span>
          </motion.span>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-6"
          >
            Let&apos;s create something{" "}
            <span className="text-gradient">extraordinary</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="body-text max-w-2xl mx-auto text-lg"
          >
            Ready to transform your digital presence? We&apos;d love to hear about
            your project. Fill out the form below and we&apos;ll get back to you
            within 24 hours.
          </motion.p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact details */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#00AEEF]/10 border border-[#00AEEF]/20 flex items-center justify-center group-hover:border-[#00AEEF]/50 group-hover:bg-[#00AEEF]/20 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-[#00AEEF]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/40 uppercase tracking-wider">{item.label}</div>
                    <div className="font-medium text-lg group-hover:text-[#00AEEF] transition-colors">
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-8 border-t border-white/10">
              <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Follow us</div>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 rounded-full border border-[#00AEEF]/20 flex items-center justify-center hover:border-[#00AEEF] hover:bg-[#00AEEF]/10 transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-white/50 group-hover:text-[#00AEEF] transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick response badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#00AEEF]/5 border border-[#00AEEF]/20"
            >
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/60">
                Typically responds within 24 hours
              </span>
            </motion.div>

            {/* Office hours */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <h4 className="font-semibold mb-3">Office Hours</h4>
              <div className="space-y-2 text-sm text-white/50">
                <p>{officeHours.weekdays}</p>
                <p>{officeHours.saturday}</p>
                <p>{officeHours.sunday}</p>
                <p className="text-white/30 mt-4">Timezone: {officeHours.timezone}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service selection */}
              <div>
                <label className="block text-sm text-white/40 uppercase tracking-wider mb-3">
                  What service are you interested in?
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={`px-4 py-2.5 rounded-full text-sm border transition-all duration-300 ${
                        selectedService === service
                          ? "border-[#00AEEF] bg-[#00AEEF]/20 text-white"
                          : "border-white/10 text-white/60 hover:border-[#00AEEF]/30 hover:bg-white/5"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name and Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/40 uppercase tracking-wider mb-2">
                    Your name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/40 uppercase tracking-wider mb-2">
                    Email address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Company and Budget row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/40 uppercase tracking-wider mb-2">
                    Company name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] transition-all duration-300"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/40 uppercase tracking-wider mb-2">
                    Budget range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#050508]">
                      Select budget
                    </option>
                    <option value="5k-10k" className="bg-[#050508]">
                      $5,000 - $10,000
                    </option>
                    <option value="10k-25k" className="bg-[#050508]">
                      $10,000 - $25,000
                    </option>
                    <option value="25k-50k" className="bg-[#050508]">
                      $25,000 - $50,000
                    </option>
                    <option value="50k+" className="bg-[#050508]">
                      $50,000+
                    </option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-white/40 uppercase tracking-wider mb-2">
                  Tell us about your project *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] transition-all duration-300 resize-none"
                  placeholder="Describe your project, goals, and timeline..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn-primary btn-shine w-full md:w-auto"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
