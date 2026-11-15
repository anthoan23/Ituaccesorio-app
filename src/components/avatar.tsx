import { Text, StyleSheet } from "react-native";

import { colors } from "@/constants/theme";

/** Avatar circular con degradado amarillo e inicial (como la web). */
export function Avatar({ inicial, size = 44 }: { inicial: string; size?: number }) {
  return (
    <Text
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, fontSize: size * 0.42 },
      ]}
    >
      {inicial.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  avatar: {
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 44,
    fontWeight: "800",
    color: colors.ink,
    backgroundColor: colors.yellow,
    borderWidth: 2,
    borderColor: colors.yellowSoft,
    overflow: "hidden",
  },
});
