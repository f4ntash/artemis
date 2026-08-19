type DigitalSystemSceneProps = {
  sceneStyle: React.CSSProperties;
  active: boolean;
};

export default function DigitalSystemScene({ sceneStyle, active }: DigitalSystemSceneProps) {
  return (
    <article
      className={`scene scene-system dark${active ? " is-active" : ""}`}
      id="system"
      data-project-scene="3"
      data-od-id="escena-sistema"
      style={sceneStyle}
    >
      <div className="spatial-placeholder">
        <span className="scene-number">04 / 04</span>
        <span className="spatial-kicker">RA / RV</span>
        <h2 data-od-id="sistema-titulo">
          Realidad aumentada
          <br />+<br />
          Realidad virtual
        </h2>
        <p>Experiencias espaciales que extienden el producto más allá de la pantalla.</p>
        <strong>Próximamente</strong>
        <span className="spatial-meta">AR · VR · Spatial experience</span>
      </div>
      <a className="scene-action" href="#capacidades" data-od-id="sistema-continuar">
        Capacidades ↓
      </a>
    </article>
  );
}
