import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function Homepage() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(splashTimeout);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={{
            uri: "https://gckoifagibogjyspagxt.supabase.co/storage/v1/object/public/eventappbuckket/Events-cuate.png",
          }}
          style={{width:400, height:400}}
        />
        <Text style={styles.splashText}>What's Happening?</Text>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return <Redirect href={"/(tabs)/events"} />;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  splashText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "orange",
  },
});
