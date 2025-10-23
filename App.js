import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import { GlobalProvider, GlobalContext } from "./components/GlobalContext";
import { useContext } from "react";

// Screens import
import GeminiChat from "./components/GeminiChat";
import TaskScreen from "./screens/TaskScreen";
import CalendarScreen from "./screens/CalendarScreen";
import NoteScreen from "./screens/NotesScreen";
import LoginStartScreen from "./screens/LoginScreen";
import HelpScreen from "./screens/HelpScreen";
import SettingsScreen from "./screens/SettingsScreen";

const RootStack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return(
        <Drawer.Navigator initialRouteName="IA" screenOptions={{drawerType:"back"}}>
          <Drawer.Screen name="IA" component={GeminiChat} />
          <Drawer.Screen name="Tarefas" component={TaskScreen} />
          <Drawer.Screen name="Calendario" component={CalendarScreen} />
          <Drawer.Screen name="Notas" component={NoteScreen} />
          <Drawer.Screen name="Configuracoes" component={SettingsScreen} />
          <Drawer.Screen name="Ajuda" component={HelpScreen} />
        </Drawer.Navigator>
  )
}

const StartAppScreen = () => {
  const { currentUser } = useContext(GlobalContext)

  return (
        <RootStack.Navigator initialRouteName={typeof currentUser !== 'undefined' ? "Drawer" : "User"} screenOptions={{headerShown: false}}>
          <RootStack.Screen name="Drawer" component={DrawerScreen} />
          <RootStack.Screen name="User" component={LoginStartScreen} />
        </RootStack.Navigator>
  )
}

export default function App() {
  const scheme = useColorScheme();

  return (
    <GlobalProvider>
      <StatusBar style="auto" />

      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <StartAppScreen />
      </NavigationContainer>

    </GlobalProvider>
  );
}