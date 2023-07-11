import { View, Text } from "react-native";
import React from "react";

export default function CurrentDate() {
  const date = new Date();
  const daniUSedmici = [
    "Nedjelja",
    "Ponedjeljak",
    "Utorak",
    "Srijeda",
    "Četvrtak",
    "Petak",
    "Subota",
  ];
  return (
    <View
      style={{
        position: "absolute",
        top: 20,
        right: 20,
      }}
    >
      <Text style={{ fontSize: 22 }}>
        {daniUSedmici[date.getDay()]}, {date.getDate()}.{date.getMonth() + 1}.
        {date.getFullYear()}
      </Text>
    </View>
  );
}