import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, TouchableOpacity } from "react-native";

import TaskItem from "../components/TaskItem";
import TaskInput from "../components/TaskInput";

import styles from "../styles";

const TaskScreen = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [tasks, setTasks] = useState(props.tasks)

  function AddTaskHandler(taskName, startDate, dueDate, taskPriority) {
    if (taskName == "") {
      return
    }

    const newTask = { key: Math.random().toString(), text: taskName, startDate: startDate, dueDate: dueDate, priority: taskPriority }

    // setTasks((currentTasks) => {
    //   // add new task to tasks array state
    //   return [...currentTasks,  newTask]
    // })

    props.onTaskUpdate(newTask)
    setTasks(props.tasks)

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
              startDate={itemData.item.startDate}
              dueDate={itemData.item.dueDate}
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