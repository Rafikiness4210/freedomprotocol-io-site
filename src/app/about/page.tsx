import { Shield, Lock, Eye, Globe } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "FreedomProtocol is an anonymous security intelligence operation. No faces. No names. Just protocols.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="section-heading mb-6">About FreedomProtocol</h1>

      <div className="space-y-6 text-sand-white leading-relaxed">
        <p>
          FreedomProtocol is not a person. It&apos;s a system.
        </p>

        <p>
          Built by a distributed team of security researchers, crypto
          practitioners, and sovereignty advocates, FreedomProtocol exists to
          solve one problem:{" "}
          <strong>
            most people have no idea how exposed they are — financially,
            digitally, and geographically.
          </strong>
        </p>

        <p>
          We publish actionable intelligence on AI security threats, crypto
          protection, and location-independent freedom. Everything is tested,
          verified, and written for people who want to act — not just read.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
          {[
            {
              icon: Shield,
              title: "Security First",
              desc: "Every recommendation is tested against real-world attack vectors.",
            },
            {
              icon: Eye,
              title: "Anonymous by Design",
              desc: "No personal data collected. No faces. No tracking cookies.",
            },
            {
              icon: Lock,
              title: "Privacy Native",
              desc: "We use the same tools we recommend. Our stack practices what we preach.",
            },
            {
              icon: Globe,
              title: "Location Independent",
              desc: "Written for a global audience seeking financial and geographic sovereignty.",
            },
          ].map((item) => (
            <div key={item.title} className="card">
              <item.icon className="w-6 h-6 text-sunset-gold mb-3" />
              <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
              <p className="text-drift-gray text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-4">
          Why anonymous?
        </h2>
        <p>
          Identity is an attack surface. In the world we cover — crypto
          security, AI threats, offshore finance — anonymity isn&apos;t just
          preference. It&apos;s protocol.
        </p>
        <p>
          The content speaks for itself. If the advice works, it doesn&apos;t
          matter who wrote it. If it doesn&apos;t work, a face wouldn&apos;t
          fix that.
        </p>

        <h2 className="text-2xl font-heading font-bold mt-10 mb-4">
          How this works
        </h2>
        <p>
          FreedomProtocol is free to read. We sustain operations through digital
          products and affiliate partnerships with tools we genuinely use and
          trust. Every affiliate link is disclosed. Every recommendation is
          earned.
        </p>

        <div className="terminal-block mt-8">
          <p>Ready to start?</p>
          <p className="mt-2">
            → <Link href="/start-here" className="text-sunset-gold hover:underline">Pick your path</Link>
          </p>
          <p>
            → <Link href="/newsletter" className="text-sunset-gold hover:underline">Join the weekly briefing</Link>
          </p>
          <p>
            → <Link href="/blog" className="text-sunset-gold hover:underline">Read the latest protocols</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
