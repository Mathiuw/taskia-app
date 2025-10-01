import { StatusBar } from 'expo-status-bar';
import { createStaticNavigation} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState } from 'react';

// Screens import
import LoginScreen from './screens/LoginScreen';
import GeminiChat from './components/GeminiChat';
import TaskScreen from './screens/TaskScreen';
import CalendarScreen from './screens/CalendarScreen';
import NoteScreen from './screens/NotesScreen';

export default function App() {
  const [tasks, setTasks] = useState([{ id: Math.random(), text: "test task", startDate: new Date(), dueDate: new Date()}])

  const onTaskUpdate = (newTask) => {
  setTasks([...tasks, newTask])
  console.log(tasks)
  }

  const MyDrawer = createDrawerNavigator({
  screens: {
    IA: () => <GeminiChat />,
    Tarefas: () => <TaskScreen tasks={tasks} onTaskUpdate={onTaskUpdate} />,
    Calendario: () => <CalendarScreen tasks={tasks} />,
    Anotaçoes: () => <NoteScreen />,
    Login: () => <LoginScreen />
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