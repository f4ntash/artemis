export const sceneCount = 4;

export const digitalProjects = [
  {
    id: "terrambu",
    number: "01",
    type: "website",
    title: "Terrambú",
    subtitle: "Hotel Boutique",
    location: "Córdoba, Argentina",
    commercialContext: "Una experiencia digital diseñada para transmitir el lugar antes de que el huésped llegue.",
    url: "https://terrambu.com.ar/es",
    externalUrl: "https://terrambu.com.ar/",
  },
  {
    id: "mapa-punilla",
    number: "02",
    type: "website",
    title: "Mapa Punilla",
    subtitle: "Turismo · Territorio · Exploración",
    location: "Valle de Punilla · Córdoba, Argentina",
    commercialContext: "Un producto digital que transforma información territorial en una experiencia útil y navegable.",
    url: "https://mapapunilla.com.ar/",
    externalUrl: "https://mapapunilla.com.ar/",
  },
  {
    id: "next-project",
    number: "03",
    type: "cta",
    title: "Tu proyecto puede ser el próximo.",
  },
] as const;

export const projectScenes = [
  { label: "01", name: "H2O" },
  { label: "02", name: "Digital Experiences" },
  { label: "03", name: "Product Configurator" },
  { label: "04", name: "RA / RV" },
] as const;

export type SceneIndex = 0 | 1 | 2 | 3;
