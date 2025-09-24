import { StatusBar } from 'expo-status-bar';
import { createStaticNavigation} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens import
import LoginScreen from './screens/LoginScreen';
import GeminiChat from './components/GeminiChat';
import TaskScreen from './screens/TaskScreen';
import CalendarScreen from './screens/CalendarScreen';
import NoteScreen from './screens/NotesScreen';

export default function App() {

  const MyDrawer = createDrawerNavigator({
  screens: {
    IA: () => <GeminiChat />,
    Tarefas: () => <TaskScreen />,
    Calendario: () => <CalendarScreen />,
    Anotaçoes: () => <NoteScreen />,
  },
  });

  const Navigation = createStaticNavigation(MyDrawer)

  return (
    <>
      <StatusBar style='auto'/>
      <Navigation />
    </>
  )
}