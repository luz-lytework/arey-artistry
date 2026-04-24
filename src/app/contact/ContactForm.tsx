"use client";

import { useState, type FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiry_type: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    inquiry_type: "general",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as Record<string, string>).error || "Something went wrong. Please try again."
        );
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiry_type: "general",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <svg
          className="w-12 h-12 mx-auto text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 font-heading text-xl font-bold text-dark">
          Message Sent
        </h3>
        <p className="mt-2 text-dark/60 font-body">
          Thank you for reaching out. Ilene will get back to you within 1-2
          business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-peach-dark hover:text-peach font-body font-medium underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
          <p className="text-sm text-red-800 font-body">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-body font-medium text-dark mb-1.5"
          >
            Name <span className="text-peach-dark">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-4 py-2.5 bg-cream border border-cream-dark rounded-md font-body text-dark placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-peach focus:border-peach transition-colors"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-body font-medium text-dark mb-1.5"
          >
            Email <span className="text-peach-dark">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full px-4 py-2.5 bg-cream border border-cream-dark rounded-md font-body text-dark placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-peach focus:border-peach transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-body font-medium text-dark mb-1.5"
          >
            Phone <span className="text-dark/30">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="w-full px-4 py-2.5 bg-cream border border-cream-dark rounded-md font-body text-dark placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-peach focus:border-peach transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Inquiry type */}
        <div>
          <label
            htmlFor="inquiry_type"
            className="block text-sm font-body font-medium text-dark mb-1.5"
          >
            Inquiry Type
          </label>
          <select
            id="inquiry_type"
            name="inquiry_type"
            value={formData.inquiry_type}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, inquiry_type: e.target.value }))
            }
            className="w-full px-4 py-2.5 bg-cream border border-cream-dark rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-peach focus:border-peach transition-colors"
          >
            <option value="general">General Question</option>
            <option value="commission">Custom Commission</option>
            <option value="wholesale">Wholesale Inquiry</option>
            <option value="event">Event Booking</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-body font-medium text-dark mb-1.5"
        >
          Message <span className="text-peach-dark">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full px-4 py-2.5 bg-cream border border-cream-dark rounded-md font-body text-dark placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-peach focus:border-peach transition-colors resize-y"
          placeholder="Tell Ilene about what you are looking for..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto px-8 py-3 bg-peach text-dark font-body font-semibold rounded-md hover:bg-peach-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
