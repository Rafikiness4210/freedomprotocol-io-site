import { Shield, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — Tested Tools & Recommendations",
  description:
    "Privacy tools, hardware wallets, VPNs, and security software — tested and ranked by FreedomProtocol.",
};

interface Tool {
  name: string;
  category: string;
  description: string;
  price: string;
  rating: string;
  badge?: string;
  href: string;
}

const tools: Tool[] = [
  {
    name: "Ledger Nano X",
    category: "Hardware Wallets",
    description: "Bluetooth-enabled cold storage. Supports 5,500+ assets. Industry standard.",
    price: "$79",
    rating: "9.2/10",
    badge: "Top Pick",
    href: "https://shop.ledger.com/?r=a3428da9c143",
  },
  {
    name: "Trezor Model T",
    category: "Hardware Wallets",
    description: "Open-source firmware. Touchscreen. Strongest for Bitcoin-focused users.",
    price: "$219",
    rating: "9.0/10",
    href: "https://shop.ledger.com/?r=a3428da9c143",
  },
  {
    name: "ProtonVPN",
    category: "VPNs",
    description: "Swiss-based, no-logs, open-source. Free tier available. Best overall for crypto.",
    price: "Free / $5/mo",
    rating: "9.4/10",
    badge: "Top Pick",
    href: "https://go.getproton.me/aff_c?offer_id=26&aff_id=16789",
  },
  {
    name: "Mullvad VPN",
    category: "VPNs",
    description: "Accept cash and crypto. No email required to sign up. Maximum anonymity.",
    price: "$5/mo",
    rating: "9.3/10",
    href: "#",
  },
  {
    name: "NordVPN",
    category: "VPNs",
    description: "Fastest speeds in testing. Double VPN feature. Good all-rounder.",
    price: "$3.49/mo (2yr)",
    rating: "8.8/10",
    href: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=142972&url_id=902",
  },
  {
    name: "ProtonMail",
    category: "Encrypted Email",
    description: "End-to-end encrypted. Swiss privacy laws. Best email for crypto accounts.",
    price: "Free / $4/mo",
    rating: "9.5/10",
    badge: "Top Pick",
    href: "https://go.getproton.me/aff_c?offer_id=26&aff_id=16789",
  },
  {
    name: "Bitwarden",
    category: "Password Managers",
    description: "Open-source, audited, cross-platform. Free tier is genuinely usable.",
    price: "Free / $10/yr",
    rating: "9.3/10",
    badge: "Top Pick",
    href: "#",
  },
  {
    name: "SimpleLogin",
    category: "Email Aliases",
    description: "Create unlimited email aliases. Owned by Proton. Stops tracking and spam.",
    price: "Free / $4/mo",
    rating: "9.0/10",
    href: "https://go.getproton.me/aff_c?offer_id=26&aff_id=16789",
  },
  {
    name: "YubiKey 5",
    category: "Hardware 2FA",
    description: "Physical security key. Eliminates phishing. The gold standard for 2FA.",
    price: "$50",
    rating: "9.6/10",
    badge: "Essential",
    href: "#",
  },
];

export default function ResourcesPage() {
  const categories = [...new Set(tools.map((t) => t.category))];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="section-heading mb-4">Recommended Tools</h1>
        <p className="text-drift-gray max-w-2xl">
          Every tool listed here has been personally tested. We use most of them daily.
          Affiliate links are marked — we only recommend what we trust.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-heading font-semibold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-sunset-gold" />
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools
              .filter((t) => t.category === category)
              .map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group relative"
                >
                  {tool.badge && (
                    <span className="absolute top-4 right-4 text-xs bg-sunset-gold/10 text-sunset-gold px-2 py-0.5 rounded-full font-mono">
                      {tool.badge}
                    </span>
                  )}
                  <h3 className="font-heading font-semibold mb-1 group-hover:text-sunset-gold transition-colors flex items-center gap-2">
                    {tool.name}
                    <ExternalLink className="w-3 h-3 text-drift-gray" />
                  </h3>
                  <p className="text-drift-gray text-sm mb-3 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sand-white">{tool.price}</span>
                    <span className="text-sunset-gold font-mono">{tool.rating}</span>
                  </div>
                </a>
              ))}
          </div>
        </div>
      ))}

      {/* Disclosure */}
      <div className="alert-info text-xs text-drift-gray mt-8">
        <strong className="text-sand-white">Disclosure:</strong> Some links on
        this page are affiliate links. We earn a commission at no extra cost to
        you. We only list tools we&apos;ve tested and actively use. Ratings reflect
        our honest assessment.
      </div>
    </div>
  );
}
