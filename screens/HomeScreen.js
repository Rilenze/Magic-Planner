import React, { useState } from "react";
import { Button, View, StyleSheet, Image, Linking, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function HomeScreen({ navigation }) {
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status == "granted") navigation.navigate("ScanQRCode");
      else {
        Alert.alert(
          "Permission needed",
          "Da biste koristili aplikaciju Magic Planner, potrebno je da dozvolite korištenje kamere u postavkama",
          [
            {
              text: "Cancel",
              onPress: undefined,
              style: "cancel",
            },
            {
              text: "Go to settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      }
    })();
  };

  const handleScanButton = () => {
    askForCameraPermission();
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/MagicPlanner.png")}></Image>
      <Button title="Scan QR code to login" onPress={handleScanButton}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //justifyContent: "center",
  },
});
