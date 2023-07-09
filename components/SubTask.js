import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { updateFinishedSubTasks } from "../modules/fetchingData";

export default function SubTask({ subTask, subTaskColor, settings }) {
  const [isChecked, setChecked] = useState(subTask.done);
  const [textLine, setTextLine] = useState(
    subTask.done ? "line-through" : "none"
  );

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
        color={isChecked ? settings.colorForProgress : undefined}
        value={isChecked}
        onValueChange={() => {
          if (isChecked) return;
          setChecked(!isChecked);
          if (!isChecked) {
            setTextLine("line-through");
            updateFinishedSubTasks(subTask.id);
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
