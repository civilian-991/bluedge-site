import type { Metadata } from "next";
import SubPageLayout from "@/components/SubPageLayout";
import ManifestoTypewriter from "@/components/retro/ManifestoTypewriter";

export const metadata: Metadata = {
  title: "Manifesto | BluEdge Agency",
  description: "The BluEdge Manifesto — What we believe, why we care, and how we work.",
  openGraph: {
    title: "Manifesto | BluEdge Agency",
    description: "The BluEdge Manifesto — What we believe, why we care, and how we work.",
    type: "website",
    siteName: "BluEdge Agency",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifesto | BluEdge Agency",
    description: "The BluEdge Manifesto — What we believe, why we care, and how we work.",
  },
};

export default function ManifestoPage() {
  return (
    <SubPageLayout breadcrumbs={[{ label: "Manifesto" }]}>
      <ManifestoTypewriter />
    </SubPageLayout>
  );
}
