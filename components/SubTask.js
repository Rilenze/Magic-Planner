import React from "react";
import { View, Text, StyleSheet, CheckBox } from "react-native";

export default function SubTask({
  subTask,
  subTaskColor,
  textSize,
  textStyle,
  textColor,
}) {
  return (
    <View style={[styles.container, { backgroundColor: subTaskColor }]}>
      <Text style={{ fontSize: textSize, color: textColor }}>
        Opis zadatka: {subTask.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
});
