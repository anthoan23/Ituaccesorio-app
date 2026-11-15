import { Text, View, StyleSheet } from "react-native";

import { colors, fontFamily } from "@/constants/theme";
import { ThemedText } from "./themed-text";

type Props = {
  dias: string[];
  ingresos: number[];
  gastos: number[];
};

/** Gráfico de barras comparativo (Ingresos vs Gastos) sin SVG. */
export function BarChart({ dias, ingresos, gastos }: Props) {
  const max = Math.max(...ingresos, ...gastos);
  const idxMax = ingresos.indexOf(Math.max(...ingresos));

  return (
    <View style={styles.wrap}>
      <View style={styles.leyenda}>
        <View style={styles.leyendaItem}>
          <View style={[styles.punto, { backgroundColor: colors.yellow }]} />
          <ThemedText type="body" style={styles.leyendaTexto}>
            Ingresos
          </ThemedText>
        </View>
        <View style={styles.leyendaItem}>
          <View style={[styles.punto, { backgroundColor: colors.blue }]} />
          <ThemedText type="body" style={styles.leyendaTexto}>
            Gastos
          </ThemedText>
        </View>
      </View>

      <View style={styles.barrasWrap}>
        {dias.map((d, i) => (
          <View key={d} style={styles.grupo}>
            {i === idxMax && (
              <View style={styles.maxBadge}>
                <Text style={styles.maxTexto}>MAX</Text>
              </View>
            )}
            <View style={styles.par}>
              <View style={[styles.barra, { height: (ingresos[i] / max) * 110, backgroundColor: colors.yellow }]} />
              <View style={[styles.barra, { height: (gastos[i] / max) * 110, backgroundColor: colors.blue }]} />
            </View>
            <Text style={[styles.dia, i === idxMax && styles.diaMax]}>{d}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 14 },
  leyenda: { flexDirection: "row", gap: 16 },
  leyendaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  punto: { width: 8, height: 8, borderRadius: 4 },
  leyendaTexto: { fontSize: 12 },
  barrasWrap: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end",
    paddingHorizontal: 2, paddingTop: 18,
  },
  grupo: { flex: 1, alignItems: "center", gap: 6 },
  par: { flexDirection: "row", alignItems: "flex-end", gap: 3, height: 110 },
  barra: { width: 10, borderRadius: 3 },
  maxBadge: {
    position: "absolute", top: -18, backgroundColor: colors.yellow,
    borderRadius: 999, paddingVertical: 2, paddingHorizontal: 7,
  },
  maxTexto: { color: colors.ink, fontSize: 9, fontWeight: "800", fontFamily: fontFamily.bodyExtraBold },
  dia: { color: colors.textSoft, fontSize: 10, fontFamily: fontFamily.bodyMedium },
  diaMax: { color: colors.yellow, fontWeight: "700" },
});
