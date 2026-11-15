import { ReactNode } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "./themed-text";
import { colors, spacing } from "@/constants/theme";

/** Header estándar de subpantallas: botón atrás + título con punto amarillo + label. */
export function ScreenHeader({
  titulo,
  label,
  right,
}: {
  titulo: string;
  label?: string;
  right?: ReactNode;
}) {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <Pressable hitSlop={10} onPress={() => router.back()}>
        <View style={styles.back}>
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </View>
      </Pressable>
      <View style={styles.titulos}>
        <View style={styles.row}>
          <ThemedText type="title" style={styles.titulo}>
            {titulo}
          </ThemedText>
          <View style={styles.punto} />
        </View>
        {label ? <ThemedText type="label" style={styles.label}>{label}</ThemedText> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", alignItems: "center", gap: spacing.md,
    paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md,
  },
  back: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  titulos: { flex: 1, gap: 2 },
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  titulo: { fontSize: 24 },
  punto: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.yellow },
  label: { fontSize: 10 },
});
