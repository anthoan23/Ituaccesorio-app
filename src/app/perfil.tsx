import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Avatar } from "@/components/avatar";
import { GlassCard } from "@/components/glass-card";
import { ScreenHeader } from "@/components/screen-header";
import { ThemedText } from "@/components/themed-text";
import { perfil } from "@/data/mock";
import { colors, fontFamily, radius } from "@/constants/theme";

export default function PerfilScreen() {
  const [nombre, setNombre] = useState(perfil.nombre);
  const [email, setEmail] = useState(perfil.email);
  const [telefono, setTelefono] = useState(perfil.telefono);
  const [guardado, setGuardado] = useState(false);

  const guardar = () => setGuardado(true);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader titulo="Perfil" label="Editar perfil" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar + rol */}
        <View style={styles.perfilTop}>
          <View style={styles.avatarWrap}>
            <Avatar inicial={nombre[0] ?? "A"} size={72} />
            <View style={styles.avatarEdit}>
              <Ionicons name="camera" size={11} color={colors.ink} />
            </View>
          </View>
          <View style={styles.rolChip}>
            <Ionicons name="shield-checkmark" size={11} color={colors.yellow} />
            <ThemedText type="label" style={styles.rolTexto}>
              {perfil.rol}
            </ThemedText>
          </View>
          <ThemedText type="body" style={styles.sucursal}>
            Sucursal: {perfil.sucursal}
          </ThemedText>
        </View>

        {/* Formulario */}
        <GlassCard style={styles.gap}>
          <Campo label="Nombre Completo" icono="person" valor={nombre} onChange={setNombre} />
          <Campo label="Correo Electrónico" icono="mail" valor={email} onChange={setEmail} keyboardType="email-address" />
          <Campo label="Teléfono" icono="call" valor={telefono} onChange={setTelefono} keyboardType="phone-pad" />
          <View style={styles.campo}>
            <ThemedText type="label" style={styles.campoLabel}>
              Sucursal
            </ThemedText>
            <View style={styles.inputWrap}>
              <Ionicons name="business" size={15} color={colors.textSoft} />
              <ThemedText type="mono" style={styles.datoFijo}>
                {perfil.sucursal}
              </ThemedText>
              <Ionicons name="lock-closed" size={13} color={colors.textSoft} />
            </View>
          </View>
        </GlassCard>

        {/* Guardar */}
        <Pressable style={styles.guardarBtn} onPress={guardar}>
          <Ionicons name={guardado ? "checkmark-circle" : "save"} size={17} color={colors.ink} />
          <Text style={styles.guardarTexto}>{guardado ? "CAMBIOS GUARDADOS" : "GUARDAR CAMBIOS"}</Text>
        </Pressable>

        {guardado && (
          <ThemedText type="body" style={styles.guardadoNota}>
            Los cambios se aplicarán al cerrar sesión.
          </ThemedText>
        )}

        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieVersion}>
            v2.4.0 — iTUACCESORIO Mobile System
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Campo({
  label,
  icono,
  valor,
  onChange,
  keyboardType,
}: {
  label: string;
  icono: keyof typeof Ionicons.glyphMap;
  valor: string;
  onChange: (v: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
}) {
  return (
    <View style={styles.campo}>
      <ThemedText type="label" style={styles.campoLabel}>
        {label}
      </ThemedText>
      <View style={styles.inputWrap}>
        <Ionicons name={icono} size={15} color={colors.textSoft} />
        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={onChange}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 16, paddingBottom: 32, gap: 14 },
  perfilTop: { alignItems: "center", gap: 8, marginTop: 4 },
  avatarWrap: { position: "relative" },
  avatarEdit: {
    position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12,
    backgroundColor: colors.yellow, alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: colors.bg,
  },
  rolChip: {
    flexDirection: "row", alignItems: "center", gap: 5,
    backgroundColor: `${colors.yellow}14`, borderWidth: 1, borderColor: `${colors.yellow}55`,
    borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10,
  },
  rolTexto: { fontSize: 9, color: colors.yellow },
  sucursal: { fontSize: 12, color: colors.textSoft },
  gap: { gap: 14 },
  campo: { gap: 6 },
  campoLabel: { fontSize: 10 },
  inputWrap: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.inputBorder,
    borderRadius: radius.md, paddingHorizontal: 12, height: 46,
  },
  input: { flex: 1, color: colors.text, fontFamily: fontFamily.bodyMedium, fontSize: 14 },
  datoFijo: { flex: 1, fontSize: 14 },
  guardarBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    backgroundColor: colors.yellow, borderRadius: radius.lg, paddingVertical: 15,
  },
  guardarTexto: { color: colors.ink, fontFamily: fontFamily.bodyExtraBold, fontSize: 14 },
  guardadoNota: { fontSize: 11, color: colors.green, textAlign: "center", marginTop: -6 },
  pie: { alignItems: "center", paddingBottom: 16 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});

