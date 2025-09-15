import { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Modal,
  Text
} from "react-native";

function GoalInput(props) {
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
          <View style={styles.buttom}>
            <Button title="Cancelar" onPress={props.onCancel} color="#ff0000ff" />
          </View>
          <View style={styles.buttom}>
            <Button
              title="Adicionar" onPress={AddGoalHandler} color="#0088ffff" 
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

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

  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
