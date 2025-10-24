import { FlatList } from "react-native";
import TaskItem from "./TaskItem";
import { useState, useContext, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { GlobalContext } from "./GlobalContext";
import { Text } from "react-native";

const TaskList = ({onTaskLongPress}) => {
  const { getTarefa } = useContext(GlobalContext);

  const [tasks, setTasks] = useState([]);
  const [taskSubmitted, setTaskSubmitted] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          const response = await getTarefa();
          setTasks(response);
        } catch (e) {
          console.error("Error focus effect: ", e);
        }
      };
      fetchUser();

    }, [])
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getTarefa();
        setTasks(response);
      } catch (e) {
        console.error("Error use effect: ", e);
      }
    };

    fetchUser();
  }, [taskSubmitted]);

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
            idTag={item.idTag}
            updateState={setTaskSubmitted}
            onTaskLongPress={onTaskLongPress}
          />
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={() => {
        return <Text style={{flex: 1, fontSize:18, fontWeight:"bold", color:"#0088ffff", margin: 15, justifyContent: "center", alignSelf:"center", alignItems: "center"}}>Tudo Feito :)</Text>;
      }}
    />
  );
};

export default TaskList;
