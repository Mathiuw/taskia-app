import { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Text
} from "react-native";

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
      <View style={styles.inputContainer}>
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

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    backgroundColor: "#ffffffff",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  textInput: {
    borderWidth: 2,
    borderColor: "#0088ffff",
    borderRadius: 16,
    width: "100%",
    padding: 16,
  },

  buttomContainer: {
    marginTop: 16,
    flexDirection: "row",
  },

  buttom: {
    width: "30%",
    marginHorizontal: 8,
  },

  pickerButtom: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#0088ffff'
  },

  pickerButtomText: {
    fontSize: 14,
    fontWeight: "500",
    color: '#fff'
  },  


  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
