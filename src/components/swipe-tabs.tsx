import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

/**
 * Envuelve el contenido de una pestaña para cambiar de pestaña
 * deslizando hacia los lados (con gesto Pan de gesture-handler).
 */
export function SwipeTabs({
  onLeft,
  onRight,
  children,
}: {
  onLeft?: () => void;
  onRight?: () => void;
  children: ReactNode;
}) {
  const gesture = Gesture.Pan()
    .activeOffsetX([-24, 24])
    .failOffsetY([-14, 14])
    .onEnd((e) => {
      const dx = e.translationX;
      const dy = e.translationY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < 0) {
          onLeft?.();
        } else {
          onRight?.();
        }
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.fill}>{children}</View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
