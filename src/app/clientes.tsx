import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Avatar } from "@/components/avatar";
import { Fab } from "@/components/fab";
import { GlassCard } from "@/components/glass-card";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { clientes } from "@/data/mock";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";

const filtros = ["Todos", "Con órdenes", "VIP"] as const;

export default function ClientesScreen() {
  const router = useRouter();
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");

  const lista = useMemo(() => {
    if (filtro === "VIP") return clientes.filter((c) => c.vip);
    if (filtro === "Con órdenes") return clientes.filter((c) => c.ordenes > 0);
    return clientes;
  }, [filtro]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <View style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={colors.text} />
          </View>
        </Pressable>
        <View style={styles.headerTitulo}>
          <View style={styles.tituloRow}>
            <ThemedText type="title" style={styles.titulo}>
              Clientes
            </ThemedText>
            <View style={styles.punto} />
          </View>
          <ThemedText type="label" style={styles.headerLabel}>
            Directorio y Contactos
          </ThemedText>
        </View>
        <View style={styles.agregarBtn}>
          <Ionicons name="person-add" size={18} color={colors.yellow} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SearchField placeholder="Buscar cliente, teléfono o email..." />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtros}>
          {filtros.map((f) => {
            const activo = filtro === f;
            return (
              <Pressable key={f} onPress={() => setFiltro(f)} style={[styles.filtro, activo && styles.filtroActivo]}>
                <Text style={[styles.filtroTexto, activo && styles.filtroTextoActivo]}>{f}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <ThemedText type="label" style={styles.contador}>
          {lista.length} clientes registrados
        </ThemedText>

        {lista.map((c) => (
          <Pressable key={c.id}>
            <GlassCard style={styles.clienteRow}>
              <Avatar inicial={c.nombre[0]} size={44} />
              <View style={styles.clienteInfo}>
                <View style={styles.nombreRow}>
                  <ThemedText type="mono" style={styles.clienteNombre} numberOfLines={1}>
                    {c.nombre}
                  </ThemedText>
                  {c.vip && (
                    <View style={styles.vipChip}>
                      <Text style={styles.vipTexto}>VIP</Text>
                    </View>
                  )}
                </View>
                <View style={styles.telRow}>
                  <Ionicons name="call" size={11} color={colors.textSoft} />
                  <ThemedText type="body" style={styles.clienteTel}>
                    {c.telefono}
                  </ThemedText>
                </View>
              </View>
              <View style={[styles.ordenesChip, c.ordenes > 0 ? styles.ordenesChipAzul : styles.ordenesChipGris]}>
                <Text style={[styles.ordenesTexto, c.ordenes > 0 ? { color: "#60A5FA" } : { color: colors.gray }]}>
                  {c.ordenes} {c.ordenes === 1 ? "orden" : "órdenes"}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textSoft} />
            </GlassCard>
          </Pressable>
        ))}

        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieVersion}>
            v2.4.0 — iTUACCESORIO Mobile System
          </ThemedText>
          <ThemedText type="body" style={styles.pieLinks}>
            Soporte · Términos
          </ThemedText>
        </View>
      </ScrollView>

      <Fab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row", alignItems: "center", gap: spacing.md,
    paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  headerTitulo: { flex: 1, gap: 2 },
  tituloRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  titulo: { fontSize: 24 },
  punto: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.yellow },
  headerLabel: { fontSize: 10 },
  agregarBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 110, gap: spacing.md },
  filtros: { gap: spacing.sm },
  filtro: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.pill, paddingVertical: 7, paddingHorizontal: 14,
  },
  filtroActivo: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  filtroTexto: { color: colors.textMuted, fontFamily: fontFamily.bodyBold, fontSize: 12 },
  filtroTextoActivo: { color: colors.ink },
  contador: { fontSize: 10 },
  clienteRow: { flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10, paddingHorizontal: 14 },
  clienteInfo: { flex: 1, gap: 2 },
  nombreRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  clienteNombre: { fontSize: 14 },
  vipChip: {
    backgroundColor: `${colors.yellow}1A`, borderWidth: 1, borderColor: `${colors.yellow}55`,
    borderRadius: radius.pill, paddingVertical: 1, paddingHorizontal: 6,
  },
  vipTexto: { color: colors.yellow, fontSize: 8, fontWeight: "800" },
  telRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  clienteTel: { fontSize: 11, color: colors.textSoft },
  ordenesChip: {
    borderRadius: radius.pill, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 9,
  },
  ordenesChipAzul: { backgroundColor: `${colors.blue}22`, borderColor: `${colors.blue}55` },
  ordenesChipGris: { backgroundColor: "rgba(108,117,125,0.2)", borderColor: "rgba(108,117,125,0.4)" },
  ordenesTexto: { fontSize: 10, fontWeight: "700" },
  pie: { alignItems: "center", gap: 4, marginTop: spacing.lg, paddingBottom: spacing.lg },
  pieVersion: { fontSize: 11, color: colors.textSoft },
  pieLinks: { fontSize: 11, color: colors.textSoft },
});
