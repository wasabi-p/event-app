import { Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false,
            title: "home"
         }}
      />
    </Stack>
  );
}
