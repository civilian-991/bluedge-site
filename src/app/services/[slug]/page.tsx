import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, serviceSlugs } from "@/data/serviceDetails";
import SubPageLayout from "@/components/SubPageLayout";
import TerminalServiceDetail from "@/components/retro/terminal/TerminalServiceDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | BluEdge Agency`,
    description: service.tagline + " — " + service.description.slice(0, 150),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <SubPageLayout
      breadcrumbs={[
        { label: "Services", href: "/#services" },
        { label: service.title },
      ]}
    >
      <TerminalServiceDetail service={service} />
    </SubPageLayout>
  );
}
