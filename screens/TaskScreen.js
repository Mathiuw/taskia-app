import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import GoalItem from "../components/GoalItem";
import GoalInput from "../components/GoalInput";

import styles from "../styles";

const TaskScreen = (props) => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation()

  function StartAddGoalHandler() {
    setShowModal(true);
  }

  function EndAddGoalHandler() {
    setShowModal(false);
  }

  function AddGoalHandler(interedGoalText) {
    if (interedGoalText.text == "") {
      return;
    }

    props.setTasks((currentCourseGoals) => [
      ...currentCourseGoals,
      { key: Math.random().toString(), text: interedGoalText.text, date: interedGoalText.date },
    ]);

    EndAddGoalHandler();

    navigation.navigate('Anotaçoes')
  }

  function DeleteGoalHandler(id) {
    console.log("Deleted ", id);
    props.setTasks((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.key !== id);
    });
  }

  return (
    <SafeAreaView style={styles.taskContainer}>
      <FlatList
        data={props.tasks}
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
      <TouchableOpacity style={styles.sendButtom} onPress={StartAddGoalHandler}>
        <Text style={[styles.sendButtomText, {fontSize: 18}]}>Adicionar Tarefa</Text>
      </TouchableOpacity>
      <GoalInput
        visible={showModal}
        //GoalInput
        onAddGoal={AddGoalHandler}
        onCancel={EndAddGoalHandler}
      />
    </SafeAreaView>
  );
}

export default TaskScreen