import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ScanQRCodeScreen from "./screens/ScanQRCodeScreen";
import TasksScreen from "./screens/TasksScreen";
import SubTasksScreen from "./screens/SubTasksScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="Tasks"
          component={TasksScreen}
          options={{ title: "Tasks" }}
        />
        <Stack.Screen
          name="SubTasks"
          component={SubTasksScreen}
          options={{ title: "SubTasks" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
