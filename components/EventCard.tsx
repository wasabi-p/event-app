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
        <Text style={styles.eventTitle}>{event.event_name}</Text>
        <Text style={styles.eventDetails}>{event.venue}</Text>
        <Text style={styles.eventDetails}>
          {event.event_date}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  eventImage: {
    height: 180,
    borderRadius: 3,
    width: "100%",
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  eventDetails: {
    fontSize: 14,
    color: "#777",
    lineHeight: 20,
  },
});

export default EventCard;
