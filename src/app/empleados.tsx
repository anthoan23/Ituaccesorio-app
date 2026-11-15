import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Avatar } from "@/components/avatar";
import { Fab } from "@/components/fab";
import { FilterChips } from "@/components/filter-chips";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { empleados } from "@/data/mock";
import { colors } from "@/constants/theme";

const filtros = ["Todos", "Tecnico", "Vendedor", "Admin"] as const;
const etiquetas: Record<(typeof filtros)[number], string> = {
  Todos: "Todos", Tecnico: "Técnicos", Vendedor: "Vendedores", Admin: "Admin",
};

export default function EmpleadosScreen() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");

  const lista = useMemo(
    () => (filtro === "Todos" ? empleados : empleados.filter((e) => e.tipo === filtro)),
    [filtro],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Empleados"
        label="Lista de empleados"
        right={
          <View style={styles.agregarBtn}>
            <Ionicons name="add" size={19} color={colors.yellow} />
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* KPIs */}
        <View style={styles.kpiRow}>
          <GlassCard style={styles.kpiCard}>
            <View style={styles.kpiTop}>
              <ThemedText type="label" style={styles.kpiLabel}>
                Activos
              </ThemedText>
              <View style={[styles.kpiIcono, { backgroundColor: `${colors.green}1A`, borderColor: `${colors.green}44` }]}>
                <Ionicons name="people" size={14} color={colors.green} />
              </View>
            </View>
            <View style={styles.kpiValorRow}>
              <ThemedText type="title" style={styles.kpiValor}>
                9
              </ThemedText>
              <View style={styles.chipMini}>
                <ThemedText type="label" style={styles.chipMiniTexto}>
                  9/9 hoy
                </ThemedText>
              </View>
            </View>
          </GlassCard>
          <GlassCard style={styles.kpiCard}>
            <View style={styles.kpiTop}>
              <ThemedText type="label" style={styles.kpiLabel}>
                En Turno
              </ThemedText>
              <View style={[styles.kpiIcono, { backgroundColor: `${colors.yellow}1A`, borderColor: `${colors.yellow}44` }]}>
                <Ionicons name="time" size={14} color={colors.yellow} />
              </View>
            </View>
            <View style={styles.kpiValorRow}>
              <ThemedText type="title" style={[styles.kpiValor, { color: colors.yellow }]}>
                8
              </ThemedText>
              <View style={styles.chipMini}>
                <ThemedText type="label" style={styles.chipMiniTexto}>
                  Turno A
                </ThemedText>
              </View>
            </View>
          </GlassCard>
        </View>

        <SearchField placeholder="Buscar empleado..." />
        <FilterChips opciones={filtros.map((f) => etiquetas[f])} valor={etiquetas[filtro]} onChange={(v) => setFiltro(filtros.find((f) => etiquetas[f] === v) ?? "Todos")} uppercase />

        {lista.map((e) => (
          <GlassCard key={e.id} style={styles.row}>
            <Avatar inicial={e.nombre[0]} size={42} />
            <View style={styles.info}>
              <ThemedText type="mono" style={styles.nombre}>
                {e.nombre}
              </ThemedText>
              <ThemedText type="body" style={styles.cargo}>
                {e.cargo}
              </ThemedText>
              <View style={styles.especialidades}>
                {e.especialidades.map((s) => (
                  <View key={s} style={styles.espChip}>
                    <ThemedText type="label" style={styles.espTexto}>
                      {s}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.der}>
              <View style={[styles.punto, { backgroundColor: e.disponible ? colors.green : colors.orange }]} />
              <ThemedText type="body" style={styles.estado}>
                {e.disponible ? "Disponible" : "Ocupado"}
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
  agregarBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  scroll: { paddingHorizontal: 16, paddingBottom: 110, gap: 12 },
  kpiRow: { flexDirection: "row", gap: 12, marginTop: 4 },
  kpiCard: { flex: 1, gap: 5, padding: 14 },
  kpiTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  kpiLabel: { fontSize: 9 },
  kpiIcono: { width: 28, height: 28, borderRadius: 9, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  kpiValorRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  kpiValor: { fontSize: 24 },
  chipMini: { backgroundColor: colors.surfaceStrong, borderRadius: 999, paddingVertical: 3, paddingHorizontal: 8 },
  chipMiniTexto: { fontSize: 9, color: colors.textSoft },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 14 },
  info: { flex: 1, gap: 3 },
  nombre: { fontSize: 14 },
  cargo: { fontSize: 11, color: colors.textSoft },
  especialidades: { flexDirection: "row", gap: 5, flexWrap: "wrap" },
  espChip: { backgroundColor: `${colors.blue}1A`, borderWidth: 1, borderColor: `${colors.blue}44`, borderRadius: 999, paddingVertical: 2, paddingHorizontal: 8 },
  espTexto: { fontSize: 8, color: "#60A5FA" },
  der: { alignItems: "flex-end", gap: 4 },
  punto: { width: 9, height: 9, borderRadius: 5 },
  estado: { fontSize: 10, color: colors.textSoft },
  pie: { alignItems: "center", marginTop: 8, paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
