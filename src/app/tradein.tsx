import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { ThemedText } from "@/components/themed-text";
import { tradein } from "@/data/mock";
import { colors, fontFamily, radius } from "@/constants/theme";

export default function TradeinScreen() {
  const router = useRouter();
  const [vista, setVista] = useState<"Cotizar" | "Gestión">("Cotizar");
  const t = tradein;

  const cambiarVista = (v: "Cotizar" | "Gestión") => {
    if (v === "Gestión") {
      router.push("/tradein-gestion");
      return;
    }
    setVista(v);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader titulo="Trade-in" label="Cotización de equipos" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Tabs Cotizar / Gestión */}
        <View style={styles.tabs}>
          {(["Cotizar", "Gestión"] as const).map((tab) => (
            <Pressable key={tab} style={[styles.tab, vista === tab && styles.tabActivo]} onPress={() => cambiarVista(tab)}>
              <Ionicons name={tab === "Cotizar" ? "swap-horizontal" : "archive"} size={15} color={vista === tab ? colors.ink : colors.textSoft} />
              <Text style={[styles.tabTexto, vista === tab && styles.tabTextoActivo]}>{tab}</Text>
              {tab === "Gestión" && <View style={styles.tabPunto} />}
            </Pressable>
          ))}
        </View>

        {/* Dispositivo en evaluación */}
        <GlassCard style={styles.gap}>
          <View style={styles.cardHeader}>
            <View style={styles.tituloRow}>
              <Ionicons name="build" size={13} color={colors.textSoft} />
              <ThemedText type="label">Dispositivo en Evaluación</ThemedText>
            </View>
            <ThemedText type="label" style={styles.folio}>
              ID: {t.dispositivo.folio}
            </ThemedText>
          </View>
          <View style={styles.dispoRow}>
            <View style={styles.dispoIcono}>
              <Ionicons name="phone-portrait" size={26} color={colors.text} />
              <View style={styles.dispoPunto} />
            </View>
            <View style={styles.dispoInfo}>
              <ThemedText type="subtitle" style={styles.dispoNombre}>
                {t.dispositivo.nombre}
              </ThemedText>
              <ThemedText type="body" style={styles.dispoImei}>
                IMEI: {t.dispositivo.imei}
              </ThemedText>
            </View>
          </View>
          <View style={styles.condicionesRow}>
            {t.dispositivo.condiciones.map((c) => (
              <View key={c.label} style={[styles.condicionChip, { borderColor: c.ok ? `${colors.green}55` : `${colors.yellow}55`, backgroundColor: c.ok ? `${colors.green}14` : `${colors.yellow}14` }]}>
                <View style={[styles.condicionPunto, { backgroundColor: c.ok ? colors.green : colors.yellow }]} />
                <Text style={[styles.condicionTexto, { color: c.ok ? colors.green : colors.yellow }]}>{c.label}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Valuación */}
        <View style={[styles.valuacion, styles.gap]}>
          <View style={styles.valuacionHeader}>
            <ThemedText type="label" style={styles.valuacionLabel}>
              Valuación Estimada
            </ThemedText>
            <View style={styles.vivoChip}>
              <View style={styles.vivoPunto} />
              <Ionicons name="flash" size={10} color={colors.yellow} />
              <Text style={styles.vivoTexto}>EN VIVO</Text>
            </View>
          </View>
          <ThemedText type="title" style={styles.valuacionPrecio}>
            {t.valuacion.min} – {t.valuacion.max}
            <ThemedText type="label" style={styles.valuacionMxn}>
              {" "}
              MXN
            </ThemedText>
          </ThemedText>
          <ThemedText type="body" style={styles.valuacionNota}>
            Rango según estado final tras revisión técnica presencial.
          </ThemedText>
          <View style={styles.statsRow}>
            <View style={styles.statCaja}>
              <ThemedText type="label" style={styles.statLabel}>
                Demanda
              </ThemedText>
              <ThemedText type="mono" style={[styles.statValor, { color: colors.green }]}>
                ↗ {t.valuacion.demanda}
              </ThemedText>
            </View>
            <View style={styles.statCaja}>
              <ThemedText type="label" style={styles.statLabel}>
                Margen
              </ThemedText>
              <ThemedText type="mono" style={styles.statValor}>
                {t.valuacion.margen}
              </ThemedText>
            </View>
            <View style={styles.statCaja}>
              <ThemedText type="label" style={styles.statLabel}>
                Reventa Est.
              </ThemedText>
              <ThemedText type="mono" style={styles.statValor}>
                {t.valuacion.reventa}
              </ThemedText>
            </View>
          </View>
        </View>

        <Pressable style={styles.aceptar}>
          <Text style={styles.aceptarTexto}>ACEPTAR COTIZACIÓN →</Text>
        </Pressable>

        <Pressable style={styles.nueva}>
          <Ionicons name="add-circle" size={18} color={colors.yellow} />
          <ThemedText type="body" style={styles.nuevaTexto}>
            Nueva cotización
          </ThemedText>
        </Pressable>

        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieVersion}>
            v2.4.0 — iTUACCESORIO Mobile System · Trade-in & Reventa
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 16, paddingBottom: 32, gap: 14 },
  tabs: {
    flexDirection: "row", backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.xl, padding: 5, gap: 6,
  },
  tab: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7,
    paddingVertical: 11, borderRadius: radius.lg,
  },
  tabActivo: { backgroundColor: colors.yellow },
  tabTexto: { color: colors.textMuted, fontFamily: fontFamily.bodyExtraBold, fontSize: 13 },
  tabTextoActivo: { color: colors.ink },
  tabPunto: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.yellow },
  gap: { gap: 14 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  tituloRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  folio: { fontSize: 9, color: colors.textSoft },
  dispoRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  dispoIcono: {
    width: 58, height: 58, borderRadius: 14, backgroundColor: colors.bgSoft,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  dispoPunto: { position: "absolute", bottom: 4, right: 4, width: 10, height: 10, borderRadius: 5, backgroundColor: colors.green, borderWidth: 2, borderColor: colors.bg },
  dispoInfo: { gap: 3 },
  dispoNombre: { fontFamily: fontFamily.bodyExtraBold },
  dispoImei: { fontSize: 11, color: colors.textSoft },
  condicionesRow: { flexDirection: "row", gap: 8 },
  condicionChip: {
    flex: 1, flexDirection: "row", alignItems: "center", gap: 5,
    borderWidth: 1, borderRadius: radius.md, paddingVertical: 7, paddingHorizontal: 8,
  },
  condicionPunto: { width: 6, height: 6, borderRadius: 3 },
  condicionTexto: { fontSize: 10, fontWeight: "700", flexShrink: 1 },
  valuacion: {
    backgroundColor: `${colors.yellow}0A`, borderWidth: 1, borderColor: `${colors.yellow}44`,
    borderRadius: radius.xl, padding: 16,
  },
  valuacionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  valuacionLabel: { fontSize: 10 },
  vivoChip: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: `${colors.yellow}1A`, borderWidth: 1, borderColor: `${colors.yellow}55`,
    borderRadius: 999, paddingVertical: 3, paddingHorizontal: 8,
  },
  vivoPunto: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.yellow },
  vivoTexto: { color: colors.yellow, fontSize: 8, fontWeight: "800" },
  valuacionPrecio: { color: colors.yellow, fontSize: 30 },
  valuacionMxn: { fontSize: 11, color: colors.textSoft },
  valuacionNota: { fontSize: 12 },
  statsRow: { flexDirection: "row", gap: 8 },
  statCaja: {
    flex: 1, backgroundColor: colors.bgSoft, borderWidth: 1, borderColor: colors.borderSoft,
    borderRadius: radius.md, padding: 10, gap: 2, alignItems: "center",
  },
  statLabel: { fontSize: 8 },
  statValor: { fontSize: 13, fontWeight: "800" },
  aceptar: {
    backgroundColor: colors.yellow, borderRadius: radius.lg, paddingVertical: 16,
    alignItems: "center", justifyContent: "center",
  },
  aceptarTexto: { color: colors.ink, fontFamily: fontFamily.bodyExtraBold, fontSize: 15 },
  procesoHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  procesoTituloRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  contadorChip: { backgroundColor: colors.surfaceStrong, borderRadius: 999, minWidth: 20, height: 20, alignItems: "center", justifyContent: "center", paddingHorizontal: 5 },
  contadorTexto: { color: colors.text, fontSize: 10, fontWeight: "800" },
  verTodos: { color: colors.yellow, fontSize: 12, fontFamily: fontFamily.bodyBold },
  equipoRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 14 },
  equipoAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  equipoInicial: { color: colors.ink, fontSize: 13, fontWeight: "800" },
  equipoInfo: { flex: 1, gap: 2 },
  equipoNombre: { fontSize: 13 },
  equipoCliente: { fontSize: 11, color: colors.textSoft },
  equipoDer: { alignItems: "flex-end", gap: 4 },
  equipoOferta: { color: colors.text, fontWeight: "800" },
  equipoMxn: { fontSize: 8, color: colors.textSoft },
  nueva: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    borderWidth: 1.5, borderColor: `${colors.yellow}66`, borderStyle: "dashed",
    borderRadius: radius.xl, paddingVertical: 14,
  },
  nuevaTexto: { color: colors.yellow, fontFamily: fontFamily.bodyBold, fontSize: 13 },
  pie: { alignItems: "center", paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
