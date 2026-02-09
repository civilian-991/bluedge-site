import type { Metadata } from "next";
import SubPageLayout from "@/components/SubPageLayout";
import BoomboxBlogHub from "@/components/retro/boombox/BoomboxBlogHub";

export const metadata: Metadata = {
  title: "Blog & Insights | BluEdge Agency",
  description:
    "Design tips, branding insights, marketing trends, and behind-the-scenes stories from the BluEdge creative team.",
  openGraph: {
    title: "Blog & Insights | BluEdge Agency",
    description:
      "Design tips, branding insights, marketing trends, and behind-the-scenes stories from the BluEdge creative team.",
    type: "website",
    siteName: "BluEdge Agency",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights | BluEdge Agency",
    description:
      "Design tips, branding insights, marketing trends, and behind-the-scenes stories from the BluEdge creative team.",
  },
};

export default function BlogPage() {
  return (
    <SubPageLayout breadcrumbs={[{ label: "Blog" }]}>
      <BoomboxBlogHub />
    </SubPageLayout>
  );
}
