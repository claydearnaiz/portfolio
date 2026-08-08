"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { personalInfo } from "@/data/personal";
import {
  Mail,
  Send,
  Copy,
  Check,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-black border-t border-neutral-800 relative">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="05 // INITIATE TRANSMISSION"
            title="LET'S CONNECT"
            subtitle="Available for selective engineering roles, contract commissions, and technical collaborations."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Information & One-Click Copy */}
          <AnimateOnScroll className="lg:col-span-5" direction="left">
            <Card className="h-full space-y-6 border-neutral-800 bg-neutral-950/80 p-8">
              <div className="space-y-3">
                <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                  // DIRECT INQUIRIES
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  GET IN TOUCH DIRECTLY
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed">
                  Fastest response via email. Click below to copy address to clipboard.
                </p>
              </div>

              {/* One-click copy email button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="COPY EMAIL"
                className="w-full p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-white text-left transition-all duration-300 cursor-pointer group flex items-center justify-between shadow-sm"
              >
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    EMAIL ADDRESS
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-neutral-200">
                    {personalInfo.email}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-800 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300 shadow-sm">
                  {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </div>
              </button>

              {/* Phone number card */}
              <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    PHONE / MOBILE
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-white">
                    +63 947 741 2362
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded bg-neutral-800 text-[10px] font-mono text-neutral-300">
                  MANILA
                </div>
              </div>

              {/* Social Directory */}
              <div className="pt-4 border-t border-neutral-900 space-y-3">
                <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                  // SOCIAL DIRECTORY
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {personalInfo.github && (
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-white transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>GITHUB</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {personalInfo.linkedin && (
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-white transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>LINKEDIN</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {personalInfo.twitter && (
                    <a
                      href={personalInfo.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-white transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>TWITTER/X</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </AnimateOnScroll>

          {/* Form Column */}
          <AnimateOnScroll className="lg:col-span-7" direction="right">
            <Card className="border-neutral-800 bg-neutral-950/80 p-8">
              {isSubmitted ? (
                <div className="py-16 text-center space-y-4 font-mono">
                  <div className="w-12 h-12 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    TRANSMISSION RECEIVED
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
                    Thank you. Your message has been logged. I will review and respond shortly.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    size="sm"
                    className="mt-4"
                  >
                    SEND ANOTHER MESSAGE
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="space-y-2 font-mono">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold text-neutral-300 uppercase tracking-wider"
                    >
                      01 // YOUR NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Satoshi Nakamoto"
                      className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all text-xs sm:text-sm ${
                        errors.name ? "border-white" : "border-neutral-800"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-neutral-300 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 font-mono">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-neutral-300 uppercase tracking-wider"
                    >
                      02 // YOUR EMAIL *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="satoshi@domain.com"
                      className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all text-xs sm:text-sm ${
                        errors.email ? "border-white" : "border-neutral-800"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-neutral-300 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 font-mono">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold text-neutral-300 uppercase tracking-wider"
                    >
                      03 // TRANSMISSION MESSAGE *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline project requirements, timeline, or scope..."
                      className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all text-xs sm:text-sm resize-y ${
                        errors.message ? "border-white" : "border-neutral-800"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-neutral-300 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                    className="w-full justify-center"
                  >
                    SEND TRANSMISSION
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
