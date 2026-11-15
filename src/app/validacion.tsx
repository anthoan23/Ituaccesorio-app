import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { FilterChips } from "@/components/filter-chips";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { StatusChip } from "@/components/status-chip";
import { ThemedText } from "@/components/themed-text";
import { pagosValidar, PagoValidar } from "@/data/mock";
import { colors, fontFamily, radius } from "@/constants/theme";

const filtros = ["Todos", "Efectivo", "Transferencia", "Tarjeta"] as const;

export default function ValidacionScreen() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");
  const [pagos, setPagos] = useState(pagosValidar);

  const resumen = useMemo(
    () => ({
      pendientes: pagos.filter((p) => p.estado === "Pendiente").length,
      validados: pagos.filter((p) => p.estado === "Validado").length,
      rechazados: pagos.filter((p) => p.estado === "Rechazado").length,
    }),
    [pagos],
  );

  const lista = useMemo(
    () => (filtro === "Todos" ? pagos : pagos.filter((p) => p.metodo === filtro)),
    [filtro, pagos],
  );

  const cambiarEstado = (id: string, estado: PagoValidar["estado"]) =>
    setPagos((ps) => ps.map((p) => (p.id === id ? { ...p, estado } : p)));

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader titulo="Validación" label="Pagos por verificar" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Resumen */}
        <GlassCard style={styles.resumenCard}>
          <View style={styles.resumenItem}>
            <ThemedText type="title" style={[styles.resumenValor, { color: colors.yellow }]}>
              {resumen.pendientes}
            </ThemedText>
            <ThemedText type="label" style={styles.resumenLabel}>
              Pendientes
            </ThemedText>
          </View>
          <View style={styles.resumenDivisor} />
          <View style={styles.resumenItem}>
            <ThemedText type="title" style={[styles.resumenValor, { color: colors.green }]}>
              {resumen.validados}
            </ThemedText>
            <ThemedText type="label" style={styles.resumenLabel}>
              Validados hoy
            </ThemedText>
          </View>
          <View style={styles.resumenDivisor} />
          <View style={styles.resumenItem}>
            <ThemedText type="title" style={[styles.resumenValor, { color: colors.red }]}>
              {resumen.rechazados}
            </ThemedText>
            <ThemedText type="label" style={styles.resumenLabel}>
              Rechazados
            </ThemedText>
          </View>
        </GlassCard>

        <FilterChips opciones={filtros} valor={filtro} onChange={setFiltro} />

        {/* Pagos */}
        {lista.map((p) => (
          <GlassCard key={p.id} style={styles.pagoCard}>
            <View style={styles.pagoTop}>
              <ThemedText type="mono" style={styles.pagoMonto}>
                {p.monto}
              </ThemedText>
              {p.estado === "Pendiente" ? (
                <View style={styles.accionesRow}>
                  <Pressable style={[styles.accionCircular, { borderColor: `${colors.green}66`, backgroundColor: `${colors.green}1A` }]} onPress={() => cambiarEstado(p.id, "Validado")}>
                    <Ionicons name="checkmark" size={16} color={colors.green} />
                  </Pressable>
                  <Pressable style={[styles.accionCircular, { borderColor: `${colors.red}66`, backgroundColor: `${colors.red}1A` }]} onPress={() => cambiarEstado(p.id, "Rechazado")}>
                    <Ionicons name="close" size={16} color={colors.red} />
                  </Pressable>
                </View>
              ) : (
                <StatusChip estado={p.estado} />
              )}
            </View>
            <View style={styles.pagoMedio}>
              <View style={styles.clienteAvatar}>
                <Text style={styles.clienteInicial}>{p.cliente[0]}</Text>
              </View>
              <View style={styles.pagoInfo}>
                <ThemedText type="mono" style={styles.pagoCliente}>
                  {p.cliente}
                </ThemedText>
                <ThemedText type="body" style={styles.pagoOrden}>
                  Orden {p.orden} · {p.id}
                </ThemedText>
              </View>
              <View style={styles.metodoChip}>
                <Ionicons name={p.metodo === "Efectivo" ? "cash" : p.metodo === "Tarjeta" ? "card" : "git-network"} size={12} color={colors.textMuted} />
                <ThemedText type="body" style={styles.metodoTexto}>
                  {p.metodo}
                </ThemedText>
              </View>
            </View>
            <View style={[styles.pagoPie, styles.divisorTop]}>
              <View style={styles.fechaRow}>
                <Ionicons name="time" size={11} color={colors.textSoft} />
                <ThemedText type="body" style={styles.fecha}>
                  {p.fecha} · {p.hora}
                </ThemedText>
              </View>
            </View>
          </GlassCard>
        ))}

        {/* Reporte */}
        <Pressable style={styles.reporte}>
          <Ionicons name="document-text" size={17} color={colors.yellow} />
          <Text style={styles.reporteTexto}>GENERAR REPORTE DE PAGOS</Text>
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
  resumenCard: { flexDirection: "row", alignItems: "center", paddingVertical: 14, marginTop: 4 },
  resumenItem: { flex: 1, alignItems: "center", gap: 3 },
  resumenDivisor: { width: 1, height: 34, backgroundColor: colors.border },
  resumenValor: { fontSize: 24 },
  resumenLabel: { fontSize: 9, textAlign: "center" },
  pagoCard: { gap: 10 },
  pagoTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  pagoMonto: { color: colors.yellow, fontWeight: "800", fontSize: 20 },
  accionesRow: { flexDirection: "row", gap: 8 },
  accionCircular: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  pagoMedio: { flexDirection: "row", alignItems: "center", gap: 10 },
  clienteAvatar: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: colors.yellow,
    alignItems: "center", justifyContent: "center",
  },
  clienteInicial: { color: colors.ink, fontWeight: "800", fontSize: 13 },
  pagoInfo: { flex: 1, gap: 2 },
  pagoCliente: { fontSize: 13 },
  pagoOrden: { fontSize: 10, color: colors.textSoft },
  metodoChip: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: colors.surfaceStrong, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 9,
  },
  metodoTexto: { fontSize: 10, color: colors.textMuted },
  pagoPie: { flexDirection: "row" },
  fechaRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  fecha: { fontSize: 11, color: colors.textSoft },
  divisorTop: { borderTopWidth: 1, borderTopColor: colors.borderSoft, paddingTop: 9 },
  reporte: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.inputBorder,
    borderRadius: radius.lg, paddingVertical: 14,
  },
  reporteTexto: { color: colors.yellow, fontFamily: fontFamily.bodyBold, fontSize: 13 },
  pie: { alignItems: "center", paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
