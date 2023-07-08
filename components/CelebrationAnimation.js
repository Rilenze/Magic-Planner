import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function CelebrationAnimation() {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <LottieView
        source={require("../assets/animations/celebration.json")}
        autoPlay
        loop
      />
      <Text style={styles.congratulation}>Nemate više zadataka za danas!</Text>
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
  },
});
