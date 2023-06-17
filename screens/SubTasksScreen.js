import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function SubTasksScreen({ navigation, route }) {
  const [subTasks, setSubTasks] = useState([]);
  const { taskID } = route.params;

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function fetchSubTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/sub/${taskID}`);
      const data = await response.json();
      console.log(data);
      setSubTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  useEffect(() => {
    fetchSubTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Taskovi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
