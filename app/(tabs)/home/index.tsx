import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import supabase from "@/app/lib/supabase";
import { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Tab() {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    getEventsList();
  }, []);

  async function getEventsList() {
    const { data } = await supabase.from("events").select();
    setEventsList(data);
  }
  const eventCard = ({ item }) => (
    <View style={styles.eventCard}>
      <Image source={{ uri: item.img }} style={styles.eventImage} />
      <View>
        <Text>{item.event_name}</Text>
        <Text>{item.description}</Text>
        <Text>
          📅 {item.event_date} 🕒 {item.start_time}
        </Text>
        <Text>📍 {item.venue}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.eventListContainer}>
        <FlatList
          data={eventsList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={eventCard}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  eventListContainer: {
    flex: 1,
    marginTop: 0,
  },
  eventCard: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  eventImage: {
    height: 180,
  },
});
