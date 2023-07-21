import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function CelebrationAnimation({ kidName, maleKid, settings }) {
  let name = kidName;

  if (maleKid) {
    const letters = "aeioukh";
    const lastLetter = name.slice(-1);
    if (!letters.includes(lastLetter)) name += "e";
  }
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animations/celebration.json")}
        autoPlay
        loop
        style={{ width: 500, height: 500 }}
      />
      <Text
        style={[
          styles.congratulation,
          { fontSize: settings.fontSize + 2, fontFamily: settings.font },
        ]}
      >
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
    marginBottom: 60,
  },
  congratulation: {
    position: "absolute",
    marginHorizontal: 20,
    alignItems: "center",
  },
});
