import supabase from "@/lib/supabase";
import { useEffect } from "react";
import { StyleSheet, View, Alert, Button, Text } from "react-native";
import { useState } from "react";
import { Profile } from "@/utils/types";

export default function accountProfile() {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        getProfile(user.id);
      }
    });
  }, []);

  async function getProfile(id: string) {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`first_name, surname, email`)
        .eq("user_id", id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setFirstName(data.first_name);
        setSurname(data.surname);
        setEmail(data.email);
      }
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    Alert.alert("Signed out!");
    if (error) {
      Alert.alert("Error Signing Out User", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{firstName}</Text>
      <Text>{surname}</Text>
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
