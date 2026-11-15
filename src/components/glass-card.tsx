import { View, ViewProps, StyleSheet } from "react-native";

import { colors, radius } from "@/constants/theme";

/** Card de vidrio (glassmorphism) igual que la web. */
export function GlassCard({ style, ...rest }: ViewProps) {
  return (
    <View
      style={StyleSheet.flatten([
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: radius.xl,
          padding: 16,
        },
        style,
      ])}
      {...rest}
    />
  );
}
