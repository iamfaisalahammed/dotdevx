"use client";

import { useState } from "react";
import { Send, LoaderCircle, CheckCircle2 } from "lucide-react";

const ACCESS_KEY = "67df6865-ef68-4407-ab59-abe1978940dd";

const INITIAL_FORM = {
  name: "",
  email: "",
  service: "",
  message: "",
};

export default function ProjectInquiryForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New Project Inquiry - ${form.service}`,
          from_name: ".DevX Website",
          name: form.name.trim(),
          email: form.email.trim(),
          service: form.service,
          message: form.message.trim(),
          botcheck: "",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to send your inquiry. Please try again."
        );
      }

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setError(
        err.message || "Something went wrong. Please try again later."
      );
    }
  }

  const inputClasses =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#08090B] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#E5383B]";

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
          maxLength={100}
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
          maxLength={254}
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
          maxLength={5000}
          required
        />
      </div>

      {/* Honeypot spam protection */}
      <input
        type="checkbox"
        name="botcheck"
        value="true"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {status === "success" && (
        <p
          role="status"
          className="flex items-center gap-2 text-sm text-green-400"
        >
          <CheckCircle2 size={18} />
          Your inquiry has been sent successfully!
        </p>
      )}

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E5383B] px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-[#FF4D50] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            Sending Inquiry
            <LoaderCircle size={17} className="animate-spin" />
          </>
        ) : (
          <>
            Send Project Inquiry
            <Send size={17} />
          </>
        )}
      </button>

      <p className="text-center text-xs text-white/40">
        Your inquiry will be sent directly to our email.
      </p>
    </form>
  );
}