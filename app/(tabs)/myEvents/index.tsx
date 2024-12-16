import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function myEventsPage () {
    
  return (
    <View style={styles.eventPageContainer}>
        <View>
      <Button color="orange" title="+ Create New Event" onPress={()=>router.replace("/(tabs)/myEvents/newEvent")}/>
      </View>
      <View style={styles.mt20}>
        <Text>My Events</Text>
      </View>
      <View>
        <Text>Attending</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventPageContainer: {
    padding: 10,
    marginTop: 50,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  mt20: {
    marginTop: 30,
  },
});
