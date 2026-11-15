import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Fab } from "@/components/fab";
import { FilterChips } from "@/components/filter-chips";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { proveedores } from "@/data/mock";
import { colors, fontFamily } from "@/constants/theme";

const filtros = ["Todos", "Accesorios", "Refacciones", "Mayoreo"] as const;

export default function ProveedoresScreen() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");

  const lista = useMemo(
    () => (filtro === "Todos" ? proveedores : proveedores.filter((p) => p.categoria === filtro)),
    [filtro],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Proveedores"
        label="Red de distribución"
        right={
          <View style={styles.activosChip}>
            <ThemedText type="body" style={styles.activosTexto}>
              8 activos
            </ThemedText>
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SearchField placeholder="Buscar proveedor o RFC..." />
        <FilterChips opciones={filtros} valor={filtro} onChange={setFiltro} />

        {lista.map((p) => (
          <Pressable key={p.id}>
            <GlassCard style={styles.row}>
              <View style={[styles.avatar, { backgroundColor: `${p.color}1A`, borderColor: `${p.color}44` }]}>
                <ThemedText type="mono" style={[styles.avatarInicial, { color: p.color }]}>
                  {p.inicial}
                </ThemedText>
              </View>
              <View style={styles.info}>
                <View style={styles.nombreRow}>
                  <ThemedText type="mono" style={styles.nombre} numberOfLines={1}>
                    {p.nombre}
                  </ThemedText>
                  {p.preferido && (
                    <View style={styles.preferidoChip}>
                      <Text style={styles.preferidoTexto}>PREFERIDO</Text>
                    </View>
                  )}
                </View>
                <ThemedText type="body" style={styles.contacto} numberOfLines={1}>
                  {p.contacto} · {p.telefono}
                </ThemedText>
              </View>
              <View style={styles.der}>
                <View style={styles.productosChip}>
                  <Text style={styles.productosTexto}>{p.productos} productos</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.textSoft} />
              </View>
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
  activosChip: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: 999, paddingVertical: 5, paddingHorizontal: 12,
  },
  activosTexto: { fontSize: 12 },
  scroll: { paddingHorizontal: 16, paddingBottom: 110, gap: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 14 },
  avatar: { width: 42, height: 42, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  avatarInicial: { fontWeight: "800", fontSize: 16 },
  info: { flex: 1, gap: 2 },
  nombreRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  nombre: { fontSize: 13, flexShrink: 1 },
  preferidoChip: { backgroundColor: colors.yellow, borderRadius: 999, paddingVertical: 1, paddingHorizontal: 6 },
  preferidoTexto: { color: colors.ink, fontSize: 8, fontWeight: "800" },
  contacto: { fontSize: 11, color: colors.textSoft },
  der: { alignItems: "flex-end", gap: 4 },
  productosChip: { backgroundColor: colors.surfaceStrong, borderRadius: 999, paddingVertical: 3, paddingHorizontal: 9 },
  productosTexto: { color: colors.textMuted, fontSize: 10, fontWeight: "700" },
  agregar: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.inputBorder,
    borderRadius: 18, paddingVertical: 14,
  },
  agregarTexto: { color: colors.yellow, fontFamily: fontFamily.bodyBold, fontSize: 14 },
  pie: { alignItems: "center", marginTop: 8, paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
