import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

export default function Task({ task, taskColor, textSize, textStyle }) {
  const [subTasks, setSubTasks] = useState([]);
  const [finishedSubTasks, setFinishedSubTasks] = useState(0);

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function fetchSubTasks() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/task/sub/${task.id}`
      );
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
    fetchSubTasks();
  }, []);

  return (
    <>
      <View style={[styles.container, { backgroundColor: taskColor }]}>
        <Text style={[styles.naziv, { fontSize: textSize }]}>
          Naziv zadatka: {task.taskName}
        </Text>
        <Text style={styles.opis}>Opis zadatka: {task.description}</Text>
        <Text>Datum izvršavanja: {task.dueDate}</Text>
        <Text>Vrijeme izvršavanja: {task.dueTime}</Text>
      </View>
      {finishedSubTasks === 0 ? (
        <Progress.Bar width={300} color="blue" />
      ) : (
        <Progress.Bar
          progress={finishedSubTasks / subTasks.length}
          width={300}
          color="blue"
        />
      )}
      <Text>
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
  naziv: {},
  opis: {},
});
