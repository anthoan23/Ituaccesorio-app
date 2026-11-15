import { View, StyleSheet } from "react-native";

import { colors, fontFamily, radius } from "@/constants/theme";
import { ThemedText } from "./themed-text";

export type Kpi = {
  id: string;
  label: string;
  valor: string;
  color: string;
  trend: string;
  trendUp: boolean;
  datos?: number[];
};

/** Sparkline de barras simple (sin SVG, ligero). */
function Sparkline({ color, datos }: { color: string; datos: number[] }) {
  const max = Math.max(...datos);
  return (
    <View style={styles.sparkRow}>
      {datos.map((v, i) => (
        <View
          key={i}
          style={[styles.sparkBar, { height: (v / max) * 26 + 4, backgroundColor: color, opacity: 0.35 + (i / datos.length) * 0.65 }]}
        />
      ))}
    </View>
  );
}

/** Card KPI de vidrio con valor grande y sparkline. */
export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={[styles.icono, { backgroundColor: `${kpi.color}26`, borderColor: `${kpi.color}55` }]} />
        <ThemedText style={{ color: kpi.trendUp ? colors.green : colors.red, fontFamily: fontFamily.bodyBold, fontSize: 11 }}>
          {kpi.trend}
        </ThemedText>
      </View>
      <ThemedText type="body" style={styles.label}>
        {kpi.label}
      </ThemedText>
      <ThemedText type="subtitle" style={[styles.valor, { color: kpi.color }]}>
        {kpi.valor}
      </ThemedText>
      <Sparkline color={kpi.color} datos={kpi.datos ?? [4, 6, 5, 7, 6, 8, 7]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 14,
  },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  icono: { width: 32, height: 32, borderRadius: 10, borderWidth: 1 },
  label: { marginTop: 10, fontSize: 10 },
  valor: { fontSize: 22, marginTop: 2 },
  sparkRow: { flexDirection: "row", alignItems: "flex-end", gap: 3, marginTop: 10, height: 30 },
  sparkBar: { flex: 1, borderRadius: 2 },
});
