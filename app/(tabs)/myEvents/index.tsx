import { router } from "expo-router";
import { useEffect } from "react";
import supabase from "@/lib/supabase";
import { AppState, StyleSheet, Text, View } from "react-native";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

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
}