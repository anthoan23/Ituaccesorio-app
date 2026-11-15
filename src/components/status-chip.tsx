import { Text, StyleSheet } from "react-native";

import { statusColors } from "@/constants/theme";

/** Chip de estado translúcido con borde (Pendiente/Reparación/Completado…). */
export function StatusChip({ estado, small }: { estado: string; small?: boolean }) {
  const c = statusColors[estado] ?? statusColors.Entregado;
  return (
    <Text
      style={[
        styles.chip,
        { backgroundColor: c.bg, color: c.text, borderColor: c.text },
        small && { fontSize: 9, paddingVertical: 2, paddingHorizontal: 8 },
      ]}
      numberOfLines={1}
    >
      {estado.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  chip: {
    overflow: "hidden",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.4,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "transparent",
    alignSelf: "flex-start",
  },
});
