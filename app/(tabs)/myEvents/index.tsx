import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const myEventsPage = () => {
  return (
    <View style={styles.eventPageContainer}>
      <Text>My events page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  eventPageContainer: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  eventImage: {
    height: 200,
  },
});
export default myEventsPage;
