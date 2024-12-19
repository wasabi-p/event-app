import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Event } from "@/utils/types";

interface myEventsCardProps {
  event: Event;
}

const MyEventsCard: React.FC<myEventsCardProps> = ({ event }) => (
  <View style={styles.myEventCard}>
      <Image source={{ uri: event.img }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventName}>{event.event_name}</Text>
        <Text style={styles.eventInfo}>{event.venue}</Text>
        <Text style={styles.eventInfo}>{event.event_date}</Text>
      </View>
  </View>
);

const styles = StyleSheet.create({
  myEventCard: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#f8f8f8",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  eventImage: {
    width: "30%",
    aspectRatio: 1
  },
  eventDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  eventInfo: {
    fontSize: 14,
    color: "#666",
  },
});

export default MyEventsCard;
