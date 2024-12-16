import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Event } from "@/utils/types";
import { router } from "expo-router";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <View style={styles.eventCard}>
    <TouchableOpacity
      onPress={() => {
        router.push({ pathname: `/(tabs)/events/eventPage`, params: event });
      }}
    >
      <Image source={{ uri: event.img }} style={styles.eventImage} />
      <View>
        <Text>{event.event_name}</Text>
        <Text>📍 {event.venue}</Text>
        <Text>
          📅 {event.event_date}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  eventCard: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  eventImage: {
    height: 180,
  },
});

export default EventCard;
