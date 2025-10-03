import { View, FlatList } from "react-native";
import React from "react";

import CalendarComponent from "../components/Calendar";
import TaskItem from "../components/TaskItem";

const CalendarScreen = ({ navigation, route}) => {
  const { tasks } = route.params

  return (
    <View style={{ flex: 1 }}>
      <CalendarComponent />
      <View style={{ flex: 1 }}>
        <FlatList
          data={tasks}
          renderItem={(itemData) => {
            return (
              <TaskItem
                id={itemData.item.key}
                steps={[]}
                title={itemData.item.title}
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
