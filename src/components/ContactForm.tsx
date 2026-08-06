"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-section">
      <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
      <p className="text-ink-light mb-8 max-w-md">
        Have a project in mind? Let's work together.
      </p>

      {status === "sent" ? (
        <div className="bg-accent-light text-accent px-6 py-4 rounded-xl">
          Thank you! Your message has been sent. I'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-canvas text-ink placeholder:text-ink-light/50 focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-canvas text-ink placeholder:text-ink-light/50 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas text-ink placeholder:text-ink-light/50 focus:outline-none focus:border-accent transition-colors"
          />
          <textarea
            placeholder="Your message..."
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas text-ink placeholder:text-ink-light/50 focus:outline-none focus:border-accent transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 disabled:opacity-50 transition-all"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "error" && (
            <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </section>
  );
}