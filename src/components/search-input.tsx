import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, fontFamily } from "@/constants/theme";

/** Buscador de vidrio con borde amarillo translúcido (visual). */
export function SearchField({ placeholder }: { placeholder?: string }) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="search" size={16} color={colors.textSoft} />
      <Text style={styles.text}>{placeholder ?? "Buscar..."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.lg,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  text: { color: colors.placeholder, fontFamily: fontFamily.bodyMedium, fontSize: 14 },
});
