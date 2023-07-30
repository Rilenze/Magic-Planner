import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./screens/HomeScreen";
import ScanQRCodeScreen from "./screens/ScanQRCodeScreen";
import TasksScreen from "./screens/TasksScreen";
import SubTasksScreen from "./screens/SubTasksScreen";
import { useEffect, useState } from "react";
import LoadingAnimation from "./components/LoadingAnimation";
import * as Font from "expo-font";

const fetchFonts = () => {
  return Font.loadAsync({
    Arial: require("./assets/fonts/arial.ttf"),
    "Arial Narrow": require("./assets/fonts/arialn.ttf"),
    "Comic Sans MS": require("./assets/fonts/comic.ttf"),
    "Courier New": require("./assets/fonts/cour.ttf"),
    Garamond: require("./assets/fonts/gara.ttf"),
    Georgia: require("./assets/fonts/georgia.ttf"),
    Helvetica: require("./assets/fonts/Helvetica.ttf"),
    Impact: require("./assets/fonts/impact.ttf"),
    "Lucida Console": require("./assets/fonts/lucon.ttf"),
    Verdana: require("./assets/fonts/verdana.ttf"),
    "MS Sans Serif": require("./assets/fonts/msSansSerif.ttf"),
    "MS Serif": require("./assets/fonts/msSansSerif.ttf"),
    "Palatino Linotype": require("./assets/fonts/pala.ttf"),
    Tahoma: require("./assets/fonts/tahoma.ttf"),
    "Times New Roman": require("./assets/fonts/times.ttf"),
    "Trebuchet MS": require("./assets/fonts/trebuc.ttf"),
    Verdana: require("./assets/fonts/verdana.ttf"),

    // Add more custom fonts if needed
  });
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [accountID, setAccountID] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("account");
      console.log("Id u async storage: " + value);
      if (value != null) {
        const id = parseInt(value);
        setAccountID(id);
      } else setAccountID(0);
    } catch (e) {
      console.log("Error when geting data: " + e);
    }
  };

  useEffect(() => {
    fetchFonts();
    getData();
  }, []);

  if (accountID == null) return <LoadingAnimation />;
  else
    return (
      <>
        <StatusBar hidden />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Welcome", headerShown: false }}
              initialParams={{ accountID: accountID }}
            />
            <Stack.Screen
              name="ScanQRCode"
              component={ScanQRCodeScreen}
              options={{ title: "Scan", headerShown: false }}
            />
            <Stack.Screen
              name="Tasks"
              component={TasksScreen}
              initialParams={{ accountID: accountID }}
              options={{
                title: "Tasks",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SubTasks"
              component={SubTasksScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
}
