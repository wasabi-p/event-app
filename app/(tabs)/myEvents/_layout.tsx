import { Stack } from "expo-router";

export default function myEventsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "index" }}
      />
    </Stack>
  );
}
