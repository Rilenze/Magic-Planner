import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import CurrentDate from "./CurrentDate";

export default function CelebrationAnimation({ kidName, maleKid }) {
  let name = kidName;

  if (maleKid) {
    const letters = "aeioukh";
    const lastLetter = name.slice(-1);
    if (!letters.includes(lastLetter)) name += "e";
  }
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <CurrentDate />
      <LottieView
        source={require("../assets/animations/celebration.json")}
        autoPlay
        loop
        style={{ width: 500, height: 500 }}
      />
      <Text style={styles.congratulation}>
        Bravo {name}! Nemaš više zadataka za danas!
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
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
    alignItems: "center",
  },
});
