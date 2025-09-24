import { View, FlatList } from "react-native";
import { useState } from "react";

import CalendarComponent from "../components/Calendar";
import TaskItem from "../components/TaskItem";

const CalendarScreen = () => {

  return (
    <View style={{ flex: 1 }}>
      <CalendarComponent />
      <View style={{ flex: 1 }}>
        <FlatList
          data={[]}
          renderItem={(itemData) => {
            return (
              <TaskItem
                text={itemData.item.text}
                date={itemData.item.date}
                id={itemData.item.key}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default CalendarScreen;
