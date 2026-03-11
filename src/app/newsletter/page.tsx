import { Shield, Lock, CheckCircle } from "lucide-react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter — The Protocol",
  description:
    "Weekly AI security briefing, crypto protection strategies, and freedom blueprints. Every Tuesday.",
};

const benefits = [
  "AI threat of the week — what's new and how to defend against it",
  "Crypto security tip — one actionable step to harden your stack",
  "Tool recommendation — tested privacy and security tools",
  "Freedom strategy — tax, residency, and income optimization",
];

export default function NewsletterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <Shield className="w-12 h-12 text-sunset-gold mx-auto mb-4" />
        <h1 className="section-heading mb-4">The Protocol</h1>
        <p className="text-xl text-drift-gray">
          Weekly security intelligence for people who take their
          freedom seriously.
        </p>
      </div>

      {/* Signup Box */}
      <div className="card border-sunset-gold/20 !p-8 mb-12">
        <div className="text-center mb-6">
          <h2 className="text-xl font-heading font-semibold mb-2">
            Get the briefing every Tuesday
          </h2>
          <p className="text-drift-gray text-sm">
            Join 2,500+ subscribers. Free. No spam. Unsubscribe anytime.
          </p>
        </div>
        <NewsletterForm />
        <div className="flex items-center justify-center gap-2 mt-4">
          <Lock className="w-3 h-3 text-drift-gray" />
          <span className="text-xs text-drift-gray">
            No tracking. No data selling. Privacy-first.
          </span>
        </div>
      </div>

      {/* What You Get */}
      <div className="mb-12">
        <h3 className="text-lg font-heading font-semibold mb-6 text-center">
          Every issue includes:
        </h3>
        <div className="space-y-4">
          {benefits.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-sunset-gold shrink-0 mt-0.5" />
              <span className="text-sand-white">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Magnet Bonus */}
      <div className="terminal-block text-center">
        <p className="text-sunset-gold font-semibold mb-1">
          + Free bonus on signup
        </p>
        <p className="text-drift-gray text-sm">
          &quot;The Crypto Security Checklist&quot; — 25-point audit you can run in 30
          minutes. Immediate download after confirming your email.
        </p>
      </div>
    </div>
  );
}
