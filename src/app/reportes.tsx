import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { BarChart } from "@/components/bar-chart";
import { FilterChips } from "@/components/filter-chips";
import { GlassCard } from "@/components/glass-card";
import { ProgressBar } from "@/components/progress-bar";
import { ScreenHeader } from "@/components/screen-header";
import { ThemedText } from "@/components/themed-text";
import { reportes } from "@/data/mock";
import { colors, fontFamily } from "@/constants/theme";

const periodos = ["Hoy", "Semana", "Mes", "Año"] as const;

export default function ReportesScreen() {
  const [periodo, setPeriodo] = useState<(typeof periodos)[number]>("Mes");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Reportes"
        label="Análisis de ventas"
        right={
          <View style={styles.descargaBtn}>
            <Ionicons name="cloud-download" size={18} color={colors.blue} />
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <FilterChips opciones={periodos} valor={periodo} onChange={setPeriodo} />

        {/* KPIs */}
        <View style={styles.kpiGrid}>
          {reportes.kpis.map((k) => (
            <GlassCard key={k.id} style={styles.kpiCard}>
              <View style={styles.kpiTop}>
                <ThemedText type="label" style={styles.kpiLabel}>
                  {k.label}
                </ThemedText>
                {"progress" in k ? (
                  <ThemedText type="body" style={styles.kpiTrend}>
                    {k.trend}
                  </ThemedText>
                ) : (
                  <View style={styles.chipTrend}>
                    <ThemedText type="label" style={[styles.chipTrendTexto, { color: k.id === "3" ? colors.blue : colors.green }]}>
                      {k.trend}
                    </ThemedText>
                  </View>
                )}
              </View>
              <ThemedText type="title" style={[styles.kpiValor, { color: k.color }]}>
                {k.valor}
              </ThemedText>
              {"progress" in k ? (
                <ProgressBar value={k.progress ?? 0} />
              ) : null}
              <ThemedText type="body" style={styles.kpiExtra}>
                {k.extra}
              </ThemedText>
            </GlassCard>
          ))}
        </View>

        {/* Gráfico */}
        <GlassCard style={styles.graficoCard}>
          <ThemedText type="label" style={styles.graficoLabel}>
            Comparativa Financiera
          </ThemedText>
          <ThemedText type="subtitle" style={styles.graficoTitulo}>
            Ingresos vs Gastos semanales
          </ThemedText>
          <BarChart dias={reportes.dias} ingresos={reportes.ingresos} gastos={reportes.gastos} />
          <View style={[styles.margenRow, styles.divisorTop]}>
            <ThemedText type="body" style={styles.margenLabel}>
              Margen operativo neto:
            </ThemedText>
            <View style={styles.margenDer}>
              <View style={styles.puntoVerde} />
              <ThemedText type="mono" style={styles.margenValor}>
                64.2%
              </ThemedText>
              <ThemedText type="label" style={styles.margenOk}>
                ÓPTIMO
              </ThemedText>
            </View>
          </View>
        </GlassCard>

        {/* Top productos */}
        <GlassCard style={styles.topCard}>
          <View style={styles.topHeader}>
            <View>
              <ThemedText type="label" style={styles.topLabel}>
                Inventario Destacado
              </ThemedText>
              <ThemedText type="subtitle" style={styles.topTitulo}>
                Top Productos
              </ThemedText>
            </View>
            <View style={styles.topChip}>
              <ThemedText type="label" style={styles.topChipTexto}>
                5 más vendidos
              </ThemedText>
            </View>
          </View>
          {reportes.topProductos.map((p, i) => (
            <View key={p.nombre} style={styles.topItem}>
              <View style={styles.topItemRow}>
                <Text style={styles.topPos}>0{i + 1}</Text>
                <ThemedText type="mono" style={styles.topNombre} numberOfLines={1}>
                  {p.nombre}
                </ThemedText>
                <ThemedText type="body" style={styles.topVendidos}>
                  {p.vendidos} vendidos
                </ThemedText>
              </View>
              <ProgressBar value={p.vendidos / reportes.topProductos[0].vendidos} />
            </View>
          ))}
        </GlassCard>

        {/* Exportar */}
        <Pressable style={styles.exportar}>
          <View style={styles.exportarIcono}>
            <Ionicons name="document" size={16} color={colors.yellow} />
          </View>
          <View style={styles.exportarInfo}>
            <ThemedText type="mono" style={styles.exportarTitulo}>
              Reporte Contable PDF
            </ThemedText>
            <ThemedText type="body" style={styles.exportarSub}>
              Cierre fiscal mensual completo
            </ThemedText>
          </View>
          <Pressable style={styles.exportarBtn}>
            <Text style={styles.exportarBtnTexto}>Exportar</Text>
          </Pressable>
        </Pressable>

        <View style={styles.pie}>
          <ThemedText type="label" style={styles.pieMarca}>
            iTUACCESORIO
          </ThemedText>
          <ThemedText type="body" style={styles.pieVersion}>
            © 2026 iTUACCESORIO. Todos los derechos reservados.
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  descargaBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  scroll: { paddingHorizontal: 16, paddingBottom: 32, gap: 14 },
  kpiGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  kpiCard: { width: "48.2%", flexGrow: 1, gap: 4, padding: 14 },
  kpiTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  kpiLabel: { fontSize: 9 },
  chipTrend: { backgroundColor: colors.surfaceStrong, borderRadius: 999, paddingVertical: 2, paddingHorizontal: 7 },
  chipTrendTexto: { fontSize: 9 },
  kpiTrend: { fontSize: 10 },
  kpiValor: { fontSize: 22 },
  kpiExtra: { fontSize: 10, color: colors.textSoft },
  graficoCard: { gap: 8 },
  divisorTop: { borderTopWidth: 1, borderTopColor: colors.borderSoft, paddingTop: 12, marginTop: 4 },
  graficoLabel: { fontSize: 9 },
  graficoTitulo: { fontFamily: fontFamily.headingMedium },
  margenRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 12, marginTop: 4 },
  margenLabel: { fontSize: 12 },
  margenDer: { flexDirection: "row", alignItems: "center", gap: 6 },
  puntoVerde: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.green },
  margenValor: { color: colors.green, fontWeight: "800" },
  margenOk: { color: colors.green, fontSize: 9 },
  topCard: { gap: 12 },
  topHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  topLabel: { fontSize: 9, marginBottom: 2 },
  topTitulo: { fontFamily: fontFamily.headingMedium },
  topChip: { backgroundColor: `${colors.yellow}14`, borderWidth: 1, borderColor: `${colors.yellow}55`, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10 },
  topChipTexto: { fontSize: 8, color: colors.yellow },
  topItem: { gap: 6 },
  topItemRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  topPos: { color: colors.yellow, fontSize: 11, fontWeight: "800" },
  topNombre: { flex: 1, fontSize: 13 },
  topVendidos: { fontSize: 11, color: colors.textSoft },
  exportar: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: `${colors.yellow}0D`, borderWidth: 1, borderColor: `${colors.yellow}44`,
    borderRadius: 18, padding: 14,
  },
  exportarIcono: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: `${colors.yellow}1A`,
    alignItems: "center", justifyContent: "center",
  },
  exportarInfo: { flex: 1, gap: 1 },
  exportarTitulo: { fontSize: 13 },
  exportarSub: { fontSize: 11, color: colors.textSoft },
  exportarBtn: { backgroundColor: colors.yellow, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16 },
  exportarBtnTexto: { color: colors.ink, fontFamily: fontFamily.bodyExtraBold, fontSize: 12 },
  pie: { alignItems: "center", gap: 4, marginTop: 4, paddingBottom: 16 },
  pieMarca: { color: colors.text, letterSpacing: 2 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
