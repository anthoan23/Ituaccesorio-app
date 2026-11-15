import { View, StyleSheet } from "react-native";

import { colors } from "@/constants/theme";

/** Switch visual (controlado por el padre). */
export function Toggle({ activo }: { activo: boolean }) {
  return (
    <View style={[styles.pill, activo ? styles.activo : styles.inactivo]}>
      <View style={[styles.knob, activo && styles.knobDerecha]} />
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    width: 44, height: 26, borderRadius: 13, padding: 3,
    justifyContent: "center",
  },
  activo: { backgroundColor: colors.yellow },
  inactivo: { backgroundColor: colors.surfaceStrong },
  knob: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#FFFFFF" },
  knobDerecha: { alignSelf: "flex-end", backgroundColor: colors.ink },
});
