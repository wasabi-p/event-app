import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function TabLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
  }, []);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "purple" }}>
      <Tabs.Screen
        name="events"
        options={{
          title: "Whats On",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myEvents"
        options={{
          title: "My Events",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: session ? "Account" : "Log In",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="drivers-license" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
