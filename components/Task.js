import React from "react";
import { View, Text, StyleSheet, CheckBox } from "react-native";

export default function Task({ task, taskColor, textSize, textStyle }) {
  return (
    <View style={[styles.container, { backgroundColor: taskColor }]}>
      <Text style={[styles.naziv, { fontSize: textSize }]}>
        Naziv zadatka: {task.taskName}
      </Text>
      <Text style={styles.opis}>Opis zadatka: {task.description}</Text>
      <Text>Rok izvršavanja: {task.dueDate + " " + task.dueTime}</Text>
    </View>
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
