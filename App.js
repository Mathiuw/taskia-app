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
  let notes = []
  let tasks = []

  const MyDrawer = createDrawerNavigator({
  screens: {
    IA: () => <GeminiChat />,
    Tarefas: () => <TaskScreen tasksData={tasks} />,
    Calendario: () => <CalendarScreen tasksData={tasks} />,
    Anotaçoes: () => <NoteScreen notesData={notes} />,
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