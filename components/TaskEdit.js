import { useState, useContext, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import TaskDatePicker from "./TaskDatePicker";
import styles from "../styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalContext } from "./GlobalContext";
import { useFocusEffect } from "@react-navigation/core";

function TaskEdit({ navigation, route }) {

  const { taskId } = route.params;

  const { getTags, setTag, getTarefa, updateTarefaCompleta } = useContext(GlobalContext);

  const scheme = useColorScheme();

  // Task input states
  const [taskName, setTaskName] = useState("");
  const [steps, setSteps] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [selectedTag, setSelectedTag] = useState();

  // Tags list
  const [tags, setTags] = useState([]);

  // Input states
  // Tag
  const [tagInput, setTagInput] = useState("");
  const [submitTag, setSubmitTag] = useState("");

  async function UpdateTask() {
    //await setTarefa(taskName, startDate, dueDate, steps, priority, selectedTag);
    await updateTarefaCompleta(
      taskId,
      taskName, 
      startDate,
      dueDate,
      priority,
      selectedTag
    );
    setTaskName("");
    setDueDate(new Date());
    setStartDate(new Date());
    setTags([]);

    navigation.goBack();
  }

  useEffect(() => {
    // Fetch task details using taskId and populate states
    async function fetchTaskDetails() {
      const taskDetails = await getTarefa(undefined, taskId);
      setTaskName(taskDetails.descricao);
      setStartDate(taskDetails.dataInicio);  
      setDueDate(taskDetails.dataConclusao);
      setPriority(taskDetails.prioridade);
      setSelectedTag(taskDetails.idTag);
    }
    fetchTaskDetails();
  }, [taskId]);

  // Tag item component
  const TagItem = ({ item }) => {
    return (
      <View style={styles.tagContainer}>
        <TouchableOpacity onPress={() => {setSelectedTag(item)}}>
          <Text style={styles.pickerButtomText}>{item.descricao}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Get tags on focus
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const response = await getTags();

          if (isActive) {
            setTags(response);
          }
        } catch (e) {
          console.error("Error focus effect", e);
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, [submitTag])
  );

  return (
    <SafeAreaView style={styles.inputModalContainer}>
      <ScrollView>
        <Text
          style={scheme === "dark" ? styles.nameTextDark : styles.nameTextLight}
        >
          Editar Tarefa
        </Text>        
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
            <Picker.Item label="Baixa" value={0} />
            <Picker.Item label="Media" value={1} />
            <Picker.Item label="Alta" value={2} />
          </Picker>
        </View>

        <Text
          style={scheme === "dark" ? styles.nameTextDark : styles.nameTextLight}
        >
          Tags
        </Text>
        <FlatList
          style={{ flexGrow: 0 }}
          data={tags}
          renderItem={TagItem}
          horizontal={true}
          scrollEnabled={false}
          ListEmptyComponent={<Text>*Sem tags criadas</Text>}
        />
        <Text
          style={scheme === "dark" ? styles.nameTextDark : styles.nameTextLight}
        >
          Tag selecionada: {selectedTag?.descricao}
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nome da tag"
          value={tagInput}
          onChangeText={setTagInput}
          placeholderTextColor={"#0088ffff"}
          onSubmitEditing={async () => {
            await setTag(tagInput);
            setSubmitTag(tagInput);
            setTagInput("");
          }}
        />
        <View style={styles.buttomContainer}>
          <TouchableOpacity
            style={[styles.pickerButtom, { backgroundColor: "#ff0000ff" }]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.pickerButtomText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pickerButtom}
            onPress={UpdateTask}
          >
            <Text style={styles.pickerButtomText}>Aplicar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TaskEdit;
