import { FlatList } from "react-native";
import TaskItem from "./TaskItem";

const TaskList = ({tasks}) => {
  return (
    <FlatList
      data={tasks}
      renderItem={(itemData) => {
        return (
          <TaskItem
            id={itemData.item.key}
            title={itemData.item.title}
            startDate={itemData.item.startDate}
            dueDate={itemData.item.dueDate}
            priority={itemData.item.priority}
            steps={itemData.item.steps}
          />
        );
      }}
    />
  );
};

export default TaskList
