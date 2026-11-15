import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Avatar } from "@/components/avatar";
import { GlassCard } from "@/components/glass-card";
import { KpiCard } from "@/components/kpi-card";
import { StatusChip } from "@/components/status-chip";
import { ThemedText } from "@/components/themed-text";
import { actividad, kpis, widgets } from "@/data/mock";
import { colors, fontFamily, spacing } from "@/constants/theme";

const accesos = [
  { id: "1", nombre: "Nueva Orden", icono: "clipboard", color: colors.blue, ruta: "/taller" },
  { id: "2", nombre: "Reparación", icono: "build", color: colors.green, ruta: "/taller" },
  { id: "3", nombre: "Producto", icono: "archive", color: colors.yellow, ruta: "/inventario" },
  { id: "4", nombre: "Cliente", icono: "person-add", color: colors.red, ruta: "/clientes" },
] as const;

export default function InicioScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIzq}>
            <ThemedText type="title" style={styles.saludo}>
              Hola, Anthoan 👋
            </ThemedText>
            <ThemedText type="body" style={styles.resumen}>
              Resumen de hoy
            </ThemedText>
          </View>
          <View style={styles.headerDer}>
            <Pressable hitSlop={8} onPress={() => router.push("/notificaciones" as never)}>
              <View style={styles.campana}>
                <Ionicons name="notifications" size={18} color={colors.textMuted} />
                <View style={styles.campanaPunto} />
              </View>
            </Pressable>
            <Avatar inicial="A" size={40} />
          </View>
        </View>

        {/* KPIs */}
        <View style={styles.filaLabel}>
          <ThemedText type="label">Métricas en tiempo real</ThemedText>
          <ThemedText type="body" style={styles.actualizado}>
            ● Actualizado
          </ThemedText>
        </View>
        <View style={styles.kpiGrid}>
          {kpis.map((k) => (
            <KpiCard key={k.id} kpi={k} />
          ))}
        </View>

        {/* Accesos rápidos */}
        <ThemedText type="label" style={styles.seccion}>
          Accesos rápidos
        </ThemedText>
        <View style={styles.accesosRow}>
          {accesos.map((a) => (
            <Pressable key={a.id} style={styles.acceso} onPress={() => router.push(a.ruta)}>
              <View style={[styles.accesoIcono, { backgroundColor: `${a.color}1A`, borderColor: `${a.color}55` }]}>
                <Ionicons name={a.icono} size={22} color={a.color} />
              </View>
              <ThemedText type="body" style={styles.accesoLabel}>
                {a.nombre}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {/* Actividad */}
        <GlassCard style={styles.actividadCard}>
          <View style={styles.actividadHeader}>
            <ThemedText type="label">Actividad reciente</ThemedText>
            <ThemedText type="body" style={styles.verTodo}>
              Ver todo →
            </ThemedText>
          </View>
          {actividad.map((a, i) => (
            <View key={a.id} style={[styles.actividadItem, i > 0 && styles.actividadDivisor]}>
              <View style={[styles.actividadIcono, { backgroundColor: `${a.color}1A` }]}>
                <Ionicons name={a.icono as never} size={16} color={a.color} />
              </View>
              <View style={styles.actividadTexto}>
                <ThemedText type="mono" style={styles.actividadTextoPrincipal}>
                  {a.texto}
                </ThemedText>
                <ThemedText type="body" style={styles.hora}>
                  {a.hora}
                </ThemedText>
              </View>
              <StatusChip estado={a.estado} small />
            </View>
          ))}
        </GlassCard>

        {/* Widgets del dashboard web */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.widgetsRow}>
          {widgets.map((w) => (
            <GlassCard key={w.id} style={[styles.widgetCard, w.alerta && styles.widgetAlerta]}>
              <View style={styles.widgetTop}>
                <View style={[styles.widgetIcono, { backgroundColor: `${w.color}1A` }]}>
                  <Ionicons name={w.icono as never} size={15} color={w.color} />
                </View>
                <ThemedText type="title" style={[styles.widgetValor, { color: w.color }]}>
                  {w.valor}
                </ThemedText>
              </View>
              <ThemedText type="body" style={styles.widgetLabel} numberOfLines={1}>
                {w.label}
              </ThemedText>
              <ThemedText type="body" style={[styles.widgetTrend, w.alerta && { color: colors.red }]}>
                {w.tendencia}
              </ThemedText>
            </GlassCard>
          ))}
        </ScrollView>

        {/* Pie */}
        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieVersion}>
            v2.4.0 — iTUACCESORIO Mobile System
          </ThemedText>
          <ThemedText type="label" style={styles.pieLinks}>
            Soporte · Términos
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.lg },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: spacing.sm },
  headerIzq: { gap: 2 },
  saludo: { fontSize: 22 },
  resumen: { fontSize: 12 },
  headerDer: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  campana: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  campanaPunto: { position: "absolute", top: 9, right: 10, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.red },
  filaLabel: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  actualizado: { color: colors.yellow, fontSize: 11, fontFamily: fontFamily.bodyBold },
  kpiGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  seccion: { marginTop: 2 },
  accesosRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: spacing.xs },
  acceso: { alignItems: "center", gap: 6, flex: 1, maxWidth: 76 },
  accesoIcono: { width: 52, height: 52, borderRadius: 26, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  accesoLabel: { fontSize: 11, textAlign: "center" },
  actividadCard: { gap: 2 },
  actividadHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  verTodo: { color: colors.yellow, fontSize: 12, fontFamily: fontFamily.bodyBold },
  actividadItem: { flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10 },
  actividadDivisor: { borderTopWidth: 1, borderTopColor: colors.borderSoft },
  actividadIcono: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  actividadTexto: { flex: 1, gap: 1 },
  actividadTextoPrincipal: { fontSize: 13 },
  hora: { fontSize: 11, color: colors.textSoft },
  widgetsRow: { gap: spacing.md, paddingHorizontal: 2 },
  widgetCard: { width: 150, gap: 4, padding: 12 },
  widgetAlerta: { borderColor: `${colors.red}55` },
  widgetTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  widgetIcono: { width: 28, height: 28, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  widgetValor: { fontSize: 18 },
  widgetLabel: { fontSize: 10, color: colors.textMuted },
  widgetTrend: { fontSize: 10, color: colors.textSoft },
  pie: { alignItems: "center", gap: 6, marginTop: spacing.md, paddingBottom: spacing.lg },
  pieVersion: { fontSize: 11, color: colors.textSoft },
  pieLinks: { fontSize: 10, color: colors.textSoft },
});
