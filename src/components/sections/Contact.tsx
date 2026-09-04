"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { personalInfo } from "@/data/personal";

type CopyStatus = "idle" | "copied" | "error";

export const ContactSection: React.FC = () => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("error");
    }
  };

  const composeEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = formData.subject || "Portfolio inquiry";
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      "",
      formData.message,
    ].join("\n");

    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t border-border bg-muted py-20 sm:py-28"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              05 / Contact
            </p>
            <h2
              id="contact-heading"
              className="chapter-heading mt-5 max-w-xl text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-foreground sm:text-7xl"
            >
              Let’s build something that works.
            </h2>
            <p className="mt-7 max-w-md text-lg leading-7 text-muted-foreground">
              For software engineering, cloud, or connected-systems work, send a direct email or prepare a draft here.
            </p>

            <div className="mt-10 border-t border-border">
              <div className="grid gap-2 border-b border-border py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex min-h-11 min-w-0 items-center break-all text-base text-foreground transition-colors hover:text-accent"
                >
                  {personalInfo.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex min-h-11 items-center justify-center gap-2 border border-border px-4 font-mono text-xs uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {copyStatus === "copied" ? (
                    <Check aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Copy aria-hidden="true" className="h-4 w-4" />
                  )}
                  {copyStatus === "copied" ? "Copied" : "Copy address"}
                </button>
              </div>

              <p role="status" aria-live="polite" className="min-h-6 py-2 text-xs text-muted-foreground">
                {copyStatus === "error" ? "Copy failed. Select the email address above to copy it manually." : ""}
              </p>

              <nav aria-label="Social profiles" className="mt-4 grid gap-2 sm:grid-cols-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-between border-b border-border text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  GitHub
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-between border-b border-border text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  LinkedIn
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </nav>
            </div>
          </div>

          <form
            onSubmit={composeEmail}
            aria-labelledby="email-draft-heading"
            className="border-t border-border pt-7 lg:col-span-6 lg:col-start-7"
          >
            <h3
              id="email-draft-heading"
              className="font-mono text-xs uppercase tracking-[0.16em] text-foreground"
            >
              Prepare an email draft
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Submitting opens your email application with these details. This site does not send or store the form.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <label htmlFor="contact-name" className="block font-mono text-xs text-muted-foreground">
                Name
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                  className="mt-2 min-h-11 w-full border-b border-border bg-transparent px-0 py-3 font-sans text-base text-foreground transition-colors focus:border-accent"
                />
              </label>
              <label htmlFor="contact-email" className="block font-mono text-xs text-muted-foreground">
                Email
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                  className="mt-2 min-h-11 w-full border-b border-border bg-transparent px-0 py-3 font-sans text-base text-foreground transition-colors focus:border-accent"
                />
              </label>
            </div>

            <label htmlFor="contact-subject" className="mt-6 block font-mono text-xs text-muted-foreground">
              Subject
              <input
                id="contact-subject"
                name="subject"
                required
                value={formData.subject}
                onChange={(event) => setFormData((current) => ({ ...current, subject: event.target.value }))}
                className="mt-2 min-h-11 w-full border-b border-border bg-transparent px-0 py-3 font-sans text-base text-foreground transition-colors focus:border-accent"
              />
            </label>

            <label htmlFor="contact-message" className="mt-6 block font-mono text-xs text-muted-foreground">
              Message
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                className="mt-2 w-full resize-y border-b border-border bg-transparent px-0 py-3 font-sans text-base leading-7 text-foreground transition-colors focus:border-accent"
              />
            </label>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              rightIcon={<ArrowUpRight aria-hidden="true" className="h-4 w-4" />}
              className="mt-8 min-h-11 rounded-none border-accent bg-accent text-accent-foreground hover:bg-foreground hover:text-background"
            >
              Open email draft
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};
