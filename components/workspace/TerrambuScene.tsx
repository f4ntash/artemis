"use client";

import { useLayoutEffect, useRef, useState } from "react";
import LiveWebsiteFrame from "./LiveWebsiteFrame";
import { digitalProjects, sceneCount } from "./workspaceData";

type TerrambuSceneProps = {
  sceneStyle: React.CSSProperties;
  active: boolean;
  onSceneLink: (index: number) => void;
};

export default function TerrambuScene({ sceneStyle, active, onSceneLink }: TerrambuSceneProps) {
  const retainedScrollY = useRef<number | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<(typeof digitalProjects)[number]["id"]>(
    digitalProjects[0].id,
  );
  const activeProject = digitalProjects.find((project) => project.id === activeProjectId) ?? digitalProjects[0];

  useLayoutEffect(() => {
    if (retainedScrollY.current === null) return;
    const scrollY = retainedScrollY.current;
    retainedScrollY.current = null;
    let restoreFrame = 0;
    const frame = window.requestAnimationFrame(() => {
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      void root.offsetHeight;
      window.scrollTo(0, scrollY);
      restoreFrame = window.requestAnimationFrame(() => {
        root.style.scrollBehavior = previousBehavior;
      });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(restoreFrame);
    };
  }, [activeProjectId]);

  const selectProject = (projectId: (typeof digitalProjects)[number]["id"]) => {
    const scene = document.getElementById("terrambu");
    const workspace = scene?.closest<HTMLElement>(".workspace");
    if (scene && workspace && !window.matchMedia("(max-width:900px)").matches) {
      const sceneIndex = Number(scene.dataset.projectScene);
      const range = workspace.offsetHeight - window.innerHeight;
      retainedScrollY.current = workspace.offsetTop + (sceneIndex / (sceneCount - 1)) * range;
    } else if (retainedScrollY.current === null) {
      retainedScrollY.current = window.scrollY;
    }
    setActiveProjectId(projectId);
  };

  return (
    <article
      className={`scene scene-terrambu dark${active ? " is-active" : ""}`}
      id="terrambu"
      data-project-scene="1"
      data-od-id="escena-terrambu"
      style={sceneStyle}
    >
      <div className="digital-project-tabs" role="tablist" aria-label="Proyectos digitales">
        {digitalProjects.map((project) => (
          <button
            key={project.id}
            className="variant-button"
            type="button"
            role="tab"
            aria-selected={activeProject.id === project.id}
            aria-pressed={activeProject.id === project.id}
            onMouseDown={(event) => event.preventDefault()}
            onPointerDown={(event) => {
              retainedScrollY.current = window.scrollY;
              event.preventDefault();
            }}
            onClick={() => selectProject(project.id)}
          >
            {project.number}
          </button>
        ))}
      </div>

      <div className="digital-project-content" key={activeProject.id}>
        {activeProject.type === "website" ? (
          <>
            <header className="scene-heading project-scene-heading project-context-heading motion-heading terrambu-motion-heading">
              <span className="scene-number">02 / Experiencia web</span>
              <h2 className="motion-title">{activeProject.title}</h2>
              <span className="kind">{activeProject.subtitle}</span>
              <span className="project-location">{activeProject.location}</span>
              <p className="project-context-copy">{activeProject.commercialContext}</p>
              <a className="contextual-cta dark" href="#contacto" data-service="web" data-cursor="Abrir">
                Quiero una experiencia así ↗
              </a>
            </header>
            <LiveWebsiteFrame
              title={activeProject.title}
              url={activeProject.url}
              externalUrl={activeProject.externalUrl}
              className="terrambu-project-frame"
            />
          </>
        ) : (
          <div className="digital-project-cta">
            <span className="scene-number">02 / Experiencia web</span>
            <h2>{activeProject.title}</h2>
            <p>
              Contanos qué querés mostrar, vender o hacer explorable.
              <br />
              Nosotros te ayudamos a darle forma.
            </p>
            <a href="#contacto">Hablemos del proyecto ↗</a>
            <span className="digital-project-cta-meta">Web · 3D · Producto interactivo</span>
          </div>
        )}
      </div>
      <a
        className="scene-action"
        href="#product"
        data-scene-link="2"
        data-od-id="terrambu-siguiente"
        onClick={(event) => {
          event.preventDefault();
          onSceneLink(2);
        }}
      >
        Continuar →
      </a>
    </article>
  );
}
