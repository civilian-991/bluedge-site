import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Partnerships from "@/components/Partnerships";
import Footer from "@/components/Footer";
import CursorMetamorphosis from "@/components/CursorMetamorphosis";
import ScrollProgress from "@/components/ScrollProgress";
import IdleStatic from "@/components/retro/IdleStatic";
import KonamiCode from "@/components/retro/KonamiCode";
import MatrixPill from "@/components/retro/MatrixPill";
import RetroTVServices from "@/components/retro/RetroTVServices";
import GrendizerProcess from "@/components/retro/GrendizerProcess";
import NewspaperTestimonials from "@/components/retro/NewspaperTestimonials";
import PolaroidGallery from "@/components/retro/PolaroidGallery";
import TelegramContact from "@/components/retro/TelegramContact";
import SoundToggle from "@/components/retro/SoundToggle";
import VHSRewind from "@/components/retro/VHSRewind";
import CollectibleCounter from "@/components/retro/CollectibleCounter";
import CollectibleCelebration from "@/components/retro/CollectibleCelebration";
import TimeThemeProvider from "@/components/retro/TimeThemeProvider";

import ScrollMascot from "@/components/retro/ScrollMascot";
import AmbientAudioManager from "@/components/retro/AmbientAudioManager";
import CinemaMode from "@/components/retro/CinemaMode";
import ParallaxInit from "@/components/retro/ParallaxInit";
import {
  HeroToMatrixTransition,
  MatrixToTVTransition,
  TVToWorkTransition,
  WorkToGrendizerTransition,
  GrendizerToAboutTransition,
  AboutToPartnershipsTransition,
  PartnershipsToNewspaperTransition,
  NewspaperToContactTransition,
} from "@/components/retro/SectionTransitions";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Preloader */}
      <Preloader />

      {/* Context-aware cursor (Feature 11 — replaces CustomCursor) */}
      <CursorMetamorphosis />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Idle static overlay (Feature 9) */}
      <IdleStatic />

      {/* Konami code easter egg (Feature 10) */}
      <KonamiCode />

      {/* VHS Rewind scroll effect (Feature 17) */}
      <VHSRewind />

      {/* Sound toggle (Feature 13) */}
      <SoundToggle />

      {/* Dynamic Time Theme (Feature 24) */}
      <TimeThemeProvider />

      {/* Cinema Mode (Feature 25) */}
      <CinemaMode />

      {/* Ambient Audio Manager (Feature 21) */}
      <AmbientAudioManager />

      {/* 3D Parallax Depth Engine init (Feature 20) */}
      <ParallaxInit />

{/* Scroll Mascot — flying rocket companion */}
      <ScrollMascot />

      {/* Collectibles counter (Feature 16) */}
      <CollectibleCounter />
      <CollectibleCelebration />

      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* Hero Section (with TintinRocket CTA + ParticleConstellation) */}
        <Hero />

        {/* Transition: Hero → MatrixPill */}
        <HeroToMatrixTransition />

        {/* Matrix Pill Choice (Feature 2) */}
        <MatrixPill />

        {/* Transition: MatrixPill → RetroTV */}
        <MatrixToTVTransition />

        {/* Retro TV Services (Feature 5 — replaces Services) */}
        <RetroTVServices />

        {/* Transition: RetroTV → Work */}
        <TVToWorkTransition />

        {/* Polaroid Work Gallery (Feature 14 — replaces Work) */}
        <PolaroidGallery />

        {/* Transition: Work → Grendizer */}
        <WorkToGrendizerTransition />

        {/* Grendizer Process (Feature 4) */}
        <GrendizerProcess />

        {/* Transition: Grendizer → About */}
        <GrendizerToAboutTransition />

        {/* About Section (with ArcadeStats + ComicStripAbout) */}
        <About />

        {/* Transition: About → Partnerships */}
        <AboutToPartnershipsTransition />

        {/* Partnerships Section */}
        <Partnerships />

        {/* Transition: Partnerships → Newspaper */}
        <PartnershipsToNewspaperTransition />

        {/* Newspaper Testimonials (Feature 6 — replaces Testimonials) */}
        <NewspaperTestimonials />

        {/* Transition: Newspaper → Contact */}
        <NewspaperToContactTransition />

        {/* Telegram Contact Form (Feature 15 — replaces Contact) */}
        <TelegramContact />
      </main>

      {/* Footer */}
      <Footer />
    </SmoothScroll>
  );
}
