import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { GlassCard } from "@/components/glass-card";
import { ThemedText } from "@/components/themed-text";
import { ADMIN_PASSWORD, ADMIN_USER } from "@/data/mock";
import { colors, fontFamily, radius, spacing } from "@/constants/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [error, setError] = useState(false);

  const iniciarSesion = () => {
    if (usuario === ADMIN_USER && password === ADMIN_PASSWORD) {
      setError(false);
      router.replace("/inicio");
    } else {
      setError(true);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Marca */}
        <View style={styles.marca}>
          <View style={styles.logoIcono}>
            <Ionicons name="phone-portrait" size={26} color={colors.yellow} />
          </View>
          <Text style={styles.logoTexto}>ITUACCESORIO</Text>
          <ThemedText type="body" style={styles.eslogan}>
            Ventas, Reparaciones y Accesorios para Teléfonos
          </ThemedText>
        </View>

        {/* Formulario */}
        <GlassCard style={styles.formCard}>
          <ThemedText type="label" style={styles.formEyebrow}>
            Acceso Técnico & Clientes
          </ThemedText>
          <ThemedText type="subtitle" style={styles.formTitulo}>
            BIENVENIDO
          </ThemedText>
          <ThemedText type="body" style={styles.formAyuda}>
            Ingresa tus credenciales para continuar
          </ThemedText>

          <View style={styles.campo}>
            <ThemedText type="label" style={styles.campoLabel}>
              Usuario o Correo
            </ThemedText>
            <View style={styles.inputWrap}>
              <Ionicons name="person" size={16} color={colors.textSoft} />
              <TextInput
                style={styles.input}
                placeholder="Usuario o correo electrónico"
                placeholderTextColor={colors.placeholder}
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.campo}>
            <ThemedText type="label" style={styles.campoLabel}>
              Contraseña
            </ThemedText>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed" size={16} color={colors.textSoft} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={colors.placeholder}
                secureTextEntry={!verPassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Pressable hitSlop={10} onPress={() => setVerPassword((v) => !v)}>
                <Ionicons name={verPassword ? "eye-off" : "eye"} size={18} color={colors.textSoft} />
              </Pressable>
            </View>
          </View>

          {error && (
            <ThemedText style={styles.error}>
              <Ionicons name="alert-circle" size={13} color={colors.red} /> Usuario o contraseña incorrectos
            </ThemedText>
          )}

          <Pressable style={({ pressed }) => [styles.boton, pressed && { opacity: 0.85 }]} onPress={iniciarSesion}>
            <Text style={styles.botonTexto}>INICIAR SESIÓN</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.ink} />
          </Pressable>

          <View style={styles.divisor} />
          <ThemedText type="body" style={styles.linkAmarillo}>
            ¿Olvidaste tu contraseña?
          </ThemedText>
          <ThemedText type="body" style={styles.registro}>
            ¿No tienes cuenta? <ThemedText type="body" style={styles.registroLink}>Regístrate</ThemedText>
          </ThemedText>
        </GlassCard>

        {/* Badges inferiores */}
        <View style={styles.badgesRow}>
          <Ionicons name="shield-checkmark" size={14} color={colors.yellow} />
          <ThemedText type="label" style={styles.badge}>
            Garantía Oficial
          </ThemedText>
          <View style={styles.badgePunto} />
          <Ionicons name="flash" size={14} color={colors.green} />
          <ThemedText type="label" style={styles.badge}>
            Reparaciones Express
          </ThemedText>
        </View>

        <View style={styles.pie}>
          <ThemedText type="body" style={styles.pieTexto}>
            Soporte • Términos • Privacidad
          </ThemedText>
          <ThemedText type="body" style={styles.pieVersion}>
            v1.0.0 · iTUACCESORIO
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: spacing.xl, paddingTop: spacing.xxl, paddingBottom: spacing.xxl, gap: spacing.xl },
  marca: { alignItems: "center", gap: 6 },
  logoIcono: {
    width: 56, height: 56, borderRadius: radius.lg,
    borderWidth: 1.5, borderColor: `${colors.yellow}66`, backgroundColor: `${colors.yellow}14`,
    alignItems: "center", justifyContent: "center", marginBottom: 4,
  },
  logoTexto: { fontFamily: fontFamily.bodyExtraBold, fontSize: 26, letterSpacing: 4.5, color: colors.text },
  eslogan: { fontSize: 12, textAlign: "center", maxWidth: 280 },
  formCard: { gap: spacing.sm, padding: 20 },
  formEyebrow: { color: colors.yellow, letterSpacing: 1.2 },
  formTitulo: { fontSize: 24, marginTop: 2 },
  formAyuda: { marginBottom: spacing.sm },
  campo: { gap: 6 },
  campoLabel: { fontSize: 10 },
  inputWrap: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.inputBorder,
    borderRadius: radius.md, paddingHorizontal: 12, height: 48,
  },
  input: { flex: 1, color: colors.text, fontFamily: fontFamily.bodyMedium, fontSize: 14 },
  error: { color: colors.red, fontSize: 12, fontFamily: fontFamily.bodyBold },
  boton: {
    backgroundColor: colors.yellow, borderRadius: radius.md, height: 50,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: spacing.xs,
  },
  botonTexto: { fontFamily: fontFamily.bodyExtraBold, color: colors.ink, fontSize: 14, letterSpacing: 0.5 },
  divisor: { height: 1, backgroundColor: colors.borderSoft, marginTop: spacing.lg },
  linkAmarillo: { color: colors.yellow, fontFamily: fontFamily.bodyBold, textAlign: "center", marginTop: spacing.md },
  registro: { textAlign: "center" },
  registroLink: { color: colors.text, fontFamily: fontFamily.bodyBold, textDecorationLine: "underline" },
  badgesRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  badge: { fontSize: 9 },
  badgePunto: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.textSoft },
  pie: { alignItems: "center", gap: 6, paddingBottom: spacing.lg },
  pieTexto: { fontSize: 12 },
  pieVersion: { fontSize: 11, color: colors.textSoft },
});
