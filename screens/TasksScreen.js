import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import Task from "../components/Task";

export default function TasksScreen({ navigation, route }) {
  const [priorityTasks, setPriorityTasks] = useState([]);
  const [normalTasks, setNormalTasks] = useState([]);
  const [settings, setSettings] = useState({});
  const { accountID } = route.params;

  // const settings = {
  //   id: 37,
  //   accountId: 37,
  //   font: "Palatino Linotype",
  //   fontSize: 22,
  //   colorOfPriorityTask: "#FF6347",
  //   colorOfNormalTask: "#FFFFFF",
  //   colorForSubtask: "#FF6347",
  //   colorForFont: "#141414",
  //   colorForBackground: "#FFD700",
  //   colorForProgress: "#00BFFF",
  //   phoneLoginString: "1AON081",
  // };

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  function getCurrentDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function todayTask(taskDate) {
    if (taskDate === getCurrentDate) return true;
    else return false;
  }

  function compareTimes(a, b) {
    if (a.dueTime > b.dueTime) return 1;
    if (a.dueTime < b.dueTime) return -1;
  }

  async function fetchTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/${accountID}`);
      const data = await response.json();
      let priority = [];
      let normal = [];

      data.forEach((element) => {
        if (!element.done && todayTask(element.dueDate)) {
          if (element.priority) priority.push(element);
          else if (!element.priority) normal.push(element);
        }
      });

      priority.sort(function (a, b) {
        return compareTimes(a, b);
      });

      normal.sort(function (a, b) {
        return compareTimes(a, b);
      });

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

  if (priorityTasks.length == 0 && normalTasks.length == 0) {
    return (
      <View
        style={[
          styles.congratulationsBox,
          { backgroundColor: settings.colorForBackground },
        ]}
      >
        <Text
          style={[styles.congratulationsText, { color: settings.colorForFont }]}
        >
          Čestitamo! Završili ste sve zadatke za danas!
        </Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: settings.colorForBackground, flex: 1 }}>
      <ScrollView>
        <View style={styles.containerTasks}>
          <View style={styles.tasksWrapper}>
            {priorityTasks.length != 0 ? (
              <>
                <Text style={[styles.title, { color: settings.colorForFont }]}>
                  Prioritetni zadaci
                </Text>
                <View style={styles.tasks}>
                  {priorityTasks.map((task) => {
                    return (
                      <View key={task.id}>
                        <Pressable
                          style={styles.taskPressable}
                          onPress={() =>
                            navigation.navigate("SubTasks", {
                              task: task,
                              settings: settings,
                              colorOfSubTask: settings.colorOfPriorityTask,
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
              </>
            ) : undefined}

            {normalTasks.length != 0 ? (
              <>
                <Text style={[styles.title, { color: settings.colorForFont }]}>
                  Manje prioritetni zadaci
                </Text>
                <View style={styles.tasks}>
                  {normalTasks.map((task) => {
                    return (
                      <View key={task.id}>
                        <Pressable
                          style={styles.taskPressable}
                          onPress={() =>
                            navigation.navigate("SubTasks", {
                              task: task,
                              settings: settings,
                              colorOfSubTask: settings.colorOfNormalTask,
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
              </>
            ) : undefined}
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
  congratulationsText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  congratulationsBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
