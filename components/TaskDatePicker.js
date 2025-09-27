import { Pressable, TextInput, View, Platform  } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";;

import styles from "../styles";

const TaskDatePicker = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate
      setSelectedDate(currentDate)

      if (Platform.OS === "android") {
        togglDatePickerModal();
        props.onDateConfirm(currentDate.toDateString())
        console.log(selectedDate)
      }
    } else {
      togglDatePickerModal()
    }
  };

  const togglDatePickerModal = () => {
    setShowDatePickerModal(!showDatePickerModal);
  };

  const confirmIOSDate = () => {
    props.onDateConfirm(selectedDate.toDateString());
    togglDatePickerModal();
  };

  return (
    <>
      {!showDatePickerModal && (
        <Pressable on onPress={togglDatePickerModal}>
          <TextInput
            style={styles.textInput}
            placeholder={props.placeholder}
            placeholderTextColor={"#0088ffff"}
            value={selectedDate.toDateString()}
            editable={false}
            onPressIn={togglDatePickerModal}
          />
        </Pressable>
      )}
      {showDatePickerModal && (
        <DateTimePicker
          mode="date"
          value={selectedDate}
          display="spinner"
          onChange={onChange}
          style={styles.datePicker}
          themeVariant="light"
        />
      )}
      {showDatePickerModal && Platform.OS === "ios" && (
        <View style={{ flex: 1, flexDirection: "row"}}>
          <TouchableOpacity
            style={[styles.pickerButtom, { backgroundColor: "#ff0000ff" }]}
            onPress={togglDatePickerModal}
          >
            <Text style={styles.pickerButtomText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pickerButtom}
            onPress={confirmIOSDate}
          >
            <Text style={styles.pickerButtomText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default TaskDatePicker;
