import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
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
      <View style={[styles.container, { backgroundColor: subTaskColor }]}>
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
  // container: {
  //   padding: 15,
  //   borderRadius: 10,
  //   marginBottom: 20,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    borderRadius: 15,
  },
  checkbox: {
    margin: 8,
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  // textBox: {
  //   maxWidth: 250,
  // },
});
