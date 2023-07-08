import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function CelebrationAnimation({ kidName, maleKid }) {
  let name = kidName;

  if (maleKid) {
    const letters = "aeioukh";
    const lastLetter = name.slice(-1);
    if (!letters.includes(lastLetter)) name += "e";
  }
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <LottieView
        source={require("../assets/animations/celebration.json")}
        autoPlay
        loop
      />
      <Text style={styles.congratulation}>
        Bravo {name}! Nemate više zadataka za danas!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  congratulation: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
});
