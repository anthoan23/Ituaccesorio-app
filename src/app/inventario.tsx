import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Fab } from "@/components/fab";
import { GlassCard } from "@/components/glass-card";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { inventario } from "@/data/mock";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";

const categorias = ["Todos", "Accesorios", "Repuestos", "Pantallas", "Carga", "Fundas"] as const;

const iconoCategoria: Record<string, keyof typeof Ionicons.glyphMap> = {
  Repuestos: "phone-portrait",
  Accesorios: "shield-checkmark",
  Carga: "swap-horizontal",
  Fundas: "albums",
};

function colorStock(stock: number) {
  if (stock <= 3) return { bg: `${colors.red}22`, text: "#F87171", borde: "#F87171" };
  if (stock <= 10) return { bg: `${colors.yellow}22`, text: colors.yellow, borde: colors.yellow };
  return { bg: `${colors.green}22`, text: colors.green, borde: colors.green };
}

export default function InventarioScreen() {
  const router = useRouter();
  const [categoria, setCategoria] = useState<(typeof categorias)[number]>("Todos");

  const lista = useMemo(
    () => (categoria === "Todos" ? inventario : inventario.filter((p) => p.categoria === categoria)),
    [categoria],
  );

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
              Inventario
            </ThemedText>
            <View style={styles.punto} />
          </View>
          <ThemedText type="label" style={styles.headerLabel}>
            Catálogo & Repuestos
          </ThemedText>
        </View>
        <View style={styles.scanBtn}>
          <Ionicons name="barcode" size={19} color={colors.yellow} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* KPIs */}
        <View style={styles.kpiRow}>
          <GlassCard style={styles.kpiCard}>
            <View style={styles.kpiTop}>
              <ThemedText type="label" style={styles.kpiLabel}>
                Productos
              </ThemedText>
              <View style={[styles.kpiIcono, { backgroundColor: `${colors.yellow}1A`, borderColor: `${colors.yellow}44` }]}>
                <Ionicons name="archive" size={14} color={colors.yellow} />
              </View>
            </View>
            <ThemedText type="title" style={styles.kpiValor}>
              342
            </ThemedText>
            <View style={styles.kpiTrend}>
              <Ionicons name="trending-up" size={11} color={colors.green} />
              <Text style={styles.kpiTrendTexto}>+18 este mes</Text>
            </View>
          </GlassCard>

          <GlassCard style={[styles.kpiCard, styles.kpiAlerta]}>
            <View style={styles.kpiTop}>
              <ThemedText type="label" style={[styles.kpiLabel, { color: "#F87171" }]}>
                ● Stock Bajo
              </ThemedText>
              <View style={[styles.kpiIcono, { backgroundColor: `${colors.red}1A`, borderColor: `${colors.red}44` }]}>
                <Ionicons name="warning" size={14} color={colors.red} />
              </View>
            </View>
            <ThemedText type="title" style={[styles.kpiValor, { color: colors.red }]}>
              7 <Text style={styles.kpiItems}>items</Text>
            </ThemedText>
            <View style={styles.revisarBtn}>
              <Text style={styles.revisarTexto}>Revisar lista →</Text>
            </View>
          </GlassCard>
        </View>

        {/* Búsqueda + filtros */}
        <SearchField placeholder="Buscar producto o código SKU..." />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtros}>
          {categorias.map((c) => {
            const activo = categoria === c;
            return (
              <Pressable key={c} onPress={() => setCategoria(c)} style={[styles.filtro, activo && styles.filtroActivo]}>
                <Text style={[styles.filtroTexto, activo && styles.filtroTextoActivo]}>{c}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Lista */}
        {lista.map((p) => {
          const cs = colorStock(p.stock);
          const icono = iconoCategoria[p.categoria] ?? "cube";
          return (
            <GlassCard key={p.id} style={styles.productoRow}>
              <View style={styles.productoIcono}>
                <Ionicons name={icono} size={18} color={colors.yellow} />
              </View>
              <View style={styles.productoInfo}>
                <ThemedText type="mono" style={styles.productoNombre} numberOfLines={1}>
                  {p.nombre}
                </ThemedText>
                <ThemedText type="body" style={styles.productoSku}>
                  SKU: {p.sku} · {p.categoria}
                </ThemedText>
              </View>
              <View style={styles.productoDer}>
                <ThemedText type="mono" style={styles.productoPrecio}>
                  {p.precio}
                </ThemedText>
                <View style={[styles.stockChip, { backgroundColor: cs.bg, borderColor: cs.borde }]}>
                  <Text style={[styles.stockTexto, { color: cs.text }]}>STOCK: {p.stock}</Text>
                </View>
              </View>
              <Ionicons name="ellipsis-vertical" size={15} color={colors.textSoft} />
            </GlassCard>
          );
        })}

        <View style={styles.pie}>
          <ThemedText type="label" style={styles.pieMarca}>
            iTUACCESORIO
          </ThemedText>
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
  scanBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 110, gap: spacing.md },
  kpiRow: { flexDirection: "row", gap: spacing.md },
  kpiCard: { flex: 1, gap: 6, padding: 14 },
  kpiAlerta: { borderColor: `${colors.red}55` },
  kpiTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  kpiLabel: { fontSize: 9 },
  kpiIcono: { width: 28, height: 28, borderRadius: 9, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  kpiValor: { fontSize: 30 },
  kpiItems: { fontSize: 14, color: colors.textSoft, fontWeight: "500" },
  kpiTrend: {
    flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start",
    backgroundColor: `${colors.green}1A`, borderWidth: 1, borderColor: `${colors.green}44`,
    borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 8,
  },
  kpiTrendTexto: { color: colors.green, fontSize: 10, fontWeight: "700" },
  revisarBtn: {
    alignSelf: "flex-start", backgroundColor: `${colors.red}22`, borderWidth: 1, borderColor: `${colors.red}55`,
    borderRadius: radius.pill, paddingVertical: 5, paddingHorizontal: 10,
  },
  revisarTexto: { color: "#F87171", fontSize: 11, fontWeight: "700" },
  filtros: { gap: spacing.sm },
  filtro: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.pill, paddingVertical: 7, paddingHorizontal: 14,
  },
  filtroActivo: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  filtroTexto: { color: colors.textMuted, fontFamily: fontFamily.bodyBold, fontSize: 12 },
  filtroTextoActivo: { color: colors.ink },
  productoRow: { flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, paddingHorizontal: 14 },
  productoIcono: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: colors.bgSoft,
    borderWidth: 1, borderColor: colors.borderSoft, alignItems: "center", justifyContent: "center",
  },
  productoInfo: { flex: 1, gap: 2 },
  productoNombre: { fontSize: 13 },
  productoSku: { fontSize: 11, color: colors.textSoft },
  productoDer: { alignItems: "flex-end", gap: 4 },
  productoPrecio: { color: colors.yellow, fontWeight: "800" },
  stockChip: { borderWidth: 1, borderRadius: radius.pill, paddingVertical: 2, paddingHorizontal: 8 },
  stockTexto: { fontSize: 9, fontWeight: "800" },
  pie: { alignItems: "center", gap: 4, marginTop: spacing.lg, paddingBottom: spacing.lg },
  pieMarca: { color: colors.text, letterSpacing: 2 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
  pieLinks: { fontSize: 11, color: colors.textSoft },
});
