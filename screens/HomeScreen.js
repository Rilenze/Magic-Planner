import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  Image,
  Linking,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
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
      <View style={styles.image}>
        <Image source={require("../assets/MagicPlanner.png")}></Image>
      </View>
      <TouchableOpacity style={styles.scanButton} onPress={handleScanButton}>
        <Text style={styles.text}>Scan QR code to login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FFFA",
    alignItems: "center",
  },
  image: {
    marginTop: 80,
    marginRight: 10,
  },
  scanButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 80,
    elevation: 5,
  },
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
