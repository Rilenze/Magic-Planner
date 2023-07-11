import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SubTask from "../components/SubTask";
import Ionicons from "@expo/vector-icons/Ionicons";
import CurrentDate from "../components/CurrentDate";

export default function SubTasksScreen({ navigation, route }) {
  const { task } = route.params;
  const { settings } = route.params;
  const { subTasks } = route.params;
  const [sortedSubTasks, setSortedSubTasks] = useState([]);

  useEffect(() => {
    sortSubTasks();
  }, []);

  const sortSubTasks = () => {
    const temp = [...subTasks];
    temp.sort(function (a, b) {
      if (a.done && !b.done) return 1;
      if (!a.done && b.done) return -1;
    });
    setSortedSubTasks(temp);
  };

  return (
    <View style={{ backgroundColor: settings.colorForBackground, flex: 1 }}>
      <CurrentDate settings={settings} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Tasks")}
      >
        <Ionicons name="arrow-back" size={50}></Ionicons>
      </TouchableOpacity>
      <Text style={[styles.title, { fontSize: settings.fontSize + 2 }]}>
        Opis zadatka
      </Text>
      <View style={styles.description}>
        <Text style={{ fontSize: settings.fontSize }}>{task.description}</Text>
      </View>
      <Text style={[styles.title, { fontSize: settings.fontSize + 2 }]}>
        Podzadaci
      </Text>
      <ScrollView style={styles.scroller}>
        {sortedSubTasks.map((subTask) => {
          return (
            <View key={subTask.id}>
              <SubTask
                subTask={subTask}
                subTaskColor={
                  task.priority
                    ? settings.colorOfPriorityTask
                    : settings.colorOfNormalTask
                }
                settings={settings}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroller: {
    marginHorizontal: 20,
    //borderWidth: 1.5,
    borderRadius: 15,
  },
  title: {
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 10,
    marginLeft: 15,
  },
  description: {
    marginLeft: 30,
    marginRight: 80,
    marginBottom: 10,
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
  },
});
