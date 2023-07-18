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
import { fetchStringCodes } from "../modules/fetchingData";

export default function ScanQRCodeScreen({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [stringCodes, setStringCodes] = useState([]);
  const [isAuthenticated, setAuhenticated] = useState(false);
  const [id, setId] = useState(0);
  const [nonExistentAccount, setNonExistentAccount] = useState(false);

  useEffect(() => {
    fetchCodes();
  }, []);

  async function fetchCodes() {
    const data = await fetchStringCodes();
    setStringCodes(data);
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("account", value);
    } catch (e) {
      console.log("Error when storing data: " + e);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let findAccount = false;

    stringCodes.forEach((string) => {
      if (string.phoneLoginString == data) {
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
            width: Dimensions.get("screen").width * 0.9,
            height: Dimensions.get("screen").height * 0.9,
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
    flex: 1,
    backgroundColor: "#fff",
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
