import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Task from "../components/Task";
import WelcomeMessage from "../components/WelcomeMessage";
import LoadingAnimation from "../components/LoadingAnimation";

export default function TasksScreen({ navigation, route }) {
  const [kidName, setKidName] = useState(null);
  const [maleKid, setMaleKid] = useState(null);
  const [priorityTasks, setPriorityTasks] = useState(null);
  const [normalTasks, setNormalTasks] = useState(null);
  const [subTasks, setSubTasks] = useState(null);
  //const [settings, setSettings] = useState({});
  const { accountID } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAccount();
    fetchTasks();
    //fetchSettings();

    const unsubscribe = navigation.addListener("focus", () => {
      // Perform actions or updates when the screen is focused
      fetchTasks();
    });

    return unsubscribe;
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTasks();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const settings = {
    id: 37,
    accountId: 37,
    font: "Palatino Linotype",
    fontSize: 22,
    colorOfPriorityTask: "#FF6347",
    colorOfNormalTask: "#00BFFF",
    colorForSubtask: "#FF6347",
    colorForFont: "#141414",
    colorForBackground: "#F5FFFA",
    colorForProgress: "#009900",
    phoneLoginString: "1AON081",
  };

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
    if (taskDate == getCurrentDate()) return true;
    else return false;
  }

  function compareTimes(a, b) {
    if (a.dueTime > b.dueTime) return 1;
    if (a.dueTime < b.dueTime) return -1;
  }

  async function fetchAccount() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/accounts/${accountID}`
      );
      const data = await response.json();
      setKidName(data.kidName);
      setMaleKid(data.kidMale);
    } catch (error) {
      console.error("Failed to fetch account in TasksScreen:", error);
    }
  }

  async function fetchTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/${accountID}`);
      const data = await response.json();
      fetchSubTasks(data);
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

  async function fetchSubTasks(tasks) {
    try {
      let temp = new Map();

      for (let i = 0; i < tasks.length; i++) {
        const url = `${API_BASE_URL}/api/v1/task/sub/${tasks[i].id}`;
        const response = await fetch(url);
        const data = await response.json();
        temp.set(tasks[i].id, data);
      }
      setSubTasks(temp);
    } catch (error) {
      console.error("Failed to fetch subTasks in TasksScreen:", error);
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

  if (
    subTasks == null ||
    priorityTasks == null ||
    normalTasks == null ||
    kidName == null ||
    maleKid == null ||
    settings == null
  )
    return <LoadingAnimation />;
  else if (priorityTasks.length == 0 && normalTasks.length == 0)
    return <WelcomeMessage name={kidName} male={maleKid} />;
  else
    return (
      <View style={{ backgroundColor: settings.colorForBackground, flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <WelcomeMessage name={kidName} male={maleKid} />

          {priorityTasks.length != 0 ? (
            <>
              <Text style={[styles.title, { color: settings.colorForFont }]}>
                Prioritetni zadaci
              </Text>
              <View style={styles.tasks}>
                <ScrollView
                  horizontal
                  decelerationRate={0.9}
                  snapToInterval={305} //your element width
                  snapToAlignment={"start"}
                  showsHorizontalScrollIndicator={false}
                >
                  {priorityTasks.map((task) => {
                    return (
                      <View key={task.id}>
                        <TouchableOpacity
                          style={styles.taskPressable}
                          onPress={() =>
                            navigation.navigate("SubTasks", {
                              task: task,
                              settings: settings,
                              colorOfSubTask: settings.colorOfPriorityTask,
                              subTasks: subTasks.get(task.id),
                            })
                          }
                        >
                          <Task
                            task={task}
                            settings={settings}
                            taskColor={settings.colorOfPriorityTask}
                            subTasks={subTasks.get(task.id)}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </>
          ) : undefined}

          {normalTasks.length != 0 ? (
            <>
              <Text style={[styles.title, { color: settings.colorForFont }]}>
                Manje prioritetni zadaci
              </Text>
              <View style={styles.tasks}>
                <ScrollView
                  horizontal
                  decelerationRate={0.9}
                  snapToInterval={305} //your element width
                  snapToAlignment={"start"}
                  showsHorizontalScrollIndicator={false}
                >
                  {normalTasks.map((task) => {
                    return (
                      <View key={task.id}>
                        <TouchableOpacity
                          style={styles.taskPressable}
                          onPress={() =>
                            navigation.navigate("SubTasks", {
                              task: task,
                              settings: settings,
                              colorOfSubTask: settings.colorOfNormalTask,
                              subTasks: subTasks.get(task.id),
                            })
                          }
                        >
                          <Task
                            task={task}
                            settings={settings}
                            taskColor={settings.colorOfNormalTask}
                            subTasks={subTasks.get(task.id)}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </>
          ) : undefined}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  // containerTasks: {
  //   flex: 1,
  //   marginTop: 50,
  // },
  // tasksWrapper: {
  //   paddingHorizontal: 25,
  // },
  tasks: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 25,
    marginBottom: 25,
  },
  taskPressable: {
    //marginTop: 20,
    width: 280,
    marginLeft: 25,
  },
  congratulationBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  congratulationsText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
