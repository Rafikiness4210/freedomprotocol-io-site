import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="section-heading mb-8">Terms of Use</h1>
      <div className="space-y-6 text-drift-gray leading-relaxed">
        <p><strong className="text-sand-white">Last updated:</strong> March 10, 2026</p>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          General
        </h2>
        <p>
          By using freedomprotocol.io, you agree to these terms. If you
          disagree, do not use this site.
        </p>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          Content
        </h2>
        <p>
          All content is for educational and informational purposes only.
          Nothing on this site constitutes financial, legal, or tax advice.
          Always consult qualified professionals before making financial
          decisions or relocating internationally.
        </p>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          Accuracy
        </h2>
        <p>
          We make every effort to ensure accuracy but cannot guarantee that all
          information is current or complete. Tax laws, residency requirements,
          and security threats change constantly. Verify independently before
          acting.
        </p>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          Digital Products
        </h2>
        <p>
          Digital products are delivered electronically and are non-refundable
          unless the product is materially different from what was described.
          Contact support@freedomprotocol.io for issues.
        </p>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          Affiliate Links
        </h2>
        <p>
          This site contains affiliate links. We may earn commissions from
          purchases made through these links. This does not affect our
          recommendations — we only link to tools we have tested and trust.
        </p>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          Liability
        </h2>
        <p>
          FreedomProtocol is not liable for any losses, damages, or consequences
          resulting from the use of information on this site. Use all guides,
          tools, and recommendations at your own risk.
        </p>

        <h2 className="text-xl font-heading font-semibold text-sand-white mt-8">
          Contact
        </h2>
        <p>
          Questions? Email legal@freedomprotocol.io
        </p>
      </div>
    </div>
  );
}
