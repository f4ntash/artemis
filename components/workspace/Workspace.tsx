"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import workspaceStyles from "@/styles/workspace.module.css";
import ContextCursor from "./ContextCursor";
import DigitalSystemScene from "./DigitalSystemScene";
import H2OScene from "./H2OScene";
import ProductScene from "./ProductScene";
import ProjectIndex from "./ProjectIndex";
import TerrambuScene from "./TerrambuScene";
import { sceneCount } from "./workspaceData";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const mobileQuery = "(max-width:900px)";

type SceneMetrics = {
  opacity: number;
  x: number;
  y: number;
};

const dispatchChrome = (detail: { dark?: boolean; compact?: boolean }) => {
  window.dispatchEvent(new CustomEvent("forma3d:chrome", { detail }));
};

export default function Workspace() {
  const workspaceRef = useRef<HTMLElement>(null);
  const tickingRef = useRef(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [rawScene, setRawScene] = useState(0);
  const [compact, setCompact] = useState(false);
  const [outside, setOutside] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const dark = currentScene === 1 || currentScene === 3;

  const sceneMetrics = useMemo<SceneMetrics[]>(
    () =>
      Array.from({ length: sceneCount }, (_, index) => {
        const distance = rawScene - index;
        const x = distance * viewport.width * 0.13;
        return {
          opacity: clamp(1 - Math.abs(distance) * 1.35, 0, 1),
          x,
          y: Math.abs(distance) * viewport.height * 0.035,
        };
      }),
    [rawScene, viewport],
  );

  const sceneStyle = useCallback(
    (index: number) => {
      const distance = Math.min(Math.abs(rawScene - index), 1);
      return ({
        "--scene-opacity": sceneMetrics[index].opacity.toFixed(3),
        "--scene-x": `${sceneMetrics[index].x}px`,
        "--scene-y": `${sceneMetrics[index].y}px`,
        "--scene-distance": distance.toFixed(3),
        "--scene-depth": `${distance * -72}px`,
        "--scene-scale": (1 - distance * 0.045).toFixed(4),
        "--title-scale": (1 + distance * 0.12).toFixed(4),
        "--title-track": `${-0.02 + distance * 0.035}em`,
        "--title-shift": `${distance * 38}px`,
        "--layer-a": `${-sceneMetrics[index].x * 0.42}px`,
        "--layer-b": `${sceneMetrics[index].x * 0.28}px`,
        "--layer-c": `${-sceneMetrics[index].x * 0.18}px`,
      }) as React.CSSProperties;
    },
    [rawScene, sceneMetrics],
  );

  const setScene = useCallback((index: number, raw = index) => {
    setCurrentScene(index);
    setRawScene(raw);
    dispatchChrome({ dark: index === 1 || index === 3 });
  }, []);

  const updateWorkspace = useCallback(() => {
    tickingRef.current = false;
    if (window.matchMedia(mobileQuery).matches) return;
    const workspace = workspaceRef.current;
    if (!workspace) return;

    const rect = workspace.getBoundingClientRect();
    const range = workspace.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / range, 0, 1);
    const raw = progress * (sceneCount - 1);
    setScene(Math.round(raw), raw);

    const nextCompact = window.scrollY > 40;
    setCompact(nextCompact);
    dispatchChrome({ compact: nextCompact });
  }, [setScene]);

  const requestWorkspaceUpdate = useCallback(() => {
    if (tickingRef.current) return;
    window.requestAnimationFrame(updateWorkspace);
    tickingRef.current = true;
  }, [updateWorkspace]);

  const goToScene = useCallback((index: number) => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    if (window.matchMedia(mobileQuery).matches) {
      const target = workspace.querySelector<HTMLElement>(`[data-project-scene="${index}"]`);
      if (target) window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      return;
    }

    const range = workspace.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: workspace.offsetTop + (index / (sceneCount - 1)) * range,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    dispatchChrome({ dark, compact });
  }, [dark, compact]);

  useEffect(() => {
    const onResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      requestWorkspaceUpdate();
    };

    setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("scroll", requestWorkspaceUpdate, { passive: true });
    window.addEventListener("resize", onResize);
    setScene(0, 0);
    requestWorkspaceUpdate();
    return () => {
      window.removeEventListener("scroll", requestWorkspaceUpdate);
      window.removeEventListener("resize", onResize);
    };
  }, [requestWorkspaceUpdate, setScene]);

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;
    const scenes = Array.from(workspace.querySelectorAll<HTMLElement>("[data-project-scene]"));
    const observer = new IntersectionObserver(
      (entries) => {
        if (!window.matchMedia(mobileQuery).matches) return;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.projectScene);
          setScene(index, index);
        });
      },
      { threshold: 0.45 },
    );

    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, [setScene]);

  useEffect(() => {
    const sections = ["trabajo", "capacidades", "contacto"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setOutside(entry.target.id !== "trabajo");
        });
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ProjectIndex currentScene={currentScene} dark={dark} outside={outside} onSelect={goToScene} />
      <ContextCursor />
      <section
        ref={workspaceRef}
        className={`workspace ${workspaceStyles.workspaceComponent}`}
        id="trabajo"
        data-od-id="workspace-trabajo"
      >
        <div className="workspace-stage" data-scene={currentScene + 1} data-od-id="escena-principal">
          <span className="axis axis-x" />
          <span className="axis axis-y" />
          <div className="stage-status label">3D · Web · Sistemas</div>

          <H2OScene sceneStyle={sceneStyle(0)} active={sceneMetrics[0].opacity > 0.12} onSceneLink={goToScene} />
          <TerrambuScene sceneStyle={sceneStyle(1)} active={sceneMetrics[1].opacity > 0.12} onSceneLink={goToScene} />
          <ProductScene sceneStyle={sceneStyle(2)} active={sceneMetrics[2].opacity > 0.12} onSceneLink={goToScene} />
          <DigitalSystemScene sceneStyle={sceneStyle(3)} active={sceneMetrics[3].opacity > 0.12} />
        </div>
      </section>
    </>
  );
}
