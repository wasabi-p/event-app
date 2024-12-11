import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import supabase from "@/app/lib/supabase";
import { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import EventCard from "@/app/components/EventCard";

export default function Tab() {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    getEventsList();
  }, []);

  async function getEventsList() {
    const { data } = await supabase.from("events").select();
    setEventsList(data);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.eventListContainer}>
        <FlatList
          data={eventsList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <EventCard event={item} />}
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
