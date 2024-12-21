import { router, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function TabLayout() {

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "purple" }}>
     <Tabs.Screen
        name="events"
        options={{
          title: "Whats On",
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/events");
              }}
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <FontAwesome size={25} name="calendar" color="purple"/>
              <Text style={styles.tabTitle}>Whats On</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="myEvents"
        options={{
          title: "My Events",
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/myEvents");
              }}
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <FontAwesome size={25} name="list" color="purple"/>
              <Text style={styles.tabTitle}>Manage Events</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title:"Account",
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/account");
              }}
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <FontAwesome size={25} name="drivers-license" color="purple"/>
              <Text style={styles.tabTitle}>Account</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabTitle: {
    fontSize: 10,
    color: "purple",
}})