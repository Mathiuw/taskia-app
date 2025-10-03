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
  const [noteName, setNoteName] = useState("")
  const [noteContent, setNoteContent] = useState("")

  function AddNote() {
    props.onAddNote(noteName, noteContent)
    setNoteName("")
    setNoteContent("")
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputModalContainer}>
        <Text style={styles.nameText}>Nome</Text>
        <TextInput
          style={[styles.textInput, {borderRadius: 12, width: '100%'}]}
          placeholderTextColor={"#0088ffff"}
          onChangeText={setNoteName}
          value={noteName}
        />
        <Text style={styles.nameText}>Conteudo</Text>
        <TextInput
          style={[styles.textInput, {borderRadius: 12, width: '100%' }]}
          multiline
          numberOfLines={6}
          maxLength={60}
          placeholderTextColor={"#0088ffff"}
          onChangeText={setNoteContent}
          value={noteContent}
        />
        <View style={styles.buttomContainer}>
          <TouchableOpacity style={[styles.pickerButtom, {backgroundColor: "#ff0000ff"}]} onPress={props.onCancel}>
            <Text style={styles.pickerButtomText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickerButtom} onPress={AddNote}>
            <Text style={styles.pickerButtomText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default NoteInput
