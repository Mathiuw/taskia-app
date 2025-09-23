import { StatusBar } from 'expo-status-bar';
import { createStaticNavigation} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState } from 'react';

// Screens import
import LoginScreen from './screens/LoginScreen';
import GeminiChat from './components/GeminiChat';
import IAScreen from './screens/AIScreen';
import TaskScreen from './screens/TaskScreen';
import CalendarScreen from './screens/CalendarScreen';
import NoteScreen from './screens/NotesScreen';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);

  const MyDrawer = createDrawerNavigator({
  screens: {
    IA: () => <GeminiChat />,
    Tarefas: () => <TaskScreen tasks={tasks} setTasks={setTasks} />,
    Calendario: () => <CalendarScreen tasks={tasks} />,
    Anotaçoes: () => <NoteScreen notes={notes} setNotes={setNotes} />,
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