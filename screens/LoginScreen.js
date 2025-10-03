import { Text, TextInput, StyleSheet, Button, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangePassword from "./ChangePassword";
import CreateAccount from "./CreateAccountScreen";

const Stack = createNativeStackNavigator()

const LoginStack = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Criar Conta" component={CreateAccount} />
            <Stack.Screen name="Mudar Senha" component={ChangePassword}/>
        </Stack.Navigator> 
    )
}

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Login de Usuario</Text>
      <Text>E-Mail</Text>
      <TextInput style={styles.loginTextInput} placeholder="email" />
      <Text>Senha</Text>
      <TextInput style={styles.loginTextInput} placeholder="senha" />
      <View style={{flexDirection:"row", justifyContent:"center", }}>
        <TouchableOpacity style={{margin: 10}} onPress={() => {navigation.navigate("Criar Conta")}}>
            <Text>Criar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{margin: 10}} onPress={() => {navigation.navigate("Mudar Senha")}}>
            <Text>Esqueci Minha Senha</Text>
        </TouchableOpacity>
      </View>
      <Button title="Login"/>
    </SafeAreaView>
  );
};

const LoginStartScreen = () => {
    return <LoginStack />
}

const styles = StyleSheet.create({
  loginTextInput: {
    borderWidth: 2,
    borderColor: "#0088ffff",
    borderRadius: 16,
    width: "100%",
    padding: 16,
  },
});

export default LoginStartScreen;