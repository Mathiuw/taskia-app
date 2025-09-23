import { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Text
} from "react-native";

import styles from "../styles";

function NoteInput(props) {
  const [interedGoalText, setEnteredGoaltext] = useState("")
  const [enteredNoteText, setEnteredNoteText] = useState("")

  function GoalInputHandler(enteredText) {
    setEnteredGoaltext(enteredText);
  }

  function AddGoalHandler() {
    props.onAddGoal(interedGoalText, enteredNoteText)
    setEnteredGoaltext("")
    setEnteredNoteText("")
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputModalContainer}>
        <Text>Nome da nota</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={"#0088ffff"}
          onChangeText={GoalInputHandler}
          value={interedGoalText}
        />
        <Text>Conteudo da nota</Text>
        <TextInput
          style={[styles.textInput, {paddingBottom: 50}]}
          placeholderTextColor={"#0088ffff"}
          onChangeText={(enteredText) => setEnteredNoteText(enteredText)}
          value={enteredNoteText}
        />
        <View style={styles.buttomContainer}>
          <TouchableOpacity style={[styles.pickerButtom, {backgroundColor: "#ff0000ff"}]} onPress={props.onCancel}>
            <Text style={styles.pickerButtomText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickerButtom} onPress={AddGoalHandler}>
            <Text style={styles.pickerButtomText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default NoteInput
