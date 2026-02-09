import type { Metadata } from "next";
import SubPageLayout from "@/components/SubPageLayout";
import MovieLobbyPortfolio from "@/components/retro/cinema/MovieLobbyPortfolio";
import FilmGrain from "@/components/retro/cinema/FilmGrain";

export const metadata: Metadata = {
  title: "Our Work | BluEdge Agency",
  description:
    "Explore our portfolio of creative projects — branding, digital campaigns, web design, and more. Every project tells a story.",
  openGraph: {
    title: "Our Work | BluEdge Agency",
    description:
      "Explore our portfolio of creative projects — branding, digital campaigns, web design, and more. Every project tells a story.",
    type: "website",
    siteName: "BluEdge Agency",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | BluEdge Agency",
    description:
      "Explore our portfolio of creative projects — branding, digital campaigns, web design, and more. Every project tells a story.",
  },
};

export default function WorkPage() {
  return (
    <SubPageLayout breadcrumbs={[{ label: "Work" }]}>
      <FilmGrain />
      <MovieLobbyPortfolio />
    </SubPageLayout>
  );
}
