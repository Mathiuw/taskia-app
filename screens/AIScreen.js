import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import styles from "../styles";

const IAScreen = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.chatContainer}>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.aiChatInputText} placeholder='Descreva sua rotina' placeholderTextColor={"#0088ffff"}/>
        <TouchableOpacity style={styles.sendButtom}>
          <Text style={styles.buttomText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default IAScreen