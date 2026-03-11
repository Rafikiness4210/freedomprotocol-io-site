"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Check, Download } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 bg-sunset-gold/10 border border-sunset-gold/20 rounded-full px-6 py-3 text-sunset-gold">
          <Check className="w-5 h-5" />
          <span className="font-medium">You&apos;re in. Check your inbox.</span>
        </div>
        <a
          href="/crypto-security-checklist.pdf"
          download
          className="inline-flex items-center gap-2 text-sm text-lagoon-teal hover:text-sunset-gold transition-colors font-medium"
        >
          <Download className="w-4 h-4" />
          Download your Crypto Security Checklist (PDF)
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 bg-background/80 border border-border rounded-full px-5 py-3 text-sand-white
                   placeholder:text-muted-slate focus:outline-none focus:border-sunset-gold/50
                   focus:shadow-[0_0_0_3px_rgba(245,166,35,0.1)] transition-all"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary whitespace-nowrap"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Get Access <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      {status === "error" && (
        <p className="text-danger-red text-xs absolute -bottom-6 left-0">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
