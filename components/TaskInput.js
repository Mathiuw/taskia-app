import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";;
import {Picker} from '@react-native-picker/picker';

import styles from "../styles";


function TaskInput(props) {
  // Tasks states
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("");

  // Date picker states
  const [selectedDate, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const confirmIOSDate = () => {
    setDueDate(selectedDate.toDateString());
    toggleDatePicker();
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDueDate(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  function AddGoalHandler() {
    props.onAddGoal(taskName, dueDate, priority);
    setTaskName("");
    setDueDate(new Date());
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputModalContainer}>
        <Text style={styles.nameText}>Nome da Tarefa</Text>
        <TextInput
          style={styles.textInput}
          placeholder="insira o nome da tarefa"
          placeholderTextColor={"#0088ffff"}
          onChangeText={setTaskName}
          value={taskName}
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
            mode="date"
            value={selectedDate}
            display="spinner"
            onChange={onChange}
            style={styles.datePicker}
            themeVariant="light"
          />
        )}
        {showDatePicker && Platform.OS === "ios" && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={[styles.pickerButtom, { backgroundColor: "#ff0000ff" }]}
              onPress={toggleDatePicker}
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
        <Text style={styles.nameText}>Prioridade</Text>
        <View style={styles.priorityInput}>
          <Picker selectedValue={priority}
            onValueChange={setPriority}
            style={{color: "#0088ffff"}}
          >
            <Picker.Item label="Baixa" value="baixa" />
            <Picker.Item label="Media" value="media" />
            <Picker.Item label="Alta" value="alta"/>
          </Picker>
        </View>

        <Text style={styles.nameText}>Tags</Text>
        <View style={styles.buttomContainer}>
          <TouchableOpacity
            style={[styles.pickerButtom, { backgroundColor: "#ff0000ff" }]}
            onPress={props.onCancel}
          >
            <Text style={styles.pickerButtomText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pickerButtom}
            onPress={AddGoalHandler}
          >
            <Text style={styles.pickerButtomText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default TaskInput;
