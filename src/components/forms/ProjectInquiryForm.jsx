"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function ProjectInquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const message = [
      "Hello DotDevX!",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      "",
      "Project Details:",
      form.message,
    ].join("\n");

    const whatsappUrl = getWhatsAppUrl(message);

    if (!whatsappUrl) {
      setError("WhatsApp number is not configured yet.");
      return;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  const inputClasses =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#08090B] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#2BFF88]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm text-white/80">
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className={inputClasses}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm text-white/80">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={inputClasses}
          required
        />
      </div>

      <div>
        <label htmlFor="service" className="text-sm text-white/80">
          Select a Service
        </label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={handleChange}
          className={inputClasses}
          required
        >
          <option value="" disabled>
            Choose a service
          </option>
          <option value="Business Website">Business Website</option>
          <option value="E-commerce Development">
            E-commerce Development
          </option>
          <option value="Landing Page">Landing Page</option>
          <option value="Website Redesign">Website Redesign</option>
          <option value="Custom Web Application">
            Custom Web Application
          </option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-white/80">
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          className={`${inputClasses} resize-y`}
          required
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2BFF88] px-6 py-4 text-sm font-semibold text-[#04120A] transition-colors hover:bg-[#52FF9D]"
      >
        Send Project Inquiry
        <Send size={17} />
      </button>

      <p className="text-center text-xs text-white/40">
        Your inquiry will be sent through WhatsApp.
      </p>
    </form>
  );
}