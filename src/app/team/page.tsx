import type { Metadata } from "next";
import SubPageLayout from "@/components/SubPageLayout";
import RPGDungeonTeam from "@/components/retro/rpg/RPGDungeonTeam";

export const metadata: Metadata = {
  title: "The Team | BluEdge Agency",
  description:
    "Meet the BluEdge guild — strategists, designers, developers, and creative warriors who bring your brand to life.",
};

export default function TeamPage() {
  return (
    <SubPageLayout breadcrumbs={[{ label: "Team" }]}>
      <RPGDungeonTeam />
    </SubPageLayout>
  );
}
