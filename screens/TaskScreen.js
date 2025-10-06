import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { GlobalContext } from "../components/GlobalContext";
import TaskList from "../components/TaskList";
import CreateTask from "../components/TaskInput";

import styles from "../styles";
import TaskInput from "../components/TaskInput";

const Stack = createNativeStackNavigator();

const TaskScreen = ({ navigation }) => {
  const { tasks } = useContext(GlobalContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TaskList tasks={tasks} />
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
    </Stack.Navigator>
  );
};

export default LoginStack;
