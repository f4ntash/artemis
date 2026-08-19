const capabilities = [
  {
    title: "Configuradores 3D",
    description: "Experiencias web interactivas para visualizar, personalizar y probar productos en tiempo real.",
  },
  {
    title: "Visualización de producto",
    description: "Modelado, materiales, iluminación y presentación digital de productos y espacios.",
  },
  {
    title: "Desarrollo web",
    description: "Sitios y productos digitales personalizados, rápidos y orientados a experiencia.",
  },
  {
    title: "Experiencias interactivas",
    description: "Interfaces, mapas, storytelling digital y herramientas web que invitan a explorar.",
  },
];

export default function Capabilities() {
  return (
    <section className="capabilities" id="capacidades" data-od-id="capacidades">
      <header className="cap-head">
        <span className="label">Capacidades</span>
        <p>Diseñamos y desarrollamos experiencias digitales donde producto, espacio y tecnología se encuentran.</p>
      </header>
      <ol className="cap-list">
        {capabilities.map((capability, index) => (
          <li className="cap-item" key={capability.title}>
            <span className="cap-number">{String(index + 1).padStart(2, "0")}</span>
            <h2>{capability.title}</h2>
            <p>{capability.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
