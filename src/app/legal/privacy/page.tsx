import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="section-heading mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-drift-gray leading-relaxed">
        <p><strong className="text-sand-white">Last updated:</strong> March 10, 2026</p>

        <p>
          FreedomProtocol (&quot;we&quot;, &quot;us&quot;) operates freedomprotocol.io. This
          policy explains what data we collect and how we use it.
        </p>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          What We Collect
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong className="text-sand-white">Email address</strong> — only
            if you voluntarily subscribe to our newsletter
          </li>
          <li>
            <strong className="text-sand-white">Anonymous analytics</strong> —
            page views, referrer, country (via Plausible Analytics — no cookies,
            no personal data)
          </li>
        </ul>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          What We Do NOT Collect
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>No tracking cookies</li>
          <li>No personal identifiers</li>
          <li>No IP address logging</li>
          <li>No third-party advertising trackers</li>
          <li>No data sold to anyone, ever</li>
        </ul>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          Email
        </h2>
        <p>
          If you subscribe, your email is stored with our email provider
          (ConvertKit/Beehiiv). You can unsubscribe at any time via the link in
          every email. We will never sell or share your email.
        </p>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          Affiliate Links
        </h2>
        <p>
          Some links on this site are affiliate links. When you purchase through
          them, we may earn a commission at no extra cost to you. Affiliate
          partners may use their own tracking cookies on their sites — refer to
          their privacy policies.
        </p>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          Contact
        </h2>
        <p>
          Questions about this policy? Email privacy@freedomprotocol.io
        </p>
      </div>
    </div>
  );
}
