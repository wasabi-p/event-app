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
    <View style={styles.noUserPageContainer}>
      <View style={styles.noUserText}>
        <Text>Please log in to access this page</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noUserPageContainer: {
    flex:1,
    justifyContent: "center",
    alignItems:"center",
    backgroundColor:"#fff"
  },
  noUserText: {
    alignItems: "center",
    justifyContent: "center",
  },
});
