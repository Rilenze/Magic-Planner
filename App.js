import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Task from "./components/Task";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/task`, {
          mode: "cors",
        });
        const data = await response.json();
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Današnji zadaci:</Text>
      {tasks.map((task) => (
        <View>
          <Task key={task.accountId} task={task} />
        </View>
      ))}
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
