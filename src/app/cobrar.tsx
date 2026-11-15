import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { ThemedText } from "@/components/themed-text";
import { carritoDemo } from "@/data/mock";
import { colors, fontFamily, radius } from "@/constants/theme";

const metodos = ["Efectivo", "Tarjeta", "Transferencia"] as const;

const total = carritoDemo.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

export default function CobrarScreen() {
  const router = useRouter();
  const [metodo, setMetodo] = useState<(typeof metodos)[number]>("Efectivo");
  const [monto, setMonto] = useState("1500");

  const recibido = parseFloat(monto || "0") || 0;
  const cambio = recibido - total;

  const digito = (d: string) => {
    if (d === "del") return setMonto((m) => m.slice(0, -1));
    if (d === "." && monto.includes(".")) return;
    setMonto((m) => (m.length < 8 ? m + d : m));
  };

  const agregarRapido = (n: number) => setMonto((m) => String((parseFloat(m || "0") || 0) + n));

  const formatear = (n: number) =>
    n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <ScreenHeader titulo="Cobrar" label="Terminal POS · Sucursal Centro" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Resumen del carrito */}
        <GlassCard style={styles.gap}>
          <View style={styles.resumenHeader}>
            <View style={styles.tituloRow}>
              <View style={styles.resumenIcono}>
                <Ionicons name="cart" size={13} color={colors.yellow} />
              </View>
              <ThemedText type="label">Resumen del Carrito</ThemedText>
            </View>
            <View style={styles.itemsChip}>
              <Text style={styles.itemsTexto}>{carritoDemo.length} ítems</Text>
            </View>
          </View>
          {carritoDemo.map((p) => (
            <View key={p.id} style={styles.itemRow}>
              <ThemedText type="mono" style={styles.itemNombre} numberOfLines={1}>
                {p.nombre} <Text style={styles.itemCantidad}>×{p.cantidad}</Text>
              </ThemedText>
              <ThemedText type="mono" style={styles.itemPrecio}>
                {formatear(p.precio * p.cantidad)}
              </ThemedText>
            </View>
          ))}
          <View style={[styles.totalRow, styles.divisorTop]}>
            <View>
              <ThemedText type="label" style={styles.totalLabel}>
                Total a Cobrar
              </ThemedText>
              <ThemedText type="body" style={styles.totalMeta}>
                IVA incluido (16%) · Folio #POS-8924
              </ThemedText>
            </View>
            <ThemedText type="title" style={styles.totalValor}>
              {formatear(total)}
            </ThemedText>
          </View>
        </GlassCard>

        {/* Método de pago */}
        <View style={styles.metodosRow}>
          {metodos.map((m) => (
            <Pressable key={m} style={[styles.metodo, metodo === m && styles.metodoActivo]} onPress={() => setMetodo(m)}>
              <Ionicons
                name={m === "Efectivo" ? "cash" : m === "Tarjeta" ? "card" : "swap-horizontal"}
                size={14}
                color={metodo === m ? colors.ink : colors.textMuted}
              />
              <Text style={[styles.metodoTexto, metodo === m && styles.metodoTextoActivo]}>{m}</Text>
            </Pressable>
          ))}
        </View>

        {/* Monto recibido */}
        <GlassCard style={styles.gap}>
          <View style={styles.recibidoHeader}>
            <View style={styles.tituloRow}>
              <View style={styles.verdePunto} />
              <ThemedText type="label">Monto Recibido</ThemedText>
            </View>
            <ThemedText type="label" style={styles.cajaTexto}>
              Caja Abierta
            </ThemedText>
          </View>

          <View style={styles.display}>
            <Text style={styles.displayTexto}>
              <Text style={styles.displaySigno}>$</Text>
              {recibido.toLocaleString("es-MX")}
              <Text style={styles.displayCursor}>|</Text>
            </Text>
            <View style={styles.mxnChip}>
              <Text style={styles.mxnTexto}>MXN</Text>
            </View>
          </View>

          {cambio >= 0 ? (
            <View style={styles.cambioBox}>
              <Ionicons name="checkmark-circle" size={15} color={colors.green} />
              <ThemedText type="label" style={styles.cambioLabel}>
                Cambio a Devolver:
              </ThemedText>
              <ThemedText type="mono" style={styles.cambioValor}>
                {formatear(cambio)} MXN
              </ThemedText>
            </View>
          ) : (
            <View style={[styles.cambioBox, styles.cambioFalta]}>
              <Ionicons name="alert-circle" size={15} color={colors.yellow} />
              <ThemedText type="label" style={styles.cambioLabel}>
                Falta:
              </ThemedText>
              <ThemedText type="mono" style={styles.cambioValorFalta}>
                {formatear(-cambio)} MXN
              </ThemedText>
            </View>
          )}

          <View style={styles.rapidosRow}>
            <Pressable style={styles.rapidoBtn} onPress={() => setMonto(String(total))}>
              <Text style={styles.rapidoTexto}>Exacto</Text>
            </Pressable>
            {[100, 200, 500].map((n) => (
              <Pressable key={n} style={styles.rapidoBtn} onPress={() => agregarRapido(n)}>
                <Text style={styles.rapidoTexto}>+{n}</Text>
              </Pressable>
            ))}
          </View>
        </GlassCard>

        {/* Teclado */}
        <GlassCard style={styles.teclado}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"].map((k) => (
            <Pressable key={k} style={styles.tecla} onPress={() => digito(k)}>
              {k === "del" ? (
                <Ionicons name="backspace" size={20} color={colors.text} />
              ) : (
                <Text style={styles.teclaTexto}>{k}</Text>
              )}
            </Pressable>
          ))}
        </GlassCard>

        {/* Confirmar */}
        <Pressable style={styles.confirmar}>
          <Ionicons name="checkmark-circle" size={18} color={colors.ink} />
          <Text style={styles.confirmarTexto}>CONFIRMAR PAGO {formatear(total)} MXN</Text>
        </Pressable>

        <Pressable style={styles.volver} onPress={() => router.back()}>
          <ThemedText type="body" style={styles.volverTexto}>
            ← Volver al catálogo
          </ThemedText>
        </Pressable>

        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieVersion}>
            🔒 Transacción POS encriptada · iTUACCESORIO Cloud Sync
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 16, paddingBottom: 24, gap: 14 },
  gap: { gap: 12 },
  resumenHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  tituloRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  resumenIcono: {
    width: 28, height: 28, borderRadius: 9, backgroundColor: `${colors.yellow}1A`,
    borderWidth: 1, borderColor: `${colors.yellow}44`, alignItems: "center", justifyContent: "center",
  },
  itemsChip: { backgroundColor: colors.surfaceStrong, borderRadius: 999, paddingVertical: 3, paddingHorizontal: 9 },
  itemsTexto: { color: colors.textMuted, fontSize: 10, fontWeight: "700" },
  itemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  itemNombre: { flex: 1, fontSize: 13 },
  itemCantidad: { color: colors.textSoft, fontSize: 11 },
  itemPrecio: { color: colors.yellow, fontWeight: "700", fontSize: 13 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  divisorTop: { borderTopWidth: 1, borderTopColor: colors.borderSoft, paddingTop: 12, marginTop: 6 },
  totalLabel: { color: colors.yellow, fontSize: 11 },
  totalMeta: { fontSize: 10, color: colors.textSoft, marginTop: 2 },
  totalValor: { color: colors.yellow, fontSize: 26 },
  metodosRow: { flexDirection: "row", gap: 8 },
  metodo: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: 999, paddingVertical: 10,
  },
  metodoActivo: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  metodoTexto: { color: colors.textMuted, fontFamily: fontFamily.bodyBold, fontSize: 12 },
  metodoTextoActivo: { color: colors.ink },
  recibidoHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  verdePunto: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.green },
  cajaTexto: { fontSize: 9, color: colors.textSoft },
  display: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: colors.bgSoft, borderWidth: 1, borderColor: colors.inputBorder,
    borderRadius: radius.lg, paddingHorizontal: 16, paddingVertical: 10,
  },
  displayTexto: { flex: 1, color: colors.text, fontFamily: fontFamily.heading, fontSize: 30 },
  displaySigno: { color: colors.textSoft, fontSize: 20 },
  displayCursor: { color: colors.yellow, fontSize: 26 },
  mxnChip: { backgroundColor: colors.surfaceStrong, borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8 },
  mxnTexto: { color: colors.textMuted, fontSize: 11, fontWeight: "700" },
  cambioBox: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: `${colors.green}14`, borderWidth: 1, borderColor: `${colors.green}44`,
    borderRadius: radius.lg, paddingVertical: 11, paddingHorizontal: 14,
  },
  cambioFalta: { backgroundColor: `${colors.yellow}14`, borderColor: `${colors.yellow}44` },
  cambioLabel: { color: colors.green, fontSize: 10, flex: 1 },
  cambioValor: { color: colors.green, fontWeight: "800" },
  cambioValorFalta: { color: colors.yellow, fontWeight: "800" },
  rapidosRow: { flexDirection: "row", gap: 8 },
  rapidoBtn: {
    flex: 1, alignItems: "center", backgroundColor: colors.surfaceStrong,
    borderRadius: 999, paddingVertical: 8,
  },
  rapidoTexto: { color: colors.text, fontSize: 12, fontWeight: "700" },
  teclado: {
    flexDirection: "row", flexWrap: "wrap", gap: 8, padding: 10,
    justifyContent: "center",
  },
  tecla: {
    width: "31.5%", flexGrow: 1, aspectRatio: 2.4, borderRadius: radius.lg,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    alignItems: "center", justifyContent: "center",
  },
  teclaTexto: { color: colors.text, fontSize: 19, fontWeight: "700", fontFamily: fontFamily.headingMedium },
  confirmar: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    backgroundColor: colors.yellow, borderRadius: radius.lg, paddingVertical: 16,
  },
  confirmarTexto: { color: colors.ink, fontFamily: fontFamily.bodyExtraBold, fontSize: 15 },
  volver: { alignItems: "center", paddingVertical: 4 },
  volverTexto: { fontSize: 12, color: colors.textSoft },
  pie: { alignItems: "center", paddingBottom: 8 },
  pieVersion: { fontSize: 10, color: colors.textSoft },
});
