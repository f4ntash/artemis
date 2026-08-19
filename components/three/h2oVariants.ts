export type H2OVariantGroupId = "wallDining" | "wallKitchen" | "floorDining" | "floorKitchen" | "chairs";

export type H2OVariantState = Record<H2OVariantGroupId, string>;

export type H2OVariantGroup = {
  id: H2OVariantGroupId;
  label: string;
  variants: Array<{
    id: string;
    label: string;
    objectName: string;
    description: string;
    details: Array<{ label: string; value: string }>;
  }>;
};

export const H2O_VARIANT_GROUPS: H2OVariantGroup[] = [
  {
    id: "wallDining",
    label: "Pared comedor",
    variants: [
      {
        id: "default",
        label: "Default",
        objectName: "PARED_COMEDOR_Default",
        description: "Terminación base del proyecto, pensada para mantener una lectura continua y neutra del comedor.",
        details: [{ label: "Carácter", value: "Neutro" }, { label: "Aplicación", value: "Pared interior" }],
      },
      {
        id: "ceramic",
        label: "Cerámica",
        objectName: "PARED_COMEDOR_Ceramica",
        description: "Revestimiento cerámico que suma una lectura modular y una textura controlada al espacio.",
        details: [{ label: "Superficie", value: "Cerámica" }, { label: "Aplicación", value: "Pared interior" }],
      },
      {
        id: "wood",
        label: "Madera",
        objectName: "PARED_COMEDOR_Madera",
        description: "Terminación de apariencia natural que aporta calidez y contraste al sector de comedor.",
        details: [{ label: "Superficie", value: "Madera" }, { label: "Carácter", value: "Cálido" }],
      },
    ],
  },
  {
    id: "wallKitchen",
    label: "Pared cocina",
    variants: [
      {
        id: "default",
        label: "Default",
        objectName: "PARED_COCINA_Default",
        description: "Configuración original de la cocina, equilibrada para acompañar mobiliario y superficies de trabajo.",
        details: [{ label: "Carácter", value: "Neutro" }, { label: "Aplicación", value: "Pared interior" }],
      },
      {
        id: "dark",
        label: "Dark",
        objectName: "PARED_COCINA_Dark",
        description: "Terminación oscura que refuerza la profundidad visual y define el área de cocina.",
        details: [{ label: "Tono", value: "Oscuro" }, { label: "Aplicación", value: "Pared interior" }],
      },
      {
        id: "wood",
        label: "Madera",
        objectName: "PARED_COCINA_Madera",
        description: "Superficie de apariencia natural que suaviza el carácter técnico del espacio de cocina.",
        details: [{ label: "Superficie", value: "Madera" }, { label: "Carácter", value: "Cálido" }],
      },
    ],
  },
  {
    id: "floorDining",
    label: "Piso comedor",
    variants: [
      {
        id: "default",
        label: "Default",
        objectName: "PISO_COMEDOR",
        description: "Piso base del comedor, de presencia discreta para dar continuidad al conjunto.",
        details: [{ label: "Carácter", value: "Neutro" }, { label: "Aplicación", value: "Piso interior" }],
      },
      {
        id: "dark",
        label: "Dark",
        objectName: "PISO_COMEDOR_Dark",
        description: "Alternativa oscura que genera mayor contraste con el mobiliario y las paredes.",
        details: [{ label: "Tono", value: "Oscuro" }, { label: "Aplicación", value: "Piso interior" }],
      },
    ],
  },
  {
    id: "floorKitchen",
    label: "Piso cocina",
    variants: [
      {
        id: "default",
        label: "Default",
        objectName: "PISO_COCINA_Default",
        description: "Terminación original de la cocina, definida para integrarse con el resto del ambiente.",
        details: [{ label: "Carácter", value: "Neutro" }, { label: "Aplicación", value: "Piso interior" }],
      },
      {
        id: "black",
        label: "Negro",
        objectName: "PISO_COCINA_Negro",
        description: "Piso negro de lectura uniforme que aporta contraste y una base visual más marcada.",
        details: [{ label: "Tono", value: "Negro" }, { label: "Aplicación", value: "Piso interior" }],
      },
      {
        id: "terracotta",
        label: "Terracota",
        objectName: "PISO_COCINA_Terracota",
        description: "Terminación terracota que incorpora un tono cálido y una presencia más expresiva.",
        details: [{ label: "Tono", value: "Terracota" }, { label: "Carácter", value: "Cálido" }],
      },
    ],
  },
  {
    id: "chairs",
    label: "Sillas",
    variants: [
      {
        id: "a",
        label: "A",
        objectName: "MOBILIARIO_SILLAS_A",
        description: "Configuración original de sillas para el conjunto de comedor H2O.",
        details: [{ label: "Elemento", value: "Sillas" }, { label: "Variante", value: "A" }],
      },
      {
        id: "b",
        label: "B",
        objectName: "MOBILIARIO_SILLAS_B",
        description: "Segunda alternativa de mobiliario para comparar la presencia del conjunto en el espacio.",
        details: [{ label: "Elemento", value: "Sillas" }, { label: "Variante", value: "B" }],
      },
      {
        id: "c",
        label: "C",
        objectName: "MOBILIARIO_SILLAS_C",
        description: "Tercera alternativa de sillas, disponible para evaluar otra composición del comedor.",
        details: [{ label: "Elemento", value: "Sillas" }, { label: "Variante", value: "C" }],
      },
    ],
  },
];

export const DEFAULT_H2O_VARIANTS: H2OVariantState = {
  wallDining: "default",
  wallKitchen: "default",
  floorDining: "default",
  floorKitchen: "default",
  chairs: "a",
};
