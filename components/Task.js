import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { updateFinishedTask } from "../modules/fetchingData";

export default function Task({
  task,
  settings,
  taskColor,
  subTasks,
  updateTaskScreen,
}) {
  const [finishedSubTasks, setFinishedSubTasks] = useState(0);
  const [numberOfSubTasks, setNumberOfSubTasks] = useState(0);

  function countFinishedSubTasks() {
    let counter = 0;
    let total = 0;
    subTasks.forEach((subTask) => {
      if (subTask.done) counter++;
      total++;
    });
    if (counter == total) {
      updateTaskScreen();
      updateFinishedTask(task.id);
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
            {
              fontSize: settings.fontSize + 1,
              color: settings.colorForFont,
              fontFamily: settings.font,
            },
          ]}
        >
          Naziv zadatka:
        </Text>
        <Text
          style={{
            fontSize: settings.fontSize,
            color: settings.colorForFont,
            marginBottom: 20,
            fontFamily: settings.font,
            textDecorationLine: "underline",
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
        <View style={styles.time}>
          <Text
            style={[
              styles.defaultText,
              {
                fontSize: settings.fontSize + 1,
                color: settings.colorForFont,
                fontFamily: settings.font,
              },
            ]}
          >
            Rok izvršavanja:
          </Text>
          <Text
            style={{
              fontSize: settings.fontSize,
              color: settings.colorForFont,
              fontFamily: settings.font,
              textDecorationLine: "underline",
            }}
          >
            {task.dueTime}
          </Text>
        </View>
      </View>
      {/* <Text style={[styles.progressPercent, { fontSize: settings.fontSize }]}>
        {Math.round((finishedSubTasks * 100) / numberOfSubTasks)} %
      </Text> */}
      <View style={styles.progress}>
        {finishedSubTasks === 0 ? (
          <Progress.Bar
            width={null}
            height={15}
            borderColor={"black"}
            borderWidth={2}
          />
        ) : (
          <Progress.Bar
            progress={finishedSubTasks / numberOfSubTasks}
            width={null}
            height={15}
            color={settings.colorForProgress}
            borderColor={"black"}
            borderWidth={2}
          />
        )}
      </View>

      <Text
        style={[
          styles.progressText,
          { fontSize: settings.fontSize - 1, fontFamily: settings.font },
        ]}
      >
        {finishedSubTasks} od {numberOfSubTasks} završenih podzataka
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    elevation: 8,
  },
  progressText: {
    marginTop: 10,
    opacity: 0.8,
  },
});
