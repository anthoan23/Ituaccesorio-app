import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Fab } from "@/components/fab";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { clientes } from "@/data/mock";
import { colors } from "@/constants/theme";

/** KPIs de la web: Clientes registrados · Persona Natural · Persona Jurídica */
const kpis = [
  { label: "Clientes registrados", valor: clientes.length, color: colors.yellow },
  { label: "Persona Natural", valor: clientes.filter((c) => c.tipo === "PN").length, color: colors.green },
  { label: "Persona Jurídica", valor: clientes.filter((c) => c.tipo === "PJ").length, color: colors.blue },
];

export default function ClientesScreen() {
  const [busqueda, setBusqueda] = useState("");

  const lista = useMemo(
    () =>
      clientes.filter((c) =>
        `${c.nombre} ${c.apellido} ${c.correo} ${c.celular}`.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    [busqueda],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Clientes"
        label="Administración de clientes"
        right={
          <View style={styles.agregarBtn}>
            <Ionicons name="add" size={18} color={colors.yellow} />
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* KPIs de la web */}
        <View style={styles.kpiRow}>
          {kpis.map((k) => (
            <GlassCard key={k.label} style={styles.kpiCard}>
              <ThemedText type="title" style={[styles.kpiValor, { color: k.color }]}>
                {k.valor}
              </ThemedText>
              <ThemedText type="label" style={styles.kpiLabel}>
                {k.label}
              </ThemedText>
            </GlassCard>
          ))}
        </View>

        <SearchField placeholder="Buscar cliente, celular o correo..." value={busqueda} onChangeText={setBusqueda} />

        {lista.map((c) => (
          <Pressable key={c.id}>
            <GlassCard style={styles.clienteRow}>
              <View style={styles.clienteAvatar}>
                <Text style={styles.clienteInicial}>
                  {c.nombre[0]}
                  {c.apellido[0]}
                </Text>
              </View>
              <View style={styles.clienteInfo}>
                <View style={styles.nombreRow}>
                  <ThemedText type="mono" style={styles.clienteNombre} numberOfLines={1}>
                    {c.nombre} {c.apellido}
                  </ThemedText>
                  <View style={[styles.tipoChip, c.tipo === "PJ" ? styles.tipoPJ : styles.tipoPN]}>
                    <Text style={[styles.tipoTexto, { color: c.tipo === "PJ" ? "#60A5FA" : colors.green }]}>
                      {c.tipo === "PJ" ? "PJ" : "PN"}
                    </Text>
                  </View>
                </View>
                <View style={styles.datoRow}>
                  <Ionicons name="call" size={10} color={colors.textSoft} />
                  <ThemedText type="body" style={styles.clienteDato} numberOfLines={1}>
                    {c.celular}
                  </ThemedText>
                </View>
                <View style={styles.datoRow}>
                  <Ionicons name="mail" size={10} color={colors.textSoft} />
                  <ThemedText type="body" style={styles.clienteDato} numberOfLines={1}>
                    {c.correo}
                  </ThemedText>
                </View>
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
  agregarBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  scroll: { paddingHorizontal: 16, paddingBottom: 110, gap: 10 },
  kpiRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  kpiCard: { flex: 1, alignItems: "center", gap: 3, paddingVertical: 12, paddingHorizontal: 8 },
  kpiValor: { fontSize: 22 },
  kpiLabel: { fontSize: 8, textAlign: "center" },
  clienteRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 11, paddingHorizontal: 14 },
  clienteAvatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.yellow,
    alignItems: "center", justifyContent: "center",
  },
  clienteInicial: { color: colors.ink, fontWeight: "800", fontSize: 13 },
  clienteInfo: { flex: 1, gap: 2 },
  nombreRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  clienteNombre: { fontSize: 13, flexShrink: 1 },
  tipoChip: { borderRadius: 999, borderWidth: 1, paddingVertical: 1, paddingHorizontal: 6 },
  tipoPN: { backgroundColor: `${colors.green}1A`, borderColor: `${colors.green}55` },
  tipoPJ: { backgroundColor: `${colors.blue}1A`, borderColor: `${colors.blue}55` },
  tipoTexto: { fontSize: 8, fontWeight: "800" },
  datoRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  clienteDato: { fontSize: 10, color: colors.textSoft },
  pie: { alignItems: "center", gap: 4, marginTop: 8, paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
  pieLinks: { fontSize: 11, color: colors.textSoft },
});
