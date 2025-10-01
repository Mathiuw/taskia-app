import { View, FlatList } from "react-native";

import CalendarComponent from "../components/Calendar";
import TaskItem from "../components/TaskItem";

const CalendarScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <CalendarComponent />
      <View style={{ flex: 1 }}>
        <FlatList
          data={props.tasks}
          renderItem={(itemData) => {
            return (
              <TaskItem
                id={itemData.item.key}
                text={itemData.item.text}
                startDate={itemData.item.startDate}
                dueDate={itemData.item.dueDate}
                priority={itemData.item.priority}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default CalendarScreen;
