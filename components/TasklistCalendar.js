import { FlatList } from "react-native";
import TaskItem from "./TaskItem";
import { useEffect, useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { GlobalContext } from "./GlobalContext";
import { Text } from "react-native";

const TaskListCalendar = ({tasks}) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => {
        return (
          <TaskItem
            id={item.id}
            title={item.descricao}
            startDate={item.dataInicio}
            dueDate={item.dataConclusao}
            priority={item.prioridade}
            steps={item.steps}
            completed={item.concluida}
          />
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={() => {
        return <Text>Nenhuma tarefa criada.</Text>;
      }}
    />
  );
};

export default TaskListCalendar;
