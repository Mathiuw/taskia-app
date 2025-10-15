import {
  Text,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

import { GlobalContext } from "../components/GlobalContext";
import TaskDatePicker from "../components/TaskDatePicker";

const CreateAccount = () => {
  const { criarLogin } = useContext(GlobalContext);

  const [inputUser, setInputUser] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState("");
  const [nType, setNType] = useState("");
  const [inputBirthDate, setInputBirthDate] = useState("");
  const [inputGender, setInputGender] = useState("");

  return (
    <SafeAreaView>
      <Text>Nova Conta</Text>
      <Text>Nome do Usuario</Text>
      <TextInput style={styles.loginTextInput} value={inputUser} onChangeText={setInputUser} autoComplete="name" placeholder="Nome do usuario" />
      <Text>Data de Nascimento</Text>
      <TaskDatePicker
        placeholder="Insira a data de nascimento"
        onDateConfirm={setInputBirthDate}
      />
      <Text>Genero</Text>
      <View style={styles.priorityInput}>
          <Picker
            selectedValue={inputGender}
            onValueChange={setInputGender}
            style={{ color: "#0088ffff" }}
          >
            <Picker.Item label="Masculino" value="M" />
            <Picker.Item label="Feminino" value="F" />
            <Picker.Item label="Não Binario" value="NB" />
          </Picker>
      </View>
      <Text>E-Mail</Text>
      <TextInput style={styles.loginTextInput} value={inputEmail} onChangeText={setInputEmail} inputMode="email" autoCapitalize="none" placeholder="email" />
      <Text>Senha</Text>
      <TextInput style={styles.loginTextInput} value={inputPassword} onChangeText={setInputPassword}  placeholder="senha"/>
      <Text>Confirmar Senha</Text>
      <TextInput style={styles.loginTextInput} value={inputPasswordConfirm} onChangeText={setInputPasswordConfirm} placeholder="Confirmar senha" />
      <Button
        title="Criar Conta"
        onPress={() => {
          if (inputPassword !== inputPasswordConfirm) {
            console.error("Passwords do not match!!")
            setInputPassword("")
            setInputPasswordConfirm("")
            return
          }

          criarLogin(
            inputEmail,
            inputPassword,
            inputPasswordConfirm,
            inputUser,
            nType,
            inputBirthDate,
            inputGender
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginTextInput: {
    borderWidth: 2,
    borderColor: "#0088ffff",
    borderRadius: 16,
    width: "100%",
    padding: 16,
  },
});

export default CreateAccount;
