import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { FilterChips } from "@/components/filter-chips";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { SearchField } from "@/components/search-input";
import { ThemedText } from "@/components/themed-text";
import { Toggle } from "@/components/toggle";
import { permisosSistema, usuarios } from "@/data/mock";
import { colors, fontFamily } from "@/constants/theme";

const filtros = ["Todos", "Administrador", "Vendedor", "Técnico"] as const;

const colorRol: Record<string, string> = {
  Administrador: colors.yellow,
  Vendedor: colors.blue,
  Técnico: colors.green,
};

export default function UsuariosScreen() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");
  const [permisos, setPermisos] = useState(permisosSistema);

  const lista = useMemo(
    () => (filtro === "Todos" ? usuarios : usuarios.filter((u) => u.rol === filtro)),
    [filtro],
  );

  const alternar = (id: string) =>
    setPermisos((p) => p.map((x) => (x.id === id ? { ...x, activo: !x.activo } : x)));

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Usuarios"
        label="Permisos del sistema"
        right={
          <View style={styles.agregarBtn}>
            <Ionicons name="add" size={19} color={colors.yellow} />
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SearchField placeholder="Buscar usuario o email..." />
        <FilterChips opciones={filtros} valor={filtro} onChange={setFiltro} />

        {lista.map((u) => (
          <Pressable key={u.id}>
            <GlassCard style={styles.row}>
              <View style={[styles.avatar, { backgroundColor: `${u.color}1A`, borderColor: `${u.color}55` }]}>
                <ThemedText type="mono" style={[styles.avatarInicial, { color: u.color }]}>
                  {u.nombre[0]}
                </ThemedText>
              </View>
              <View style={styles.info}>
                <View style={styles.nombreRow}>
                  <ThemedText type="mono" style={styles.nombre} numberOfLines={1}>
                    {u.nombre}
                  </ThemedText>
                  <View style={[styles.rolChip, { backgroundColor: `${colorRol[u.rol]}1A`, borderColor: colorRol[u.rol] }]}>
                    <Text style={[styles.rolTexto, { color: colorRol[u.rol] }]}>{u.rol.toUpperCase()}</Text>
                  </View>
                </View>
                <ThemedText type="body" style={styles.email} numberOfLines={1}>
                  {u.email}
                </ThemedText>
                <View style={styles.accesoRow}>
                  <View style={[styles.punto, { backgroundColor: u.activo ? colors.green : colors.orange }]} />
                  <ThemedText type="body" style={styles.acceso}>
                    Último acceso: {u.acceso}
                  </ThemedText>
                </View>
              </View>
            </GlassCard>
          </Pressable>
        ))}

        {/* Permisos */}
        <GlassCard style={styles.permisosCard}>
          <ThemedText type="label" style={styles.permisosTitulo}>
            Permisos del Sistema
          </ThemedText>
          {permisos.map((p, i) => (
            <Pressable key={p.id} style={[styles.permisoItem, i > 0 && styles.permisoDivisor]} onPress={() => alternar(p.id)}>
              <ThemedText type="mono" style={styles.permisoNombre}>
                {p.nombre}
              </ThemedText>
              <Toggle activo={p.activo} />
            </Pressable>
          ))}
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
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 14 },
  avatar: { width: 42, height: 42, borderRadius: 21, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  avatarInicial: { fontWeight: "800", fontSize: 16 },
  info: { flex: 1, gap: 2 },
  nombreRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  nombre: { fontSize: 14, flexShrink: 1 },
  rolChip: { borderWidth: 1, borderRadius: 999, paddingVertical: 1, paddingHorizontal: 6 },
  rolTexto: { fontSize: 8, fontWeight: "800", fontFamily: fontFamily.bodyExtraBold },
  email: { fontSize: 11, color: colors.textSoft },
  accesoRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  punto: { width: 8, height: 8, borderRadius: 4 },
  acceso: { fontSize: 10, color: colors.textSoft },
  permisosCard: { gap: 4, marginTop: 4 },
  permisosTitulo: { marginBottom: 4 },
  permisoItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 },
  permisoDivisor: { borderTopWidth: 1, borderTopColor: colors.borderSoft },
  permisoNombre: { fontSize: 13 },
  pie: { alignItems: "center", marginTop: 8, paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
