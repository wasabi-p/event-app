import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "index" }}
      />
      <Stack.Screen
        name="eventPage"
        options={{ headerShown: false, title: "eventPage" }}
      />
    </Stack>
  );
}
