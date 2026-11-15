import { View, StyleSheet } from "react-native";

import { colors } from "@/constants/theme";

/** Barra de progreso amarilla redondeada. */
export function ProgressBar({ value, color = colors.yellow }: { value: number; color?: string }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.min(100, Math.max(0, value * 100))}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 6, borderRadius: 3, backgroundColor: colors.surfaceStrong, overflow: "hidden", flex: 1 },
  fill: { height: "100%", borderRadius: 3 },
});
