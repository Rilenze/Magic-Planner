import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

export default function Task({ task, settings, taskColor }) {
  const [finishedSubTasks, setFinishedSubTasks] = useState(0);
  const [subTasks, setSubTasks] = useState([]);

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function fetchSubTasks(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/sub/${id}`);
      const data = await response.json();
      setSubTasks(data);
      let counter = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].done) counter++;
      }
      setFinishedSubTasks(counter);
    } catch (error) {
      console.error("Failed to fetch subTasks in Task:", error);
    }
  }

  useEffect(() => {
    fetchSubTasks(task.id);
  }, []);

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

        <Text
          style={[
            styles.defaultText,
            { fontSize: settings.fontSize, color: settings.colorForFont },
          ]}
        >
          Opis zadatka:
        </Text>
        <Text
          style={{
            fontSize: settings.fontSize,
            color: settings.colorForFont,
            marginBottom: 20,
          }}
        >
          {task.description}
        </Text>
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
          progress={finishedSubTasks / subTasks.length}
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
        {finishedSubTasks} / {subTasks.length}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
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
