import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function WelcomeMessage({ name, male }) {
  if (!male)
    return (
      <View style={styles.welcomeBox}>
        <Text style={styles.text}>Dobro došla {name}!</Text>
      </View>
    );
  const letters = "aeioukh";
  const lastLetter = name.slice(-1);
  if (!letters.includes(lastLetter)) name += "e";

  return (
    <View style={styles.welcomeBox}>
      <Text style={styles.text}>Dobro došao {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  welcomeBox: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});
