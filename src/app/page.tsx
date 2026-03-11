"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Lock,
  Globe,
  Zap,
  ArrowRight,
  ArrowDown,
  Cpu,
  Compass,
  Sparkles,
} from "lucide-react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import {
  FadeIn,
  Parallax,
  Stagger,
  StaggerItem,
  ScrollingBanner,
} from "@/components/ui/Motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* ─── Photo data ─── */
const heroImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format&fit=crop";

const editorialPhotos = {
  sailing:
    "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200&q=80&auto=format&fit=crop",
  motorcycle:
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80&auto=format&fit=crop",
  baliCafe:
    "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&q=80&auto=format&fit=crop",
  dinner:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop",
  coastline:
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80&auto=format&fit=crop",
  laptop:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop",
  mountains:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format&fit=crop",
  ocean:
    "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1200&q=80&auto=format&fit=crop",
};

const pillars = [
  {
    icon: Shield,
    title: "Protect Your Wealth",
    description:
      "Hardware wallets, DeFi safety, and crypto OpSec that keeps your stack untouchable.",
    href: "/blog?category=crypto-security",
    color: "text-sunset-gold",
    accent: "border-sunset-gold/30",
    bg: "bg-sunset-gold/5",
  },
  {
    icon: Cpu,
    title: "Defend Your Identity",
    description:
      "AI deepfake defense, voice clone protection, and digital identity protocols.",
    href: "/blog?category=ai-security",
    color: "text-ocean-blue",
    accent: "border-ocean-blue/30",
    bg: "bg-ocean-blue/5",
  },
  {
    icon: Compass,
    title: "Live Anywhere",
    description:
      "Zero-tax jurisdictions, residency programs, and the playbook for location independence.",
    href: "/blog?category=expat-freedom",
    color: "text-lagoon-teal",
    accent: "border-lagoon-teal/30",
    bg: "bg-lagoon-teal/5",
  },
  {
    icon: Zap,
    title: "Tools That Work",
    description:
      "VPNs, privacy apps, hardware wallets — tested and ranked by people who use them.",
    href: "/resources",
    color: "text-warm-coral",
    accent: "border-warm-coral/30",
    bg: "bg-warm-coral/5",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);

  return (
    <>
      {/* ═══════════════════════════════════════════════
          HERO — Full-bleed cinematic photo with parallax
          ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background image with parallax */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <Image
            src={heroImage}
            alt="Tropical beach at golden hour"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative h-full flex flex-col justify-end pb-20 md:pb-28"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
            <FadeIn delay={0.2} direction="up">
              <p className="text-sunset-gold font-medium text-sm md:text-base uppercase tracking-[0.2em] mb-6">
                Financial Sovereignty Starts Here
              </p>
            </FadeIn>

            <FadeIn delay={0.4} direction="up">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.95] mb-8 max-w-4xl">
                Your money.
                <br />
                Your location.
                <br />
                <span className="gradient-text">Your rules.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.6} direction="up">
              <p className="text-lg md:text-xl text-drift-gray leading-relaxed mb-10 max-w-xl">
                The playbook for crypto security, AI defense, and the freedom
                to live and work from anywhere on Earth.
              </p>
            </FadeIn>

            <FadeIn delay={0.8} direction="up">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/start-here" className="btn-primary text-base">
                  <Compass className="w-5 h-5" />
                  Start Your Journey
                </Link>
                <Link href="/blog" className="btn-secondary text-base">
                  Explore the Blog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-sunset-gold/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          SCROLLING BANNER — kinetic typography
          ═══════════════════════════════════════════════ */}
      <div className="border-y border-border/30 py-5 bg-surface/30">
        <ScrollingBanner
          text="PROTECT YOUR WEALTH • DEFEND YOUR IDENTITY • LIVE ANYWHERE • TOTAL SOVEREIGNTY"
          className="text-sm md:text-base font-heading font-semibold tracking-[0.15em] text-sunset-gold/30"
        />
      </div>

      {/* ═══════════════════════════════════════════════
          EDITORIAL SECTION 1 — Asymmetric sailing + text
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Text — left, narrow */}
          <div className="md:col-span-5 md:pr-4">
            <FadeIn direction="left">
              <p className="text-sunset-gold font-medium text-xs uppercase tracking-[0.2em] mb-4">
                The Vision
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-6">
                Freedom is a{" "}
                <span className="gradient-text-ocean">feeling,</span>
                <br />
                not a spreadsheet.
              </h2>
              <p className="text-drift-gray text-lg leading-relaxed mb-8">
                Imagine waking up without an alarm. Your portfolio compounds
                while you explore the Adriatic coast. You pay for lunch in a
                Lisbon rooftop cafe with a tap of your card — settled in sats.
                Nobody asks where you&apos;re from. Nobody cares. You&apos;re free.
              </p>
              <p className="text-drift-gray leading-relaxed">
                That&apos;s not a fantasy. It&apos;s a protocol. And we wrote the playbook.
              </p>
            </FadeIn>
          </div>

          {/* Photos — right, stacked asymmetric */}
          <div className="md:col-span-7 relative">
            <div className="grid grid-cols-12 gap-4">
              <Parallax className="col-span-7" speed={0.15}>
                <FadeIn delay={0.1}>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    <Image
                      src={editorialPhotos.sailing}
                      alt="Sailboat anchored in turquoise water"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </FadeIn>
              </Parallax>
              <Parallax className="col-span-5 pt-16" speed={0.3}>
                <FadeIn delay={0.3}>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    <Image
                      src={editorialPhotos.baliCafe}
                      alt="Working from a tropical cafe"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                </FadeIn>
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EDITORIAL SECTION 2 — Full-width photo break
          ═══════════════════════════════════════════════ */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Parallax speed={0.2} className="absolute inset-0">
          <Image
            src={editorialPhotos.mountains}
            alt="Motorcycle road through mountains"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/50" />
        </Parallax>

        <div className="relative h-full flex items-center justify-center text-center px-6">
          <FadeIn>
            <blockquote className="max-w-3xl">
              <p className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                &ldquo;The best investment you&apos;ll ever make is in your own{" "}
                <span className="gradient-text">freedom.</span>&rdquo;
              </p>
              <cite className="text-drift-gray text-base font-normal not-italic">
                — Every person who actually did it
              </cite>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LIFESTYLE GRID — Magazine-style asymmetric
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
        <FadeIn>
          <p className="text-ocean-blue font-medium text-xs uppercase tracking-[0.2em] mb-4 text-center">
            Life on Your Terms
          </p>
          <h2 className="section-heading text-center mb-16 md:mb-20">
            This is what the protocol unlocks
          </h2>
        </FadeIn>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Large left card */}
          <FadeIn className="md:col-span-7" delay={0.1}>
            <div className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={editorialPhotos.dinner}
                alt="Fine dining experience"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-sunset-gold text-xs uppercase tracking-[0.15em] font-medium">
                  Pay with crypto
                </span>
                <h3 className="text-2xl md:text-3xl font-heading font-bold mt-2 mb-2">
                  Dinner in Lisbon, settled in sats
                </h3>
                <p className="text-drift-gray text-sm max-w-md">
                  Tap your card. The bill converts from EUR to BTC behind the
                  scenes. The waiter doesn&apos;t know. You don&apos;t care. Freedom
                  tastes good.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right column — two stacked */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <FadeIn delay={0.2}>
              <div className="group relative h-[240px] rounded-2xl overflow-hidden">
                <Image
                  src={editorialPhotos.motorcycle}
                  alt="Motorcycle ride through scenic road"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-lagoon-teal text-xs uppercase tracking-[0.15em] font-medium">
                    No commute
                  </span>
                  <h3 className="text-xl font-heading font-bold mt-1">
                    Mountain roads, not highway traffic
                  </h3>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="group relative h-[240px] rounded-2xl overflow-hidden">
                <Image
                  src={editorialPhotos.coastline}
                  alt="Tropical coastline at sunset"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-warm-coral text-xs uppercase tracking-[0.15em] font-medium">
                    Your schedule
                  </span>
                  <h3 className="text-xl font-heading font-bold mt-1">
                    Anchor in a quiet cove. Stay a while.
                  </h3>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom wide card */}
        <FadeIn delay={0.15} className="mt-5">
          <div className="group relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden">
            <Image
              src={editorialPhotos.ocean}
              alt="Ocean view from tropical location"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
            <div className="absolute top-0 bottom-0 left-0 flex items-center p-8 md:p-12">
              <div className="max-w-lg">
                <span className="text-ocean-blue text-xs uppercase tracking-[0.15em] font-medium">
                  Remote work, redefined
                </span>
                <h3 className="text-2xl md:text-4xl font-heading font-bold mt-2 mb-3">
                  Sunrise, good coffee,
                  <br />
                  zero commute.
                </h3>
                <p className="text-drift-gray text-sm">
                  Bali, Lisbon, Chiang Mai, Medellin — your office is wherever
                  the wifi and the coffee are good.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════
          FOUR PILLARS — Staggered editorial cards
          ═══════════════════════════════════════════════ */}
      <section className="bg-surface/40 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
          <FadeIn>
            <div className="md:flex md:items-end md:justify-between mb-16">
              <div>
                <p className="text-warm-coral font-medium text-xs uppercase tracking-[0.2em] mb-4">
                  The Protocol
                </p>
                <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight max-w-xl">
                  Four pillars of
                  <br />
                  <span className="gradient-text">sovereignty.</span>
                </h2>
              </div>
              <p className="text-drift-gray max-w-md mt-6 md:mt-0 text-lg leading-relaxed">
                Everything you need to secure your assets, protect your identity,
                and build a life of genuine freedom.
              </p>
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5" staggerDelay={0.12}>
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <Link
                  href={pillar.href}
                  className={`group block relative overflow-hidden rounded-2xl border ${pillar.accent}
                             ${pillar.bg} backdrop-blur-sm p-8 md:p-10
                             hover:shadow-glow-warm transition-all duration-500`}
                >
                  <pillar.icon
                    className={`w-10 h-10 ${pillar.color} mb-5 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <h3 className="text-2xl font-heading font-bold mb-3 text-sand-white">
                    {pillar.title}
                  </h3>
                  <p className="text-drift-gray leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                  <span
                    className={`${pillar.color} text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all`}
                  >
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </span>

                  {/* Decorative corner glow */}
                  <div
                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${pillar.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED ARTICLES — Magazine editorial layout
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
        <FadeIn>
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-lagoon-teal font-medium text-xs uppercase tracking-[0.2em] mb-4">
                Latest Dispatches
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold">
                From the Protocol
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 text-sunset-gold font-medium hover:gap-3 transition-all"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Feature article — large */}
          <FadeIn className="md:col-span-7" delay={0.1}>
            <Link href="/blog/crypto-wallet-security-guide-2026" className="group block">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={editorialPhotos.laptop}
                  alt="Crypto security workspace"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="text-sunset-gold text-xs uppercase tracking-[0.15em] font-medium">
                Crypto Security
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mt-2 mb-3 group-hover:text-sunset-gold transition-colors">
                The Complete Crypto Wallet Security Guide for 2026
              </h3>
              <p className="text-drift-gray leading-relaxed max-w-lg">
                $3.8B stolen in 2025. Most of it was preventable. This guide
                covers every layer of protection from seed phrases to
                multi-sig.
              </p>
            </Link>
          </FadeIn>

          {/* Two smaller articles */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <FadeIn delay={0.25}>
              <Link href="/blog/ai-voice-cloning-crypto" className="group block">
                <span className="text-ocean-blue text-xs uppercase tracking-[0.15em] font-medium">
                  AI Defense
                </span>
                <h3 className="text-xl font-heading font-bold mt-2 mb-2 group-hover:text-ocean-blue transition-colors">
                  How AI Voice Cloning Targets Crypto Holders
                </h3>
                <p className="text-drift-gray text-sm leading-relaxed">
                  3 seconds of audio is all it takes. The attack vector most
                  people don&apos;t see coming.
                </p>
                <div className="h-px bg-border/50 mt-8" />
              </Link>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Link href="/blog/zero-tax-countries-crypto-2026" className="group block">
                <span className="text-lagoon-teal text-xs uppercase tracking-[0.15em] font-medium">
                  Expat Freedom
                </span>
                <h3 className="text-xl font-heading font-bold mt-2 mb-2 group-hover:text-lagoon-teal transition-colors">
                  5 Countries With 0% Crypto Tax in 2026
                </h3>
                <p className="text-drift-gray text-sm leading-relaxed">
                  Legal, tested, and accessible. The residency programs that
                  crypto holders are actually using.
                </p>
                <div className="h-px bg-border/50 mt-8" />
              </Link>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sunset-gold font-medium text-sm hover:gap-3 transition-all md:hidden"
              >
                View all articles <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SOCIAL PROOF — Horizontal stats strip
          ═══════════════════════════════════════════════ */}
      <section className="border-y border-border/30 bg-surface/30">
        <Stagger
          className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-border/30"
          staggerDelay={0.15}
        >
          {[
            { number: "2,500+", label: "Security checklists downloaded" },
            { number: "141+", label: "Privacy tools tested & reviewed" },
            { number: "Every Tuesday", label: "Free intelligence briefing" },
          ].map((stat) => (
            <StaggerItem key={stat.label} className="text-center px-6">
              <div className="text-3xl md:text-4xl font-heading font-bold text-sunset-gold mb-2">
                {stat.number}
              </div>
              <div className="text-drift-gray text-sm">{stat.label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ═══════════════════════════════════════════════
          NEWSLETTER CTA — Cinematic with photo
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background photo */}
            <div className="absolute inset-0">
              <Image
                src={editorialPhotos.ocean}
                alt="Ocean horizon at sunset"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-br from-sunset-gold/10 via-transparent to-ocean-blue/10" />
            </div>

            <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
              <Sparkles className="w-10 h-10 text-sunset-gold mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 max-w-2xl mx-auto leading-tight">
                Ready to start building
                <br />
                <span className="gradient-text">your freedom?</span>
              </h2>
              <p className="text-drift-gray text-lg mb-10 max-w-md mx-auto">
                Weekly intelligence briefing — security, crypto, and sovereignty
                plays. Every Tuesday. Free forever.
              </p>
              <NewsletterForm />
              <p className="text-xs text-muted-slate mt-6">
                Join 2,500+ subscribers. Free &ldquo;Crypto Security Checklist&rdquo;
                on signup.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST BAR
          ═══════════════════════════════════════════════ */}
      <section className="border-t border-border/30 bg-surface/20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-wrap justify-center gap-8 text-drift-gray text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-sunset-gold/60" />
            No personal data collected
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-sunset-gold/60" />
            Privacy-first analytics
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-sunset-gold/60" />
            100% anonymous operation
          </div>
        </div>
      </section>
    </>
  );
}
