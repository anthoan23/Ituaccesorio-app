import { TextInput, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, fontFamily } from "@/constants/theme";

/** Buscador de vidrio con borde amarillo translúcido (funcional). */
export function SearchField({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder?: string;
  value?: string;
  onChangeText?: (v: string) => void;
}) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="search" size={16} color={colors.textSoft} />
      <TextInput
        style={styles.input}
        placeholder={placeholder ?? "Buscar..."}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.lg,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  input: { flex: 1, color: colors.text, fontFamily: fontFamily.bodyMedium, fontSize: 14 },
});
