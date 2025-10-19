import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";

import { ptBR } from "../components/utils/localeCalendarConfig";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

import TaskList from "../components/TaskList";
import TaskListCalendar from "../components/TasklistCalendar";
import { GlobalContext } from "../components/GlobalContext";

import { useFocusEffect } from "@react-navigation/core";

const CalendarScreen = () => {
  const [tasks, setTasks] = useState(getTarefa);

  const { getTarefa } = useContext(GlobalContext);
  const [day, setDay] = useState();
  const scheme = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
         setTasks(await getTarefa(day));
      };

      fetchUser();
    }, [day])
  );

  return (
    <View style={{ flex: 1 }}>
      {/* <CalendarComponent /> */}
      <View>
        <Calendar
          style={styles.calendar}
          headerStyle={styles.header}
          theme={scheme === "dark" ? styles.themeDark : styles.themeLight}
          onDayPress={setDay}
          markedDates={day && { [day.dateString]: { selected: true } }}
        />
        {/* <Text style={styles.selected}>Data selecionada: {day?.dateString}</Text> */}
      </View>
      <View style={{ flex: 1 }}>
        <TaskListCalendar tasks={tasks} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: "transparent",
  },

  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#0088ffff",
  },

  themeLight: {
    textMonthFontSize: 18,
    arrowColor: "#0088ffff",
    monthTextColor: "#0088ffff",
    todayTextColor: "#0088ffff",
    selectedDayBackgroundColor: "#0088ffff",
    selectedDayTextColor: "#fff",
    calendarBackground: "#ffffffff",
  },

  themeDark: {
    textMonthFontSize: 18,
    arrowColor: "#0088ffff",
    monthTextColor: "#0088ffff",
    todayTextColor: "#0088ffff",
    selectedDayBackgroundColor: "#0088ffff",
    selectedDayTextColor: "#fff",
    calendarBackground: "#000000ff",
  },

  selected: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default CalendarScreen;
