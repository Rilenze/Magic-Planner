import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import SubTask from "../components/SubTask";

export default function SubTasksScreen({ navigation, route }) {
  const [subTasks, setSubTasks] = useState([]);
  const { subTaskID } = route.params;
  const { settings } = route.params;

  async function fetchSubTasks() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/task/sub/${subTaskID}`
      );
      const data = await response.json();
      setSubTasks(data);
    } catch (error) {
      console.error("Failed to fetch subTasks in SubTasksScreen:", error);
    }
  }

  useEffect(() => {
    fetchSubTasks;
  }, []);

  return (
    <>
      <ScrollView>
        <View
          style={[
            styles.containerTasks,
            { backgroundColor: settings.colorForBackground },
          ]}
        >
          <View style={styles.tasksWrapper}>
            <Text style={styles.title}>Podzadaciiii</Text>
            <View style={styles.tasks}>
              {subTasks.map((subTask) => {
                if (task.priority) {
                  return (
                    <View key={subTask.id}>
                      <SubTask
                        subTask={subTask}
                        subTaskColor={settings.colorForSubtask}
                        textSize={settings.fontSize}
                        textStyle={settings.font}
                      />
                    </View>
                  );
                }
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
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
