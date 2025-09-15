import { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Modal,
  Image,
} from "react-native";

function GoalInput(props) {
  const [interedGoalText, setEnteredGoaltext] = useState("");

  function GoalInputHandler(enteredText) {
    setEnteredGoaltext(enteredText);
  }

  function AddGoalHandler() {
    props.onAddGoal(interedGoalText);
    setEnteredGoaltext("");
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="insira o nome da tarefa"
          placeholderTextColor={"#0088ffff"}
          onChangeText={GoalInputHandler}
          value={interedGoalText}
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
