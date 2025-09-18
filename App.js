import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStaticNavigation} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState } from 'react';

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import NoteInput from "./components/NoteInput";
import NoteItem from "./components/NoteItem";
import Calendar from './components/Calendar';

const IAScreen = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.chatContainer}>
        <Text>Chat starts here</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputText} placeholder='Descreva sua rotina' placeholderTextColor={"#0088ffff"}/>
        <Button title='send'/>
      </View>
    </SafeAreaView>
  );
}

const TaskScreen = () => {
  const [modalIsVisible, SetModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function StartAddGoalHandler() {
    SetModalIsVisible(true);
  }

  function EndAddGoalHandler() {
    SetModalIsVisible(false);
  }

  function AddGoalHandler(interedGoalText) {
    if (interedGoalText == "") {
      return;
    }

    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: interedGoalText, key: Math.random().toString() },
    ]);

    EndAddGoalHandler();
  }

  function DeleteGoalHandler(id) {
    console.log("Deleted ", id);
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.key !== id);
    });
  }

  return (
    <SafeAreaView style={styles.taskContainer}>
      <FlatList
        data={courseGoals}
        renderItem={(itemData) => {
          return (
            <GoalItem
              text={itemData.item.text}
              id={itemData.item.key}
              onDeleteItem={DeleteGoalHandler}
            />
          );
        }}
      />
      <Button
        title="Adicionar Tarefa"
        color="#0088ffff"
        onPress={StartAddGoalHandler}
      />
      <GoalInput
        visible={modalIsVisible}
        GoalInput
        onAddGoal={AddGoalHandler}
        onCancel={EndAddGoalHandler}
      />
    </SafeAreaView>
  );
}

const CalendarScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Calendar />
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Tasks here</Text>
      </View>
    </View>
  );
}

const NoteScreen = () => {
 const [modalIsVisible, SetModalIsVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  function StartAddGoalHandler() {
    SetModalIsVisible(true);
  }

  function EndAddGoalHandler() {
    SetModalIsVisible(false);
  }

  function AddGoalHandler(enteredNoteTitle, enteredNoteText) {
    if (enteredNoteTitle === "" || enteredNoteText === "") {
      return;
    }

    setNotes((currentCourseGoals) => [
      ...currentCourseGoals,
      { key: Math.random().toString(), title: enteredNoteTitle, text: enteredNoteText },
    ]);

    EndAddGoalHandler();
  }

  function DeleteGoalHandler(id) {
    console.log("Deleted ", id);
    setNotes((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.key !== id);
    });
  }

  return (
    <SafeAreaView style={styles.taskContainer}>
      <FlatList
        data={notes}
        renderItem={(itemData) => {
          return (
            <NoteItem
              id={itemData.item.key}
              title={itemData.item.title}
              text={itemData.item.text}
              onDeleteItem={DeleteGoalHandler}
            />
          );
        }}
      />
      <Button
        title="Adicionar nota"
        color="#0088ffff"
        onPress={StartAddGoalHandler}
      />
      <NoteInput
        visible={modalIsVisible}
        GoalInput
        onAddGoal={AddGoalHandler}
        onCancel={EndAddGoalHandler}
      />
    </SafeAreaView>
  );
}

const MyDrawer = createDrawerNavigator({
  screens: {
    IA: IAScreen,
    Tarefas: TaskScreen,
    Calendario: CalendarScreen,
    Anotaçoes: NoteScreen,
  },
});

const Navigation = createStaticNavigation(MyDrawer)

export default function App() {
  return (
    <>
      <StatusBar style='auto'/>
      <Navigation />
    </>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatContainer: {
    flex: 15,
    marginBottom: 16,
    justifyContent: 'flex-end'
  },

  inputText: {
    borderWidth: 2,
    borderColor: '#0088ffff',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: '20%',
  },

  taskContainer: {
    flex: 1,
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
