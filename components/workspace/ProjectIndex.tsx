import { projectScenes } from "./workspaceData";

type ProjectIndexProps = {
  currentScene: number;
  dark: boolean;
  outside: boolean;
  onSelect: (index: number) => void;
};

export default function ProjectIndex({ currentScene, dark, outside, onSelect }: ProjectIndexProps) {
  return (
    <aside
      className={`project-index${dark ? " dark" : ""}${outside ? " outside" : ""}`}
      aria-label="Índice de proyectos"
      data-od-id="indice-proyectos"
    >
      {projectScenes.map((scene, index) => (
        <button
          key={scene.label}
          className="index-button"
          type="button"
          aria-label={`Ir a ${scene.name}`}
          aria-current={currentScene === index ? "true" : undefined}
          data-scene-target={index}
          data-od-id={
            index === 0
              ? "indice-h2o"
              : index === 1
                ? "indice-terrambu"
                : index === 2
                  ? "indice-producto"
                  : "indice-sistema"
          }
          onClick={() => onSelect(index)}
        >
          {scene.label}
        </button>
      ))}
    </aside>
  );
}
