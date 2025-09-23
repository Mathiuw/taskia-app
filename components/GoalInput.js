import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  Platform,
  TouchableOpacity
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from "../styles";

function GoalInput(props) {
  const [interedGoalText, setEnteredGoaltext] = useState("");

  const [dueDate, setDueDate] = useState("")

  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  }

  const confirmIOSDate = () => {
    setDueDate(date.toDateString())
    toggleDatePicker()
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == "set"){
      const currentDate = selectedDate
      setDate(currentDate)

      if (Platform.OS === "android") {
        toggleDatePicker()
        setDueDate(currentDate.toDateString())
      }
    }
    else {
      toggleDatePicker()
    }
  }

  function GoalInputHandler(enteredText) {
    setEnteredGoaltext(enteredText);
  }

  function AddGoalHandler() {
    props.onAddGoal({ text: interedGoalText, date: dueDate});
    setEnteredGoaltext("");
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputModalContainer}>
        <Text style={styles.nameText}>Nome da Tarefa</Text>
        <TextInput
          style={styles.textInput}
          placeholder="insira o nome da tarefa"
          placeholderTextColor={"#0088ffff"}
          onChangeText={GoalInputHandler}
          value={interedGoalText}
        />
        <Text style={styles.nameText}>Data de Conclusao</Text>
        {!showDatePicker && (
          <Pressable on onPress={toggleDatePicker}>
            <TextInput
              style={styles.textInput}
              placeholder="insira a data de conclusao"
              placeholderTextColor={"#0088ffff"}
              //onChangeText={setDate}
              value={dueDate}
              editable={false}
              onPressIn={toggleDatePicker}
            />
          </Pressable>
        )}
        {showDatePicker && (
          <DateTimePicker 
          mode='date'
          value={date}
          display='spinner'
          onChange={onChange}
          style={styles.datePicker}
          themeVariant="light"
          />
        )}
        {showDatePicker && Platform.OS === "ios" && (
          <View style={{ flexDirection: "row", justifyContent: "space-around"}}>
            <TouchableOpacity style={styles.pickerButtom} onPress={toggleDatePicker}>
              <Text style={styles.pickerButtomText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickerButtom} onPress={confirmIOSDate}>
              <Text style={styles.pickerButtomText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.nameText}>Prioridade</Text>
        <Text style={styles.nameText}>Tags</Text>
        <View style={styles.buttomContainer}>
          <TouchableOpacity style={[styles.pickerButtom, {backgroundColor: "#ff0000ff"}]} onPress={props.onCancel}>
            <Text style={styles.pickerButtomText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickerButtom} onPress={AddGoalHandler}>
            <Text style={styles.pickerButtomText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput
