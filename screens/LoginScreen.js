import { Text, TextInput, StyleSheet, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const LoginScreen = () => {
    return (
        <SafeAreaView>
            <Text>Login de Usuario</Text>
            <Text>Usuario</Text>
            <TextInput style={styles.loginTextInput} placeholder="Nome do usuario"></TextInput>
            <Text>Senha</Text>
            <TextInput style={styles.loginTextInput} placeholder="senha"></TextInput>
            <Button title="Login"/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loginTextInput: {
        borderWidth: 2,
        borderColor: "#0088ffff",
        borderRadius: 16,
        width: "100%",
        padding: 16,
    },
})

export default LoginScreen