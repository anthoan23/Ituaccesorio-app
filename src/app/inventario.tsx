import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Fab } from "@/components/fab";
import { GlassCard } from "@/components/glass-card";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { inventario, inventarioKpis } from "@/data/mock";
import { colors, radius, spacing } from "@/constants/theme";

const iconoClase: Record<string, keyof typeof Ionicons.glyphMap> = {
  Pantallas: "phone-portrait",
  Accesorios: "shield-checkmark",
  Carga: "swap-horizontal",
  Repuestos: "construct",
};

function colorExistencia(stock: number) {
  if (stock <= 3) return { bg: `${colors.red}22`, text: "#F87171", borde: "#F87171" };
  if (stock <= 10) return { bg: `${colors.yellow}22`, text: colors.yellow, borde: colors.yellow };
  return { bg: `${colors.green}22`, text: colors.green, borde: colors.green };
}

export default function InventarioScreen() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  const lista = useMemo(
    () =>
      inventario.filter(
        (p) =>
          p.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
          p.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
          p.clase.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    [busqueda],
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
            Existencias por producto
          </ThemedText>
        </View>
        <View style={styles.scanBtn}>
          <Ionicons name="barcode" size={19} color={colors.yellow} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* KPIs de la web: Clases · Marcas · Productos · Piezas en stock */}
        <View style={styles.kpiGrid}>
          <GlassCard style={styles.kpiCard}>
            <ThemedText type="title" style={[styles.kpiValor, { color: colors.yellow }]}>
              {inventarioKpis.clases}
            </ThemedText>
            <ThemedText type="label" style={styles.kpiLabel}>
              Clases
            </ThemedText>
          </GlassCard>
          <GlassCard style={styles.kpiCard}>
            <ThemedText type="title" style={[styles.kpiValor, { color: colors.blue }]}>
              {inventarioKpis.marcas}
            </ThemedText>
            <ThemedText type="label" style={styles.kpiLabel}>
              Marcas
            </ThemedText>
          </GlassCard>
          <GlassCard style={styles.kpiCard}>
            <ThemedText type="title" style={[styles.kpiValor, { color: colors.green }]}>
              {inventarioKpis.productos}
            </ThemedText>
            <ThemedText type="label" style={styles.kpiLabel}>
              Productos
            </ThemedText>
          </GlassCard>
          <GlassCard style={styles.kpiCard}>
            <ThemedText type="title" style={[styles.kpiValor, { color: colors.cyan }]}>
              1,240
            </ThemedText>
            <ThemedText type="label" style={styles.kpiLabel}>
              Piezas en stock
            </ThemedText>
          </GlassCard>
        </View>

        <SearchField placeholder="Buscar producto, clase o marca..." value={busqueda} onChangeText={setBusqueda} />

        {/* Lista */}
        {lista.map((p) => {
          const cs = colorExistencia(p.existencia);
          const icono = iconoClase[p.clase] ?? "cube";
          return (
            <GlassCard key={p.id} style={styles.productoRow}>
              <View style={styles.productoIcono}>
                <Ionicons name={icono} size={18} color={colors.yellow} />
              </View>
              <View style={styles.productoInfo}>
                <ThemedText type="mono" style={styles.productoNombre} numberOfLines={1}>
                  {p.producto}
                </ThemedText>
                <ThemedText type="body" style={styles.productoMeta} numberOfLines={1}>
                  {p.clase} · {p.marca}
                </ThemedText>
                <ThemedText type="body" style={styles.productoEstado}>
                  Estado: {p.estado}
                </ThemedText>
              </View>
              <View style={styles.productoDer}>
                <ThemedText type="mono" style={styles.productoPrecio}>
                  {p.costoVenta}
                </ThemedText>
                <View style={[styles.stockChip, { backgroundColor: cs.bg, borderColor: cs.borde }]}>
                  <Text style={[styles.stockTexto, { color: cs.text }]}>EXISTENCIA: {p.existencia}</Text>
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
  kpiGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: 2 },
  kpiCard: { width: "48.7%", flexGrow: 1, alignItems: "center", gap: 3, paddingVertical: 14, paddingHorizontal: 10 },
  kpiValor: { fontSize: 26 },
  kpiLabel: { fontSize: 9, textAlign: "center" },
  productoRow: { flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, paddingHorizontal: 14 },
  productoIcono: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: colors.bgSoft,
    borderWidth: 1, borderColor: colors.borderSoft, alignItems: "center", justifyContent: "center",
  },
  productoInfo: { flex: 1, gap: 2 },
  productoNombre: { fontSize: 13 },
  productoMeta: { fontSize: 11, color: colors.textSoft },
  productoEstado: { fontSize: 10, color: colors.textSoft },
  productoDer: { alignItems: "flex-end", gap: 4 },
  productoPrecio: { color: colors.yellow, fontWeight: "800" },
  stockChip: { borderWidth: 1, borderRadius: radius.pill, paddingVertical: 2, paddingHorizontal: 8 },
  stockTexto: { fontSize: 9, fontWeight: "800" },
  pie: { alignItems: "center", gap: 4, marginTop: spacing.lg, paddingBottom: spacing.lg },
  pieMarca: { color: colors.text, letterSpacing: 2 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
  pieLinks: { fontSize: 11, color: colors.textSoft },
});
