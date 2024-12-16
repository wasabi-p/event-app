import supabase from "@/lib/supabase";
import { useEffect } from "react";
import { StyleSheet, View, Alert, Button, Text } from "react-native";
import { useState } from "react";
import { fetchUser, getProfile } from "@/utils/utils";

export default function accountProfile() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const getUserAndProfile = async () => {
      setLoading(true)
      const user = await fetchUser();
      if (user) {
        const profile = await getProfile(user.id);
        if(profile){
          setName(profile.display_name)
          setEmail(profile.email)
          setLoading(false)
        }
      }
    };
    getUserAndProfile();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    Alert.alert("Signed out!");
    if (error) {
      Alert.alert("Error Signing Out User", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{email}</Text>
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
