import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TaskList from "../components/TaskList";

import styles from "../styles";
import TaskInput from "../components/TaskInput";
import TaskEdit from "../components/TaskEdit";

const Stack = createNativeStackNavigator();

const TaskScreen = ({ navigation }) => {

  const onTaskLongPress = (id) => {
    console.log(`Task long-pressed: id=${id}`);
    navigation.navigate("Editar Tarefa", { taskId: id });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TaskList onTaskLongPress={onTaskLongPress} />
      <TouchableOpacity
        style={styles.addBottomButtom}
        onPress={() => {
          navigation.navigate("Criar Tarefa");
        }}
      >
        <Text style={[styles.buttomText, { fontSize: 18 }]}>
          Adicionar Tarefa
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Lista Tarefas"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Lista Tarefas" component={TaskScreen} />
      <Stack.Screen name="Criar Tarefa" component={TaskInput} />
      <Stack.Screen name="Editar Tarefa" component={TaskEdit} />
    </Stack.Navigator>
  );
};

export default LoginStack;
