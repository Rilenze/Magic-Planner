import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ScanQRCodeScreen({ navigation, route }) {
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

    let isAuthenticated = false;
    let id = 0;

    stringCodes.forEach((string) => {
      if (string.phoneLoginString == data) {
        console.log("Nadjen qr code i njegov id: " + string.accountId);
        id = string.accountId;
        storeData(string.accountId.toString());
        isAuthenticated = true;
      }
    });

    if (isAuthenticated) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Tasks",
            params: { accountID: id },
          },
        ],
      });

      navigation.dispatch(resetAction);
    }
    if (!isAuthenticated) console.log("Nema tog accounta");
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          width: Dimensions.get("window").width * 0.9,
          height: Dimensions.get("window").height * 0.9,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
  },
});
