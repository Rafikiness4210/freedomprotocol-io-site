"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Compass, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/start-here", label: "Start Here" },
  { href: "/newsletter", label: "Newsletter" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border/40 shadow-lg shadow-background/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Compass className="w-6 h-6 text-sunset-gold group-hover:rotate-45 transition-transform duration-500" />
          <span className="font-heading font-bold text-lg tracking-wide">
            FREEDOM<span className="text-sunset-gold">PROTOCOL</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sand-white/70 hover:text-sunset-gold transition-colors text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/newsletter" className="btn-primary text-sm !py-2.5 !px-5">
            Join The Protocol
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-sand-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/40 px-6 py-5 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sand-white hover:text-sunset-gold transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/newsletter"
            className="btn-primary text-sm w-full justify-center mt-3"
            onClick={() => setMobileOpen(false)}
          >
            Join The Protocol
          </Link>
        </nav>
      )}
    </header>
  );
}
