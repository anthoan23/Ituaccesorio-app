import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { colors, fontFamily } from "@/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.bg },
        tabBarActiveTintColor: colors.yellow,
        tabBarInactiveTintColor: colors.textSoft,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontFamily: fontFamily.bodyMedium, fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="index"
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
        name="ventas"
        options={{
          title: "Ventas",
          tabBarIcon: ({ color }) => <Ionicons name="cart" size={22} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="mas"
        options={{
          title: "Más",
          tabBarIcon: ({ color }) => <Ionicons name="apps" size={22} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
