import type { Metadata } from "next";
import SubPageLayout from "@/components/SubPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | BluEdge Agency",
  description:
    "BluEdge Agency terms of service — the rules and guidelines governing use of our website and services.",
  openGraph: {
    title: "Terms of Service | BluEdge Agency",
    description:
      "BluEdge Agency terms of service — the rules and guidelines governing use of our website and services.",
    type: "website",
    siteName: "BluEdge Agency",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | BluEdge Agency",
    description:
      "BluEdge Agency terms of service — the rules and guidelines governing use of our website and services.",
  },
};

export default function TermsOfServicePage() {
  return (
    <SubPageLayout breadcrumbs={[{ label: "Terms of Service" }]}>
      <section className="pt-40 pb-24" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-[#2CACE2]">Terms</span> of Service
          </h1>
          <p className="text-white/40 text-sm font-mono mb-16">
            Last updated: February 2026
          </p>

          <div className="space-y-12 text-white/70 leading-relaxed">
            {/* Introduction */}
            <div>
              <p>
                Welcome to the website of Blu Edge Agency (&quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;), a creative marketing agency based in Hazmieh, Beirut, Lebanon. By
                accessing or using our website, you agree to be bound by these Terms of Service. If
                you do not agree with any part of these terms, please do not use our site.
              </p>
            </div>

            {/* Use of Website */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                01 / Use of Website
              </h2>
              <p>
                You may use our website for lawful purposes only. You agree not to misuse the site,
                attempt to gain unauthorized access to any systems, or interfere with other
                users&apos; access. We reserve the right to restrict or terminate access to the site
                at our discretion.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                02 / Intellectual Property
              </h2>
              <p>
                All content on this website, including but not limited to text, graphics, logos,
                images, animations, code, and design elements, is the property of Blu Edge Agency
                or its licensors and is protected by applicable intellectual property laws. You may
                not reproduce, distribute, or create derivative works without our prior written
                consent.
              </p>
            </div>

            {/* Services */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                03 / Services
              </h2>
              <p>
                Information about our services on this website is provided for general informational
                purposes. Specific project terms, deliverables, timelines, and fees will be defined
                in separate agreements between Blu Edge Agency and the client. We reserve the right
                to modify or discontinue any service at any time.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                04 / Limitation of Liability
              </h2>
              <p>
                Our website and its content are provided &quot;as is&quot; without warranties of any
                kind, express or implied. Blu Edge Agency shall not be liable for any direct,
                indirect, incidental, or consequential damages arising from your use of, or
                inability to use, this website. This includes but is not limited to errors,
                interruptions, loss of data, or any third-party content linked from our site.
              </p>
            </div>

            {/* External Links */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                05 / External Links
              </h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for
                the content, privacy practices, or availability of those external sites. Accessing
                them is at your own risk.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                06 / Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the
                Republic of Lebanon. Any disputes arising from these terms or the use of our website
                shall be subject to the exclusive jurisdiction of the courts of Beirut, Lebanon.
              </p>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                07 / Changes to Terms
              </h2>
              <p>
                We reserve the right to update these terms at any time. Changes will be posted on
                this page with an updated revision date. Your continued use of the website after
                changes are posted constitutes acceptance of the revised terms.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-[#2CACE2] mb-4">
                08 / Contact Us
              </h2>
              <p>
                For questions regarding these terms, please reach out at{" "}
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
