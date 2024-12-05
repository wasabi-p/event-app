import supabase from "@/app/lib/supabase";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Alert, Button, AppState, Text } from "react-native";

export default function accountSettings() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      } else {
        console.log("Error Acessing user details");
      }
    });
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    Alert.alert("signed out");
    if (error) {
      Alert.alert("Error Signing Out User", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text></Text>
      <View style={styles.verticallySpaced}>
        <Button title="Log Out" onPress={() => handleLogout()}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 15,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
