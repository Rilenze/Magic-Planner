import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Task from "./components/Task";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ScanQRCodeScreen from "./screens/ScanQRCodeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  const API_BASE_URL = "https://zavrsni-back.herokuapp.com";

  async function fetchTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task`);
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  // if (hasPermission === null) {
  //   console.log("nema kamere");
  //   return (
  //     <View style={styles.container}>
  //       <Text>Requesting for camera permission</Text>
  //     </View>
  //   );
  // }

  // if (hasPermission === false) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{ margin: 10 }}>No access to camera</Text>
  //       <Button
  //         title={"Allow Camera"}
  //         onPress={() => askForCameraPermission()}
  //       ></Button>
  //     </View>
  //   );
  // }

  // return (
  //   <View style={styles.containerTasks}>
  //     <View style={styles.tasksWrapper}>
  //       <Text style={styles.title}>Današnji zadaci</Text>
  //       <View style={styles.tasks}>
  //         {tasks.map((task) => (
  //           <Task key={task.id} task={task} />
  //         ))}
  //       </View>
  //     </View>
  //   </View>
  // );

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  containerTasks: {
    flex: 1,
    backgroundColor: "#e8eaed",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  tasks: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
