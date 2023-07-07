import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

export default function Task({ task, settings, taskColor, subTasks }) {
  const [finishedSubTasks, setFinishedSubTasks] = useState(0);
  const [numberOfSubTasks, setNumberOfSubTasks] = useState(0);

  function countFinishedSubTasks() {
    let counter = 0;
    let total = 0;
    subTasks.forEach((subTask) => {
      if (subTask.done) counter++;
      total++;
    });
    setFinishedSubTasks(counter);
    setNumberOfSubTasks(total);
  }

  useEffect(() => {
    countFinishedSubTasks();
  }, [subTasks]);

  // useEffect(() => {
  //   countFinishedSubTasks();
  // }, [subTasks]);

  // if (!subTasks) {
  //   return (
  //     <View>
  //       <Text>Loading</Text>
  //     </View>
  //   );
  // }

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
    //borderColor: "black",
    //borderStyle: "solid",
    borderWidth: 3,
  },

  defaultText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  progressText: {
    fontWeight: "bold",
    marginTop: 10,
  },
});
