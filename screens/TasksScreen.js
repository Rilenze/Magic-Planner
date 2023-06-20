import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import Task from "../components/Task";

export default function TasksScreen({ navigation, route }) {
  const [tasks, setTasks] = useState([]);
  const [settings, setSettings] = useState({});
  const { accountID } = route.params;

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function fetchTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/${accountID}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks in TasksScreen:", error);
    }
  }

  async function fetchSettings() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/account/settings/${accountID}`
      );
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings in TasksScreen:", error);
    }
  }

  useEffect(() => {
    fetchTasks();
    fetchSettings();
  }, []);

  useEffect(() => {
    console.log("Backkkk");
  }, [navigation]);

  return (
    <View style={{ backgroundColor: settings.colorForBackground, flex: 1 }}>
      <ScrollView>
        <View style={styles.containerTasks}>
          <View style={styles.tasksWrapper}>
            <Text style={styles.title}>Prioritetni zadaci</Text>
            <View style={styles.tasks}>
              {tasks.map((task) => {
                if (task.priority) {
                  return (
                    <View key={task.id}>
                      <Pressable
                        onPress={() =>
                          navigation.navigate("SubTasks", {
                            taskID: task.id,
                            settings: settings,
                          })
                        }
                      >
                        <Task
                          task={task}
                          taskColor={settings.colorOfPriorityTask}
                          textSize={settings.fontSize}
                          textStyle={settings.font}
                        />
                      </Pressable>
                    </View>
                  );
                }
              })}
            </View>
            <Text style={styles.title}>Manje prioritetni zadaci</Text>
            <View style={styles.tasks}>
              {tasks.map((task) => {
                if (!task.priority) {
                  return (
                    <View key={task.id}>
                      <Pressable
                        onPress={() =>
                          navigation.navigate("SubTasks", {
                            taskID: task.id,
                            settings: settings,
                          })
                        }
                      >
                        <Task
                          task={task}
                          taskColor={settings.colorOfNormalTask}
                          textSize={settings.fontSize}
                          textStyle={settings.font}
                        />
                      </Pressable>
                    </View>
                  );
                }
              })}
            </View>
          </View>
        </View>
      </ScrollView>
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
