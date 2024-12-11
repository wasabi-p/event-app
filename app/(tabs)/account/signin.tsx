import { useState} from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import supabase from "@/lib/supabase";
import { Button, Input } from "@rneui/themed";
import { Link, router } from "expo-router";


export default function SignInLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    Alert.alert("Welcome back");
    router.replace("/(tabs)/home");

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.signInBanner}>
        <Text style={styles.signInText}>Sign In</Text>
      </View>
      <Text>
        Not registered with us yet? Why not{" "}
        <Link href="/(tabs)/account/signup" asChild>
          <Text style={styles.link}>Sign up!</Text>
        </Link>
      </Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          color="orange"
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 15,
  },
  signInBanner: {
    padding: 50,
    backgroundColor: "purple",
  },
  signInText: {
    fontSize: 30,
    color: "white",
  },
  link: {
    color: "purple",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 30,
  },
});
