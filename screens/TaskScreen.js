import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, TouchableOpacity } from "react-native";

import GoalItem from "../components/GoalItem";
import GoalInput from "../components/GoalInput";

import styles from "../styles";

const TaskScreen = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState(props.tasksData);

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

    setTasks((currentCourseGoals) => [
      ...currentCourseGoals,
      { key: Math.random().toString(), text: interedGoalText.text, date: interedGoalText.date },
    ]);

    //props.tasksData = tasks

    EndAddGoalHandler();
  }

  function DeleteGoalHandler(id) {
    console.log("Deleted ", id);
    setTasks((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.key !== id);
    });
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <FlatList
        data={tasks}
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
      <TouchableOpacity style={styles.addBottomButtom} onPress={StartAddGoalHandler}>
        <Text style={[styles.buttomText, {fontSize: 18}]}>Adicionar Tarefa</Text>
      </TouchableOpacity>
      <GoalInput
        visible={showModal}
        onAddGoal={AddGoalHandler}
        onCancel={EndAddGoalHandler}
      />
    </SafeAreaView>
  );
}

export default TaskScreen