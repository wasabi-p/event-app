import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="eventsHome"
        options={{ headerShown: false, title: "eventsHome" }}
      />
      <Stack.Screen
        name="eventPage"
        options={{ headerShown: false, title: "eventPage" }}
      />
    </Stack>
  );
}
