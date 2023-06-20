import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Checkbox from "expo-checkbox";

export default function SubTask({
  subTask,
  subTaskColor,
  textSize,
  textStyle,
  textColor,
}) {
  const [isChecked, setChecked] = useState(false);
  const [textLine, setTextLine] = useState("none");

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function updateFinishedSubTasks() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/task/sub/done/${subTask.id}`,
        {
          method: "PUT",
        }
      );
      console.log("Uspjesno updejtovan task sa id-om: " + subTask.id);
    } catch (error) {
      console.error("Failed to update finished task in subTaks:", error);
    }
  }

  useEffect(() => {
    if (subTask.done) setChecked(true);
    else setChecked(false);
  }, []);

  useEffect(() => {
    if (isChecked) {
      setTextLine("line-through");
      updateFinishedSubTasks();
    } else if (!isChecked) setTextLine("none");
  }, [isChecked]);

  return (
    <Pressable
      style={[styles.container, { backgroundColor: subTaskColor }]}
      onPress={() => (isChecked ? setChecked(false) : setChecked(true))}
    >
      <View style={styles.textBox}>
        <Text
          style={{
            fontSize: textSize,
            color: textColor,
            textDecorationLine: textLine,
          }}
        >
          {subTask.description}
        </Text>
      </View>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    margin: 8,
    width: 35,
    height: 35,
  },
  textBox: {
    maxWidth: 250,
  },
});
