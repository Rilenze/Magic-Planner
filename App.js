import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./screens/HomeScreen";
import ScanQRCodeScreen from "./screens/ScanQRCodeScreen";
import TasksScreen from "./screens/TasksScreen";
import SubTasksScreen from "./screens/SubTasksScreen";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [accountID, setAccountID] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("account");
      console.log(value);
      if (value !== null) {
        // value previously stored
        setAccountID(parseInt(value));
      }
    } catch (e) {
      console.log("Error when geting data");
    }
  };

  useEffect(() => {
    //getData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {accountID === null ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Welcome" }}
            />
            <Stack.Screen
              name="ScanQRCode"
              component={ScanQRCodeScreen}
              options={{ title: "Scan" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Tasks"
              component={TasksScreen}
              initialParams={{ accountID: accountID }}
              options={{ title: "Tasks", headerShown: false }}
            />
            <Stack.Screen
              name="SubTasks"
              component={SubTasksScreen}
              options={{ title: "SubTasks", headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
