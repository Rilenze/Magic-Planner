import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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

  useEffect(() => {
    if (isChecked) setTextLine("line-through");
    else if (!isChecked) setTextLine("none");
  }, [isChecked]);

  return (
    <View style={[styles.container, { backgroundColor: subTaskColor }]}>
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
    </View>
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
    width: 40,
    height: 40,
  },
  textBox: {
    maxWidth: 250,
  },
});
