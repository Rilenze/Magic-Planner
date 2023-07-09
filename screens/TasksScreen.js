import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Task from "../components/Task";
import WelcomeMessage from "../components/WelcomeMessage";
import LoadingAnimation from "../components/LoadingAnimation";
import CelebrationAnimation from "../components/CelebrationAnimation";
import {
  fetchTasks,
  fetchAccount,
  fetchSettings,
  fetchSubTasks,
} from "../modules/fetchingData";

export default function TasksScreen({ navigation, route }) {
  const [kidName, setKidName] = useState(null);
  const [maleKid, setMaleKid] = useState(null);
  const [priorityTasks, setPriorityTasks] = useState(null);
  const [normalTasks, setNormalTasks] = useState(null);
  const [subTasks, setSubTasks] = useState(null);
  const [settings, setSettings] = useState({});
  const { accountID } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, []);

  async function fetchData() {
    try {
      const { data, priority, normal } = await fetchTasks(accountID);
      setPriorityTasks(priority);
      setNormalTasks(normal);

      const { name, gender } = await fetchAccount(accountID);
      setKidName(name);
      setMaleKid(gender);

      const setting = await fetchSettings(accountID);
      setting.colorForBackground = "#F5FFFA";
      setting.colorOfPriorityTask = "#FF6347";
      setting.colorOfNormalTask = "#00BFFF";
      setting.colorForProgress = "#00b200";
      setting.colorForFont = "#141414";
      setSettings(setting);

      const allSubTasks = await fetchSubTasks(data);
      setSubTasks(allSubTasks);
    } catch (error) {
      console.error("Failed to fetch data in TasksScreen:", error);
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // const settings = {
  //   id: 37,
  //   accountId: 37,
  //   font: "Palatino Linotype",
  //   fontSize: 22,
  //   colorOfPriorityTask: "#FF6347",
  //   colorOfNormalTask: "#00BFFF",
  //   colorForSubtask: "#FF6347",
  //   colorForFont: "#141414",
  //   colorForBackground: "#F5FFFA",
  //   colorForProgress: "#00b200",
  //   phoneLoginString: "1AON081",
  // };

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
    return <CelebrationAnimation kidName={kidName} maleKid={maleKid} />;
  else
    return (
      <View style={{ backgroundColor: settings.colorForBackground, flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <WelcomeMessage name={kidName} male={maleKid} settings={settings} />

          {priorityTasks.length != 0 ? (
            <>
              <Text style={[styles.title, { fontSize: settings.fontSize + 2 }]}>
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
                    if (subTasks.get(task.id).length == 0) return null;
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
                            updateTaskScreen={fetchData}
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
              <Text style={[styles.title, { fontSize: settings.fontSize + 2 }]}>
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
                    if (subTasks.get(task.id).length == 0) return null;
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
                            updateTaskScreen={fetchData}
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
