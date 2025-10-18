import { FlatList } from "react-native";
import TaskItem from "./TaskItem";
import { useEffect, useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { GlobalContext } from "./GlobalContext";
import { Text } from "react-native";

const TaskList = () => {
  const { getTarefa } = useContext(GlobalContext);

  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const response = await getTarefa();

          if (isActive) {
            setTasks(response);
          }
        } catch (e) {
          console.error("Error focus effect");
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };

    }, [])
  );

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
            steps={item.subTarefa}
            completed={item.concluida}
          />
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={() => {
        return <Text>No tasks available.</Text>;
      }}
    />
  );
};

export default TaskList;
