import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Event } from "@/utils/types";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

interface myEventsCardProps {
  event: Event;
}

const MyEventsCard: React.FC<myEventsCardProps> = ({ event }) => (
  <View style={styles.myEventCard}>
     <TouchableOpacity style={styles.editIcon} onPress={() => {
        router.push({ pathname: `/(tabs)/myEvents/editEventPage`, params: event });
      }}>
      <View>
      <FontAwesome name="pencil" size={25} color="#666" />
      </View>
    </TouchableOpacity>
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
    padding: 7.5,
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
    width: "25%",
    aspectRatio: 1
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
  editIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1, 
  }
});

export default MyEventsCard;
