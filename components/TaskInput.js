import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import TaskDatePicker from "./TaskDatePicker";
import styles from "../styles";
import Ionicons from "@expo/vector-icons/Ionicons";

function TaskInput(props) {
  // Tasks states
  const [taskName, setTaskName] = useState("");
  const [steps, setSteps] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState([]);

  function AddTaskHandler() {
    props.onAddGoal(taskName, startDate, dueDate, priority);
    setTaskName("");
    setSteps([]);
    setDueDate(new Date());
    setStartDate(new Date());
    // reset tags
  }

  const stepItem = (itemData) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput style={{alignSelf: "flex-start"}}
          value={itemData.item.title}
          onValueChange={(value) => {
            const newSteps = [...steps]
            newSteps[itemData.index] = { title: value}
            setSteps(newSteps)
          }}
        />
        <TouchableOpacity onPress={RemoveStep.bind(itemData.item.title)} >
          <Ionicons name="remove-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  function AddStep() {
    setSteps([...steps, { title: "Nova etapa" }]);
  }

  function RemoveStep(title) {
    const newSteps = steps.filter((step) => step.title !== title)
    setSteps(newSteps)
  }

  const scheme = useColorScheme();

  return (
    <Modal visible={props.visible} animationType="slide">
      <View
        style={
          scheme === "dark"
            ? styles.inputModalContainerDark
            : styles.inputModalContainerLight
        }
      >
        <Text
          style={scheme === "dark" ? styles.nameTextDark : styles.nameTextLight}
        >
          Nome
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nome da tarefa"
          placeholderTextColor={"#0088ffff"}
          onChangeText={setTaskName}
          value={taskName}
        />
        <Text
          style={scheme === "dark" ? styles.nameTextDark : styles.nameTextLight}
        >
          Etapas
        </Text>
        <FlatList
          style={{ flexGrow: 0, flex: 1 }}
          data={steps}
          renderItem={stepItem}
        />
        <TouchableOpacity onPress={AddStep}  >
          <Text style={{color: '#0088ffff', borderBottomWidth: 2, borderBottomColor: '#0088ffff'}}>Adicionar Etapa</Text>
        </TouchableOpacity>
        <Text
          style={scheme === "dark" ? styles.nameTextDark : styles.nameTextLight}
        >
          Data de Inicio
        </Text>
        <TaskDatePicker
          placeholder="Insira a data de inicio"
          onDateConfirm={setStartDate}
        />
        <Text
          style={scheme === "dark" ? styles.nameTextDark : styles.nameTextLight}
        >
          Data de Conclusao
        </Text>
        <TaskDatePicker
          placeholder="Insira a data de conclusao"
          onDateConfirm={setDueDate}
        />
        <Text
          style={scheme === "dark" ? styles.nameTextDark : styles.nameTextLight}
        >
          Prioridade
        </Text>
        <View style={styles.priorityInput}>
          <Picker
            selectedValue={priority}
            onValueChange={setPriority}
            style={{ color: "#0088ffff" }}
          >
            <Picker.Item label="Baixa" value="baixa" />
            <Picker.Item label="Media" value="media" />
            <Picker.Item label="Alta" value="alta" />
          </Picker>
        </View>

        <Text
          style={scheme === "dark" ? styles.nameTextDark : styles.nameTextLight}
        >
          Tags
        </Text>
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
