import { View } from "react-native";
import React, { useContext } from "react";

import CalendarComponent from "../components/Calendar";
import TaskList from "../components/TaskList";
import { GlobalContext } from "../components/GlobalContext";

const CalendarScreen = () => {
  const { tasks } = useContext(GlobalContext)

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
