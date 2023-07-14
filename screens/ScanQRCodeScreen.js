import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

export default function ScanQRCodeScreen({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [stringCodes, setStringCodes] = useState([]);
  const [isAuthenticated, setAuhenticated] = useState(false);
  const [id, setId] = useState(0);
  const [nonExistentAccount, setNonExistentAccount] = useState(false);

  useEffect(() => {
    fetchStringCodes();
  }, []);

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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("Type: " + type + "\nData: " + data);

    let findAccount = false;

    stringCodes.forEach((string) => {
      if (string.phoneLoginString == data) {
        console.log("Nadjen qr code i njegov id: " + string.accountId);
        storeData(string.accountId.toString());
        setAuhenticated(true);
        setId(string.accountId);
        findAccount = true;
      }
    });

    if (!findAccount) setNonExistentAccount(true);
  };

  const navigationReset = () => {
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
  };

  if (isAuthenticated)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("../assets/animations/successfullyLogin.json")}
          autoPlay
          loop={false}
          onAnimationFinish={navigationReset}
          style={{ width: 300, height: 300 }}
        />
        <Text style={{ fontSize: 26 }}>Uspješna prijava!</Text>
      </View>
    );
  else if (!isAuthenticated && !nonExistentAccount)
    return (
      <SafeAreaView style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").height * 0.9,
          }}
        />
      </SafeAreaView>
    );
  else if (!isAuthenticated && nonExistentAccount)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("../assets/animations/failedLogin.json")}
          autoPlay
          loop={false}
          style={{ width: 300, height: 300 }}
        />
        <Text style={{ fontSize: 26 }}>Prijava nije uspjela!</Text>
        <Text style={{ fontSize: 22 }}>Profil ne postoji</Text>
        <TouchableOpacity
          style={styles.failedButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
            Ok
          </Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
  failedButton: {
    backgroundColor: "#E25B5B",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 80,
    elevation: 5,
    width: 230,
  },
});
