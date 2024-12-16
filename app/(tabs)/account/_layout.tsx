import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "index" }}
      />
      <Stack.Screen
        name="profile"
        options={{ headerShown: false, title: "Account" }}
      />
      <Stack.Screen
        name="signin"
        options={{ headerShown: false, title: "Sign In" }}
      />
      <Stack.Screen
        name="signup"
        options={{ headerShown: false, title: "Sign Up" }}
      />
    </Stack>
  );
}
