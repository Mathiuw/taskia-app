import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useColorScheme } from "react-native";
import { GlobalProvider } from "./components/GlobalContext";

// Screens import
import GeminiChat from "./components/GeminiChat";
import TaskScreen from "./screens/TaskScreen";
import CalendarScreen from "./screens/CalendarScreen";
import NoteScreen from "./screens/NotesScreen";
import LoginStartScreen from "./screens/LoginScreen";
import QuestionnaireScreen from "./screens/QuestionnaireScreen";
import HelpScreen from "./screens/HelpScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  const scheme = useColorScheme();

  return (
    <GlobalProvider>
      <StatusBar style="auto" />

      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator initialRouteName="IA">
          <Drawer.Screen name="IA" component={GeminiChat} />
          <Drawer.Screen name="Tarefas" component={TaskScreen} />
          <Drawer.Screen name="Calendario" component={CalendarScreen} />
          <Drawer.Screen name="Notas" component={NoteScreen} />
          <Drawer.Screen name="Questionario" component={QuestionnaireScreen} />
          <Drawer.Screen name="Ajuda" component={HelpScreen} />
          <Drawer.Screen name="Usuario" component={LoginStartScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
