import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState, Text } from "react-native";
import supabase from "../../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SignUpLayout() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          firstName: firstName,
          surname: surname,
        },
      },
    });

    if (error) {
      console.log(error)
      Alert.alert(error.message)
    }
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Link href="/(tabs)/account/signin">
        <View style={styles.backIcon}>
          <FontAwesome size={25} name="arrow-left" />
        </View>
      </Link>
      <View style={styles.signUpBanner}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <View style={styles.verticallySpaced}>
          <Input
            label="First name"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Surname"
            onChangeText={(text) => setSurname(text)}
            value={surname}
            autoCapitalize={"none"}
          />
        </View>
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
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
          color="orange"
        />
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
  signUpBanner: {
    padding: 50,
    backgroundColor: "purple",
  },
  signUpText: {
    fontSize: 30,
    color: "white",
  },
  backIcon: {
    padding: 10,
  },
});
