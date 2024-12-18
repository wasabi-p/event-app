import { Stack } from "expo-router";

export default function myEventsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "index" }}
      />
      <Stack.Screen
        name="myEventsPage"
        options={{ headerShown: false, title: "myEventsPage" }}
      />
      <Stack.Screen
        name="newEvent"
        options={{ headerShown: false, title: "newEvent" }}
      />
    </Stack>
  );
}
