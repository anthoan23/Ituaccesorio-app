import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { colors, fontFamily } from "@/constants/theme";

type TabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  descriptors: Record<string, { options: { title?: string } }>;
  navigateToTab: (routeKey: string) => void;
  insets: { bottom: number };
};

/** Pestañas en orden — "Más" queda en el centro. */
const TABS = [
  { nombre: "inicio", etiqueta: "Inicio", icono: "home" },
  { nombre: "taller", etiqueta: "Taller", icono: "build" },
  { nombre: "mas", etiqueta: "Más", icono: "apps" },
  { nombre: "ventas", etiqueta: "Ventas", icono: "cart" },
  { nombre: "empleados", etiqueta: "Empleados", icono: "people" },
] as const;

type IconoKey = (typeof TABS)[number]["icono"];

const iconos: Record<string, IconoKey> = Object.fromEntries(
  TABS.map((t) => [t.nombre, t.icono]),
) as Record<string, IconoKey>;

/** Item individual con animación de rebote al activarse. */
function NavItem({
  focused,
  icono,
  etiqueta,
  onPress,
}: {
  focused: boolean;
  icono: IconoKey;
  etiqueta: string;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.22 : 1, { damping: 20, stiffness: 320 });
  }, [focused, scale]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable style={styles.item} hitSlop={4} onPress={onPress}>
      <Animated.View style={animStyle}>
        <Ionicons
          name={icono}
          size={22}
          color={focused ? colors.yellow : colors.textSoft}
        />
      </Animated.View>
      <Text style={[styles.label, { color: focused ? colors.yellow : colors.textSoft }]}>
        {etiqueta}
      </Text>
    </Pressable>
  );
}

/**
 * Barra de navegación inferior (custom del navegador Tabs).
 * Incluye indicador deslizante animado entre pestañas y "Más" al centro.
 */
export function BottomNav({ state, descriptors, navigateToTab, insets }: TabBarProps) {
  const [ancho, setAncho] = useState(0);
  const x = useSharedValue(0);

  const activeName = state.routes[state.index]?.name ?? "inicio";
  const activeIndex = Math.max(
    0,
    TABS.findIndex((t) => t.nombre === activeName),
  );
  const itemW = TABS.length ? ancho / TABS.length : 0;

  useEffect(() => {
    if (itemW > 0) {
      x.value = withSpring(activeIndex * itemW + (itemW - 34) / 2, {
        damping: 26,
        stiffness: 340,
      });
    }
  }, [activeIndex, itemW, x]);

  const indicadorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  return (
    <View
      style={[styles.barra, { paddingBottom: 8 + insets.bottom, height: 66 + insets.bottom }]}
      onLayout={(e) => setAncho(e.nativeEvent.layout.width)}
    >
      {/* Indicador deslizante */}
      <Animated.View style={[styles.indicador, indicadorStyle]} />

      {state.routes.map((route) => {
        const focused = route.name === activeName;
        const { options } = descriptors[route.key];
        const tab = TABS.find((t) => t.nombre === route.name);
        const etiqueta = options.title ?? tab?.etiqueta ?? route.name;

        return (
          <NavItem
            key={route.key}
            focused={focused}
            icono={iconos[route.name] ?? "ellipse"}
            etiqueta={etiqueta}
            onPress={() => navigateToTab(route.key)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: "row",
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 7,
  },
  item: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3 },
  label: { fontFamily: fontFamily.bodyMedium, fontSize: 11 },
  indicador: {
    position: "absolute",
    top: 0,
    width: 34,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.yellow,
  },
});
