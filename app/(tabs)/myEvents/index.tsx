import { router } from "expo-router";
import { useEffect } from "react";
import supabase from "@/lib/supabase";
import { StyleSheet, Text, View } from "react-native";

export default function MyEventsIndexPage() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(tabs)/myEvents/myEventsPage");
      } else {
        router.replace("/(tabs)/account/signin");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)/myEvents/myEventsPage");
      } else {
        router.replace("/(tabs)/account/signin");
      }
    });
  }, []);

  return (
    <View style={styles.messageContainer}>
      <Text style={styles.message}>Please Log into your account</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
  },
});
