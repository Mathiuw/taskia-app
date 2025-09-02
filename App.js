import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.chatContainer}>
        <Text>Chat starts here</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Describe your task'/>
        <Button title='send'/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatContainer: {
    flex: 6,
    justifyContent: 'flex-end'
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }

});
