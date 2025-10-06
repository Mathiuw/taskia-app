import { View } from "react-native";
import React from "react";

import CalendarComponent from "../components/Calendar";
import TaskList from "../components/TaskList";

const CalendarScreen = ({ navigation, route}) => {
  const { tasks } = route.params

  return (
    <View style={{ flex: 1 }}>
      <CalendarComponent />
      <View style={{ flex: 1 }}>
      <TaskList tasks={tasks} />
      </View>
    </View>
  );
};

export default CalendarScreen;
