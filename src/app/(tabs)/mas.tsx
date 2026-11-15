import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { SwipeTabs } from "@/components/swipe-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Avatar } from "@/components/avatar";
import { GlassCard } from "@/components/glass-card";
import { ThemedText } from "@/components/themed-text";
import { menuModulos } from "@/data/mock";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";

const rutasModulos: Record<string, string> = {
  Taller: "/taller",
  Clientes: "/clientes",
  Productos: "/inventario",
  "Órdenes de Compra": "/compras",
  Proveedores: "/proveedores",
  Entregas: "/entregas",
  Empleados: "/empleados",
  Especialidades: "/especialidades",
  Cargos: "/cargos",
  Usuarios: "/usuarios",
  "Reportes de Ventas": "/reportes",
  "Trade-in": "/tradein",
  "Gestión Trade-in": "/tradein-gestion",
  "Validación de Pagos": "/validacion",
  Bitácora: "/bitacora",
  "Mantenimiento de BD": "/bd",
};

export default function MasScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <SwipeTabs onRight={() => router.navigate("/taller" as never)} onLeft={() => router.navigate("/ventas" as never)}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Perfil */}
        <Pressable style={styles.perfilHeader} onPress={() => router.push("/perfil" as never)}>
          <Avatar inicial="A" size={64} />
          <View style={styles.perfilInfo}>
            <View style={styles.perfilNombreRow}>
              <ThemedText type="title" style={styles.perfilNombre}>
                Anthoan Gonzalez
              </ThemedText>
              <View style={styles.rolChip}>
                <ThemedText type="label" style={styles.rolTexto}>
                  Administrador
                </ThemedText>
              </View>
            </View>
            <ThemedText type="body" style={styles.perfilEmail}>
              anthoan@ituaccesorio.com
            </ThemedText>
            <View style={styles.perfilMetaRow}>
              <View style={styles.metaChip}>
                <Ionicons name="shield-checkmark" size={11} color={colors.yellow} />
                <ThemedText type="label" style={styles.metaTexto}>
                  Rol: Administrador
                </ThemedText>
              </View>
              <View style={styles.metaChip}>
                <Ionicons name="business" size={11} color={colors.textSoft} />
                <ThemedText type="label" style={styles.metaTexto}>
                  Sucursal: Centro
                </ThemedText>
              </View>
              <View style={styles.metaChip}>
                <Ionicons name="create" size={11} color={colors.yellow} />
                <ThemedText type="label" style={[styles.metaTexto, { color: colors.yellow }]}>
                  Editar perfil
                </ThemedText>
              </View>
            </View>
          </View>
        </Pressable>

        {/* Métricas rápidas */}
        <View style={styles.statsRow}>
          <GlassCard style={styles.statCard}>
            <ThemedText type="label" style={styles.statLabel}>
              Técnicos Activos
            </ThemedText>
            <View style={styles.statValorRow}>
              <ThemedText type="title" style={styles.statValor}>
                8
              </ThemedText>
              <ThemedText type="body" style={styles.statSub}>
                / 9 turno
              </ThemedText>
            </View>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <ThemedText type="label" style={styles.statLabel}>
              Caja del Día
            </ThemedText>
            <ThemedText type="title" style={[styles.statValor, styles.statValorAmarillo]}>
              $2,410
            </ThemedText>
          </GlassCard>
        </View>

        {/* Módulos */}
        {menuModulos.map((grupo) => (
          <View key={grupo.seccion} style={styles.grupo}>
            <View style={styles.grupoHeader}>
              <ThemedText type="label">{grupo.seccion}</ThemedText>
              <View style={styles.grupoContador}>
                <ThemedText type="label" style={styles.contadorTexto}>
                  {grupo.items.length} módulos
                </ThemedText>
              </View>
            </View>
            <GlassCard style={styles.grupoCard}>
              {grupo.items.map((item, i) => (
                <Pressable
                  key={item.nombre}
                  style={[styles.moduloItem, i > 0 && styles.moduloDivisor]}
                  onPress={() => {
                    const ruta = rutasModulos[item.nombre];
                    if (ruta) router.push(ruta as never);
                  }}
                >
                  <View style={[styles.moduloIcono, { backgroundColor: `${item.color}1A`, borderColor: `${item.color}44` }]}>
                    <Ionicons name={item.icono as never} size={17} color={item.color} />
                  </View>
                  <ThemedText type="mono" style={styles.moduloNombre}>
                    {item.nombre}
                  </ThemedText>
                  <Ionicons name="chevron-forward" size={16} color={colors.textSoft} />
                </Pressable>
              ))}
            </GlassCard>
          </View>
        ))}

        {/* Cerrar sesión */}
        <Pressable style={styles.cerrarSesion} onPress={() => router.replace("/")}>
          <View style={[styles.moduloIcono, { backgroundColor: `${colors.red}1A`, borderColor: `${colors.red}44` }]}>
            <Ionicons name="log-out" size={17} color={colors.red} />
          </View>
          <Text style={styles.cerrarTexto}>Cerrar Sesión</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.red} />
        </Pressable>

        {/* Pie */}
        <View style={styles.pie}>
          <ThemedText type="label" style={styles.pieMarca}>
            iTUACCESORIO
          </ThemedText>
          <ThemedText type="body" style={styles.pieVersion}>
            v2.4.0 — iTUACCESORIO Mobile System
          </ThemedText>
          <ThemedText type="body" style={styles.pieLinks}>
            Soporte Técnico · Términos de Servicio
          </ThemedText>
        </View>
      </ScrollView>
      </SwipeTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.lg },
  perfilHeader: { flexDirection: "row", gap: spacing.md, alignItems: "center", paddingTop: spacing.md },
  perfilInfo: { flex: 1, gap: 3 },
  perfilNombreRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  perfilNombre: { fontSize: 19 },
  rolChip: { backgroundColor: colors.yellow, borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 8 },
  rolTexto: { fontSize: 8, color: colors.ink },
  perfilEmail: { fontSize: 12 },
  perfilMetaRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  metaChip: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.pill, paddingVertical: 4, paddingHorizontal: 9,
  },
  metaTexto: { fontSize: 9 },
  statsRow: { flexDirection: "row", gap: spacing.md },
  statCard: { flex: 1, gap: 4 },
  statLabel: { fontSize: 9 },
  statValorRow: { flexDirection: "row", alignItems: "flex-end", gap: 4 },
  statValor: { fontSize: 22 },
  statValorAmarillo: { color: colors.yellow },
  statSub: { fontSize: 12, color: colors.textSoft },
  grupo: { gap: 8 },
  grupoHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  grupoContador: { backgroundColor: colors.surface, borderRadius: radius.pill, paddingVertical: 3, paddingHorizontal: 9 },
  contadorTexto: { fontSize: 9, color: colors.textSoft },
  grupoCard: { paddingVertical: 4, paddingHorizontal: 12 },
  moduloItem: { flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12 },
  moduloDivisor: { borderTopWidth: 1, borderTopColor: colors.borderSoft },
  moduloIcono: {
    width: 36, height: 36, borderRadius: 10, borderWidth: 1,
    alignItems: "center", justifyContent: "center",
  },
  moduloNombre: { flex: 1, fontSize: 14 },
  cerrarSesion: {
    flexDirection: "row", alignItems: "center", gap: spacing.md,
    backgroundColor: `${colors.red}0D`, borderWidth: 1, borderColor: `${colors.red}33`,
    borderRadius: radius.xl, padding: 16,
  },
  cerrarTexto: { flex: 1, color: colors.red, fontFamily: fontFamily.bodyExtraBold, fontSize: 14 },
  pie: { alignItems: "center", gap: 5, marginTop: spacing.md, paddingBottom: spacing.lg },
  pieMarca: { color: colors.text, letterSpacing: 2 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
  pieLinks: { fontSize: 11, color: colors.textSoft },
});
