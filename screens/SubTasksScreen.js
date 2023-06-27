import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  BackHandler,
} from "react-native";
import SubTask from "../components/SubTask";

export default function SubTasksScreen({ navigation, route }) {
  const [subTasks, setSubTasks] = useState([]);
  const { task } = route.params;
  const { settings } = route.params;
  const { colorOfSubTask } = route.params;

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function fetchSubTasks() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/task/sub/${task.id}`
      );
      const data = await response.json();
      setSubTasks(data);
    } catch (error) {
      console.error("Failed to fetch subTasks in SubTasksScreen:", error);
    }
  }

  const returnToTasks = () => {
    navigation.popToTop();
    navigation.push("Tasks");
  };

  useEffect(() => {
    fetchSubTasks();

    const backAction = () => {
      navigation.popToTop();
      navigation.push("Tasks");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ backgroundColor: settings.colorForBackground, flex: 1 }}>
      <View style={styles.backButton}>
        <Button
          title="Vrati se na dnevne zadatke"
          onPress={returnToTasks}
        ></Button>
      </View>
      <ScrollView>
        <View style={styles.containerTasks}>
          <View style={styles.tasksWrapper}>
            <Text style={[styles.title, { color: settings.colorForFont }]}>
              Podzadaci
            </Text>
            <View style={styles.tasks}>
              {subTasks.map((subTask) => {
                return (
                  <View key={subTask.id}>
                    <SubTask
                      subTask={subTask}
                      subTaskColor={colorOfSubTask}
                      settings={settings}
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
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  tasks: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    width: 240,
    marginTop: 50,
    marginLeft: 20,
  },
});
