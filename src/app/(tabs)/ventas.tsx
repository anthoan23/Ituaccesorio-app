import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { GlassCard } from "@/components/glass-card";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { catalogo, ProductoCatalogo } from "@/data/mock";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";

const categorias = ["Todos", "Fundas", "Micas", "Cables", "Cargadores"] as const;

const iconos: Record<ProductoCatalogo["icono"], keyof typeof Ionicons.glyphMap> = {
  phone: "phone-portrait",
  shield: "shield-checkmark",
  cable: "link",
  flash: "flash",
  circle: "ellipse",
  headset: "headset",
};

const CARRO_INICIAL = { cantidad: 3, total: 1240 };

export default function VentasScreen() {
  const router = useRouter();
  const [categoria, setCategoria] = useState<(typeof categorias)[number]>("Todos");
  const [carro, setCarro] = useState(CARRO_INICIAL);

  const lista = useMemo(
    () => (categoria === "Todos" ? catalogo : catalogo.filter((p) => p.categoria === categoria)),
    [categoria],
  );

  const agregar = (precio: number) => {
    setCarro((c) => ({ cantidad: c.cantidad + 1, total: c.total + precio }));
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerIzq}>
          <View style={styles.headerTitulo}>
            <ThemedText type="title" style={styles.titulo}>
              Ventas
            </ThemedText>
            <View style={styles.catalogoChip}>
              <ThemedText type="label" style={styles.catalogoTexto}>
                Catálogo
              </ThemedText>
            </View>
          </View>
          <ThemedText type="body" style={styles.subtitulo}>
            Accesorios oficiales, micas y repuestos
          </ThemedText>
        </View>
        <View style={styles.carritoIcono}>
          <Ionicons name="cart" size={20} color={colors.yellow} />
          <View style={styles.carritoBadge}>
            <Text style={styles.carritoBadgeTexto}>{carro.cantidad}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buscador}>
        <SearchField placeholder="Buscar accesorio, repuesto, código..." />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cats}>
        {categorias.map((c) => {
          const activo = categoria === c;
          return (
            <Pressable key={c} onPress={() => setCategoria(c)} style={[styles.cat, activo && styles.catActiva]}>
              <Text style={[styles.catTexto, activo && styles.catTextoActiva]}>{c}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {lista.map((p) => (
          <GlassCard key={p.id} style={styles.producto}>
            <View style={styles.productoIconoWrap}>
              <View style={styles.productoIcono}>
                <Ionicons name={iconos[p.icono]} size={30} color={colors.yellow} />
              </View>
              <View style={styles.productoCat}>
                <ThemedText type="label" style={styles.productoCatTexto}>
                  {p.categoria}
                </ThemedText>
              </View>
            </View>
            <ThemedText type="mono" style={styles.productoNombre} numberOfLines={2}>
              {p.nombre}
            </ThemedText>
            <ThemedText type="body" style={styles.productoDesc} numberOfLines={1}>
              {p.descripcion}
            </ThemedText>
            <View style={styles.productoPie}>
              <View>
                <ThemedText type="label" style={styles.precioLabel}>
                  Precio
                </ThemedText>
                <ThemedText type="mono" style={styles.precio}>
                  {p.precio}
                </ThemedText>
              </View>
              <Pressable style={styles.masBtn} onPress={() => agregar(parseFloat(p.precio.replace(/[$,]/g, "")))}>
                <Ionicons name="add" size={20} color={colors.ink} />
              </Pressable>
            </View>
          </GlassCard>
        ))}
      </ScrollView>

      {/* Barra de carrito */}
      <View style={styles.barraCarro}>
        <View style={styles.carroIcono}>
          <Ionicons name="cart" size={18} color={colors.ink} />
        </View>
        <View style={styles.carroInfo}>
          <ThemedText type="label" style={styles.carroCantidad}>
            {carro.cantidad} productos
          </ThemedText>
          <ThemedText type="mono" style={styles.carroTotal}>
            ${carro.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            <ThemedText type="label" style={styles.carroMxn}>
              {" "}
              MXN
            </ThemedText>
          </ThemedText>
        </View>
        <Pressable style={styles.cobrarBtn} onPress={() => router.push("/cobrar")}>
          <Text style={styles.cobrarTexto}>COBRAR →</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start",
    paddingHorizontal: spacing.lg, paddingTop: spacing.md,
  },
  headerIzq: { gap: 4 },
  headerTitulo: { flexDirection: "row", alignItems: "center", gap: 8 },
  titulo: { fontSize: 28 },
  catalogoChip: { backgroundColor: colors.surfaceStrong, borderRadius: radius.pill, paddingVertical: 4, paddingHorizontal: 10 },
  catalogoTexto: { fontSize: 9, color: colors.textMuted },
  subtitulo: { fontSize: 12 },
  carritoIcono: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  carritoBadge: {
    position: "absolute", top: -4, right: -4, backgroundColor: colors.yellow,
    borderRadius: 10, minWidth: 20, height: 20, alignItems: "center", justifyContent: "center",
  },
  carritoBadgeTexto: { color: colors.ink, fontSize: 11, fontWeight: "800" },
  buscador: { paddingHorizontal: spacing.lg, marginTop: spacing.md },
  cats: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  cat: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.pill, paddingVertical: 7, paddingHorizontal: 14,
  },
  catActiva: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  catTexto: { color: colors.textMuted, fontFamily: fontFamily.bodyBold, fontSize: 12 },
  catTextoActiva: { color: colors.ink },
  grid: {
    flexDirection: "row", flexWrap: "wrap", gap: spacing.md,
    paddingHorizontal: spacing.lg, paddingBottom: 110,
  },
  producto: { width: "47.2%", flexGrow: 1, gap: 6, padding: 12 },
  productoIconoWrap: { gap: 6 },
  productoIcono: {
    height: 84, borderRadius: radius.md, backgroundColor: colors.bgSoft,
    borderWidth: 1, borderColor: colors.borderSoft, alignItems: "center", justifyContent: "center",
  },
  productoCat: { alignSelf: "flex-start", backgroundColor: colors.surfaceStrong, borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 8 },
  productoCatTexto: { fontSize: 8, color: colors.textMuted },
  productoNombre: { fontSize: 13, fontWeight: "700", minHeight: 34 },
  productoDesc: { fontSize: 11, color: colors.textSoft },
  productoPie: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 2 },
  precioLabel: { fontSize: 9 },
  precio: { color: colors.yellow, fontWeight: "800", fontSize: 15 },
  masBtn: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.yellow,
    alignItems: "center", justifyContent: "center",
  },
  barraCarro: {
    flexDirection: "row", alignItems: "center", gap: spacing.md,
    backgroundColor: colors.bgSoft, borderTopWidth: 1, borderTopColor: colors.border,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  carroIcono: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: colors.yellow,
    alignItems: "center", justifyContent: "center",
  },
  carroInfo: { flex: 1, gap: 1 },
  carroCantidad: { fontSize: 9 },
  carroTotal: { color: colors.yellow, fontWeight: "800", fontSize: 16 },
  carroMxn: { fontSize: 9, color: colors.textSoft },
  cobrarBtn: {
    backgroundColor: colors.yellow, borderRadius: radius.md,
    paddingVertical: 12, paddingHorizontal: 18,
  },
  cobrarTexto: { fontFamily: fontFamily.bodyExtraBold, color: colors.ink, fontSize: 13 },
});
