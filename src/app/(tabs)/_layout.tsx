import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { BottomNav } from "@/components/bottom-nav";
import { colors } from "@/constants/theme";

/**
 * Navegador de pestañas (5). Orden: Inicio · Taller · Más · Ventas · Empleados
 * La barra inferior es el componente BottomNav (custom) montado una sola vez,
 * con animaciones al seleccionar. Además, las pantallas permiten cambiar de
 * pestaña deslizando hacia los lados (SwipeTabs).
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.bg } }}
      tabBar={(props) => <BottomNav {...props} />}
    >
      <Tabs.Screen
        name="inicio"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="taller"
        options={{
          title: "Taller",
          tabBarIcon: ({ color }) => <Ionicons name="build" size={22} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="mas"
        options={{
          title: "Más",
          tabBarIcon: ({ color }) => <Ionicons name="apps" size={22} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="ventas"
        options={{
          title: "Ventas",
          tabBarIcon: ({ color }) => <Ionicons name="cart" size={22} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="empleados"
        options={{
          title: "Empleados",
          tabBarIcon: ({ color }) => <Ionicons name="people" size={22} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
