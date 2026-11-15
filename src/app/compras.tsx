import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { FilterChips } from "@/components/filter-chips";
import { Fab } from "@/components/fab";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { StatusChip } from "@/components/status-chip";
import { ThemedText } from "@/components/themed-text";
import { compras, Compra } from "@/data/mock";
import { colors, radius, spacing } from "@/constants/theme";

const filtros = ["Todas", "Recibido", "En tránsito", "Pendiente"] as const;

export default function ComprasScreen() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todas");

  const lista = useMemo(
    () => (filtro === "Todas" ? compras : compras.filter((c) => c.estado === filtro)),
    [filtro],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader titulo="Compras" label="Órdenes de compra" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.kpiRow}>
          <GlassCard style={styles.kpiCard}>
            <View style={styles.kpiTop}>
              <ThemedText type="label" style={styles.kpiLabel}>
                Comprado Mes
              </ThemedText>
              <View style={[styles.kpiIcono, { backgroundColor: `${colors.yellow}1A`, borderColor: `${colors.yellow}44` }]}>
                <Ionicons name="cart" size={14} color={colors.yellow} />
              </View>
            </View>
            <ThemedText type="title" style={[styles.kpiValor, { color: colors.yellow }]}>
              $45,200
            </ThemedText>
            <View style={styles.chipTendencia}>
              <Ionicons name="trending-up" size={10} color={colors.green} />
              <ThemedText type="label" style={styles.chipTendenciaTexto}>
                +9% vs mes anterior
              </ThemedText>
            </View>
          </GlassCard>

          <GlassCard style={styles.kpiCard}>
            <View style={styles.kpiTop}>
              <ThemedText type="label" style={styles.kpiLabel}>
                Pendientes de Recibir
              </ThemedText>
              <View style={[styles.kpiIcono, { backgroundColor: `${colors.orange}1A`, borderColor: `${colors.orange}44` }]}>
                <Ionicons name="time" size={14} color={colors.orange} />
              </View>
            </View>
            <ThemedText type="title" style={styles.kpiValor}>
              3
            </ThemedText>
            <View style={[styles.chipTendencia, { borderColor: `${colors.yellow}55`, backgroundColor: `${colors.yellow}1A` }]}>
              <ThemedText type="label" style={[styles.chipTendenciaTexto, { color: colors.yellow }]}>
                Seguimiento
              </ThemedText>
            </View>
          </GlassCard>
        </View>

        <SearchField placeholder="Buscar orden o proveedor..." />
        <FilterChips opciones={filtros} valor={filtro} onChange={setFiltro} uppercase />

        {lista.map((c: Compra) => (
          <GlassCard key={c.id} style={styles.compraCard}>
            <View style={styles.compraTop}>
              <ThemedText type="mono" style={styles.compraId}>
                #{c.id}
              </ThemedText>
              <StatusChip estado={c.estado} />
            </View>
            <View style={styles.compraMedio}>
              <View style={styles.proveedorAvatar}>
                <ThemedText type="mono" style={styles.proveedorInicial}>
                  {c.proveedor[0]}
                </ThemedText>
              </View>
              <View style={styles.compraInfo}>
                <ThemedText type="mono" style={styles.proveedorNombre} numberOfLines={1}>
                  {c.proveedor}
                </ThemedText>
                <ThemedText type="body" style={styles.compraResumen}>
                  {c.resumen}
                </ThemedText>
              </View>
            </View>
            <View style={[styles.compraPie, styles.divisorTop]}>
              <View style={styles.compraFecha}>
                <Ionicons name={c.estado === "En tránsito" ? "car" : "checkmark-circle"} size={13} color={c.estado === "En tránsito" ? colors.blue : colors.green} />
                <ThemedText type="body" style={styles.fecha}>
                  {c.fecha}
                </ThemedText>
              </View>
              <ThemedText type="mono" style={styles.total}>
                {c.total}
              </ThemedText>
            </View>
          </GlassCard>
        ))}

        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieVersion}>
            v2.4.0 — iTUACCESORIO Mobile System
          </ThemedText>
        </View>
      </ScrollView>

      <Fab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 110, gap: spacing.md, flex: 1 },
  kpiRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.xs },
  kpiCard: { flex: 1, gap: 5, padding: 14 },
  kpiTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  kpiLabel: { fontSize: 9 },
  kpiIcono: { width: 28, height: 28, borderRadius: 9, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  kpiValor: { fontSize: 26 },
  chipTendencia: {
    flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start",
    backgroundColor: `${colors.green}1A`, borderWidth: 1, borderColor: `${colors.green}44`,
    borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 8,
  },
  chipTendenciaTexto: { fontSize: 9, color: colors.green },
  compraCard: { gap: spacing.md },
  compraTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  compraId: { color: colors.yellow, fontWeight: "800" },
  compraMedio: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  proveedorAvatar: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: colors.surfaceStrong,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  proveedorInicial: { color: colors.textMuted, fontWeight: "800" },
  compraInfo: { flex: 1, gap: 1 },
  proveedorNombre: { fontSize: 14 },
  compraResumen: { fontSize: 12, color: colors.textSoft },
  compraPie: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  compraFecha: { flexDirection: "row", alignItems: "center", gap: 6 },
  fecha: { fontSize: 12 },
  total: { color: colors.yellow, fontWeight: "800" },
  divisorTop: { borderTopWidth: 1, borderTopColor: colors.borderSoft, paddingTop: spacing.md },
  pie: { alignItems: "center", marginTop: spacing.lg, paddingBottom: spacing.lg },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
