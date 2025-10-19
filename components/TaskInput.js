import { useState, useContext, useCallback } from "react";
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

function TaskInput({ navigation }) {
  const { setTarefa, getTags, setTag, setSubtarefa } = useContext(GlobalContext);

  const scheme = useColorScheme(); 

  // Tasks states
  const [taskName, setTaskName] = useState("");
  const [steps, setSteps] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState([]);

  // Input states
  // Tags
  const [tagInput, setTagInput] = useState("")
  const [submitTag, setSubmitTag] = useState("")

  // Steps
  const [stepInput, setStepInput] = useState("")

  function addTag() {
    setTags([...tags, { key: Math.random(), title: tagInput}])
    setTagInput("")
  }

  async function AddTaskHandler() {
    //AddTask({title: taskName, steps: steps, startDate: startDate, dueDate: dueDate, priority: priority, tags: tags});
    await setTarefa(taskName, startDate, dueDate, steps, priority, tags);
    setTaskName("");
    setSteps([]);
    setDueDate(new Date());
    setStartDate(new Date());
    setTags([])
    navigation.goBack()
  }

  const stepItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center",  }}>
        <TextInput style={{alignSelf: "flex-start", color: '#0088ffff'}}
          defaultValue= {item.title}
        />
        <TouchableOpacity>
          <Ionicons name="remove-circle-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  const tagItem = ({item}) => {
    return (
      <View style={styles.tagContainer}>
        <Text style={styles.pickerButtomText}>{item.descricao}</Text>
      </View>
    )
  }

  function AddStep(title) {
    setSteps([...steps, { key: Math.random(), title: title }]);
  }

  function RemoveStep(title) {
    const newSteps = steps.filter((step) => step.title !== title)
    setSteps(newSteps)
  }

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
          style={{ flexGrow: 0}}
          data={steps}
          renderItem={stepItem}
          scrollEnabled={false}
          ListEmptyComponent={<Text>*Sem etapas ainda</Text>}
        />
        {/* <TouchableOpacity onPress={AddStep}  >
          <Text style={{color: '#0088ffff', borderBottomWidth: 2, borderBottomColor: '#0088ffff'}}>Adicionar Etapa</Text>
        </TouchableOpacity> */}
          <TextInput
          style={styles.textInput}
          placeholder="Nome da etapa"
          value={stepInput}
          onChangeText={setStepInput}
          placeholderTextColor={"#0088ffff"}
          onSubmitEditing={()=> {
            AddStep(stepInput)
            setStepInput("")
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
        <FlatList style={{flexGrow: 0}} 
        data={tags}
        renderItem={tagItem}
        horizontal={true}
        scrollEnabled={false}
        ListEmptyComponent={<Text>*Sem tags ainda</Text>}
        />
          <TextInput
          style={styles.textInput}
          placeholder="Nome da tag"
          value={tagInput}
          onChangeText={setTagInput}
          placeholderTextColor={"#0088ffff"}
          onSubmitEditing={async ()=> {
            await setTag(tagInput)
            setSubmitTag(tagInput)
            setTagInput("");
          }}
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
      </ScrollView>

    </SafeAreaView>
  );
}

export default TaskInput;
