import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Event } from "@/utils/types";
import { router } from "expo-router";

interface myAttendingCardProps {
  event: Event;
}

const MyAttendingEventCard: React.FC<myAttendingCardProps> = ({ event }) => (
  <TouchableOpacity
  onPress={() => {
    router.push({ pathname: `/(tabs)/events/eventPage`, params: event });
  }}>
  <View style={styles.cardContainer}>
    <Image source={{ uri: event.img }} style={styles.eventImage} />
    <View style={styles.eventDetails}>
      <Text style={styles.eventName}>{event.event_name}</Text>
      <Text style={styles.eventInfo}>{event.venue}</Text>
      <Text style={styles.eventInfo}>{event.event_date}</Text>
    </View>
  </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 7.5,
    marginVertical: 2,
    backgroundColor: "#f8f8f8",
  },
  eventImage: {
    width: "25%",
    aspectRatio: 1,
  },
  eventDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  eventName: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 4,
  },
  eventInfo: {
    fontSize: 14,
    color: "#666",
  },
});
export default MyAttendingEventCard;
