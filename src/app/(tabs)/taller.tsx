import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Avatar } from "@/components/avatar";
import { Fab } from "@/components/fab";
import { GlassCard } from "@/components/glass-card";
import { SearchField } from "@/components/search-input";
import { StatusChip } from "@/components/status-chip";
import { ThemedText } from "@/components/themed-text";
import { ordenes, EstadoOrden } from "@/data/mock";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";

const filtros: (EstadoOrden | "Todas")[] = ["Todas", "Pendiente", "Revisión", "Reparación", "Completado"];

export default function TallerScreen() {
  const router = useRouter();
  const [filtro, setFiltro] = useState<EstadoOrden | "Todas">("Todas");

  const lista = useMemo(
    () => (filtro === "Todas" ? ordenes : ordenes.filter((o) => o.estado === filtro)),
    [filtro],
  );

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
        <View style={styles.activasChip}>
          <ThemedText type="body" style={styles.activasTexto}>
            {lista.length} activas
          </ThemedText>
        </View>
      </View>

      <View style={styles.buscador}>
        <SearchField placeholder="Buscar orden, cliente o equipo..." />
      </View>

      {/* Filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtros}>
        {filtros.map((f) => {
          const activo = filtro === f;
          return (
            <Pressable key={f} onPress={() => setFiltro(f)} style={[styles.filtro, activo && styles.filtroActivo]}>
              <Text style={[styles.filtroTexto, activo && styles.filtroTextoActivo]}>{f}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Lista */}
      <ScrollView
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      >
        {lista.map((o) => (
          <Pressable key={o.id} onPress={() => router.push(`/orden/${o.id}`)}>
            <GlassCard style={styles.ordenCard}>
              <View style={styles.ordenTop}>
                <ThemedText type="mono" style={styles.ordenId}>
                  #{o.id}
                </ThemedText>
                <ThemedText type="body" style={styles.ordenNota}>
                  ● {o.nota}
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
                    {o.dispositivo} · {o.detalle}
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
                    {o.fecha}
                  </ThemedText>
                </View>
                <ThemedText type="mono" style={styles.total}>
                  {o.total}
                </ThemedText>
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
  activasChip: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.pill, paddingVertical: 5, paddingHorizontal: 12,
  },
  activasTexto: { fontSize: 12 },
  buscador: { paddingHorizontal: spacing.lg, marginTop: spacing.md },
  filtros: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  filtro: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.pill, paddingVertical: 7, paddingHorizontal: 14,
  },
  filtroActivo: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  filtroTexto: { color: colors.textMuted, fontFamily: fontFamily.bodyBold, fontSize: 12, textTransform: "uppercase" },
  filtroTextoActivo: { color: colors.ink },
  lista: { paddingHorizontal: spacing.lg, paddingBottom: 100, gap: spacing.md },
  ordenCard: { gap: spacing.md },
  ordenTop: { flexDirection: "row", alignItems: "center", gap: 8 },
  ordenId: { color: colors.yellow, fontWeight: "800" },
  ordenNota: { fontSize: 11, color: colors.textSoft, flex: 1 },
  ordenMedio: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  ordenCliente: { flex: 1, gap: 1 },
  ordenNombre: { fontSize: 16, fontFamily: fontFamily.bodyExtraBold },
  ordenEquipo: { fontSize: 12 },
  divisorTop: { borderTopWidth: 1, borderTopColor: colors.borderSoft, paddingTop: spacing.md },
  ordenPie: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  ordenFecha: { flexDirection: "row", alignItems: "center", gap: 6 },
  fecha: { fontSize: 12 },
  total: { color: colors.yellow, fontWeight: "800" },
  pie: { alignItems: "center", gap: 6, marginTop: spacing.xl },
  pieVersion: { fontSize: 11, color: colors.textSoft },
  pieLinks: { fontSize: 10, color: colors.textSoft },
});
