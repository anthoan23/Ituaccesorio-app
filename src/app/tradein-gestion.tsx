import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { FilterChips } from "@/components/filter-chips";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { StatusChip } from "@/components/status-chip";
import { ThemedText } from "@/components/themed-text";
import { equiposTradein } from "@/data/mock";
import { colors, fontFamily, radius } from "@/constants/theme";

const filtros = ["Todos", "Pendiente", "Revisión", "Completado"] as const;

const kpis = [
  { label: "Trade-ins", valor: "24", icono: "swap-horizontal" as const, color: colors.yellow },
  { label: "Total Pagado", valor: "$18,450", icono: "cash" as const, color: colors.green, pequeño: true },
  { label: "Equipos Únicos", valor: "19", icono: "phone-portrait" as const, color: colors.blue },
];

export default function TradeinGestionScreen() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");

  const lista = useMemo(
    () => (filtro === "Todos" ? equiposTradein : equiposTradein.filter((e) => e.estado === filtro)),
    [filtro],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader titulo="Trade-in" label="Registro de equipos recibidos" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* KPIs */}
        <View style={styles.kpiRow}>
          {kpis.map((k) => (
            <GlassCard key={k.label} style={styles.kpiCard}>
              <View style={[styles.kpiIcono, { backgroundColor: `${k.color}1A`, borderColor: `${k.color}44` }]}>
                <Ionicons name={k.icono} size={14} color={k.color} />
              </View>
              <ThemedText type="title" style={[styles.kpiValor, { color: k.color }, k.pequeño && styles.kpiValorPequeño]}>
                {k.valor}
              </ThemedText>
              <ThemedText type="label" style={styles.kpiLabel}>
                {k.label}
              </ThemedText>
            </GlassCard>
          ))}
        </View>

        <SearchField placeholder="Buscar equipo o cliente..." />
        <FilterChips opciones={filtros} valor={filtro} onChange={setFiltro} />

        {/* Equipos */}
        {lista.map((e) => (
          <GlassCard key={e.id} style={styles.equipoCard}>
            <View style={styles.equipoTop}>
              <ThemedText type="mono" style={styles.equipoId}>
                #{e.id}
              </ThemedText>
              <StatusChip estado={e.estado} small />
            </View>
            <View style={styles.equipoMedio}>
              <View style={styles.equipoIcono}>
                <Ionicons name="phone-portrait" size={17} color={colors.yellow} />
              </View>
              <View style={styles.equipoInfo}>
                <ThemedText type="mono" style={styles.equipoNombre}>
                  {e.dispositivo}
                </ThemedText>
                <ThemedText type="body" style={styles.equipoMeta}>
                  {e.cliente} · IMEI {e.imei}
                </ThemedText>
              </View>
              <ThemedText type="mono" style={styles.equipoPagado}>
                {e.pagado}
              </ThemedText>
            </View>
            <View style={[styles.acciones, styles.divisorTop]}>
              <Pressable style={[styles.accionBtn, { borderColor: `${colors.blue}55`, backgroundColor: `${colors.blue}1A` }]}>
                <Ionicons name="flask" size={14} color={colors.blue} />
                <Text style={[styles.accionTexto, { color: colors.blue }]}>Pruebas</Text>
              </Pressable>
              <Pressable style={[styles.accionBtn, { borderColor: `${colors.green}55`, backgroundColor: `${colors.green}1A` }]}>
                <Ionicons name="eye" size={14} color={colors.green} />
                <Text style={[styles.accionTexto, { color: colors.green }]}>Detalle</Text>
              </Pressable>
            </View>
          </GlassCard>
        ))}

        {/* Registrar */}
        <Pressable style={styles.registrar}>
          <Ionicons name="add" size={18} color={colors.ink} />
          <Text style={styles.registrarTexto}>REGISTRAR TRADE-IN</Text>
        </Pressable>

        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieVersion}>
            v2.4.0 — iTUACCESORIO Mobile System
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 16, paddingBottom: 32, gap: 12 },
  kpiRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  kpiCard: { flex: 1, alignItems: "flex-start", gap: 4, padding: 12 },
  kpiIcono: { width: 28, height: 28, borderRadius: 9, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  kpiValor: { fontSize: 22 },
  kpiValorPequeño: { fontSize: 15, marginTop: 4 },
  kpiLabel: { fontSize: 9 },
  equipoCard: { gap: 10 },
  equipoTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  equipoId: { color: colors.yellow, fontWeight: "800", fontSize: 12 },
  equipoMedio: { flexDirection: "row", alignItems: "center", gap: 10 },
  equipoIcono: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: colors.bgSoft,
    borderWidth: 1, borderColor: colors.borderSoft, alignItems: "center", justifyContent: "center",
  },
  equipoInfo: { flex: 1, gap: 2 },
  equipoNombre: { fontSize: 13 },
  equipoMeta: { fontSize: 10, color: colors.textSoft },
  equipoPagado: { color: colors.yellow, fontWeight: "800" },
  acciones: { flexDirection: "row", gap: 8 },
  accionBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
    borderWidth: 1, borderRadius: radius.md, paddingVertical: 8,
  },
  accionTexto: { fontSize: 11, fontWeight: "700" },
  divisorTop: { borderTopWidth: 1, borderTopColor: colors.borderSoft, paddingTop: 10 },
  registrar: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    backgroundColor: colors.yellow, borderRadius: radius.lg, paddingVertical: 15,
  },
  registrarTexto: { color: colors.ink, fontFamily: fontFamily.bodyExtraBold, fontSize: 14 },
  pie: { alignItems: "center", paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
