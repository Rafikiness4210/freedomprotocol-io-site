import Link from "next/link";
import { Compass } from "lucide-react";

const footerLinks = {
  Content: [
    { href: "/blog", label: "Blog" },
    { href: "/resources", label: "Resources" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/start-here", label: "Start Here" },
  ],
  Legal: [
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/terms", label: "Terms of Use" },
    { href: "/about", label: "About" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface/80">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-sunset-gold" />
              <span className="font-heading font-bold tracking-wide">
                FREEDOM<span className="text-sunset-gold">PROTOCOL</span>
              </span>
            </div>
            <p className="text-drift-gray text-sm leading-relaxed">
              Crypto security, AI defense, and the freedom to live anywhere.
              Your sovereignty playbook.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-sand-white mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-drift-gray hover:text-sunset-gold transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-slate text-xs">
            &copy; {new Date().getFullYear()} FreedomProtocol. All rights
            reserved.
          </p>
          <p className="text-muted-slate text-xs">
            Disclosure: Some links are affiliate links. We only recommend tools
            we trust.
          </p>
        </div>
      </div>
    </footer>
  );
}
