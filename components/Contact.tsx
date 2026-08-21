export default function Contact() {
  return (
    <section className="contact dark" id="contacto" data-od-id="contacto">
      <div className="contact-copy">
        <span className="label">Contacto</span>
        <h2 data-od-id="contacto-titulo">
          Veamos cómo presentar mejor
          <br />
          tu producto o proyecto.
        </h2>
        <p>
          Contanos qué necesitás mostrar.
          <br />
          Podés enviarnos una referencia, fotografía, catálogo, plano o modelo 3D y analizamos qué tipo de experiencia
          puede adaptarse mejor.
        </p>
      </div>
      <div className="contact-action">
        <a href="mailto:hola@forma3d.com" data-cursor="Abrir" data-od-id="contacto-iniciar">
          Contanos sobre tu proyecto
        </a>
        <a href="mailto:hola@forma3d.com" data-cursor="Abrir">
          Contacto
        </a>
      </div>
      <footer className="contact-footer">
        <span className="meta">Corsteno · Argentina</span>
        <span className="meta">Ver · Probar · Configurar · Decidir</span>
      </footer>
    </section>
  );
}
