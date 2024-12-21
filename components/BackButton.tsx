import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const BackButton = () => {
  const goBack = () => {
    router.back();
  };

  return (
    <View style={styles.goBackButton} onTouchEnd={goBack}>
      <View style={styles.backIcon}>
        <FontAwesome size={25} name="backward" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    padding: 1,
  },
  goBackButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
  },
});
export default BackButton;
