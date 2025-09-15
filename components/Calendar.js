import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";

import { ptBR } from "./utils/localeCalendarConfig";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

const CalendarComponent = () => {
  const [day, setDay] = useState();

  return (
    <View>
        <Calendar
        style={styles.calendar}
        headerStyle={styles.header}
        theme={styles.theme}
        onDayPress={setDay}
        markedDates={day && { [day.dateString]: { selected: true } }}
        />
        <Text style={styles.selected}>Data selecionada: {day?.dateString}</Text>
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

  theme: {
    textMonthFontSize: 18,
    arrowColor: "#0088ffff",
    monthTextColor: "#0088ffff",
    todayTextColor: "#0088ffff",
    selectedDayBackgroundColor: "#0088ffff",
    selectedDayTextColor: "#fff",
  },

  selected: {
    fontSize: 16,
    marginTop: 16,
  }
});

export default CalendarComponent;
