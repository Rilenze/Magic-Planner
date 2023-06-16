import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Task from "../components/Task";

export default function TasksScreen({ navigation, route }) {
  const [tasks, setTasks] = useState([]);
  const [settings, setSettings] = useState(null);
  const { accountID } = route.params;

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function fetchTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/${accountID}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  async function fetchSettings() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/account/settings/${accountID}`
      );
      const data = await response.json();
      console.log(data);
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  useEffect(() => {
    fetchTasks();
    fetchSettings();
  }, []);

  return (
    <View
      style={[
        styles.containerTasks,
        { backgroundColor: settings.colorForBackground },
      ]}
    >
      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>Zadaci</Text>
        <View style={styles.tasks}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTasks: {
    flex: 1,
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  tasks: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
