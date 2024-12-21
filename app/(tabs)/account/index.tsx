import { router } from "expo-router";
import { useEffect } from "react";
import supabase from "@/lib/supabase";


export default function AccountIndexPage() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(tabs)/account/profile");
      } else {
        router.replace("/(tabs)/account/signin");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)/account/profile");
      } else {
        router.replace("/(tabs)/account/signin");
      }
    });
  }, []);
}
