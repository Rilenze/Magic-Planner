import React from "react";
import { View, Text } from "react-native";

export default function Task({ task }) {
  return (
    <View>
      <Text>{task.taskName}</Text>
    </View>
  );
}
