import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, TouchableOpacity } from "react-native";

import TaskItem from "../components/TaskItem";
import TaskInput from "../components/TaskInput";

import styles from "../styles";

const TaskScreen = () => {
  const [showModal, setShowModal] = useState(false)
  const [tasks, setTasks] = useState([])

  function AddTaskHandler(taskName, taskDate, taskPriority) {
    if (taskName == "" || taskDate == "" || taskPriority == "") {
      return;
    }

    setTasks((currentCourseGoals) => [
      ...currentCourseGoals,
      { key: Math.random().toString(), text: taskName, date: taskDate, priority: taskPriority },
    ]);

    setShowModal(false)
  }

  function DeleteTaskHandler(id) {
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
            <TaskItem
              text={itemData.item.text}
              date={itemData.item.date}
              priority={itemData.item.priority}
              id={itemData.item.key}
              onDeleteItem={DeleteTaskHandler}
            />
          );
        }}
      />
      <TouchableOpacity style={styles.addBottomButtom} onPress={() => {setShowModal(true)}}>
        <Text style={[styles.buttomText, {fontSize: 18}]}>Adicionar Tarefa</Text>
      </TouchableOpacity>
      <TaskInput
        visible={showModal}
        onAddGoal={AddTaskHandler}
        onCancel={() => {setShowModal(false)}}
      />
    </SafeAreaView>
  );
}

export default TaskScreen