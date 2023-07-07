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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SubTasksScreen({ navigation, route }) {
  const { task } = route.params;
  const { settings } = route.params;
  const { colorOfSubTask } = route.params;
  const { subTasks } = route.params;

  const returnToTasks = () => {
    navigation.navigate("Tasks");
  };

  return (
    <View style={{ backgroundColor: settings.colorForBackground, flex: 1 }}>
      <View style={styles.backButton}>
        <Ionicons
          name="arrow-back"
          onPress={returnToTasks}
          size={50}
          color={settings.colorForFont}
        ></Ionicons>
      </View>
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
