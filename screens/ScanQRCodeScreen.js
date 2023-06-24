import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ScanQRCodeScreen({ navigation }) {
  //const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [stringCodes, setStringCodes] = useState([]);

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function fetchStringCodes() {
    const response = await fetch(`${API_BASE_URL}/api/v1/account/settings`);
    const data = await response.json();
    setStringCodes(data);
  }

  const storeData = async (value) => {
    try {
      console.log(value);
      await AsyncStorage.setItem("account", value);
      console.log("Account id stored");
    } catch (e) {
      console.log("Error when storing data");
    }
  };

  useEffect(() => {
    fetchStringCodes();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("Type: " + type + "\nData: " + data);

    stringCodes.forEach((string) => {
      if (string.phoneLoginString == data) {
        console.log("Nadjen qr code i njegov id: " + string.accountId);
        storeData(string.accountId.toString());
      }
    });
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: "100%", width: 500 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
