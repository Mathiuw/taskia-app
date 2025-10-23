import { Text, View, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import styles from "../styles";
import QuestionnaireScreen from "./QuestionnaireScreen";
import { useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const SettingsStack = createNativeStackNavigator();

const SettingsOptionsScreen = ({ navigation }) => {
  const { aiVoice, setAIVoice, currentUser, setCurrentUser } = useContext(GlobalContext);

  const toggleSwitch = () => setAIVoice((previousState) => !previousState);

  const redoQuestions = () => {
    navigation.navigate("Questions");
  };

  const logout = () => {
    setCurrentUser()
    navigation.navigate("User")
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: "#0088ffff" }}>Voz da IA</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={aiVoice ? "#0088ffff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={aiVoice}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: "#0088ffff"}}>{"Estilo Aprendizado: " + currentUser.record.tipoNeurodivergencia} </Text>
        <TouchableOpacity style={styles.pickerButtom} onPress={redoQuestions}>
          <Text style={styles.pickerButtomText}>Refazer Questionario</Text>
        </TouchableOpacity>        
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: "#0088ffff"}}>Conta atual: {currentUser?.record.nome} </Text>
        <TouchableOpacity style={[styles.pickerButtom, { backgroundColor: "#ff0000ff" }]} onPress={logout}>
          <Text style={[styles.pickerButtomText]}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const SettingsScreen = ({ navigation }) => {
  return (
    <SettingsStack.Navigator
      initialRouteName="Options"
      screenOptions={{ headerShown: false }}
    >
      <SettingsStack.Screen name="Options" component={SettingsOptionsScreen} />
      <SettingsStack.Screen name="Questions" component={QuestionnaireScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsScreen;
