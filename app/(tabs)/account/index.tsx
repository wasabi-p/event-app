import { router } from "expo-router";
import { useEffect } from "react";
import supabase from "@/lib/supabase"

export default function IndexPage() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(tabs)/account/profile");
      } else {
        console.log("please login");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)/account/profile");
      } else {
        console.log("no user");
        router.replace("/(tabs)/account/signin");
      }
    });
  }, []);

}
