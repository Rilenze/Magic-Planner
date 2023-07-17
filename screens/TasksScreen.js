import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import Task from "../components/Task";
import WelcomeMessage from "../components/WelcomeMessage";
import LoadingAnimation from "../components/LoadingAnimation";
import CelebrationAnimation from "../components/CelebrationAnimation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchTasks,
  fetchAccount,
  fetchSettings,
  fetchSubTasks,
} from "../modules/fetchingData";
import CurrentDate from "../components/CurrentDate";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { CommonActions } from "@react-navigation/native";

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

  const alertFunction = () => {
    Alert.alert(
      "Da li ste sigurni da se želite odjaviti?",
      "Ako se odjavite ponovo ćete morati skenirati QR kod kako biste se prijavili.",
      [
        {
          text: "Ne",
          onPress: undefined,
          style: "cancel",
        },
        {
          text: "Da",
          onPress: logout,
        },
      ]
    );
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("account");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Home",
              params: { accountID: 0 },
            },
          ],
        })
      );
    } catch (e) {
      console.log("Error when storing data: " + e);
    }
  };

  const handleOnPress = (task) => {
    navigation.navigate("SubTasks", {
      task: task,
      settings: settings,
      subTasks: subTasks.get(task.id),
    });
  };

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
    return (
      <SafeAreaView
        style={{ backgroundColor: settings.colorForBackground, flex: 1 }}
      >
        <View>
          <CurrentDate settings={settings} />
          <TouchableOpacity style={styles.logoutButton} onPress={alertFunction}>
            <SimpleLineIcons name="logout" size={40}></SimpleLineIcons>
          </TouchableOpacity>
        </View>
        <CelebrationAnimation
          kidName={kidName}
          maleKid={maleKid}
          settings={settings}
        />
      </SafeAreaView>
    );
  else
    return (
      <SafeAreaView
        style={{ backgroundColor: settings.colorForBackground, flex: 1 }}
      >
        <View style={styles.header}>
          <CurrentDate settings={settings} />
          <TouchableOpacity style={styles.logoutButton} onPress={alertFunction}>
            <SimpleLineIcons name="logout" size={40}></SimpleLineIcons>
          </TouchableOpacity>
        </View>
        <WelcomeMessage name={kidName} male={maleKid} settings={settings} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
                          activeOpacity={0.6}
                          style={styles.taskPressable}
                          onPress={() => handleOnPress(task)}
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
                          activeOpacity={0.6}
                          style={styles.taskPressable}
                          onPress={() => {
                            handleOnPress(task);
                          }}
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
      </SafeAreaView>
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
  logoutButton: {
    marginTop: 15,
    marginLeft: 15,
  },
});
