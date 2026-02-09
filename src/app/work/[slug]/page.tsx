import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudyBySlug, caseStudySlugs } from "@/data/caseStudies";
import SubPageLayout from "@/components/SubPageLayout";
import CinemaReelCaseStudy from "@/components/retro/cinema/CinemaReelCaseStudy";
import FilmGrain from "@/components/retro/cinema/FilmGrain";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };

  return {
    title: `${study.title} | BluEdge Agency`,
    description: `${study.category} — ${study.challenge.slice(0, 150)}`,
    openGraph: {
      title: `${study.title} | BluEdge Agency`,
      description: `${study.category} — ${study.challenge.slice(0, 150)}`,
      type: 'article',
      siteName: 'BluEdge Agency',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${study.title} | BluEdge Agency`,
      description: `${study.category} — ${study.challenge.slice(0, 150)}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <SubPageLayout
      breadcrumbs={[
        { label: "Work", href: "/work" },
        { label: study.title },
      ]}
    >
      <FilmGrain />
      <CinemaReelCaseStudy study={study} />
    </SubPageLayout>
  );
}
