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

const Stack = createNativeStackNavigator();

export default function App() {
  const [accountID, setAccountID] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("account");
      if (value != null) {
        const id = parseInt(value);
        setAccountID(id);
      } else setAccountID(0);
    } catch (e) {
      console.log("Error when geting data: " + e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (accountID == null) return <LoadingAnimation />;
  else
    return (
      <>
        <StatusBar hidden />
        <NavigationContainer>
          <Stack.Navigator>
            {accountID == 0 ? (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: "Welcome", headerShown: false }}
                />
                <Stack.Screen
                  name="ScanQRCode"
                  component={ScanQRCodeScreen}
                  options={{ title: "Scan", headerShown: false }}
                />
              </>
            ) : undefined}
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
