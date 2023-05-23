import React from "react";
import { View, Text, StyleSheet, CheckBox } from "react-native";

export default function Task({ task }) {
  return (
    <View style={styles.container}>
      <Text style={styles.naziv}>Naziv zadatka: {task.taskName}</Text>
      <Text style={styles.opis}>Opis zadatka: {task.description}</Text>
      <Text>Rok izvršavanja: {task.dateOfCreation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  naziv: {},
  opis: {},
});
