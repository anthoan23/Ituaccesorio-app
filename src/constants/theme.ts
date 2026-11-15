/**
 * Design System "Ituaccesorio — Dark Glass"
 * Tokens extraídos del theme.css de la web oficial.
 */
export const colors = {
  bg: "#0A0A0A",
  bgSoft: "#151515",
  surface: "rgba(255,255,255,0.05)",
  surfaceStrong: "rgba(255,255,255,0.08)",
  border: "rgba(255,255,255,0.08)",
  borderSoft: "rgba(255,255,255,0.04)",

  text: "#FFFFFF",
  textMuted: "rgba(255,255,255,0.65)",
  textSoft: "rgba(255,255,255,0.5)",

  yellow: "#F3C500",
  yellowSoft: "#F8DD69",
  yellowNavbar: "#FFD60A",
  ink: "#121212",

  blue: "#007AFF",
  green: "#34C759",
  red: "#FF3B30",
  cyan: "#17A2B8",
  orange: "#FD7E14",
  gray: "#9CA3AF",

  inputBg: "rgba(255,255,255,0.06)",
  inputBorder: "rgba(243,197,0,0.35)",
  placeholder: "rgba(255,255,255,0.45)",

  overlay: "rgba(0,0,0,0.7)",
} as const;

/** Chips de estado (pill translúcido + borde del mismo tono). */
export const statusColors: Record<string, { bg: string; text: string }> = {
  Pendiente: { bg: "rgba(255,193,7,0.2)", text: "#FFC107" },
  Revisión: { bg: "rgba(23,162,184,0.2)", text: "#17A2B8" },
  Reparación: { bg: "rgba(253,126,20,0.2)", text: "#FD7E14" },
  Completado: { bg: "rgba(40,167,69,0.2)", text: "#28A745" },
  Asignada: { bg: "rgba(59,130,246,0.2)", text: "#60A5FA" },
  Entregado: { bg: "rgba(108,117,125,0.2)", text: "#9CA3AF" },
  Aprobado: { bg: "rgba(40,167,69,0.2)", text: "#28A745" },
  Alerta: { bg: "rgba(239,68,68,0.2)", text: "#F87171" },
};

export const radius = {
  sm: 10,
  md: 12,
  lg: 16,
  xl: 18,
  xxl: 20,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const fontFamily = {
  heading: "SpaceGrotesk_700Bold",
  headingMedium: "SpaceGrotesk_500Medium",
  body: "Manrope_400Regular",
  bodyMedium: "Manrope_500Medium",
  bodyBold: "Manrope_700Bold",
  bodyExtraBold: "Manrope_800ExtraBold",
} as const;
