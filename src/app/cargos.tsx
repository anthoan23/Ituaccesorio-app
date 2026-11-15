import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { ThemedText } from "@/components/themed-text";
import { cargos } from "@/data/mock";
import { colors, fontFamily } from "@/constants/theme";

export default function CargosScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Cargos"
        label="Catálogo de cargos"
        right={
          <View style={styles.contadorChip}>
            <ThemedText type="body" style={styles.contadorTexto}>
              {cargos.length} cargos
            </ThemedText>
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {cargos.map((c) => (
          <GlassCard key={c.id} style={styles.row}>
            <View style={[styles.icono, { backgroundColor: `${c.color}1A`, borderColor: `${c.color}44` }]}>
              <Ionicons name={c.icono as never} size={17} color={c.color} />
            </View>
            <View style={styles.info}>
              <ThemedText type="mono" style={styles.nombre}>
                {c.nombre}
              </ThemedText>
              <ThemedText type="body" style={styles.descripcion}>
                {c.descripcion}
              </ThemedText>
            </View>
            <View style={styles.der}>
              <View style={styles.activosChip}>
                <Text style={styles.activosTexto}>
                  {c.activos} {c.activos === 1 ? "activo" : "activos"}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textSoft} />
            </View>
          </GlassCard>
        ))}

        <View style={styles.registrar}>
          <Ionicons name="add" size={17} color={colors.yellow} />
          <Text style={styles.registrarTexto}>Registrar nuevo cargo</Text>
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
  contadorChip: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: 999, paddingVertical: 5, paddingHorizontal: 12,
  },
  contadorTexto: { fontSize: 12 },
  scroll: { paddingHorizontal: 16, paddingBottom: 32, gap: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 14 },
  icono: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  info: { flex: 1, gap: 2 },
  nombre: { fontSize: 13 },
  descripcion: { fontSize: 11, color: colors.textSoft },
  der: { alignItems: "flex-end", gap: 4 },
  activosChip: {
    backgroundColor: colors.surfaceStrong, borderRadius: 999, paddingVertical: 3, paddingHorizontal: 9,
  },
  activosTexto: { color: colors.textMuted, fontSize: 10, fontWeight: "700" },
  registrar: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.inputBorder,
    borderRadius: 18, paddingVertical: 14,
  },
  registrarTexto: { color: colors.yellow, fontFamily: fontFamily.bodyBold, fontSize: 13 },
  pie: { alignItems: "center", paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
