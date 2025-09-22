import { View, Text } from "react-native";

import CalendarComponent from "../components/Calendar";

const CalendarScreen = () => {
  return (
    <View style={{flex: 1}}>
      <CalendarComponent />
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Tasks here</Text>
      </View>
    </View>
  );
}

export default CalendarScreen