import supabase from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { StyleSheet, View, Alert, Button } from "react-native";

export default function accountSettings({session}:{session:Session}) {

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      if(session){
        console.log(session.data.session?.user.id)
      }
    });
  }, [session]);
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    Alert.alert("Signed out!");
    if (error) {
      Alert.alert("Error Signing Out User", error.message);
    }
  };

  return (
    <View style={styles.container}>
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
