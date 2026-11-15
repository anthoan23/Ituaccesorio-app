import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/constants/theme";

/** Fila de chips de filtro horizontales con selección única. */
export function FilterChips<T extends string>({
  opciones,
  valor,
  onChange,
  uppercase = false,
}: {
  opciones: readonly T[];
  valor: T;
  onChange: (v: T) => void;
  uppercase?: boolean;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtros}>
      {opciones.map((o) => {
        const activo = valor === o;
        return (
          <Pressable key={o} onPress={() => onChange(o)} style={[styles.filtro, activo && styles.filtroActivo]}>
            <Text style={[styles.texto, uppercase && styles.textoUpper, activo && styles.textoActivo]}>{o}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filtros: { gap: spacing.sm },
  filtro: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.pill, paddingVertical: 7, paddingHorizontal: 14,
  },
  filtroActivo: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  texto: { color: colors.textMuted, fontFamily: fontFamily.bodyBold, fontSize: 12 },
  textoUpper: { textTransform: "uppercase" },
  textoActivo: { color: colors.ink },
});
