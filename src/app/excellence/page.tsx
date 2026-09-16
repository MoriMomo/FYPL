import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ExcellenceHero from "@/components/excellence/ExcellenceHero";
import RoadmapPath from "@/components/excellence/RoadmapPath";
import ThroughlineTracker from "@/components/excellence/ThroughlineTracker";
import AppliedBGACards from "@/components/excellence/AppliedBGACards";
import { EXCELLENCE_META } from "@/data/excellence";

export const metadata: Metadata = {
  title: EXCELLENCE_META.title,
  description: EXCELLENCE_META.subtitle,
};

export default function ExcellencePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ExcellenceHero />
        <RoadmapPath />
        <ThroughlineTracker />
        <AppliedBGACards />
      </main>
      <Footer />
    </>
  );
}
