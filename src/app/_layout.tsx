import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import { SpaceGrotesk_500Medium, SpaceGrotesk_700Bold } from "@expo-google-fonts/space-grotesk";

import { colors } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="orden/[id]" />
        <Stack.Screen name="inventario" />
        <Stack.Screen name="clientes" />
        <Stack.Screen name="compras" />
        <Stack.Screen name="proveedores" />
        <Stack.Screen name="empleados" />
        <Stack.Screen name="usuarios" />
        <Stack.Screen name="reportes" />
        <Stack.Screen name="tradein" />
        <Stack.Screen name="bitacora" />
        <Stack.Screen name="bd" />
        <Stack.Screen name="cobrar" />
        <Stack.Screen name="entregas" />
        <Stack.Screen name="tradein-gestion" />
        <Stack.Screen name="validacion" />
        <Stack.Screen name="especialidades" />
        <Stack.Screen name="cargos" />
        <Stack.Screen name="notificaciones" />
        <Stack.Screen name="perfil" />
      </Stack>
    </GestureHandlerRootView>
  );
}
