import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import TaskDatePicker from "./TaskDatePicker";
import styles from "../styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalContext } from "./GlobalContext";

function TaskInput({ navigation }) {
  const { AddTask } = useContext(GlobalContext);

  const scheme = useColorScheme(); 

  // Tasks states
  const [taskName, setTaskName] = useState("");
  const [steps, setSteps] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState([]);

  // Input states
  const [tagInput, setTagInput] = useState("")

  function addTag() {
    setTags([...tags, { key: Math.random(), title: tagInput}])
    setTagInput("")
  }

  function AddTaskHandler() {
    AddTask({title: taskName, steps: steps, startDate: startDate, dueDate: dueDate, priority: priority, tags: tags});
    setTaskName("");
    setSteps([]);
    setDueDate(new Date());
    setStartDate(new Date());
    setTags([])
    navigation.goBack()
  }

  const stepItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput style={{alignSelf: "flex-start"}}
          defaultValue= {item.title}
        />
        <TouchableOpacity>
          <Ionicons name="remove-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const tagItem = (itemData) => {
    return (
      <View style={styles.tagContainer}>
        <Text style={styles.pickerButtomText}>{itemData.item.title}</Text>
      </View>
    )
  }

  function AddStep() {
    setSteps([...steps, { key: Math.random(), title: "Nova etapa" }]);
  }

  function RemoveStep(title) {
    const newSteps = steps.filter((step) => step.title !== title)
    setSteps(newSteps)
  }

  return (
    <SafeAreaView style={styles.inputModalContainer}>
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
          style={{ flexGrow: 0}}
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
        <FlatList style={{flexGrow: 0}} 
        data={tags}
        renderItem={tagItem}
        horizontal={true}
        />
          <TextInput
          style={styles.textInput}
          placeholder="Nome da tag"
          value={tagInput}
          onChangeText={setTagInput}
          placeholderTextColor={"#0088ffff"}
          onSubmitEditing={addTag}
        />
        <View style={styles.buttomContainer}>
          <TouchableOpacity
            style={[styles.pickerButtom, { backgroundColor: "#ff0000ff" }]}
            onPress={() => {navigation.goBack()}}
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
    </SafeAreaView>
  );
}

export default TaskInput;
