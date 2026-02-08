import Navigation from "@/components/Navigation";
import ManifestoTypewriter from "@/components/retro/ManifestoTypewriter";

export const metadata = {
  title: "Manifesto | BluEdge Agency",
  description: "The BluEdge Manifesto — What we believe, why we care, and how we work.",
};

export default function ManifestoPage() {
  return (
    <>
      <Navigation />
      <ManifestoTypewriter />
    </>
  );
}
