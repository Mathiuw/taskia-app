import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import styles from "../styles";

const IAScreen = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.chatContainer}>
        <Text>Chat starts here</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputText} placeholder='Descreva sua rotina' placeholderTextColor={"#0088ffff"}/>
        <TouchableOpacity style={styles.sendButtom}>
          <Text style={styles.sendButtomText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default IAScreen