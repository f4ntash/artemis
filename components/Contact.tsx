export default function Contact() {
  return (
    <section className="contact dark" id="contacto" data-od-id="contacto">
      <h2 data-od-id="contacto-titulo">¿Qué querés construir?</h2>
      <div className="contact-action">
        <a href="mailto:hola@forma3d.com" data-cursor="Abrir" data-od-id="contacto-iniciar">
          Iniciar proyecto →
        </a>
        <span className="meta">hola@forma3d.com</span>
      </div>
      <footer className="contact-footer">
        <span className="meta">FORMA 3D · Argentina</span>
        <span className="meta">3D · Web · Sistemas</span>
      </footer>
    </section>
  );
}
