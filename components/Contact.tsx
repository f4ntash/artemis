export default function Contact() {
  return (
    <section className="contact dark" id="contacto" data-od-id="contacto">
      <div className="contact-copy">
        <h2 data-od-id="contacto-titulo">
          Contanos qué querés
          <br />
          hacer visible.
        </h2>
        <p>
          Producto, espacio o proyecto. Si hoy es difícil de mostrar, probablemente podamos convertirlo en una experiencia interactiva.
        </p>
      </div>
      <div className="contact-action">
        <a href="mailto:hola@forma3d.com" data-cursor="Abrir" data-od-id="contacto-iniciar">
          Contanos tu proyecto ↗
        </a>
        <span className="meta">hola@forma3d.com</span>
      </div>
      <footer className="contact-footer">
        <span className="meta">FORMA 3D · Argentina</span>
        <span className="meta">Ver · Probar · Configurar · Decidir</span>
      </footer>
    </section>
  );
}
