import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SubTask from "../components/SubTask";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SubTasksScreen({ navigation, route }) {
  const { task } = route.params;
  const { settings } = route.params;
  const { colorOfSubTask } = route.params;
  const { subTasks } = route.params;

  return (
    <View style={{ backgroundColor: settings.colorForBackground, flex: 1 }}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Tasks")}
      >
        <Ionicons
          name="arrow-back"
          size={50}
          color={settings.colorForFont}
        ></Ionicons>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.containerTasks}>
          <View style={styles.tasksWrapper}>
            <Text style={[styles.title, { color: settings.colorForFont }]}>
              Opis zadatka
            </Text>
            <Text style={[styles.description, { fontSize: settings.fontSize }]}>
              {task.description}
            </Text>
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
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 10,
    marginLeft: 10,
  },
  description: {
    margin: 15,
  },
});
