import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStaticNavigation, useNavigation} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useState } from 'react';

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

const IAScreen = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar style='auto'/>
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
    <>
      <StatusBar style="auto" />
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
    </>
  );
}

const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar style='dark'/>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Calendar here</Text>
      </View>
      <View style={{flex: 1, justifyContent:'center'}}>
        <Text>Tasks here</Text>
      </View>
    </SafeAreaView>
  );
}

const NoteScreen = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar style='dark'/>

    </SafeAreaView>
  );
}

const MyDrawer = createDrawerNavigator({
  screens: {
    IA: IAScreen,
    Tarefas: TaskScreen,
    Calendario: CalendarScreen,
    Anotacoes: NoteScreen,
  },
});

const Navigation = createStaticNavigation(MyDrawer)

export default function App() {
  return (
    <Navigation />
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatContainer: {
    flex: 15,
    marginBottom: 4,
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
    backgroundColor: "#fff",
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
