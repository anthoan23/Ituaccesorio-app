import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Fab } from "@/components/fab";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { StatusChip } from "@/components/status-chip";
import { ThemedText } from "@/components/themed-text";
import { entregas, deliveryPersonal, recepcionOrdenes, RecepcionOrden } from "@/data/mock";
import { colors, radius } from "@/constants/theme";

/** KPIs de la web: Entregas registradas · Personal Delivery · Facturas pendientes */
const kpisDespachos = [
  { label: "Entregas registradas", valor: "12", color: colors.blue },
  { label: "Personal Delivery", valor: "4", color: colors.green },
  { label: "Facturas pendientes", valor: "3", color: colors.yellow },
];

export default function EntregasScreen() {
  const [vista, setVista] = useState<"Despachos" | "Recepción">("Despachos");
  const [busqueda, setBusqueda] = useState("");
  const [recepciones, setRecepciones] = useState(recepcionOrdenes);

  const lista = useMemo(
    () =>
      entregas.filter((e) =>
        `${e.id} ${e.factura} ${e.delivery} ${e.direccion}`.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    [busqueda],
  );

  const resumenRecepcion = useMemo(
    () => ({
      pendientes: recepciones.filter((r) => r.estado === "Pendiente").length,
      transito: recepciones.filter((r) => r.estado === "En tránsito").length,
      recibidas: recepciones.filter((r) => r.estado === "Recibido").length,
    }),
    [recepciones],
  );

  const confirmarRecepcion = (id: string) =>
    setRecepciones((rs) =>
      rs.map((r) => (r.id === id ? { ...r, estado: "Recibido", recibidoPor: "Anthoan G." } : r)),
    );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader titulo="Entregas" label="Administración de entregas" />

      {/* Tabs Despachos / Recepción (2 vistas de la web) */}
      <View style={styles.tabs}>
        {(["Despachos", "Recepción"] as const).map((t) => (
          <Pressable key={t} style={[styles.tab, vista === t && styles.tabActivo]} onPress={() => setVista(t)}>
            <Text style={[styles.tabTexto, vista === t && styles.tabTextoActivo]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {vista === "Despachos" ? (
          <>
            {/* KPIs de la web */}
            <View style={styles.kpiRow}>
              {kpisDespachos.map((k) => (
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

            <SearchField placeholder="Buscar entrega, factura o delivery..." value={busqueda} onChangeText={setBusqueda} />

            {/* Lista de entregas */}
            {lista.map((e) => (
              <GlassCard key={e.id} style={styles.entregaCard}>
                <View style={styles.entregaTop}>
                  <ThemedText type="mono" style={styles.entregaId}>
                    #{e.id}
                  </ThemedText>
                  <StatusChip estado={e.estado} />
                </View>
                <ThemedText type="label" style={styles.factura}>
                  Factura {e.factura}
                </ThemedText>
                <View style={styles.entregaMedio}>
                  <View style={styles.deliveryAvatar}>
                    <Text style={styles.deliveryInicial}>{e.delivery[0]}</Text>
                  </View>
                  <View style={styles.entregaInfo}>
                    <ThemedText type="mono" style={styles.entregaCliente} numberOfLines={1}>
                      {e.delivery}
                    </ThemedText>
                    <ThemedText type="body" style={styles.entregaDireccion} numberOfLines={1}>
                      {e.direccion}
                    </ThemedText>
                  </View>
                </View>
                <View style={[styles.entregaPie, styles.divisorTop]}>
                  <View style={styles.horaRow}>
                    <Ionicons name="calendar" size={12} color={colors.blue} />
                    <ThemedText type="body" style={styles.hora}>
                      {e.fecha}
                    </ThemedText>
                  </View>
                </View>
              </GlassCard>
            ))}

            {/* Personal de delivery (web: Cédula · Nombre completo) */}
            <ThemedText type="label" style={styles.personalTitulo}>
              Personal de Delivery
            </ThemedText>
            <GlassCard style={styles.personalCard}>
              {deliveryPersonal.map((p, i) => (
                <View key={p.id} style={[styles.personalRow, i > 0 && styles.divisorTop]}>
                  <View style={styles.personalIcono}>
                    <Ionicons name="bicycle" size={15} color={colors.green} />
                  </View>
                  <View style={styles.personalInfo}>
                    <ThemedText type="mono" style={styles.personalNombre} numberOfLines={1}>
                      {p.nombre}
                    </ThemedText>
                    <ThemedText type="body" style={styles.personalCedula}>
                      Céd.: {p.cedula}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </GlassCard>
          </>
        ) : (
          <>
            {/* Recepción: KPIs */}
            <View style={styles.kpiRow}>
              <GlassCard style={styles.kpiCard}>
                <ThemedText type="title" style={[styles.kpiValor, { color: colors.yellow }]}>
                  {resumenRecepcion.pendientes}
                </ThemedText>
                <ThemedText type="label" style={styles.kpiLabel}>
                  Por Entregar
                </ThemedText>
              </GlassCard>
              <GlassCard style={styles.kpiCard}>
                <ThemedText type="title" style={[styles.kpiValor, { color: colors.blue }]}>
                  {resumenRecepcion.transito}
                </ThemedText>
                <ThemedText type="label" style={styles.kpiLabel}>
                  En Tránsito
                </ThemedText>
              </GlassCard>
              <GlassCard style={styles.kpiCard}>
                <ThemedText type="title" style={[styles.kpiValor, { color: colors.green }]}>
                  {resumenRecepcion.recibidas}
                </ThemedText>
                <ThemedText type="label" style={styles.kpiLabel}>
                  Recibidas
                </ThemedText>
              </GlassCard>
            </View>

            {/* Órdenes de proveedores (web: ID · Proveedor · Fecha · Hora · Estado · Costo total) */}
            {recepciones.map((r: RecepcionOrden) => (
              <GlassCard key={r.id} style={styles.entregaCard}>
                <View style={styles.entregaTop}>
                  <ThemedText type="mono" style={styles.entregaId}>
                    #{r.id}
                  </ThemedText>
                  <StatusChip estado={r.estado} />
                </View>
                <View style={styles.entregaMedio}>
                  <View style={styles.proveedorIcono}>
                    <Ionicons name="cube" size={16} color={colors.blue} />
                  </View>
                  <View style={styles.entregaInfo}>
                    <ThemedText type="mono" style={styles.entregaCliente} numberOfLines={1}>
                      {r.proveedor}
                    </ThemedText>
                    <ThemedText type="body" style={styles.entregaDireccion}>
                      Costo total: {r.costoTotal}
                    </ThemedText>
                  </View>
                </View>
                <View style={[styles.entregaPie, styles.divisorTop]}>
                  <View style={styles.horaRow}>
                    <Ionicons name="calendar" size={12} color={colors.textSoft} />
                    <ThemedText type="body" style={styles.hora}>
                      {r.fecha} · {r.hora}
                    </ThemedText>
                  </View>
                  {r.estado !== "Recibido" ? (
                    <Pressable style={styles.confirmarBtn} onPress={() => confirmarRecepcion(r.id)}>
                      <Ionicons name="checkmark" size={13} color={colors.green} />
                      <Text style={styles.confirmarTexto}>Confirmar</Text>
                    </Pressable>
                  ) : (
                    <ThemedText type="body" style={styles.recibidoTexto}>
                      Recibido por: {r.recibidoPor}
                    </ThemedText>
                  )}
                </View>
              </GlassCard>
            ))}

            <View style={styles.pie}>
              <ThemedText type="body" style={styles.pieVersion}>
                v2.4.0 — iTUACCESORIO Mobile System
              </ThemedText>
            </View>
          </>
        )}
      </ScrollView>

      {vista === "Despachos" && <Fab />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  tabs: {
    flexDirection: "row", marginHorizontal: 16, marginBottom: 12,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.lg, padding: 4, gap: 4,
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: radius.md },
  tabActivo: { backgroundColor: colors.yellow },
  tabTexto: { color: colors.textMuted, fontWeight: "700", fontSize: 13 },
  tabTextoActivo: { color: colors.ink },
  scroll: { paddingHorizontal: 16, paddingBottom: 110, gap: 12 },
  kpiRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  kpiCard: { flex: 1, alignItems: "center", gap: 3, paddingVertical: 12, paddingHorizontal: 6 },
  kpiValor: { fontSize: 22 },
  kpiLabel: { fontSize: 8, textAlign: "center" },
  entregaCard: { gap: 10 },
  entregaTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  entregaId: { color: colors.yellow, fontWeight: "800" },
  factura: { fontSize: 10, color: colors.textSoft, letterSpacing: 1 },
  entregaMedio: { flexDirection: "row", alignItems: "center", gap: 10 },
  deliveryAvatar: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.yellow,
    alignItems: "center", justifyContent: "center",
  },
  deliveryInicial: { color: colors.ink, fontWeight: "800", fontSize: 13 },
  entregaInfo: { flex: 1, gap: 2 },
  entregaCliente: { fontSize: 14 },
  entregaDireccion: { fontSize: 11, color: colors.textSoft },
  entregaPie: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  horaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  hora: { fontSize: 12 },
  divisorTop: { borderTopWidth: 1, borderTopColor: colors.borderSoft, paddingTop: 10 },
  proveedorIcono: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: `${colors.blue}1A`,
    borderWidth: 1, borderColor: `${colors.blue}44`, alignItems: "center", justifyContent: "center",
  },
  confirmarBtn: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: `${colors.green}1A`, borderWidth: 1, borderColor: `${colors.green}55`,
    borderRadius: 999, paddingVertical: 5, paddingHorizontal: 10,
  },
  confirmarTexto: { color: colors.green, fontSize: 11, fontWeight: "700" },
  recibidoTexto: { fontSize: 11, color: colors.green },
  personalTitulo: { marginTop: 4 },
  personalCard: { paddingVertical: 4, paddingHorizontal: 14 },
  personalRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 10 },
  personalIcono: {
    width: 34, height: 34, borderRadius: 10, backgroundColor: `${colors.green}1A`,
    borderWidth: 1, borderColor: `${colors.green}44`, alignItems: "center", justifyContent: "center",
  },
  personalInfo: { flex: 1, gap: 1 },
  personalNombre: { fontSize: 13 },
  personalCedula: { fontSize: 10, color: colors.textSoft },
  pie: { alignItems: "center", marginTop: 4, paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
