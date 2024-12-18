import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import supabase from "@/lib/supabase";
import { Button, Input } from "@rneui/themed";
import { Link, router } from "expo-router";
import { signInWithGoogle } from "@/components/GoogleSignIn";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

export default function SignInLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  GoogleSignin.configure({
    webClientId:
      "872115393883-56gpu5o6n4vis3i4nb6rmg6s77e2m5qs.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/drive"],
    forceCodeForRefreshToken: true,
    offlineAccess: true,
    iosClientId:
      " 872115393883-v02kpfv8d14n2rhi5lceqrfv256gg14e.apps.googleusercontent.com",
  });

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    if (data?.session || data?.user) {
      Alert.alert("Welcome back");
      router.replace("/(tabs)/events");
    }
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
      <View style={[styles.signInForm, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.signInForm}>
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
      <View style={[styles.mt20]}>
        <Button
          color="orange"
          title="Sign in with Email"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={[styles.signInWithGoogle, styles.mt20]}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
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
  signInForm: {
    paddingTop: 4,
    paddingBottom: 4,
    alignItems: "center",
  },
  signInWithGoogle: {
    paddingTop: 4,
    paddingBottom: 4,
    alignItems: "center",
  },
  mt20: {
    marginTop: 30,
  },
});
