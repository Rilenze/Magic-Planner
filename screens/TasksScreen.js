import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import Task from "../components/Task";

export default function TasksScreen({ navigation, route }) {
  const [priorityTasks, setPriorityTasks] = useState([]);
  const [normalTasks, setNormalTasks] = useState([]);
  const [settings, setSettings] = useState({});
  const { accountID } = route.params;

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function fetchTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/${accountID}`);
      const data = await response.json();
      let priority = [];
      let normal = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].priority) priority.push(data[i]);
        else if (!data[i].priority) normal.push(data[i]);
      }
      setPriorityTasks(priority);
      setNormalTasks(normal);
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

  return (
    <View style={{ backgroundColor: settings.colorForBackground, flex: 1 }}>
      <ScrollView>
        <View style={styles.containerTasks}>
          <View style={styles.tasksWrapper}>
            <Text style={styles.title}>Prioritetni zadaci</Text>
            <View style={styles.tasks}>
              {priorityTasks.map((task) => {
                return (
                  <View key={task.id}>
                    <Pressable
                      style={styles.taskPressable}
                      onPress={() =>
                        navigation.navigate("SubTasks", {
                          taskID: task.id,
                          settings: settings,
                        })
                      }
                    >
                      <Task
                        task={task}
                        settings={settings}
                        taskColor={settings.colorOfPriorityTask}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </View>
            <Text style={styles.title}>Manje prioritetni zadaci</Text>
            <View style={styles.tasks}>
              {normalTasks.map((task) => {
                return (
                  <View key={task.id}>
                    <Pressable
                      style={styles.taskPressable}
                      onPress={() =>
                        navigation.navigate("SubTasks", {
                          taskID: task.id,
                          settings: settings,
                        })
                      }
                    >
                      <Task
                        task={task}
                        settings={settings}
                        taskColor={settings.colorOfNormalTask}
                      />
                    </Pressable>
                  </View>
                );
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
    //marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  taskPressable: {
    marginTop: 20,
  },
});
