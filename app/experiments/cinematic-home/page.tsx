import type { Metadata } from "next";
import CinematicExperience from "@/components/cinematic/CinematicExperience";

export const metadata: Metadata = {
  title: "Cinematic Home — FORMA 3D",
  description: "Estudio experimental de cámara, materialidad e iluminación para FORMA 3D.",
};

export default function CinematicHomePage() {
  return <CinematicExperience />;
}
