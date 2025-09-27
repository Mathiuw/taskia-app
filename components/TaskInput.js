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

import {Picker} from '@react-native-picker/picker';

import TaskDatePicker from "./TaskDatePicker";
import styles from "../styles";


function TaskInput(props) {
  // Tasks states
  const [taskName, setTaskName] = useState("")
  const [steps, setSteps] = useState([])
  const [startDate, setStartDate] = useState(new Date)
  const [dueDate, setDueDate] = useState(new Date)
  const [priority, setPriority] = useState("")
  const [tags, setTags] = useState([])

  function AddTaskHandler() {
    props.onAddGoal(taskName, startDate.toDateString(), dueDate.toDateString(), priority);
    setTaskName("");
    setSteps([])
    setDueDate(new Date())
    setStartDate(new Date())
    // reset tags
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
        <Text style={styles.nameText}>Data de Inicio</Text>
        <TaskDatePicker placeholder="Insira a data de inicio" onDateConfirm={setStartDate}/>
        <Text style={styles.nameText}>Data de Conclusao</Text>
        <TaskDatePicker placeholder="Insira a data de conclusao" onDateConfirm={setDueDate} />
        <Text style={styles.nameText}>Prioridade</Text>
        <View style={styles.priorityInput}>
          <Picker selectedValue={priority}
            onValueChange={setPriority}
            style={{color: "#0088ffff"}}
          >
            <Picker.Item label="Baixa" value="baixa" />
            <Picker.Item label="Media" value="media" />
            <Picker.Item label="Alta" value="alta" />
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
            onPress={AddTaskHandler}
          >
            <Text style={styles.pickerButtomText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default TaskInput;
