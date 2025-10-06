import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TouchableOpacity, Text, Alert } from "react-native";
import { useContext, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NoteInput from "../components/NoteInput";
import NoteItem from "../components/NoteItem";

import styles from "../styles";
import { GlobalContext } from "../components/GlobalContext";

const Stack = createNativeStackNavigator()

const NotesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Lista Notas"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Lista Notas" component={NoteScreen} />
      <Stack.Screen name="Criar Nota" component={NoteInput} />
    </Stack.Navigator>
  );
};

const NoteScreen = ({ navigation }) => {
  const { notes, DeleteNote } = useContext(GlobalContext);

  const createTwoButtonAlert = (id) =>
    Alert.alert("Deletar Nota", "Voce deseja deletar esta nota?", [
      {
        text: "Cancel",
        onPress: console.log("Cancel Pressed"),
      },
      {
        text: "OK",
        onPress: () => {
          DeleteNote(id);
        },
      },
    ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <TouchableOpacity
        style={styles.addBottomButtom}
        onPress={() => {navigation.navigate("Criar Nota")}}
      >
        <Text style={[styles.buttomText, { fontSize: 18 }]}>
          Adicionar Nota
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NotesStack;
