import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import SubTask from "../components/SubTask";

export default function SubTasksScreen({ navigation, route }) {
  const [subTasks, setSubTasks] = useState([]);
  const { taskID } = route.params;
  const { settings } = route.params;

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function fetchSubTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/sub/${taskID}`);
      const data = await response.json();
      setSubTasks(data);
    } catch (error) {
      console.error("Failed to fetch subTasks in SubTasksScreen:", error);
    }
  }

  useEffect(() => {
    fetchSubTasks();
  }, []);

  return (
    <View style={{ backgroundColor: settings.colorForBackground, flex: 1 }}>
      <ScrollView>
        <View style={styles.containerTasks}>
          <View style={styles.tasksWrapper}>
            <Text style={styles.title}>Podzadaci</Text>
            <View style={styles.tasks}>
              {subTasks.map((subTask) => {
                return (
                  <View key={subTask.id}>
                    <SubTask
                      subTask={subTask}
                      subTaskColor={settings.colorForSubtask}
                      textSize={settings.fontSize}
                      textStyle={settings.font}
                      textColor={settings.colorForFont}
                    />
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
