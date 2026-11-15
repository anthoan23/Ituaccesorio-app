import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { FilterChips } from "@/components/filter-chips";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { bitacora } from "@/data/mock";
import { colors } from "@/constants/theme";

const filtros = ["Todos", "Acceso", "Cambios", "Sistema"] as const;

export default function BitacoraScreen() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");

  const eventos = useMemo(
    () => (filtro === "Todos" ? bitacora : bitacora.filter((e) => e.tipo === filtro)),
    [filtro],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Bitácora"
        label="Registro de auditoría"
        right={
          <View style={styles.filtroBtn}>
            <Ionicons name="options" size={17} color={colors.textMuted} />
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SearchField placeholder="Buscar por usuario o acción..." />
        <FilterChips opciones={filtros} valor={filtro} onChange={setFiltro} />

        {/* Timeline */}
        <View style={styles.timeline}>
          {eventos.map((e, i) => (
            <View key={e.id} style={styles.timelineItem}>
              {/* columna izquierda: línea + punto */}
              <View style={styles.lineaCol}>
                <View style={styles.lineaTop} />
                <View style={[styles.punto, { backgroundColor: e.color, borderColor: `${e.color}55` }]} />
                <View style={[styles.lineaBottom, i === eventos.length - 1 && styles.lineaOculta]} />
              </View>

              {/* evento */}
              <GlassCard style={styles.eventoCard}>
                <View style={styles.eventoTop}>
                  <View style={[styles.eventoIcono, { backgroundColor: `${e.color}1A` }]}>
                    <Ionicons name={e.icono as never} size={14} color={e.color} />
                  </View>
                  <View style={[styles.tipoChip, { backgroundColor: `${e.color}1A`, borderColor: `${e.color}44` }]}>
                    <Text style={[styles.tipoTexto, { color: e.color }]}>{e.tipo.toUpperCase()}</Text>
                  </View>
                </View>
                <ThemedText type="mono" style={styles.eventoAccion}>
                  {e.accion}
                </ThemedText>
                <View style={styles.eventoPie}>
                  <View style={styles.usuarioMini}>
                    <View style={[styles.usuarioAvatar, { backgroundColor: colors.yellow }]}>
                      <Text style={styles.usuarioInicial}>{e.usuario[0]}</Text>
                    </View>
                    <ThemedText type="body" style={styles.usuarioNombre}>
                      {e.usuario}
                    </ThemedText>
                  </View>
                  <ThemedText type="body" style={styles.eventoHora}>
                    {e.hora}
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
    backgroundColor: colors.bg, marginVertical: 2,
  },
  eventoCard: { flex: 1, marginBottom: 12, gap: 8, padding: 13 },
  eventoTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  eventoIcono: { width: 30, height: 30, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  tipoChip: { borderWidth: 1, borderRadius: 999, paddingVertical: 2, paddingHorizontal: 7 },
  tipoTexto: { fontSize: 8, fontWeight: "800" },
  eventoAccion: { fontSize: 13 },
  eventoPie: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  usuarioMini: { flexDirection: "row", alignItems: "center", gap: 6 },
  usuarioAvatar: { width: 18, height: 18, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  usuarioInicial: { color: colors.ink, fontSize: 9, fontWeight: "800" },
  usuarioNombre: { fontSize: 11 },
  eventoHora: { fontSize: 10, color: colors.textSoft },
  pie: { alignItems: "center", paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
