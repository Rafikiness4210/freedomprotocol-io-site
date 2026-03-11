import Link from "next/link";
import { Cpu, Wallet, Map, ArrowRight, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "New to FreedomProtocol? Pick your path: AI security, crypto protection, or expat freedom.",
};

const paths = [
  {
    icon: Cpu,
    color: "border-ocean-blue",
    accent: "text-ocean-blue",
    glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    title: "Protect Against AI Threats",
    description:
      "Deepfakes, voice cloning, AI-powered phishing — the threat landscape shifted in 2025. Get up to speed.",
    steps: [
      { label: "Read: How AI Targets Crypto Holders", href: "/blog/ai-voice-cloning-crypto" },
      { label: "Download: AI Threat Defense Checklist", href: "/newsletter" },
      { label: "Review: Recommended Privacy Tools", href: "/resources" },
    ],
  },
  {
    icon: Wallet,
    color: "border-sunset-gold",
    accent: "text-sunset-gold",
    glow: "hover:shadow-glow",
    title: "Secure Your Crypto",
    description:
      "Wallet security, DeFi safety, seed phrase protection, and operational security — the full stack.",
    steps: [
      { label: "Read: Crypto Wallet Security Guide 2026", href: "/blog/crypto-wallet-security-guide-2026" },
      { label: "Download: 25-Point Security Checklist", href: "/newsletter" },
      { label: "Get: Weekly OpSec Briefing (Free)", href: "/newsletter" },
    ],
  },
  {
    icon: Map,
    color: "border-lagoon-teal",
    accent: "text-lagoon-teal",
    glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    title: "Build Location Freedom",
    description:
      "Zero-tax countries, offshore banking, residency programs, and building income that follows you.",
    steps: [
      { label: "Read: 5 Countries With 0% Crypto Tax", href: "/blog/zero-tax-countries-crypto-2026" },
      { label: "Explore: Expat Freedom Guides", href: "/blog?category=expat-freedom" },
      { label: "Get: Location Freedom Briefing (Free)", href: "/newsletter" },
    ],
  },
];

export default function StartHerePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-14">
        <Shield className="w-10 h-10 text-sunset-gold mx-auto mb-4" />
        <h1 className="section-heading mb-4">Pick Your Path</h1>
        <p className="text-drift-gray text-lg max-w-2xl mx-auto">
          FreedomProtocol covers three domains. Start with what matters most
          to you right now.
        </p>
      </div>

      <div className="space-y-8">
        {paths.map((path) => (
          <div
            key={path.title}
            className={`card border-l-4 ${path.color} ${path.glow} transition-all`}
          >
            <div className="flex items-start gap-4">
              <path.icon className={`w-8 h-8 ${path.accent} shrink-0 mt-1`} />
              <div className="flex-1">
                <h2 className="text-xl font-heading font-semibold mb-2">
                  {path.title}
                </h2>
                <p className="text-drift-gray mb-5">{path.description}</p>

                <div className="space-y-3">
                  {path.steps.map((step, i) => (
                    <Link
                      key={step.href}
                      href={step.href}
                      className="flex items-center gap-3 group"
                    >
                      <span
                        className={`w-6 h-6 rounded-full border ${path.color} flex items-center justify-center text-xs font-mono ${path.accent}`}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sand-white group-hover:text-sunset-gold transition-colors">
                        {step.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-drift-gray opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-14">
        <p className="text-drift-gray mb-4">
          Not sure where to start? Get the weekly briefing — it covers all three.
        </p>
        <Link href="/newsletter" className="btn-primary">
          <Shield className="w-5 h-5" />
          Join The Protocol
        </Link>
      </div>
    </div>
  );
}
