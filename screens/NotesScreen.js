import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TouchableOpacity, Text, Alert } from "react-native";
import { useState } from "react";

import NoteInput from "../components/NoteInput";
import NoteItem from "../components/NoteItem";

import styles from "../styles";

const NoteScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);

  function AddNote(enteredNoteTitle, enteredNoteText) {
    if (enteredNoteTitle == "") return

    setNotes((currentNotes) => [
      ...currentNotes,
      { key: Math.random(), title: enteredNoteTitle, text: enteredNoteText },
    ]);

    setShowModal(false);
  }

  const createTwoButtonAlert = (id) =>
    Alert.alert('Deletar Nota', 'Voce deseja deletar esta nota?', [
      {
        text: 'Cancel',
        onPress: console.log('Cancel Pressed'),
      },
      // {text: 'OK', onPress: DeleteNote(id)},
      {text: 'OK', onPress: () => {DeleteNote(id)}},
    ]);

  function DeleteNote(id) {
    console.log("Deleted ", id);
    setNotes((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.key !== id);
    });
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <FlatList
        data={notes}
        renderItem={(itemData) => {
          return (
            <NoteItem
              id={itemData.item.key}
              title={itemData.item.title}
              text={itemData.item.text}
              onDeleteItem={createTwoButtonAlert}
            />
          );
        }}
      />
      <TouchableOpacity style={styles.addBottomButtom} onPress={()=> {setShowModal(true)}}>
        <Text style={[styles.buttomText, {fontSize: 18}]}>Adicionar Nota</Text>
      </TouchableOpacity>
      <NoteInput
        visible={showModal}
        onAddNote={AddNote}
        onCancel={()=> {setShowModal(false)}}
      />
    </SafeAreaView>
  );
}

export default NoteScreen