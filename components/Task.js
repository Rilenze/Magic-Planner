import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

export default function Task({ task, taskColor, textSize, textStyle }) {
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
      {finishedSubTasks !== subTasks.length ? (
        <>
          <View style={[styles.container, { backgroundColor: taskColor }]}>
            <Text style={[styles.naziv, { fontSize: textSize }]}>
              Naziv zadatka: {task.taskName}
            </Text>
            <Text style={styles.opis}>Opis zadatka: {task.description}</Text>
            <Text>Datum izvršavanja: {task.dueDate}</Text>
            <Text>Vrijeme izvršavanja: {task.dueTime}</Text>
            {finishedSubTasks / subTasks.length == 1 ? (
              <Checkbox value={true} style={styles.checkbox} />
            ) : undefined}
          </View>
          {finishedSubTasks === 0 ? (
            <Progress.Bar width={300} color="blue" />
          ) : (
            <Progress.Bar
              progress={finishedSubTasks / subTasks.length}
              width={300}
              height={10}
              color="blue"
              borderColor="black"
              borderWidth={2}
            />
          )}
          <Text>
            {finishedSubTasks} / {subTasks.length}
          </Text>
        </>
      ) : undefined}
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
  checkbox: {
    marginTop: 10,
    width: 30,
    height: 30,
    borderRadius: 10,
    right: 15,
    bottom: 15,
    position: "absolute",
  },
});
