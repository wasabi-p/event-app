import { Input } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  fetchUserId,
  getEventDetails,
} from "@/utils/utils";
import BackButton from "@/components/BackButton";
import supabase from "@/lib/supabase";
import dayjs from "dayjs";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";

export default function newEvent() {
  const [eventName, setEventName] = useState("");
  const [venue, setVenue] = useState("");
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [organiser, setOrganiser] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { event_id } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await fetchUserId();
      setOrganiser(currentUser);

      if (event_id) {
        const eventData = await getEventDetails(+event_id);

        if (eventData) {
          setEventName(eventData.event_name);
          setVenue(eventData.venue);
          setDate(new Date(eventData.event_date));
          setTime(new Date(`1988-05-25T${eventData.start_time}Z`));
          setDescription(eventData.description);
        } else {
          Alert.alert("Error", "Failed to fetch event details");
        }
      }
    };
    fetchData();
  }, [event_id]);

  const handleUpdateEvent = async () => {
    setIsUpdating(true);
    const eventDate = dayjs(date).format("YYYY-MM-DD");
    const startTime = dayjs(time).format("HH:mm:ss");

    const { error } = await supabase
      .from("events")
      .update({
        event_name: eventName,
        venue: venue,
        event_date: eventDate,
        start_time: startTime,
        description: description,
        event_organiser: organiser,
      })
      .eq("event_id", event_id);

    if (error) {
      Alert.alert("Error", error.message);
      setIsUpdating(false);
    } else {
      Alert.alert("Success", "Event updated!");
      router.push("/(tabs)/myEvents");
    }
  };

  const handleDeleteEvent = async () => {
    if (!event_id) {
      Alert.alert("Error", "No event ID found to delete.");
      return;
    }

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("event_id", event_id);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Event deleted");
      router.push("/(tabs)/myEvents");
    }
  };

  const isFormValid = () => {
    return eventName && venue && description && organiser && !isUpdating;
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <BackButton />
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteEvent}>
        <View>
          <FontAwesome name="trash" size={25} color="black" />
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>Edit Event Details</Text>
      <View style={styles.formContainer}>
        <Input
          label="Event Name"
          value={eventName}
          onChangeText={setEventName}
        />
        <Input label="Venue" value={venue} onChangeText={setVenue} />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={8}
        />
        <View>
          <View>
            <Button
              title={`Select Date: ${dayjs(date).format("YYYY-MM-DD")}`}
              onPress={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <Button
              title={`Select Time: ${dayjs(time).format("HH:mm:ss")}`}
              onPress={() => setShowTimePicker(true)}
            />
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.submitButton}>
        <Button
          color="orange"
          title={isUpdating ? "Updating..." : "Update Event"}
          onPress={() => handleUpdateEvent()}
          disabled={!isFormValid()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
  formContainer: {
    padding: 15,
    width: "100%",
  },
  deleteButton: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "red",
    borderRadius: 2,
  },
  submitButton: {
    margin: 10,
    alignSelf: "stretch",
  },
});
