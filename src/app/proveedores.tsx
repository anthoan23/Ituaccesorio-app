import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Fab } from "@/components/fab";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { proveedores } from "@/data/mock";
import { colors, fontFamily } from "@/constants/theme";

export default function ProveedoresScreen() {
  const [busqueda, setBusqueda] = useState("");

  const lista = useMemo(
    () =>
      proveedores.filter((p) =>
        `${p.nombre} ${p.rif} ${p.tipo} ${p.telefono}`.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    [busqueda],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader titulo="Proveedores" label="Red de distribución" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SearchField placeholder="Buscar proveedor o RIF..." value={busqueda} onChangeText={setBusqueda} />

        {lista.map((p) => (
          <Pressable key={p.id}>
            <GlassCard style={styles.row}>
              <View style={[styles.avatar, { backgroundColor: `${colors.blue}1A`, borderColor: `${colors.blue}44` }]}>
                <ThemedText type="mono" style={styles.avatarInicial}>
                  {p.nombre[0]}
                </ThemedText>
              </View>
              <View style={styles.info}>
                <View style={styles.nombreRow}>
                  <ThemedText type="mono" style={styles.nombre} numberOfLines={1}>
                    {p.nombre}
                  </ThemedText>
                  <View style={styles.tipoChip}>
                    <Text style={styles.tipoTexto}>{p.tipo}</Text>
                  </View>
                </View>
                <ThemedText type="body" style={styles.rif} numberOfLines={1}>
                  RIF: {p.rif}
                </ThemedText>
                <View style={styles.datoRow}>
                  <Ionicons name="call" size={10} color={colors.textSoft} />
                  <ThemedText type="body" style={styles.dato} numberOfLines={1}>
                    {p.telefono}
                  </ThemedText>
                  <Ionicons name="location" size={10} color={colors.textSoft} />
                  <ThemedText type="body" style={styles.dato} numberOfLines={1}>
                    {p.direccion}
                  </ThemedText>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textSoft} />
            </GlassCard>
          </Pressable>
        ))}

        <Pressable style={styles.agregar}>
          <Ionicons name="add" size={18} color={colors.yellow} />
          <ThemedText type="body" style={styles.agregarTexto}>
            Agregar proveedor
          </ThemedText>
        </Pressable>

        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieVersion}>
            v2.4.0 — iTUACCESORIO Mobile System
          </ThemedText>
        </View>
      </ScrollView>

      <Fab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 16, paddingBottom: 110, gap: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 14 },
  avatar: { width: 42, height: 42, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  avatarInicial: { fontWeight: "800", fontSize: 16, color: "#60A5FA" },
  info: { flex: 1, gap: 2 },
  nombreRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  nombre: { fontSize: 13, flexShrink: 1 },
  tipoChip: { backgroundColor: colors.surfaceStrong, borderRadius: 999, paddingVertical: 1, paddingHorizontal: 6 },
  tipoTexto: { color: colors.textMuted, fontSize: 8, fontWeight: "700" },
  rif: { fontSize: 10, color: colors.textSoft },
  datoRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  dato: { fontSize: 10, color: colors.textSoft, flexShrink: 1 },
  agregar: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.inputBorder,
    borderRadius: 18, paddingVertical: 14,
  },
  agregarTexto: { color: colors.yellow, fontFamily: fontFamily.bodyBold, fontSize: 14 },
  pie: { alignItems: "center", marginTop: 8, paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
