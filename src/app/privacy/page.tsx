import type { Metadata } from "next";
import SubPageLayout from "@/components/SubPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | BluEdge Agency",
  description:
    "BluEdge Agency privacy policy — how we collect, use, and protect your data.",
  openGraph: {
    title: "Privacy Policy | BluEdge Agency",
    description:
      "BluEdge Agency privacy policy — how we collect, use, and protect your data.",
    type: "website",
    siteName: "BluEdge Agency",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | BluEdge Agency",
    description:
      "BluEdge Agency privacy policy — how we collect, use, and protect your data.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <SubPageLayout breadcrumbs={[{ label: "Privacy Policy" }]}>
      <section className="pt-40 pb-24" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-[#2CACE2]">Privacy</span> Policy
          </h1>
          <p className="text-white/40 text-sm font-mono mb-16">
            Last updated: February 2026
          </p>

          <div className="space-y-12 text-white/70 leading-relaxed">
            {/* Introduction */}
            <div>
              <p>
                Blu Edge Agency (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), based in Hazmieh, Beirut, Lebanon,
                is committed to protecting your privacy. This policy explains how we collect, use, and
                safeguard your information when you visit our website or engage our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                01 / Information We Collect
              </h2>
              <p className="mb-3">
                We may collect personal information that you voluntarily provide, including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-white/60 ml-4">
                <li>Name, email address, and phone number via contact forms</li>
                <li>Company name and project details when you request a quote</li>
                <li>Email address when subscribing to our newsletter</li>
              </ul>
              <p className="mt-3">
                We also automatically collect certain technical data such as browser type, device
                information, IP address, and pages visited through cookies and analytics tools.
              </p>
            </div>

            {/* How We Use It */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                02 / How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-1 text-white/60 ml-4">
                <li>To respond to inquiries and provide requested services</li>
                <li>To send newsletters and marketing communications (with your consent)</li>
                <li>To improve our website, content, and user experience</li>
                <li>To analyze site traffic and usage patterns</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                03 / Cookies &amp; Tracking
              </h2>
              <p>
                Our website uses cookies and similar technologies to enhance your browsing
                experience and gather analytics data. You can control cookie preferences through
                your browser settings. Disabling cookies may affect certain site features.
              </p>
            </div>

            {/* Third Parties */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                04 / Third-Party Services
              </h2>
              <p>
                We may use third-party services for analytics, hosting, and email delivery. These
                providers have their own privacy policies and may collect data as described in their
                respective terms. We do not sell, trade, or rent your personal information to third
                parties.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                05 / Data Security
              </h2>
              <p>
                We implement reasonable technical and organizational measures to protect your data
                against unauthorized access, alteration, or destruction. However, no method of
                electronic transmission or storage is completely secure, and we cannot guarantee
                absolute security.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                06 / Your Rights
              </h2>
              <p>
                You have the right to access, correct, or request deletion of your personal data.
                You may also withdraw consent for marketing communications at any time by
                unsubscribing or contacting us directly.
              </p>
            </div>

            {/* Updates */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                07 / Policy Updates
              </h2>
              <p>
                We may update this privacy policy from time to time. Changes will be posted on this
                page with an updated revision date. Continued use of our website constitutes
                acceptance of the revised policy.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                08 / Contact Us
              </h2>
              <p>
                If you have any questions about this privacy policy, please contact us at{" "}
                <a
                  href="mailto:ziad@bluedge.me"
                  className="text-[#2CACE2] hover:underline underline-offset-4"
                >
                  ziad@bluedge.me
                </a>
              </p>
              <p className="mt-2 text-white/40 text-sm">
                Blu Edge Agency — Hazmieh, Beirut, Lebanon
              </p>
            </div>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
