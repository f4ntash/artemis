import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import Workspace from "@/components/workspace/Workspace";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Workspace />
        <Capabilities />
        <Contact />
      </main>
    </>
  );
}
