import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { SwipeTabs } from "@/components/swipe-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Avatar } from "@/components/avatar";
import { Fab } from "@/components/fab";
import { GlassCard } from "@/components/glass-card";
import { SearchField } from "@/components/search-input";
import { StatusChip } from "@/components/status-chip";
import { ThemedText } from "@/components/themed-text";
import { ordenes } from "@/data/mock";
import { colors, fontFamily, spacing } from "@/constants/theme";

/** KPIs de la web: Pendientes · Asignadas · Reparadas */
const kpis = [
  { label: "Pendientes", valor: ordenes.filter((o) => o.estado === "Pendiente").length, color: colors.yellow },
  { label: "Asignadas", valor: ordenes.filter((o) => o.estado === "Asignada").length, color: colors.blue },
  { label: "Reparadas", valor: ordenes.filter((o) => o.estado === "Completado").length, color: colors.green },
];

export default function TallerScreen() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerIzq}>
          <View style={styles.headerTitulo}>
            <ThemedText type="title" style={styles.titulo}>
              Taller
            </ThemedText>
            <View style={styles.punto} />
          </View>
          <ThemedText type="label">Órdenes de servicio</ThemedText>
        </View>
      </View>

      {/* KPIs de la web */}
      <View style={styles.kpiRow}>
        {kpis.map((k) => (
          <GlassCard key={k.label} style={styles.kpiCard}>
            <ThemedText type="title" style={[styles.kpiValor, { color: k.color }]}>
              {k.valor}
            </ThemedText>
            <ThemedText type="label" style={styles.kpiLabel}>
              {k.label}
            </ThemedText>
          </GlassCard>
        ))}
      </View>

      <View style={styles.buscador}>
        <SearchField placeholder="Buscar orden, cliente o equipo..." value={busqueda} onChangeText={setBusqueda} />
      </View>

      {/* Lista */}
      <SwipeTabs onRight={() => router.navigate("/inicio" as never)} onLeft={() => router.navigate("/mas" as never)}>
      <ScrollView contentContainerStyle={styles.lista} showsVerticalScrollIndicator={false}>
        {ordenes
          .filter((o) =>
            `${o.id} ${o.cliente} ${o.equipo} ${o.modelo}`.toLowerCase().includes(busqueda.toLowerCase()),
          )
          .map((o) => (
          <Pressable key={o.id} onPress={() => router.push(`/orden/${o.id}`)}>
            <GlassCard style={styles.ordenCard}>
              <View style={styles.ordenTop}>
                <ThemedText type="mono" style={styles.ordenId}>
                  #{o.id}
                </ThemedText>
                <StatusChip estado={o.estado} />
              </View>
              <View style={styles.ordenMedio}>
                <Avatar inicial={o.cliente[0]} size={40} />
                <View style={styles.ordenCliente}>
                  <ThemedText type="subtitle" style={styles.ordenNombre}>
                    {o.cliente}
                  </ThemedText>
                  <ThemedText type="body" style={styles.ordenEquipo}>
                    {o.equipo} · {o.modelo}
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textSoft} />
              </View>
              <View style={[styles.ordenPie, styles.divisorTop]}>
                <View style={styles.ordenFecha}>
                  <Ionicons
                    name={o.estado === "Completado" ? "checkmark-circle" : "time"}
                    size={13}
                    color={o.estado === "Completado" ? colors.green : colors.blue}
                  />
                  <ThemedText type="body" style={styles.fecha}>
                    Ingreso: {o.fechaIngreso}
                  </ThemedText>
                </View>
              </View>
            </GlassCard>
          </Pressable>
        ))}

        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieVersion}>
            v2.4.0 — iTUACCESORIO Mobile System
          </ThemedText>
          <ThemedText type="label" style={styles.pieLinks}>
            Soporte · Términos
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
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end",
    paddingHorizontal: spacing.lg, paddingTop: spacing.md,
  },
  headerIzq: { gap: 3 },
  headerTitulo: { flexDirection: "row", alignItems: "center", gap: 6 },
  titulo: { fontSize: 28 },
  punto: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.yellow },
  kpiRow: { flexDirection: "row", gap: 10, paddingHorizontal: spacing.lg, marginTop: spacing.md },
  kpiCard: { flex: 1, alignItems: "center", gap: 3, paddingVertical: 12, paddingHorizontal: 10 },
  kpiValor: { fontSize: 24 },
  kpiLabel: { fontSize: 9 },
  buscador: { paddingHorizontal: spacing.lg, marginTop: spacing.md },
  lista: { paddingHorizontal: spacing.lg, paddingBottom: 100, gap: spacing.md },
  ordenCard: { gap: spacing.md },
  ordenTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  ordenId: { color: colors.yellow, fontWeight: "800" },
  ordenMedio: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  ordenCliente: { flex: 1, gap: 1 },
  ordenNombre: { fontSize: 16, fontFamily: fontFamily.bodyExtraBold },
  ordenEquipo: { fontSize: 12 },
  divisorTop: { borderTopWidth: 1, borderTopColor: colors.borderSoft, paddingTop: spacing.md },
  ordenPie: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  ordenFecha: { flexDirection: "row", alignItems: "center", gap: 6 },
  fecha: { fontSize: 12 },
  pie: { alignItems: "center", gap: 6, marginTop: spacing.xl },
  pieVersion: { fontSize: 11, color: colors.textSoft },
  pieLinks: { fontSize: 10, color: colors.textSoft },
});
