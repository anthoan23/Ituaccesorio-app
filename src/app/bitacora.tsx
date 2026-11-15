import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { bitacora } from "@/data/mock";
import { colors } from "@/constants/theme";

export default function BitacoraScreen() {
  const [busqueda, setBusqueda] = useState("");

  const eventos = useMemo(
    () =>
      bitacora.filter((e) =>
        `${e.usuario} ${e.accion} ${e.modulo} ${e.descripcion}`.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    [busqueda],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Bitácora"
        label="Registro de auditoría"
        right={
          <View style={styles.filtroBtn}>
            <Ionicons name="calendar" size={16} color={colors.textMuted} />
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SearchField placeholder="Buscar por usuario, acción o módulo..." value={busqueda} onChangeText={setBusqueda} />

        {/* Timeline (web: ID · Usuario · Acción · Módulo · Descripción · Fecha/Hora) */}
        <View style={styles.timeline}>
          {eventos.map((e, i) => (
            <View key={e.id} style={styles.timelineItem}>
              <View style={styles.lineaCol}>
                <View style={styles.lineaTop} />
                <View style={styles.punto} />
                <View style={[styles.lineaBottom, i === eventos.length - 1 && styles.lineaOculta]} />
              </View>

              <GlassCard style={styles.eventoCard}>
                <View style={styles.eventoTop}>
                  <ThemedText type="label" style={styles.eventoModulo}>
                    {e.modulo}
                  </ThemedText>
                  <ThemedText type="body" style={styles.eventoId}>
                    #{e.id.padStart(4, "0")}
                  </ThemedText>
                </View>
                <ThemedText type="mono" style={styles.eventoAccion}>
                  {e.accion}
                </ThemedText>
                <ThemedText type="body" style={styles.eventoDesc}>
                  {e.descripcion}
                </ThemedText>
                <View style={styles.eventoPie}>
                  <View style={styles.usuarioMini}>
                    <View style={styles.usuarioAvatar}>
                      <Text style={styles.usuarioInicial}>{e.usuario[0].toUpperCase()}</Text>
                    </View>
                    <ThemedText type="body" style={styles.usuarioNombre}>
                      {e.usuario}
                    </ThemedText>
                  </View>
                  <ThemedText type="body" style={styles.eventoFecha}>
                    {e.fecha}
                  </ThemedText>
                </View>
              </GlassCard>
            </View>
          ))}
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
  filtroBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  scroll: { paddingHorizontal: 16, paddingBottom: 32, gap: 14 },
  timeline: { gap: 0 },
  timelineItem: { flexDirection: "row", gap: 10 },
  lineaCol: { width: 14, alignItems: "center" },
  lineaTop: { width: 1.5, flex: 1, backgroundColor: colors.borderSoft },
  lineaBottom: { width: 1.5, flex: 1, backgroundColor: colors.borderSoft },
  lineaOculta: { opacity: 0 },
  punto: {
    width: 12, height: 12, borderRadius: 6, borderWidth: 3,
    backgroundColor: colors.bg, borderColor: colors.yellow, marginVertical: 2,
  },
  eventoCard: { flex: 1, marginBottom: 12, gap: 6, padding: 13 },
  eventoTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  eventoModulo: { color: colors.yellow, fontSize: 9 },
  eventoId: { fontSize: 10, color: colors.textSoft },
  eventoAccion: { fontSize: 13 },
  eventoDesc: { fontSize: 11, color: colors.textSoft },
  eventoPie: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  usuarioMini: { flexDirection: "row", alignItems: "center", gap: 6 },
  usuarioAvatar: {
    width: 18, height: 18, borderRadius: 9, backgroundColor: colors.yellow,
    alignItems: "center", justifyContent: "center",
  },
  usuarioInicial: { color: colors.ink, fontSize: 9, fontWeight: "800" },
  usuarioNombre: { fontSize: 11 },
  eventoFecha: { fontSize: 10, color: colors.textSoft },
  pie: { alignItems: "center", paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
