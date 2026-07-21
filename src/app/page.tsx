// Home Page — Server Component
// Sections: Navbar | Hero | About | Stats | Timeline | Team | Footer

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import TeamSection from "@/components/sections/TeamSection";
import FaqSection from "@/components/sections/FaqSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <TimelineSection />
        <TeamSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
