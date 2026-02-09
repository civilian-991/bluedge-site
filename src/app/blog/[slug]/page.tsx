import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostBySlug, blogSlugs } from "@/data/blog";
import SubPageLayout from "@/components/SubPageLayout";
import CassetteBlogPost from "@/components/retro/boombox/CassetteBlogPost";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | BluEdge Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | BluEdge Blog`,
      description: post.excerpt,
      type: 'article',
      siteName: 'BluEdge Agency',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | BluEdge Blog`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <SubPageLayout
      breadcrumbs={[
        { label: "Blog", href: "/blog" },
        { label: post.title },
      ]}
    >
      <CassetteBlogPost post={post} />
    </SubPageLayout>
  );
}
