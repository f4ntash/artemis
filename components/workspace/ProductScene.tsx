"use client";

import { useEffect, useRef, useState } from "react";
import ExteriorHouseScene from "@/components/three/ExteriorHouseScene";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type ProductSceneProps = {
  sceneStyle: React.CSSProperties;
  active: boolean;
  onSceneLink: (index: number) => void;
};

type Variant = "natural" | "light" | "dark";

const variantBackground: Record<Variant, string> = {
  natural: "var(--accent-secondary)",
  light: "var(--bg)",
  dark: "var(--accent)",
};

export default function ProductScene({ sceneStyle, active, onSceneLink }: ProductSceneProps) {
  const slotRef = useRef<HTMLElement>(null);
  const dragRef = useRef({ dragging: false, x: 0, y: 0 });
  const renderStateRef = useRef("idle");
  const [rotation, setRotation] = useState({ x: -16, y: 28 });
  const [renderState, setRenderState] = useState("idle");
  const [engaged, setEngaged] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [expandedHotspot, setExpandedHotspot] = useState(false);
  const [variant, setVariant] = useState<Variant>("natural");
  const [fullscreenSupported, setFullscreenSupported] = useState(true);

  useEffect(() => {
    setFullscreenSupported(Boolean(slotRef.current?.requestFullscreen));
  }, []);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    slot.dataset.renderActive = String(active);
    slot.dispatchEvent(new CustomEvent("forma3d:render-visibility", { detail: { active } }));
    if (!active || renderStateRef.current !== "idle") return;

    renderStateRef.current = "loading";
    setRenderState("loading");
    window.setTimeout(() => {
      renderStateRef.current = "ready";
      setRenderState("ready");
      slot.dispatchEvent(new CustomEvent("forma3d:mount-ready"));
    }, 520);
  }, [active]);

  const beginDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (variant === "natural") return;
    if ((event.target as Element).closest("button")) return;
    dragRef.current = { dragging: true, x: event.clientX, y: event.clientY };
    setDragging(true);
    setEngaged(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.dragging) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    dragRef.current = { dragging: true, x: event.clientX, y: event.clientY };
    setRotation((current) => ({
      x: clamp(current.x - dy * 0.12, -38, 12),
      y: current.y + dx * 0.18,
    }));
  };

  const stopDrag = () => {
    dragRef.current.dragging = false;
    setDragging(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, [number, number]> = {
      ArrowLeft: [0, -6],
      ArrowRight: [0, 6],
      ArrowUp: [-4, 0],
      ArrowDown: [4, 0],
    };
    const change = keys[event.key];
    if (!change) return;
    event.preventDefault();
    setRotation((current) => ({ x: current.x + change[0], y: current.y + change[1] }));
  };

  const toggleFullscreen = () => {
    const slot = slotRef.current;
    if (!slot?.requestFullscreen) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void slot.requestFullscreen();
  };

  return (
    <article
      className={`scene scene-product${active ? " is-active" : ""}`}
      id="product"
      data-project-scene="2"
      data-od-id="escena-producto"
      style={sceneStyle}
    >
      <header className="scene-heading">
        <span className="scene-number">03 / 04</span>
        <h2 data-od-id="producto-titulo">
          Product
          <br />
          Configurator
        </h2>
        <span className="kind">3D interactivo</span>
      </header>
      <section
        ref={slotRef}
        className="three-slot"
        data-three-slot="product-configurator"
        data-render-state={renderState}
        data-engaged={engaged ? "true" : undefined}
        aria-label="Espacio preparado para el configurador 3D de producto"
        data-od-id="producto-three-slot"
      >
        <div
          className="canvas-mount"
          tabIndex={0}
          aria-label="Arrastrá para rotar el producto"
          data-canvas-mount="product-configurator"
          data-cursor="Rotar"
          data-dragging={dragging ? "true" : "false"}
          onPointerDown={beginDrag}
          onPointerMove={moveDrag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onKeyDown={onKeyDown}
        >
          <div className="slot-loading">Preparando objeto</div>
          {active && variant === "natural" ? <ExteriorHouseScene /> : null}
          {variant !== "natural" ? (
            <div className="slot-fallback" aria-hidden="true">
              <div
                className="product-object"
                data-object
                style={
                  {
                    "--rot-x": `${rotation.x}deg`,
                    "--rot-y": `${rotation.y}deg`,
                    "--object-scale": 1,
                  } as React.CSSProperties
                }
              >
                <span className="core" style={{ background: variantBackground[variant] }} />
                <span className="rail" />
                <span className="module" />
              </div>
            </div>
          ) : null}
          {variant !== "natural" ? (
            <button
              className="hotspot product-hotspot"
              type="button"
              aria-expanded={expandedHotspot}
              data-od-id="producto-hotspot-modulo"
              onClick={() => setExpandedHotspot((open) => !open)}
            >
              <span className="hotspot-label">Módulo · Cambiar configuración</span>
            </button>
          ) : null}
          <span className="drag-hint">Arrastrar · Rotar</span>
          <div className="slot-controls">
            <button
              className="quiet-button reset-button"
              type="button"
              data-od-id="producto-reiniciar"
              onClick={() => setRotation({ x: -16, y: 28 })}
            >
              Reiniciar
            </button>
            <button
              className="quiet-button fullscreen-button"
              type="button"
              data-od-id="producto-ampliar"
              disabled={!fullscreenSupported}
              onClick={toggleFullscreen}
            >
              Ampliar ↗
            </button>
          </div>
        </div>
      </section>
      <div className="variant-strip" role="group" aria-label="Variantes del producto">
        {(["natural", "light", "dark"] as const).map((item, index) => (
          <button
            key={item}
            className="variant-button"
            type="button"
            aria-pressed={variant === item}
            data-variant={item}
            data-od-id={`producto-variante-0${index + 1}`}
            onClick={() => setVariant(item)}
          >
            0{index + 1}
          </button>
        ))}
      </div>
      <div className="product-summary">
        <span className="label">Producto · Configuración</span>
      </div>
      <a
        className="scene-action"
        href="#system"
        data-scene-link="3"
        data-od-id="producto-siguiente"
        onClick={(event) => {
          event.preventDefault();
          onSceneLink(3);
        }}
      >
        Continuar →
      </a>
    </article>
  );
}
