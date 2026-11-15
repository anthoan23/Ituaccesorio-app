import { Text, TextProps, StyleSheet } from "react-native";

import { colors, fontFamily } from "@/constants/theme";

type Tipo = "title" | "subtitle" | "body" | "label" | "mono";

const estilos: Record<Tipo, TextProps["style"]> = {
  title: { fontFamily: fontFamily.heading, fontSize: 26, color: colors.text },
  subtitle: { fontFamily: fontFamily.headingMedium, fontSize: 17, color: colors.text },
  body: { fontFamily: fontFamily.bodyMedium, fontSize: 14, color: colors.textMuted },
  label: {
    fontFamily: fontFamily.bodyExtraBold,
    fontSize: 11,
    letterSpacing: 1.6,
    color: colors.textMuted,
    textTransform: "uppercase",
  },
  mono: { fontFamily: fontFamily.bodyBold, fontSize: 14, color: colors.text },
};

export function ThemedText({ type = "body", style, ...rest }: TextProps & { type?: Tipo }) {
  return <Text style={StyleSheet.flatten([estilos[type], style])} {...rest} />;
}
