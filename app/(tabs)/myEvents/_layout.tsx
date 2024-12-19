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
        name="newEventPage"
        options={{ headerShown: false, title: "newEventPage" }}
      />
      <Stack.Screen
        name="editEventPage"
        options={{ headerShown: false, title: "editEventPage" }}
      />
    </Stack>
  );
}
