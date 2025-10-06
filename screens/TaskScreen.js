import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";

import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

import styles from "../styles";

const TaskScreen = ({ navigation, route}) => {
  const { tasks, onTaskUpdate } = route.params

  const [showModal, setShowModal] = useState(false)

  function AddTaskHandler(taskName, startDate, dueDate, taskPriority) {
    if (taskName == "") {
      return
    }

    const newTask = { key: Math.random().toString(), title: taskName, startDate: startDate, dueDate: dueDate, priority: taskPriority }

    onTaskUpdate(newTask)

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
      <TaskList tasks={tasks} />
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