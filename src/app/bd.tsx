import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { ThemedText } from "@/components/themed-text";
import { backups } from "@/data/mock";
import { colors, fontFamily, radius } from "@/constants/theme";

const stats = [
  { label: "Total Registros", valor: backups.stats.registros, icono: "server" as const, color: colors.yellow },
  { label: "Esquemas", valor: backups.stats.esquemas, icono: "git-network" as const, color: colors.blue },
  { label: "Tablas", valor: backups.stats.tablas, icono: "grid" as const, color: colors.green },
];

export default function BDMantenimientoScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Mantenimiento de BD"
        label="Respaldos e indexación"
        right={
          <View style={styles.okChip}>
            <View style={styles.okPunto} />
            <ThemedText type="label" style={styles.okTexto}>
              Servidor OK
            </ThemedText>
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Respaldos */}
        <GlassCard style={styles.gap}>
          <View style={styles.ultimaRow}>
            <View style={[styles.ultimaIcono, { backgroundColor: `${colors.green}1A`, borderColor: `${colors.green}44` }]}>
              <Ionicons name="cloud" size={16} color={colors.green} />
            </View>
            <View style={styles.ultimaInfo}>
              <ThemedText type="label" style={styles.ultimaLabel}>
                Última Copia
              </ThemedText>
              <ThemedText type="mono" style={styles.ultimaValor}>
                {backups.ultima.fecha} · {backups.ultima.hace}
              </ThemedText>
            </View>
            <ThemedText type="body" style={styles.ultimaTamano}>
              {backups.ultima.tamaño}
            </ThemedText>
          </View>
          <Pressable style={styles.crearBtn}>
            <Ionicons name="shield-checkmark" size={16} color={colors.ink} />
            <Text style={styles.crearTexto}>CREAR RESPALDO AHORA</Text>
          </Pressable>
          <ThemedText type="body" style={styles.nota}>
            Los respaldos se guardan cifrados en el servidor.
          </ThemedText>
        </GlassCard>

        {/* Lista de respaldos */}
        {backups.lista.map((b) => (
          <GlassCard key={b.nombre} style={styles.backupRow}>
            <View style={[styles.backupIcono, { backgroundColor: `${colors.blue}1A` }]}>
              <Ionicons name="file-tray-full" size={15} color={colors.blue} />
            </View>
            <View style={styles.backupInfo}>
              <ThemedText type="mono" style={styles.backupNombre} numberOfLines={1}>
                {b.nombre}
              </ThemedText>
              <ThemedText type="body" style={styles.backupMeta}>
                {b.fecha} · {b.tamaño}
              </ThemedText>
            </View>
            <View style={[styles.accionCircular, { borderColor: `${colors.blue}55`, backgroundColor: `${colors.blue}1A` }]}>
              <Ionicons name="cloud-download" size={13} color={colors.blue} />
            </View>
            <View style={[styles.accionCircular, { borderColor: `${colors.orange}55`, backgroundColor: `${colors.orange}1A` }]}>
              <Ionicons name="refresh" size={13} color="#F59E0B" />
            </View>
          </GlassCard>
        ))}

        {/* Estadísticas */}
        <GlassCard style={styles.gap}>
          <ThemedText type="label">Estadísticas</ThemedText>
          <View style={styles.statsGrid}>
            {stats.map((s) => (
              <View key={s.label} style={styles.statCaja}>
                <View style={[styles.statIcono, { backgroundColor: `${s.color}1A` }]}>
                  <Ionicons name={s.icono} size={14} color={s.color} />
                </View>
                <ThemedText type="label" style={styles.statLabel}>
                  {s.label}
                </ThemedText>
                <ThemedText type="title" style={styles.statValor}>
                  {s.valor}
                </ThemedText>
              </View>
            ))}
            <View style={styles.statCaja}>
              <View style={[styles.statIcono, { backgroundColor: `${colors.green}1A` }]}>
                <Ionicons name="checkmark-circle" size={14} color={colors.green} />
              </View>
              <ThemedText type="label" style={styles.statLabel}>
                Integridad
              </ThemedText>
              <ThemedText type="title" style={[styles.statValor, { color: colors.green }]}>
                OK
              </ThemedText>
            </View>
          </View>
        </GlassCard>

        {/* Zona de peligro */}
        <View style={styles.peligro}>
          <ThemedText type="label" style={styles.peligroLabel}>
            Zona de Peligro
          </ThemedText>
          <ThemedText type="body" style={styles.peligroTexto}>
            Reinicializar base de datos borra todos los registros de forma permanente.
          </ThemedText>
          <Pressable style={styles.peligroBtn}>
            <Ionicons name="trash" size={15} color={colors.red} />
            <Text style={styles.peligroBtnTexto}>REINICIALIZAR BD</Text>
          </Pressable>
        </View>

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
  okChip: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: `${colors.green}14`, borderWidth: 1, borderColor: `${colors.green}44`,
    borderRadius: 999, paddingVertical: 5, paddingHorizontal: 10,
  },
  okPunto: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.green },
  okTexto: { fontSize: 9, color: colors.green },
  scroll: { paddingHorizontal: 16, paddingBottom: 32, gap: 12 },
  gap: { gap: 14 },
  ultimaRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  ultimaIcono: { width: 38, height: 38, borderRadius: 11, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  ultimaInfo: { flex: 1, gap: 2 },
  ultimaLabel: { fontSize: 9 },
  ultimaValor: { fontSize: 12, fontWeight: "700" },
  ultimaTamano: { fontSize: 11, color: colors.textSoft },
  crearBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    backgroundColor: colors.yellow, borderRadius: radius.md, paddingVertical: 14,
  },
  crearTexto: { color: colors.ink, fontFamily: fontFamily.bodyExtraBold, fontSize: 13 },
  nota: { fontSize: 11, color: colors.textSoft, textAlign: "center" },
  backupRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 11, paddingHorizontal: 14 },
  backupIcono: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  backupInfo: { flex: 1, gap: 1 },
  backupNombre: { fontSize: 12 },
  backupMeta: { fontSize: 10, color: colors.textSoft },
  accionCircular: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  statCaja: {
    width: "48.5%", flexGrow: 1, backgroundColor: colors.bgSoft, borderWidth: 1, borderColor: colors.borderSoft,
    borderRadius: radius.md, padding: 12, gap: 3, alignItems: "flex-start",
  },
  statIcono: { width: 26, height: 26, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  statLabel: { fontSize: 9 },
  statValor: { fontSize: 18 },
  peligro: {
    backgroundColor: `${colors.red}0A`, borderWidth: 1, borderColor: `${colors.red}44`,
    borderRadius: radius.xl, padding: 16, gap: 8,
  },
  peligroLabel: { color: colors.red, fontSize: 10 },
  peligroTexto: { fontSize: 12, color: colors.textMuted },
  peligroBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    backgroundColor: `${colors.red}1A`, borderWidth: 1, borderColor: `${colors.red}55`,
    borderRadius: radius.md, paddingVertical: 12,
  },
  peligroBtnTexto: { color: colors.red, fontFamily: fontFamily.bodyExtraBold, fontSize: 12 },
  pie: { alignItems: "center", paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
