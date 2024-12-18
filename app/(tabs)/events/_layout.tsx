import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "home" }}
      />
      <Stack.Screen
        name="eventPage"
        options={{ headerShown: false, title: "eventPage" }}
      />
    </Stack>
  );
}
