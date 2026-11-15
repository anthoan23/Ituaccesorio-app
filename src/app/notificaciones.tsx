import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { ThemedText } from "@/components/themed-text";
import { notificaciones, Notificacion } from "@/data/mock";
import { colors } from "@/constants/theme";

const configTipo: Record<Notificacion["tipo"], { icono: string; color: string }> = {
  info: { icono: "information-circle", color: colors.blue },
  exito: { icono: "checkmark-circle", color: colors.green },
  alerta: { icono: "warning", color: colors.yellow },
  error: { icono: "close-circle", color: colors.red },
};

export default function NotificacionesScreen() {
  const [lista, setLista] = useState(notificaciones);

  const sinLeer = lista.filter((n) => !n.leida).length;

  const marcarTodo = () => setLista((ns) => ns.map((n) => ({ ...n, leida: true })));

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        titulo="Notificaciones"
        label={`${sinLeer} sin leer`}
        right={
          <Pressable hitSlop={10} onPress={marcarTodo}>
            <View style={styles.marcarBtn}>
              <Ionicons name="checkmark-done" size={17} color={colors.yellow} />
            </View>
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {lista.map((n) => {
          const c = configTipo[n.tipo];
          return (
            <Pressable key={n.id}>
              <GlassCard style={[styles.notiCard, !n.leida && styles.notiNoLeida]}>
                <View style={[styles.notiIcono, { backgroundColor: `${c.color}1A`, borderColor: `${c.color}44` }]}>
                  <Ionicons name={c.icono as never} size={17} color={c.color} />
                </View>
                <View style={styles.notiInfo}>
                  <View style={styles.notiTituloRow}>
                    {!n.leida && <View style={styles.puntoNuevo} />}
                    <ThemedText type="mono" style={styles.notiTitulo} numberOfLines={1}>
                      {n.titulo}
                    </ThemedText>
                  </View>
                  <ThemedText type="body" style={styles.notiDetalle} numberOfLines={1}>
                    {n.detalle}
                  </ThemedText>
                  <ThemedText type="body" style={styles.notiHora}>
                    {n.hora}
                  </ThemedText>
                </View>
              </GlassCard>
            </Pressable>
          );
        })}

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
  marcarBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center",
  },
  scroll: { paddingHorizontal: 16, paddingBottom: 32, gap: 10 },
  notiCard: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 14 },
  notiNoLeida: { borderColor: `${colors.yellow}44` },
  notiIcono: { width: 38, height: 38, borderRadius: 11, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  notiInfo: { flex: 1, gap: 2 },
  notiTituloRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  puntoNuevo: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.yellow },
  notiTitulo: { fontSize: 13, flexShrink: 1 },
  notiDetalle: { fontSize: 11, color: colors.textSoft },
  notiHora: { fontSize: 10, color: colors.textSoft },
  pie: { alignItems: "center", marginTop: 4, paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
