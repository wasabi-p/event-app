import supabase from "@/lib/supabase";
import { useEffect } from "react";
import { StyleSheet, View, Alert, Button, Text } from "react-native";
import { useState } from "react";
import { fetchUserId, getProfile } from "@/utils/utils";
import { Image } from "react-native";

export default function accountProfile() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const getUserAndProfile = async () => {
      setLoading(true)
      const userId = await fetchUserId();
      if (userId) {
        const profile = await getProfile(userId);
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
      <Text style={styles.title}>User Profile</Text>
      <Image source={{uri:"https://placehold.co/100x100/png"}} style={styles.profilePic}/>
      <Text style={styles.name}>{name}</Text>
      <Text>{email}</Text>
      <View style={styles.verticallySpaced}>
        <Button color="orange" title="Log Out" onPress={() => handleLogout()}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    padding: 15,
  },
  title:{
    fontSize: 30
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  profilePic:{
    height:100,
    aspectRatio:1
  },
  name:{
    fontSize:20
  },
  mt20: {
    marginTop: 20,
  },
});
