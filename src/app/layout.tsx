import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "FreedomProtocol — AI Security, Crypto Privacy & Financial Sovereignty",
    template: "%s | FreedomProtocol",
  },
  description:
    "Protect your crypto, secure your identity, and build location-independent income. AI security guides, privacy tools, and freedom blueprints.",
  keywords: [
    "crypto security",
    "ai security",
    "privacy tools",
    "digital nomad",
    "financial freedom",
    "opsec",
    "crypto tax",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FreedomProtocol",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@freedomprotocol",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
