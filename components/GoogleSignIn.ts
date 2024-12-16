import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import supabase from "@/lib/supabase";
import { router } from "expo-router";
import { Alert } from "react-native";

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo: any = await GoogleSignin.signIn();
    const { idToken} = userInfo.data;
    if (idToken) {
      const { error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken
      });
      Alert.alert("Welcome back");
      router.push("/(tabs)/events")
    } else {
      throw new Error("no ID token present!");
    }
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
     
    }
  }
};
