import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function ScanQRCodeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const [stringCodes, setStringCodes] = useState([]);

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
      if (hasPermission) navigation.navigate("ScanQRCode");
    })();
  };

  async function fetchStringCodes() {
    const response = await fetch(`${API_BASE_URL}/api/v1/account/settings`);
    const data = await response.json();
    setStringCodes(data);
  }

  useEffect(() => {
    askForCameraPermission();
    fetchStringCodes();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("Type: " + type + "\nData: " + data);

    stringCodes.forEach((string) => {
      if (string.phoneLoginString == data) {
        console.log("Nadjen qr code i njegov id: " + string.accountId);
        navigation.navigate("Tasks", { accountID: string.accountId });
      }
    });
  };

  //   if (!hasPermission) {
  //     navigation.navigate("Home");
  //   }

  if (hasPermission) {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 500, width: 500 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
