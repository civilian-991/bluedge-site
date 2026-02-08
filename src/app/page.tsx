import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Partnerships from "@/components/Partnerships";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import IdleStatic from "@/components/retro/IdleStatic";
import KonamiCode from "@/components/retro/KonamiCode";
import MatrixPill from "@/components/retro/MatrixPill";
import RetroTVServices from "@/components/retro/RetroTVServices";
import GrendizerProcess from "@/components/retro/GrendizerProcess";
import NewspaperTestimonials from "@/components/retro/NewspaperTestimonials";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Preloader */}
      <Preloader />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Idle static overlay (Feature 9) */}
      <IdleStatic />

      {/* Konami code easter egg (Feature 10) */}
      <KonamiCode />

      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* Hero Section (with TintinRocket CTA) */}
        <Hero />

        {/* Matrix Pill Choice (Feature 2) */}
        <MatrixPill />

        {/* Retro TV Services (Feature 5 — replaces Services) */}
        <RetroTVServices />

        {/* Work/Portfolio Section */}
        <Work />

        {/* Grendizer Process (Feature 4) */}
        <GrendizerProcess />

        {/* About Section (with ArcadeStats + ComicStripAbout) */}
        <About />

        {/* Partnerships Section */}
        <Partnerships />

        {/* Newspaper Testimonials (Feature 6 — replaces Testimonials) */}
        <NewspaperTestimonials />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </SmoothScroll>
  );
}
