import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

export default function Task({
  task,
  settings,
  taskColor,
  subTasks,
  updateTaskScreen,
}) {
  const [finishedSubTasks, setFinishedSubTasks] = useState(0);
  const [numberOfSubTasks, setNumberOfSubTasks] = useState(0);

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function updateFinishedTask() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/task/done/${task.id}`,
        {
          method: "PUT",
        }
      );
      console.log("Updated task with id: " + task.id);
    } catch (error) {
      console.error("Failed to update finished task in Task:", error);
    }
  }

  function countFinishedSubTasks() {
    let counter = 0;
    let total = 0;
    subTasks.forEach((subTask) => {
      if (subTask.done) counter++;
      total++;
    });
    if (counter == total) {
      updateTaskScreen();
      updateFinishedTask();
      console.log("updated");
    }
    setFinishedSubTasks(counter);
    setNumberOfSubTasks(total);
  }

  useEffect(() => {
    countFinishedSubTasks();
  }, [subTasks]);

  return (
    <>
      <View style={[styles.container, { backgroundColor: taskColor }]}>
        <Text
          style={[
            styles.defaultText,
            { fontSize: settings.fontSize, color: settings.colorForFont },
          ]}
        >
          Naziv zadatka:
        </Text>
        <Text
          style={{
            fontSize: settings.fontSize,
            color: settings.colorForFont,
            marginBottom: 20,
          }}
        >
          {task.taskName}
        </Text>

        {/* <Text
          style={[
            styles.defaultText,
            { fontSize: settings.fontSize, color: settings.colorForFont },
          ]}
        >
          Opis zadatka:
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: settings.fontSize,
            color: settings.colorForFont,
            marginBottom: 20,
          }}
        >
          {task.description}
        </Text> */}
        <Text
          style={[
            styles.defaultText,
            { fontSize: settings.fontSize, color: settings.colorForFont },
          ]}
        >
          Vrijeme izvršavanja:
        </Text>
        <Text
          style={{
            fontSize: settings.fontSize,
            color: settings.colorForFont,
          }}
        >
          {task.dueTime}
        </Text>
      </View>

      <View style={styles.progress}>
        {finishedSubTasks === 0 ? (
          <Progress.Bar
            width={null}
            height={15}
            borderColor={settings.colorForFont}
            borderWidth={2}
          />
        ) : (
          <Progress.Bar
            progress={finishedSubTasks / numberOfSubTasks}
            width={null}
            height={15}
            color={settings.colorForProgress}
            borderColor={settings.colorForFont}
            borderWidth={2}
          />
        )}
      </View>
      <Text
        style={[
          styles.progressText,
          { color: settings.colorForFont, fontSize: settings.fontSize },
        ]}
      >
        {finishedSubTasks} / {numberOfSubTasks}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    elevation: 8,
  },

  defaultText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  // progress: {
  //   borderWidth: 0.5,
  //   elevation: 15,
  // },
  progressText: {
    fontWeight: "bold",
    marginTop: 10,
  },
});
