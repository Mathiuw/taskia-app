import { Text, TextInput, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateAccount = () => {
  return (
    <SafeAreaView>
      <Text>Nova Conta</Text>
      <Text>Usuario</Text>
      <TextInput style={styles.loginTextInput} placeholder="Nome do usuario" />
      <Text>E-Mail</Text>
      <TextInput style={styles.loginTextInput} placeholder="email" />
      <Text>Senha</Text>
      <TextInput style={styles.loginTextInput} placeholder="senha" />
      <Button title="Criar Conta"/>
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