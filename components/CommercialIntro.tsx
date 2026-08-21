"use client";

import { withBasePath } from "@/lib/assetPath";

const TERRAMBU_IMAGE_URL = withBasePath("/projects/terrambu-hotel-web.webp");
const MAPA_PUNILLA_IMAGE_URL = withBasePath("/projects/mapa-punilla-web.webp");

const uses = [
  {
    number: "01",
    title: "Productos configurables",
    description:
      "Permití que tus clientes comparen materiales, colores y terminaciones directamente desde la web.",
  },
  {
    number: "02",
    title: "Proyectos en desarrollo",
    description: "Mostrá un producto, espacio o construcción antes de que esté terminado.",
  },
  {
    number: "03",
    title: "Productos complejos",
    description: "Transformá información difícil de explicar en una experiencia visual e interactiva.",
  },
];

const services = [
  {
    number: "01",
    title: "Configuradores 3D",
    description:
      "Experiencias interactivas donde el usuario puede visualizar un producto y modificar sus características en tiempo real.",
    examples: "Muebles · Arquitectura · Piscinas · Aberturas · Equipamiento",
    href: "#showroom-3d",
    cta: "Ver proyectos →",
  },
  {
    number: "02",
    title: "Desarrollo web interactivo",
    description:
      "Sitios y plataformas digitales diseñados para presentar servicios, productos y experiencias con mayor claridad.",
    examples: "Hotelería · Turismo · Empresas · Productos digitales",
    href: "#showroom-web",
    cta: "Ver proyectos →",
  },
  {
    number: "03",
    title: "Realidad aumentada y virtual",
    description:
      "Experiencias inmersivas para visualizar productos y espacios dentro de contextos reales o virtuales.",
    examples: "Arquitectura · Real Estate · Producto · Showrooms",
    href: "#showroom-inmersivo",
    cta: "Próximamente",
  },
];

const industries = [
  {
    title: "Muebles y equipamiento",
    description: "Configuración de materiales, colores y componentes.",
  },
  {
    title: "Arquitectura y construcción",
    description: "Visualización de proyectos y terminaciones.",
  },
  {
    title: "Piscinas y exteriores",
    description: "Configuración y preventa de proyectos.",
  },
  {
    title: "Real estate",
    description: "Presentación de desarrollos antes de su finalización.",
  },
  {
    title: "Hotelería y turismo",
    description: "Experiencias digitales orientadas a comunicar mejor el lugar.",
  },
  {
    title: "Industria",
    description: "Visualización de productos técnicos y configurables.",
  },
];

export default function CommercialIntro() {
  const openShowroomScene = (scene: number) => {
    window.dispatchEvent(new CustomEvent("forma3d:showroom-scene", { detail: { scene } }));
  };

  return (
    <>
      <section className="commercial-hero" id="que-hacemos" data-od-id="que-hacemos">
        <div className="commercial-hero-copy">
          <span className="label">Visualización digital interactiva</span>
          <h1>
            Hacemos que tus productos
            <br />
            se puedan ver, probar y
            <br />
            entender antes de comprarlos.
          </h1>
          <p>
            Creamos configuradores 3D, experiencias web y soluciones inmersivas para empresas que necesitan mostrar
            mejor lo que venden.
          </p>
          <ul className="commercial-hero-services" aria-label="Servicios principales">
            <li>Configuradores 3D</li>
            <li>Experiencias web</li>
            <li>Realidad aumentada y virtual</li>
          </ul>
          <div className="commercial-actions">
            <a href="#proyectos">Ver proyectos</a>
            <a href="#contacto">Contanos sobre tu producto</a>
          </div>
          <div className="commercial-proof" aria-label="Áreas de trabajo">
            <span>3D</span>
            <span>Web</span>
            <span>RA / RV</span>
          </div>
        </div>
        <div className="commercial-hero-visual" aria-label="Proyectos de Corsteno">
          <figure className="hero-project hero-project-primary">
            <img src={TERRAMBU_IMAGE_URL} alt="Sitio web para hotel boutique Terrambú desarrollado por Corsteno" />
            <figcaption>Experiencia web · Terrambú</figcaption>
          </figure>
          <figure className="hero-project hero-project-secondary">
            <img src={MAPA_PUNILLA_IMAGE_URL} alt="Plataforma web Mapa Punilla desarrollada por Corsteno" />
            <figcaption>Plataforma interactiva · Mapa Punilla</figcaption>
          </figure>
          <div className="hero-visual-note">
            <span>Showroom digital</span>
            <strong>Proyectos reales, configurables y navegables.</strong>
          </div>
        </div>
      </section>

      <section className="commercial-section problem-section">
        <header className="commercial-section-head">
          <span className="label">Qué resolvemos</span>
          <h2>
            Soluciones para productos
            <br />
            que necesitan ser explicados visualmente
          </h2>
          <p>
            Ayudamos a empresas a presentar productos, espacios y proyectos de una forma más clara, interactiva y fácil
            de entender.
          </p>
        </header>
        <ol className="editorial-list">
          {uses.map((item) => (
            <li key={item.number}>
              <span className="cap-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="commercial-section services-section">
        <header className="commercial-section-head">
          <span className="label">Servicios</span>
          <h2>Nuestros servicios</h2>
          <p>Tecnología aplicada a la presentación y comercialización de productos y proyectos.</p>
        </header>
        <ol className="service-list">
          {services.map((service, index) => (
            <li key={service.number} id={`servicio-${service.number}`}>
              <span className="cap-number">{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-examples">{service.examples}</span>
              </div>
              <a href="#showroom-3d" onClick={() => openShowroomScene(index === 0 ? 0 : index === 1 ? 1 : 3)}>
                {service.cta}
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="commercial-section industries-section">
        <header className="commercial-section-head">
          <span className="label">Aplicaciones</span>
          <h2>¿Dónde podemos aplicarlo?</h2>
          <p>Industrias donde la visualización interactiva ayuda a explicar, cotizar o vender mejor.</p>
        </header>
        <ol className="industry-list">
          {industries.map((industry, index) => (
            <li key={industry.title}>
              <span className="cap-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{industry.title}</h3>
              <p>{industry.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
