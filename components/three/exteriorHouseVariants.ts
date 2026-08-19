export type ExteriorHouseGroupId = "poolLining" | "exteriorFloor" | "poolEdge" | "fountain";

export type ExteriorHouseVariantState = Record<ExteriorHouseGroupId, string>;

export type ExteriorHouseMaterialOverrides = {
  color: string;
  roughness: number;
  metalness: number;
};

export type ExteriorHouseVariantGroup = {
  id: ExteriorHouseGroupId;
  label: string;
  targetMeshName: string;
  sourceMeshNames: string[];
  variants: Array<{
    id: string;
    label: string;
    sourceMeshName: string;
    materialOverrides?: ExteriorHouseMaterialOverrides;
    description: string;
    details: Array<{ label: string; value: string }>;
  }>;
};

export const EXTERIOR_HOUSE_VARIANT_GROUPS: ExteriorHouseVariantGroup[] = [
  {
    id: "poolLining",
    label: "Vaso piscina",
    targetMeshName: "1_piscina_pequena_base_01_006",
    sourceMeshNames: [
      "1_piscina_pequena_base_01_006",
      "1_piscina_pequena_base_01_009",
      "1_piscina_pequena_base_01_012",
    ],
    variants: [
      {
        id: "default",
        label: "Default",
        sourceMeshName: "1_piscina_pequena_base_01_006",
        description: "Revestimiento Barlavento original del vaso, con una lectura mineral clara y continua.",
        details: [{ label: "Carácter", value: "Mineral" }, { label: "Aplicación", value: "Vaso de piscina" }],
      },
      {
        id: "terracotta",
        label: "Terracota",
        sourceMeshName: "1_piscina_pequena_base_01_009",
        description: "Alternativa texturada de tono cálido para enfatizar la geometría interior de la piscina.",
        details: [{ label: "Carácter", value: "Cálido" }, { label: "Acabado", value: "Mate" }],
      },
      {
        id: "greenStone",
        label: "Piedra verde",
        sourceMeshName: "1_piscina_pequena_base_01_012",
        description: "Piedra verdosa de aspecto natural que aporta profundidad y una presencia más orgánica.",
        details: [{ label: "Carácter", value: "Natural" }, { label: "Aplicación", value: "Vaso de piscina" }],
      },
    ],
  },
  {
    id: "exteriorFloor",
    label: "Piso exterior",
    targetMeshName: "Plane001",
    sourceMeshNames: ["Plane001", "Plane002", "Plane003"],
    variants: [
      {
        id: "default",
        label: "Default",
        sourceMeshName: "Plane001",
        description: "Cerámica ibérica original, elegida como base cálida para el plano exterior del proyecto.",
        details: [{ label: "Carácter", value: "Cálido" }, { label: "Aplicación", value: "Piso exterior" }],
      },
      {
        id: "cedar",
        label: "Cedro",
        sourceMeshName: "Plane002",
        description: "Tablas de cedro con veta visible para una atmósfera exterior más cálida y natural.",
        details: [{ label: "Superficie", value: "Madera" }, { label: "Carácter", value: "Natural" }],
      },
      {
        id: "lightPlank",
        label: "Tabla clara",
        sourceMeshName: "Plane003",
        description: "Entablonado claro que suaviza el contraste y amplía visualmente el perímetro de la piscina.",
        details: [{ label: "Tono", value: "Claro" }, { label: "Acabado", value: "Mate" }],
      },
    ],
  },
  {
    id: "poolEdge",
    label: "Borde piscina",
    targetMeshName: "1_piscina_pequena_base_01_025",
    sourceMeshNames: ["1_piscina_pequena_base_01_025"],
    variants: [
      {
        id: "default",
        label: "Default",
        sourceMeshName: "1_piscina_pequena_base_01_025",
        description: "Porcelanato de concreto satinado original que define el perímetro inmediato de la piscina.",
        details: [{ label: "Carácter", value: "Neutro" }, { label: "Aplicación", value: "Borde de piscina" }],
      },
      {
        id: "sand",
        label: "Arena",
        sourceMeshName: "1_piscina_pequena_base_01_025",
        materialOverrides: { color: "#d3c2a5", roughness: 0.94, metalness: 0 },
        description: "Tinte arena sobre la textura original para una transición más cálida con el piso exterior.",
        details: [{ label: "Tono", value: "Arena" }, { label: "Acabado", value: "Mate" }],
      },
      {
        id: "gray",
        label: "Gris",
        sourceMeshName: "1_piscina_pequena_base_01_025",
        materialOverrides: { color: "#85898a", roughness: 0.9, metalness: 0 },
        description: "Tono gris mineral que refuerza una lectura sobria del borde sin perder su textura.",
        details: [{ label: "Tono", value: "Gris" }, { label: "Carácter", value: "Sobrio" }],
      },
    ],
  },
  {
    id: "fountain",
    label: "Fuente",
    targetMeshName: "Fountain_and_fire003",
    sourceMeshNames: ["Fountain_and_fire003"],
    variants: [
      {
        id: "default",
        label: "Default",
        sourceMeshName: "Fountain_and_fire003",
        description: "Piedra original de la fuente, integrada cromáticamente con el conjunto de la piscina.",
        details: [{ label: "Carácter", value: "Mineral" }, { label: "Aplicación", value: "Fuente exterior" }],
      },
      {
        id: "light",
        label: "Claro",
        sourceMeshName: "Fountain_and_fire003",
        materialOverrides: { color: "#d9d4c9", roughness: 0.96, metalness: 0 },
        description: "Piedra aclarada que reduce el contraste y mantiene visible el mapa original de superficie.",
        details: [{ label: "Tono", value: "Claro" }, { label: "Acabado", value: "Mate" }],
      },
      {
        id: "graphite",
        label: "Grafito",
        sourceMeshName: "Fountain_and_fire003",
        materialOverrides: { color: "#55585a", roughness: 0.9, metalness: 0 },
        description: "Piedra grafito de presencia profunda para destacar el volumen compacto de la fuente.",
        details: [{ label: "Tono", value: "Grafito" }, { label: "Carácter", value: "Profundo" }],
      },
    ],
  },
];

export const DEFAULT_EXTERIOR_HOUSE_VARIANTS: ExteriorHouseVariantState = {
  poolLining: "default",
  exteriorFloor: "default",
  poolEdge: "default",
  fountain: "default",
};

