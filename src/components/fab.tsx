import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing } from "@/constants/theme";

/** Botón flotante amarillo con '+' negro. */
export function Fab({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable style={styles.fab} onPress={onPress} hitSlop={8}>
      <Ionicons name="add" size={28} color={colors.ink} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: spacing.xl,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.yellow,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
});
