import { useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  FlatList,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import TaskDatePicker from "./TaskDatePicker";
import styles from "../styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalContext } from "./GlobalContext";
import { useFocusEffect } from "@react-navigation/core";

function TaskInput({ navigation }) {
  const { setTarefa, getTags, setTag, scheduleNotification } =
    useContext(GlobalContext);

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

  // Steps
  const [stepInput, setStepInput] = useState("");

  // Notifications
  const [shouldScheduleNotification, setShouldScheduleNotification] =
    useState(true);

  const toggleSwitch = () =>
    setShouldScheduleNotification((previousState) => !previousState);

  async function AddTaskHandler() {
    await setTarefa(taskName, startDate, dueDate, steps, priority, selectedTag);
    setTaskName("");
    setSteps([]);
    setDueDate(new Date());
    setStartDate(new Date());
    setTags([]);

    if (shouldScheduleNotification === true) {
      await scheduleNotification(dueDate);
    }

    navigation.goBack();
  }

  // Step item component
  const stepItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{ alignSelf: "flex-start", color: "#0088ffff" }}
          defaultValue={item.title}
        />
        <TouchableOpacity
          onPress={() => {
            RemoveStep(item.title);
          }}
        >
          <Ionicons name="remove-circle-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  function AddStep(title) {
    setSteps([...steps, { key: Math.random(), title: title }]);
  }

  function RemoveStep(title) {
    const newSteps = steps.filter((step) => step.title !== title);
    setSteps(newSteps);
  }

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
          style={{ flexGrow: 0 }}
          data={steps}
          renderItem={stepItem}
          scrollEnabled={false}
          ListEmptyComponent={<Text>*Sem etapas ainda</Text>}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Nome da etapa"
          value={stepInput}
          onChangeText={setStepInput}
          placeholderTextColor={"#0088ffff"}
          onSubmitEditing={() => {
            AddStep(stepInput);
            setStepInput("");
          }}
        />

        <Text
          style={scheme === "dark" ? styles.nameTextDark : styles.nameTextLight}
        >
          Data de Inicio
        </Text>
        <TaskDatePicker
          placeholder="Insira a data de inicio"
          onDateConfirm={setStartDate}
          value={startDate}
        />
        <Text
          style={scheme === "dark" ? styles.nameTextDark : styles.nameTextLight}
        >
          Data de Conclusao
        </Text>
        <TaskDatePicker
          placeholder="Insira a data de conclusao"
          onDateConfirm={setDueDate}
          value={dueDate}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={
              scheme === "dark" ? styles.nameTextDark : styles.nameTextLight
            }
          >
            Lembretes
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={shouldScheduleNotification ? "#0088ffff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={shouldScheduleNotification}
          />
        </View>

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
            onPress={AddTaskHandler}
          >
            <Text style={styles.pickerButtomText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TaskInput;
