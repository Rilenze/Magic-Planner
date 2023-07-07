import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

export default function SubTask({ subTask, subTaskColor, settings }) {
  const [isChecked, setChecked] = useState(subTask.done);
  const [textLine, setTextLine] = useState(
    subTask.done ? "line-through" : "none"
  );

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function updateFinishedSubTasks() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/task/sub/done/${subTask.id}`,
        {
          method: "PUT",
        }
      );
      console.log("Updated sub task with id: " + subTask.id);
    } catch (error) {
      console.error("Failed to update finished task in subTaks:", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.subTask, { backgroundColor: subTaskColor }]}>
        <Text
          style={{
            fontSize: settings.fontSize,
            color: settings.colorForFont,
            textDecorationLine: textLine,
          }}
        >
          {subTask.description}
        </Text>
      </View>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={() => {
          setChecked(!isChecked);
          if (!isChecked) {
            setTextLine("line-through");
            updateFinishedSubTasks();
          } else setTextLine("none");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
  subTask: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    elevation: 8,
    borderWidth: 2,
  },
  checkbox: {
    margin: 8,
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
  },
});
