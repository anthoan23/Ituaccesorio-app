import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { usuarios, rolesSistema, menuModulos } from "@/data/mock";
import { colors, fontFamily } from "@/constants/theme";

const colorRol: Record<string, string> = {
  Administrador: colors.yellow,
  Vendedor: colors.blue,
  Técnico: colors.green,
};

const modulos = menuModulos.flatMap((g) => g.items.map((i) => i.nombre));

export default function UsuariosScreen() {
  const [busqueda, setBusqueda] = useState("");

  const lista = useMemo(
    () =>
      usuarios.filter((u) =>
        `${u.usuario} ${u.cedula} ${u.rol}`.toLowerCase().includes(busqueda.toLowerCase()),
      ),
    [busqueda],
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Usuarios"
        label="Gestión de usuarios y roles"
        right={
          <View style={styles.agregarBtn}>
            <Ionicons name="add" size={19} color={colors.yellow} />
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* KPIs de la web: Usuarios · Roles · Módulos */}
        <View style={styles.kpiRow}>
          <GlassCard style={styles.kpiCard}>
            <ThemedText type="title" style={[styles.kpiValor, { color: colors.yellow }]}>
              {usuarios.length}
            </ThemedText>
            <ThemedText type="label" style={styles.kpiLabel}>
              Usuarios
            </ThemedText>
          </GlassCard>
          <GlassCard style={styles.kpiCard}>
            <ThemedText type="title" style={[styles.kpiValor, { color: colors.blue }]}>
              {rolesSistema.length}
            </ThemedText>
            <ThemedText type="label" style={styles.kpiLabel}>
              Roles
            </ThemedText>
          </GlassCard>
          <GlassCard style={styles.kpiCard}>
            <ThemedText type="title" style={[styles.kpiValor, { color: colors.green }]}>
              {modulos.length}
            </ThemedText>
            <ThemedText type="label" style={styles.kpiLabel}>
              Módulos
            </ThemedText>
          </GlassCard>
        </View>

        <SearchField placeholder="Buscar usuario o cédula..." value={busqueda} onChangeText={setBusqueda} />

        {/* Usuarios existentes (web: ID · Usuario · Cédula · Rol) */}
        {lista.map((u) => (
          <Pressable key={u.id}>
            <GlassCard style={styles.row}>
              <View style={[styles.avatar, { backgroundColor: `${colorRol[u.rol]}1A`, borderColor: `${colorRol[u.rol]}55` }]}>
                <ThemedText type="mono" style={[styles.avatarInicial, { color: colorRol[u.rol] }]}>
                  {u.usuario[0]}
                </ThemedText>
              </View>
              <View style={styles.info}>
                <View style={styles.nombreRow}>
                  <ThemedText type="mono" style={styles.nombre} numberOfLines={1}>
                    @{u.usuario}
                  </ThemedText>
                  <View style={[styles.rolChip, { backgroundColor: `${colorRol[u.rol]}1A`, borderColor: colorRol[u.rol] }]}>
                    <Text style={[styles.rolTexto, { color: colorRol[u.rol] }]}>{u.rol.toUpperCase()}</Text>
                  </View>
                </View>
                <View style={styles.datoRow}>
                  <Ionicons name="id-card" size={10} color={colors.textSoft} />
                  <ThemedText type="body" style={styles.dato}>
                    Céd.: {u.cedula}
                  </ThemedText>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textSoft} />
            </GlassCard>
          </Pressable>
        ))}

        {/* Roles creados (card de la web) */}
        <GlassCard style={styles.card}>
          <ThemedText type="label" style={styles.cardTitulo}>
            Roles Creados
          </ThemedText>
          {rolesSistema.map((r, i) => (
            <View key={r.id} style={[styles.cardItem, i > 0 && styles.cardDivisor]}>
              <View style={styles.rolIcono}>
                <Ionicons name="ribbon" size={13} color={colors.blue} />
              </View>
              <View style={styles.cardInfo}>
                <ThemedText type="mono" style={styles.cardNombre}>
                  {r.nombre}
                </ThemedText>
                <ThemedText type="body" style={styles.cardDesc}>
                  {r.descripcion}
                </ThemedText>
              </View>
            </View>
          ))}
        </GlassCard>

        {/* Módulos del sistema (card de la web) */}
        <GlassCard style={styles.card}>
          <ThemedText type="label" style={styles.cardTitulo}>
            Módulos del Sistema
          </ThemedText>
          <View style={styles.modulosWrap}>
            {modulos.map((m) => (
              <View key={m} style={styles.moduloChip}>
                <View style={styles.moduloPunto} />
                <ThemedText type="body" style={styles.moduloTexto}>
                  {m}
                </ThemedText>
              </View>
            ))}
          </View>
        </GlassCard>

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
  agregarBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  scroll: { paddingHorizontal: 16, paddingBottom: 32, gap: 12 },
  kpiRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  kpiCard: { flex: 1, alignItems: "center", gap: 3, paddingVertical: 12, paddingHorizontal: 8 },
  kpiValor: { fontSize: 24 },
  kpiLabel: { fontSize: 9, textAlign: "center" },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 14 },
  avatar: { width: 42, height: 42, borderRadius: 21, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  avatarInicial: { fontWeight: "800", fontSize: 16 },
  info: { flex: 1, gap: 3 },
  nombreRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  nombre: { fontSize: 14, flexShrink: 1 },
  rolChip: { borderWidth: 1, borderRadius: 999, paddingVertical: 1, paddingHorizontal: 6 },
  rolTexto: { fontSize: 8, fontWeight: "800", fontFamily: fontFamily.bodyExtraBold },
  datoRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  dato: { fontSize: 10, color: colors.textSoft },
  card: { gap: 4, marginTop: 4 },
  cardTitulo: { marginBottom: 4 },
  cardItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 9 },
  cardDivisor: { borderTopWidth: 1, borderTopColor: colors.borderSoft },
  rolIcono: {
    width: 30, height: 30, borderRadius: 9, backgroundColor: `${colors.blue}1A`,
    alignItems: "center", justifyContent: "center",
  },
  cardInfo: { flex: 1, gap: 1 },
  cardNombre: { fontSize: 13 },
  cardDesc: { fontSize: 11, color: colors.textSoft },
  modulosWrap: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  moduloChip: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10,
  },
  moduloPunto: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.yellow },
  moduloTexto: { fontSize: 11, color: colors.textMuted },
  pie: { alignItems: "center", marginTop: 8, paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
