import type { Metadata } from "next";
import CinematicExperience from "@/components/cinematic/CinematicExperience";

export const metadata: Metadata = {
  title: "Cinematic Home — ARTEMIS",
  description: "Estudio experimental de cámara, materialidad e iluminación para ARTEMIS.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CinematicHomePage() {
  return <CinematicExperience />;
}
