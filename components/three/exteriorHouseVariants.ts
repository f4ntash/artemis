export type ExteriorHouseGroupId = "poolLining" | "exteriorFloor" | "poolEdge" | "waterfallFinish";

export type ExteriorHouseVariantState = Record<ExteriorHouseGroupId, string>;

export type ExteriorHouseMaterialOverrides = {
  color: string;
  roughness: number;
  metalness: number;
};

export type ExteriorHouseVariantGroup = {
  id: ExteriorHouseGroupId;
  label: string;
  selectionMode: "mesh" | "material";
  targetMeshName: string;
  sourceMeshNames: string[];
  preserveChildMeshNames?: string[];
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
    selectionMode: "mesh",
    targetMeshName: "Pileta_Interior_Aqua",
    sourceMeshNames: ["Pileta_Interior_Aqua", "Pileta_Interior_Dark", "Pileta_Interior_Jade"],
    variants: [
      {
        id: "default",
        label: "Default",
        sourceMeshName: "Pileta_Interior_Aqua",
        description: "Revestimiento original del vaso con terminación azul y relieve visible.",
        details: [{ label: "Carácter", value: "Acuático" }, { label: "Aplicación", value: "Vaso de piscina" }],
      },
      {
        id: "terracotta",
        label: "Terracota",
        sourceMeshName: "Pileta_Interior_Dark",
        description: "Alternativa texturada de tono terroso para el interior de la piscina.",
        details: [{ label: "Carácter", value: "Cálido" }, { label: "Aplicación", value: "Vaso de piscina" }],
      },
      {
        id: "greenStone",
        label: "Piedra verde",
        sourceMeshName: "Pileta_Interior_Jade",
        description: "Terminación de piedra verde con una lectura natural y profunda.",
        details: [{ label: "Carácter", value: "Natural" }, { label: "Aplicación", value: "Vaso de piscina" }],
      },
    ],
  },
  {
    id: "exteriorFloor",
    label: "Piso exterior",
    selectionMode: "mesh",
    targetMeshName: "Pielta_Piso_Exterior_Colorado",
    sourceMeshNames: [
      "Pielta_Piso_Exterior_Colorado",
      "Pielta_Piso_Exterior_Madera",
      "Pileta_Piso_Exterior_Blanco",
    ],
    variants: [
      {
        id: "default",
        label: "Default",
        sourceMeshName: "Pielta_Piso_Exterior_Colorado",
        description: "Cerámica exterior original de tono cálido y textura continua.",
        details: [{ label: "Carácter", value: "Cálido" }, { label: "Aplicación", value: "Piso exterior" }],
      },
      {
        id: "wood",
        label: "Madera",
        sourceMeshName: "Pielta_Piso_Exterior_Madera",
        description: "Entablonado de madera para una terminación exterior más natural.",
        details: [{ label: "Superficie", value: "Madera" }, { label: "Aplicación", value: "Piso exterior" }],
      },
      {
        id: "whitePlanks",
        label: "Tabla clara",
        sourceMeshName: "Pileta_Piso_Exterior_Blanco",
        description: "Tablas claras que reducen el contraste alrededor de la piscina.",
        details: [{ label: "Tono", value: "Claro" }, { label: "Aplicación", value: "Piso exterior" }],
      },
    ],
  },
  {
    id: "poolEdge",
    label: "Borde piscina",
    selectionMode: "material",
    targetMeshName: "Pielta_Borde",
    sourceMeshNames: ["Pielta_Borde"],
    variants: [
      {
        id: "default",
        label: "Default",
        sourceMeshName: "Pielta_Borde",
        description: "Porcelanato de concreto satinado original del borde de piscina.",
        details: [{ label: "Carácter", value: "Neutro" }, { label: "Aplicación", value: "Borde de piscina" }],
      },
      {
        id: "sand",
        label: "Arena",
        sourceMeshName: "Pielta_Borde",
        materialOverrides: { color: "#d3c2a5", roughness: 0.94, metalness: 0 },
        description: "Tinte arena aplicado sobre los mapas originales del porcelanato.",
        details: [{ label: "Tono", value: "Arena" }, { label: "Aplicación", value: "Borde de piscina" }],
      },
      {
        id: "graphite",
        label: "Grafito",
        sourceMeshName: "Pielta_Borde",
        materialOverrides: { color: "#626566", roughness: 0.9, metalness: 0 },
        description: "Tinte grafito que conserva la textura original de la superficie.",
        details: [{ label: "Tono", value: "Grafito" }, { label: "Aplicación", value: "Borde de piscina" }],
      },
    ],
  },
  {
    id: "waterfallFinish",
    label: "Acabado cascada",
    selectionMode: "mesh",
    targetMeshName: "Cascada_Piedra",
    sourceMeshNames: ["Cascada_Piedra", "Cascada_PiedraBlanca", "Cascada_Marmol"],
    preserveChildMeshNames: ["fonte_.008"],
    variants: [
      {
        id: "default",
        label: "Default",
        sourceMeshName: "Cascada_Piedra",
        description: "Piedra original de la cascada con una terminación exterior natural.",
        details: [{ label: "Carácter", value: "Mineral" }, { label: "Aplicación", value: "Cascada" }],
      },
      {
        id: "whiteStone",
        label: "Piedra clara",
        sourceMeshName: "Cascada_PiedraBlanca",
        description: "Alternativa de piedra clara reutilizada desde el modelo original.",
        details: [{ label: "Tono", value: "Claro" }, { label: "Aplicación", value: "Cascada" }],
      },
      {
        id: "marble",
        label: "Mármol",
        sourceMeshName: "Cascada_Marmol",
        description: "Acabado marmolado incluido en el modelo para la pieza de cascada.",
        details: [{ label: "Carácter", value: "Marmolado" }, { label: "Aplicación", value: "Cascada" }],
      },
    ],
  },
];

export const DEFAULT_EXTERIOR_HOUSE_VARIANTS: ExteriorHouseVariantState = {
  poolLining: "default",
  exteriorFloor: "default",
  poolEdge: "default",
  waterfallFinish: "default",
};
