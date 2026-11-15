import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { especialidades } from "@/data/mock";
import { colors, fontFamily } from "@/constants/theme";

export default function EspecialidadesScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Especialidades"
        label="Catálogo de especialidades"
        right={
          <View style={styles.contadorChip}>
            <Text style={styles.contadorTexto}>{especialidades.length} especialidades</Text>
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SearchField placeholder="Buscar especialidad..." />

        {especialidades.map((e) => (
          <GlassCard key={e.id} style={styles.row}>
            <View style={[styles.icono, { backgroundColor: `${e.color}1A`, borderColor: `${e.color}44` }]}>
              <Ionicons name={e.icono as never} size={17} color={e.color} />
            </View>
            <View style={styles.info}>
              <ThemedText type="mono" style={styles.nombre}>
                {e.nombre}
              </ThemedText>
              <ThemedText type="body" style={styles.descripcion}>
                {e.descripcion}
              </ThemedText>
            </View>
            <View style={styles.der}>
              <Ionicons name="chevron-forward" size={16} color={colors.textSoft} />
            </View>
          </GlassCard>
        ))}

        <View style={styles.registrar}>
          <Ionicons name="add" size={17} color={colors.yellow} />
          <Text style={styles.registrarTexto}>Registrar nueva especialidad</Text>
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
  scroll: { paddingHorizontal: 16, paddingBottom: 32, gap: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 14 },
  icono: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  info: { flex: 1, gap: 2 },
  nombre: { fontSize: 13 },
  descripcion: { fontSize: 11, color: colors.textSoft },
  der: { alignItems: "flex-end", gap: 4 },
  tecnicosChip: {
    backgroundColor: `${colors.blue}1A`, borderWidth: 1, borderColor: `${colors.blue}44`,
    borderRadius: 999, paddingVertical: 3, paddingHorizontal: 9,
  },
  tecnicosTexto: { color: "#60A5FA", fontSize: 10, fontWeight: "700" },
  contadorChip: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: 999, paddingVertical: 5, paddingHorizontal: 10,
  },
  contadorTexto: { color: colors.textMuted, fontSize: 11, fontWeight: "600" },
  registrar: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.inputBorder,
    borderRadius: 18, paddingVertical: 14,
  },
  registrarTexto: { color: colors.yellow, fontFamily: fontFamily.bodyBold, fontSize: 13 },
  pie: { alignItems: "center", paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
