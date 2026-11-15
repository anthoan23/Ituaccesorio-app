import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Avatar } from "@/components/avatar";
import { Fab } from "@/components/fab";
import { FilterChips } from "@/components/filter-chips";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { StatusChip } from "@/components/status-chip";
import { ThemedText } from "@/components/themed-text";
import { entregas, deliveryPersonal } from "@/data/mock";
import { colors } from "@/constants/theme";

const filtros = ["Todas", "En ruta", "Entregado", "Pendiente"] as const;
const etiquetas: Record<(typeof filtros)[number], string> = {
  Todas: "Todas", "En ruta": "En ruta", Entregado: "Entregadas", Pendiente: "Pendiente",
};

const kpis = [
  { label: "Registradas", valor: "12", icono: "car" as const, color: colors.blue },
  { label: "Personal", valor: "4", icono: "people" as const, color: colors.green },
  { label: "Pendientes", valor: "3", icono: "document-text" as const, color: colors.yellow },
];

export default function EntregasScreen() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todas");

  const lista = useMemo(
    () => (filtro === "Todas" ? entregas : entregas.filter((e) => e.estado === filtro)),
    [filtro],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader titulo="Entregas" label="Administración de entregas" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* KPIs */}
        <View style={styles.kpiRow}>
          {kpis.map((k) => (
            <GlassCard key={k.label} style={styles.kpiCard}>
              <View style={[styles.kpiIcono, { backgroundColor: `${k.color}1A`, borderColor: `${k.color}44` }]}>
                <Ionicons name={k.icono} size={14} color={k.color} />
              </View>
              <ThemedText type="title" style={[styles.kpiValor, { color: k.color }]}>
                {k.valor}
              </ThemedText>
              <ThemedText type="label" style={styles.kpiLabel}>
                {k.label}
              </ThemedText>
            </GlassCard>
          ))}
        </View>

        <FilterChips opciones={filtros.map((f) => etiquetas[f])} valor={etiquetas[filtro]} onChange={(v) => setFiltro(filtros.find((f) => etiquetas[f] === v) ?? "Todas")} />

        {/* Lista de entregas */}
        {lista.map((e) => (
          <GlassCard key={e.id} style={styles.entregaCard}>
            <View style={styles.entregaTop}>
              <ThemedText type="mono" style={styles.entregaId}>
                #{e.id}
              </ThemedText>
              <StatusChip estado={e.estado} />
            </View>
            <View style={styles.entregaMedio}>
              <Avatar inicial={e.cliente[0]} size={36} />
              <View style={styles.entregaInfo}>
                <ThemedText type="mono" style={styles.entregaCliente}>
                  {e.cliente}
                </ThemedText>
                <ThemedText type="body" style={styles.entregaDireccion} numberOfLines={1}>
                  {e.direccion}
                </ThemedText>
              </View>
            </View>
            <View style={[styles.entregaPie, styles.divisorTop]}>
              <View style={styles.horaRow}>
                <Ionicons name="time" size={12} color={colors.blue} />
                <ThemedText type="body" style={styles.hora}>
                  {e.hora}
                </ThemedText>
              </View>
              <ThemedText type="mono" style={styles.monto}>
                {e.monto}
              </ThemedText>
            </View>
          </GlassCard>
        ))}

        {/* Personal de delivery */}
        <ThemedText type="label" style={styles.personalTitulo}>
          Personal de Delivery
        </ThemedText>
        <GlassCard style={styles.personalCard}>
          {deliveryPersonal.map((p, i) => (
            <View key={p.id} style={[styles.personalRow, i > 0 && styles.divisorTop]}>
              <Avatar inicial={p.nombre[0]} size={34} />
              <ThemedText type="mono" style={styles.personalNombre}>
                {p.nombre}
              </ThemedText>
              <View style={styles.personalDer}>
                <View style={[styles.punto, { backgroundColor: p.disponible ? colors.green : colors.orange }]} />
                <ThemedText type="body" style={styles.personalEstado}>
                  {p.disponible ? "Disponible" : "Ocupado"}
                </ThemedText>
              </View>
            </View>
          ))}
        </GlassCard>

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
  scroll: { paddingHorizontal: 16, paddingBottom: 110, gap: 12 },
  kpiRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  kpiCard: { flex: 1, alignItems: "flex-start", gap: 4, padding: 12 },
  kpiIcono: { width: 28, height: 28, borderRadius: 9, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  kpiValor: { fontSize: 22 },
  kpiLabel: { fontSize: 9 },
  entregaCard: { gap: 10 },
  entregaTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  entregaId: { color: colors.yellow, fontWeight: "800" },
  entregaMedio: { flexDirection: "row", alignItems: "center", gap: 10 },
  entregaInfo: { flex: 1, gap: 2 },
  entregaCliente: { fontSize: 14 },
  entregaDireccion: { fontSize: 11, color: colors.textSoft },
  entregaPie: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  horaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  hora: { fontSize: 12 },
  monto: { color: colors.yellow, fontWeight: "800" },
  divisorTop: { borderTopWidth: 1, borderTopColor: colors.borderSoft, paddingTop: 10 },
  personalTitulo: { marginTop: 4 },
  personalCard: { paddingVertical: 4, paddingHorizontal: 14 },
  personalRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 10 },
  personalNombre: { flex: 1, fontSize: 13 },
  personalDer: { flexDirection: "row", alignItems: "center", gap: 6 },
  punto: { width: 9, height: 9, borderRadius: 5 },
  personalEstado: { fontSize: 11, color: colors.textSoft },
  pie: { alignItems: "center", marginTop: 4, paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
