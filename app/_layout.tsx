import { Stack } from "expo-router";
import { forceTouchGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
