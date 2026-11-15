import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { SwipeTabs } from "@/components/swipe-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Fab } from "@/components/fab";
import { GlassCard } from "@/components/glass-card";
import { ProgressBar } from "@/components/progress-bar";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { empleados } from "@/data/mock";
import { colors, spacing } from "@/constants/theme";

/** Card de la web: Gráfico de Cargos — distribución por cargo */
const distribucionCargos = [
  { cargo: "Técnico", cantidad: empleados.filter((e) => e.cargo.startsWith("Técnico")).length },
  { cargo: "Ventas/Caja", cantidad: empleados.filter((e) => /Vendedor|Cajer/.test(e.cargo)).length },
  { cargo: "Supervisión/Admin", cantidad: empleados.filter((e) => /Supervisora|Administrador/.test(e.cargo)).length },
];

export default function EmpleadosScreen() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  const lista = useMemo(
    () =>
      empleados.filter((e) =>
        `${e.nombre} ${e.apellido} ${e.cargo} ${e.cedula}`.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    [busqueda],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerIzq}>
          <View style={styles.headerTitulo}>
            <ThemedText type="title" style={styles.titulo}>
              Empleados
            </ThemedText>
            <View style={styles.punto} />
          </View>
          <ThemedText type="label">Catálogo de empleados</ThemedText>
        </View>
        <View style={styles.agregarBtn}>
          <Ionicons name="add" size={19} color={colors.yellow} />
        </View>
      </View>

      <SwipeTabs onRight={() => router.navigate("/ventas" as never)}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* KPI de la web: Empleados */}
        <GlassCard style={styles.kpiCard}>
          <ThemedText type="title" style={[styles.kpiValor, { color: colors.green }]}>
            {empleados.length}
          </ThemedText>
          <ThemedText type="label" style={styles.kpiLabel}>
            Empleados
          </ThemedText>
        </GlassCard>

        <SearchField placeholder="Buscar empleado, cédula o cargo..." value={busqueda} onChangeText={setBusqueda} />

        {lista.map((e) => (
          <GlassCard key={e.id} style={styles.row}>
            <View style={styles.empleadoAvatar}>
              <ThemedText type="mono" style={styles.empleadoInicial}>
                {e.nombre[0]}
                {e.apellido[0]}
              </ThemedText>
            </View>
            <View style={styles.info}>
              <ThemedText type="mono" style={styles.nombre} numberOfLines={1}>
                {e.nombre} {e.apellido}
              </ThemedText>
              <View style={styles.datoRow}>
                <Ionicons name="id-card" size={10} color={colors.textSoft} />
                <ThemedText type="body" style={styles.dato} numberOfLines={1}>
                  {e.cedula}
                </ThemedText>
              </View>
              <View style={styles.datoRow}>
                <Ionicons name="briefcase" size={10} color={colors.textSoft} />
                <ThemedText type="body" style={styles.dato} numberOfLines={1}>
                  {e.cargo}
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textSoft} />
          </GlassCard>
        ))}

        {/* Gráfico de Cargos (card de la web) */}
        <GlassCard style={styles.graficoCard}>
          <ThemedText type="label" style={styles.graficoTitulo}>
            Gráfico de Cargos
          </ThemedText>
          {distribucionCargos.map((d) => (
            <View key={d.cargo} style={styles.graficoItem}>
              <View style={styles.graficoRow}>
                <ThemedText type="body" style={styles.graficoLabel}>
                  {d.cargo}
                </ThemedText>
                <ThemedText type="body" style={styles.graficoValor}>
                  {d.cantidad}
                </ThemedText>
              </View>
              <ProgressBar value={d.cantidad / empleados.length} />
            </View>
          ))}
        </GlassCard>

        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieVersion}>
            v2.4.0 — iTUACCESORIO Mobile System
          </ThemedText>
        </View>
      </ScrollView>
      </SwipeTabs>

      <Fab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md,
  },
  headerIzq: { gap: 3 },
  headerTitulo: { flexDirection: "row", alignItems: "center", gap: 6 },
  titulo: { fontSize: 26 },
  punto: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.yellow },
  agregarBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  scroll: { paddingHorizontal: 16, paddingBottom: 110, gap: 12 },
  kpiCard: { alignItems: "center", gap: 3, paddingVertical: 14, marginTop: 4 },
  kpiValor: { fontSize: 28 },
  kpiLabel: { fontSize: 9 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 14 },
  empleadoAvatar: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: colors.yellow,
    alignItems: "center", justifyContent: "center",
  },
  empleadoInicial: { color: colors.ink, fontWeight: "800", fontSize: 13 },
  info: { flex: 1, gap: 2 },
  nombre: { fontSize: 13 },
  datoRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  dato: { fontSize: 10, color: colors.textSoft },
  graficoCard: { gap: 10, marginBottom: 4 },
  graficoTitulo: { fontSize: 9 },
  graficoItem: { gap: 5 },
  graficoRow: { flexDirection: "row", justifyContent: "space-between" },
  graficoLabel: { fontSize: 12 },
  graficoValor: { fontSize: 12, color: colors.yellow, fontWeight: "700" },
  pie: { alignItems: "center", paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
