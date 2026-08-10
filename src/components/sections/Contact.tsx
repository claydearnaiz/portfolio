"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { personalInfo } from "@/data/personal";
import { Mail, Phone, MapPin, Send, ArrowUpRight, Copy, Check } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-black border-t border-neutral-800/80 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00d4ff]/5 rounded-full blur-[160px] pointer-events-none" />

      <Container className="relative z-10">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="05 // DIRECT COMMUNICATION"
            title="INITIATE CONTACT"
            subtitle="Have an opportunity, engineering project, or software query? Feel free to reach out directly."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Info Column */}
          <AnimateOnScroll className="lg:col-span-5" direction="left">
            <Card className="border-neutral-800/80 bg-neutral-950/80 glass-panel p-8 h-full flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="text-xs font-mono text-[#00d4ff] font-bold">
                  // CONTACT DIRECTORY
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-mono">
                  LET'S BUILD TOGETHER
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
                  Available for Computer Engineering, Software Engineering, and Cloud Architecture opportunities across Metro Manila or Remote.
                </p>

                <div className="space-y-4 pt-4">
                  {/* Copy Email Button */}
                  <button
                    type="button"
                    onClick={copyEmailToClipboard}
                    className="w-full p-4 min-h-[44px] rounded-xl bg-neutral-900/80 border border-neutral-800 text-left hover:border-[#00d4ff]/50 transition-all group flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-[#00d4ff]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-neutral-400">EMAIL ADDRESS</div>
                        <div className="text-xs font-mono font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                          {personalInfo.email}
                        </div>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-neutral-950 text-neutral-400 group-hover:text-white">
                      {copiedEmail ? <Check className="w-4 h-4 text-[#00d4ff]" /> : <Copy className="w-4 h-4" />}
                    </div>
                  </button>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-[#00d4ff]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neutral-400">PHONE</div>
                      <div className="text-xs font-mono font-bold text-white">
                        {personalInfo.phone}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-[#00d4ff]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neutral-400">LOCATION</div>
                      <div className="text-xs font-mono font-bold text-white">
                        {personalInfo.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-6 border-t border-neutral-900">
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  // ONLINE PROFILES
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-[#00d4ff]/50 transition-all cursor-pointer flex items-center justify-between min-h-[44px]"
                  >
                    <span>GITHUB</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-[#00d4ff]/50 transition-all cursor-pointer flex items-center justify-between min-h-[44px]"
                  >
                    <span>LINKEDIN</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Card>
          </AnimateOnScroll>

          {/* Form Column */}
          <AnimateOnScroll className="lg:col-span-7" direction="right">
            <Card className="border-neutral-800/80 bg-neutral-950/80 glass-panel p-8">
              {isSubmitted ? (
                <div className="py-16 text-center space-y-4 font-mono">
                  <div className="w-14 h-14 rounded-full bg-[#00d4ff] text-black font-bold flex items-center justify-center mx-auto text-2xl shadow-lg shadow-[#00d4ff]/30">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white">MESSAGE TRANSMITTED</h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Thank you for reaching out. I have received your message and will respond shortly.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    size="sm"
                    className="mt-4 border-neutral-700 hover:border-[#00d4ff]"
                  >
                    SEND ANOTHER MESSAGE
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-[#00d4ff] font-bold">
                      // DIRECT MESSAGE TRANSMISSION
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase font-mono">
                      SEND A DIRECT INQUIRY
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-mono text-neutral-400">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all placeholder:text-neutral-500 min-h-[44px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-mono text-neutral-400">
                        YOUR EMAIL *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all placeholder:text-neutral-500 min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-mono text-neutral-400">
                      SUBJECT *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Opportunity / Collaboration Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all placeholder:text-neutral-500 min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-mono text-neutral-400">
                      MESSAGE *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all placeholder:text-neutral-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                    className="w-full justify-center bg-[#00d4ff] text-black hover:bg-white border-none font-bold shadow-[0_0_20px_rgba(0,212,255,0.25)] min-h-[44px]"
                  >
                    {isSubmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
                  </Button>
                </form>
              )}
            </Card>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
};
