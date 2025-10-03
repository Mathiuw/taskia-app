import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";

// Screens import
import LoginScreen from "./screens/LoginScreen";
import GeminiChat from "./components/GeminiChat";
import TaskScreen from "./screens/TaskScreen";
import CalendarScreen from "./screens/CalendarScreen";
import NoteScreen from "./screens/NotesScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: Math.random(),
      title: "test task 1",
      startDate: new Date(),
      dueDate: new Date(),
      priority: "media"
    },
    {
      id: Math.random(),
      title: "test task 2",
      startDate: new Date(),
      dueDate: new Date(),
      priority: "baixa"
    },
    {
      id: Math.random(),
      title: "test task 3",
      startDate: new Date(),
      dueDate: new Date(),
      priority: "alta"
    },
  ]);

  const onTaskUpdate = (newTask) => {
    setTasks([...tasks, newTask]);
    console.log(tasks);
  };

  const AppDrawer = () => {
    return (
      <Drawer.Navigator initialRouteName="IA">
        <Drawer.Screen name="IA" component={GeminiChat} />
        <Drawer.Screen name="Tarefas" component={TaskScreen} initialParams={{tasks: tasks, onTaskUpdate: onTaskUpdate}} />
        <Drawer.Screen
          name="Calendario"
          component={CalendarScreen}
          initialParams={{ tasks: tasks }}
        />
        <Drawer.Screen name="Notas" component={NoteScreen} />
        <Drawer.Screen name="Usuario" component={LoginScreen} />
      </Drawer.Navigator>
    );
  };

  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>
        <AppDrawer />
      </NavigationContainer>
    </>
  );
}
