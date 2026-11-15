import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Avatar } from "@/components/avatar";
import { GlassCard } from "@/components/glass-card";
import { StatusChip } from "@/components/status-chip";
import { ThemedText } from "@/components/themed-text";
import { detalleOrden, ordenes } from "@/data/mock";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";

export default function OrdenDetalleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const clave = typeof id === "string" ? id : "OS-0142";

  const base = detalleOrden[clave] ?? detalleOrden["OS-0142"];
  const ordenDeLista = ordenes.find((o) => o.id === clave);
  const data = ordenDeLista ? { ...base, orden: ordenDeLista } : base;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.headerTitulo}>
          <ThemedText type="subtitle" style={styles.headerOrden}>
            Orden #{data.orden.id}
          </ThemedText>
          <ThemedText type="label" style={styles.headerSub}>
            {data.orden.nota ?? "Taller Central"}
          </ThemedText>
        </View>
        <StatusChip estado={data.orden.estado} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Estimado + garantía */}
        <View style={styles.filaTop}>
          <GlassCard style={styles.topCard}>
            <Ionicons name="time" size={15} color={colors.yellow} />
            <View>
              <ThemedText type="label" style={styles.topLabel}>
                Estimado
              </ThemedText>
              <ThemedText type="mono" style={styles.topValor}>
                Hoy 6:00 PM
              </ThemedText>
            </View>
          </GlassCard>
          <GlassCard style={styles.topCard}>
            <Ionicons name="shield-checkmark" size={15} color={colors.green} />
            <View>
              <ThemedText type="label" style={styles.topLabel}>
                Garantía
              </ThemedText>
              <ThemedText type="mono" style={styles.topValor}>
                90 Días Taller
              </ThemedText>
            </View>
          </GlassCard>
        </View>

        {/* Cliente */}
        <GlassCard>
          <View style={styles.cardHeader}>
            <View style={styles.cardTituloRow}>
              <Ionicons name="person" size={13} color={colors.textSoft} />
              <ThemedText type="label">Cliente</ThemedText>
            </View>
            <View style={styles.frecuenteChip}>
              <Ionicons name="star" size={10} color={colors.yellow} />
              <ThemedText type="label" style={styles.frecuenteTexto}>
                Cliente Frecuente
              </ThemedText>
            </View>
          </View>
          <View style={styles.clienteRow}>
            <Avatar inicial={data.orden.cliente[0]} size={46} />
            <View style={styles.clienteInfo}>
              <ThemedText type="subtitle" style={styles.clienteNombre}>
                {data.orden.cliente}
              </ThemedText>
              <ThemedText type="body" style={styles.clienteTel}>
                {data.telefono}
              </ThemedText>
            </View>
            <View style={styles.clienteAcciones}>
              <View style={[styles.accionCircular, { borderColor: `${colors.blue}55`, backgroundColor: `${colors.blue}1A` }]}>
                <Ionicons name="call" size={15} color={colors.blue} />
              </View>
              <View style={[styles.accionCircular, { borderColor: `${colors.green}55`, backgroundColor: `${colors.green}1A` }]}>
                <Ionicons name="chatbubbles" size={15} color={colors.green} />
              </View>
            </View>
          </View>
        </GlassCard>

        {/* Dispositivo */}
        <GlassCard style={styles.gap}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTituloRow}>
              <Ionicons name="phone-portrait" size={13} color={colors.textSoft} />
              <ThemedText type="label">Dispositivo</ThemedText>
            </View>
            <ThemedText type="label" style={styles.idChip}>
              ID: D-8821
            </ThemedText>
          </View>
          <View style={styles.datosGrid}>
            <Dato label="Equipo" valor={data.equipo} />
            <Dato label="IMEI" valor={data.imei} />
            <Dato label="Color" valor={data.colorEq} />
            <Dato label="Fecha Ingreso" valor={data.ingreso} />
          </View>
          <View style={styles.fallaBox}>
            <View style={styles.fallaTituloRow}>
              <Ionicons name="warning" size={13} color={colors.yellow} />
              <ThemedText type="label" style={styles.fallaTitulo}>
                Falla Reportada
              </ThemedText>
            </View>
            <ThemedText type="body" style={styles.fallaTexto}>
              {data.falla}
            </ThemedText>
          </View>
          <View style={styles.accesoriosRow}>
            <Ionicons name="bag-handle" size={14} color={colors.textSoft} />
            <ThemedText type="body" style={styles.accesoriosTexto}>
              Accesorios: {data.accesorios}
            </ThemedText>
          </View>
        </GlassCard>

        {/* Fotos */}
        <GlassCard style={styles.gap}>
          <View style={styles.cardHeader}>
            <ThemedText type="label">Fotos del Equipo ({data.fotos.length})</ThemedText>
            <View style={styles.agregarFoto}>
              <Ionicons name="camera" size={12} color={colors.yellow} />
              <ThemedText type="label" style={styles.agregarFotoTexto}>
                Agregar foto
              </ThemedText>
            </View>
          </View>
          <View style={styles.fotosGrid}>
            {data.fotos.map((f) => (
              <View key={f} style={styles.fotoItem}>
                <Ionicons name="image" size={20} color={colors.textSoft} />
                <Text style={styles.fotoLabel}>{f.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Diagnóstico */}
        <GlassCard style={styles.gap}>
          <View style={styles.cardHeader}>
            <ThemedText type="label">Diagnóstico Técnico</ThemedText>
            <View style={styles.verificadosChip}>
              <ThemedText type="label" style={styles.verificadosTexto}>
                {data.diagnosticos.filter((d) => d.estado === "ok").length}/{data.diagnosticos.length} Verificados
              </ThemedText>
            </View>
          </View>
          {data.diagnosticos.map((d) => (
            <View key={d.componente} style={styles.diagItem}>
              <View
                style={[
                  styles.diagIcono,
                  { backgroundColor: d.estado === "ok" ? `${colors.green}1A` : `${colors.red}1A` },
                ]}
              >
                <Ionicons
                  name={d.estado === "ok" ? "checkmark-circle" : "close-circle"}
                  size={17}
                  color={d.estado === "ok" ? colors.green : colors.red}
                />
              </View>
              <View style={styles.diagInfo}>
                <ThemedText type="mono" style={styles.diagNombre}>
                  {d.componente}
                </ThemedText>
                <ThemedText type="body" style={styles.diagDetalle}>
                  {d.detalle}
                </ThemedText>
              </View>
              <View style={[styles.diagChip, { backgroundColor: d.estado === "ok" ? `${colors.green}22` : `${colors.red}22` }]}>
                <Text style={[styles.diagChipTexto, { color: d.estado === "ok" ? colors.green : colors.red }]}>
                  {d.estado === "ok" ? "OK" : "FALLA"}
                </Text>
              </View>
            </View>
          ))}
        </GlassCard>

        {/* Repuestos */}
        <GlassCard style={styles.gap}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTituloRow}>
              <Ionicons name="construct" size={13} color={colors.textSoft} />
              <ThemedText type="label">Repuestos y Materiales</ThemedText>
            </View>
            <Ionicons name="create" size={15} color={colors.textSoft} />
          </View>
          {data.repuestos.map((r) => (
            <View key={r.nombre} style={styles.repuestoItem}>
              <View style={styles.repuestoBullet} />
              <View style={styles.repuestoInfo}>
                <ThemedText type="mono" style={styles.repuestoNombre}>
                  {r.nombre}
                </ThemedText>
                <ThemedText type="body" style={styles.repuestoCant}>
                  Cantidad: {r.cantidad}
                </ThemedText>
              </View>
              <ThemedText type="mono" style={styles.repuestoPrecio}>
                {r.precio}
              </ThemedText>
            </View>
          ))}
        </GlassCard>

        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieVersion}>
            v2.4.0 — iTUACCESORIO Mobile System
          </ThemedText>
        </View>
      </ScrollView>

      {/* Footer fijo */}
      <View style={styles.footer}>
        <View>
          <ThemedText type="label" style={styles.footerLabel}>
            Total Estimado
          </ThemedText>
          <ThemedText type="title" style={styles.footerTotal}>
            {data.orden.total}
            <ThemedText type="label" style={styles.footerMxn}>
              {" "}
              MXN
            </ThemedText>
          </ThemedText>
        </View>
        <Pressable style={styles.actualizarBtn}>
          <Text style={styles.actualizarTexto}>ACTUALIZAR ESTADO</Text>
          <Ionicons name="arrow-forward" size={15} color={colors.ink} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function Dato({ label, valor }: { label: string; valor: string }) {
  return (
    <View style={styles.datoCaja}>
      <ThemedText type="label" style={styles.datoLabel}>
        {label}
      </ThemedText>
      <ThemedText type="mono" style={styles.datoValor}>
        {valor}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row", alignItems: "center", gap: spacing.md,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.borderSoft,
  },
  headerTitulo: { flex: 1, gap: 1 },
  headerOrden: { fontFamily: fontFamily.heading, fontSize: 17 },
  headerSub: { fontSize: 9 },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md, paddingTop: spacing.md },
  filaTop: { flexDirection: "row", gap: spacing.md },
  topCard: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10, padding: 12 },
  topLabel: { fontSize: 9 },
  topValor: { fontSize: 13, fontWeight: "700" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTituloRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  gap: { gap: spacing.md },
  frecuenteChip: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: `${colors.yellow}1A`, borderWidth: 1, borderColor: `${colors.yellow}44`,
    borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 8,
  },
  frecuenteTexto: { fontSize: 8, color: colors.yellow },
  clienteRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  clienteInfo: { flex: 1, gap: 1 },
  clienteNombre: { fontFamily: fontFamily.bodyExtraBold },
  clienteTel: { fontSize: 12 },
  clienteAcciones: { flexDirection: "row", gap: 8 },
  accionCircular: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  idChip: { fontSize: 9, color: colors.textSoft },
  datosGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  datoCaja: {
    width: "48.5%", backgroundColor: colors.bgSoft, borderWidth: 1, borderColor: colors.borderSoft,
    borderRadius: radius.md, padding: 10, gap: 2,
  },
  datoLabel: { fontSize: 9 },
  datoValor: { fontSize: 13, fontWeight: "700" },
  fallaBox: {
    backgroundColor: `${colors.yellow}0F`, borderWidth: 1, borderColor: `${colors.yellow}44`,
    borderRadius: radius.md, padding: 12, gap: 5,
  },
  fallaTituloRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  fallaTitulo: { color: colors.yellow, fontSize: 9 },
  fallaTexto: { color: colors.text, fontSize: 13 },
  accesoriosRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  accesoriosTexto: { fontSize: 12, flex: 1 },
  agregarFoto: { flexDirection: "row", alignItems: "center", gap: 4 },
  agregarFotoTexto: { color: colors.yellow, fontSize: 9 },
  fotosGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  fotoItem: {
    width: "23.5%", aspectRatio: 1, borderRadius: radius.sm,
    backgroundColor: colors.bgSoft, borderWidth: 1, borderColor: colors.border,
    alignItems: "center", justifyContent: "center", gap: 4,
  },
  fotoLabel: { color: colors.textSoft, fontSize: 6.5, fontWeight: "700" },
  verificadosChip: { backgroundColor: `${colors.blue}1A`, borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 9 },
  verificadosTexto: { fontSize: 8, color: "#60A5FA" },
  diagItem: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  diagIcono: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  diagInfo: { flex: 1, gap: 1 },
  diagNombre: { fontSize: 13 },
  diagDetalle: { fontSize: 11, color: colors.textSoft },
  diagChip: { borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 9 },
  diagChipTexto: { fontSize: 9, fontWeight: "800" },
  repuestoItem: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  repuestoBullet: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.yellow },
  repuestoInfo: { flex: 1, gap: 1 },
  repuestoNombre: { fontSize: 13 },
  repuestoCant: { fontSize: 11, color: colors.textSoft },
  repuestoPrecio: { color: colors.text, fontWeight: "800" },
  pie: { alignItems: "center", paddingBottom: spacing.lg },
  pieVersion: { fontSize: 11, color: colors.textSoft },
  footer: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    backgroundColor: colors.bgSoft, borderTopWidth: 1, borderTopColor: colors.border,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  footerLabel: { fontSize: 9 },
  footerTotal: { color: colors.yellow, fontSize: 24 },
  footerMxn: { fontSize: 9, color: colors.textSoft },
  actualizarBtn: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: colors.yellow, borderRadius: radius.md, paddingVertical: 14, paddingHorizontal: 18,
  },
  actualizarTexto: { fontFamily: fontFamily.bodyExtraBold, color: colors.ink, fontSize: 13 },
});
