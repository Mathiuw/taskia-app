import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatContainer: {
    flex: 15,
    marginBottom: 16,
    justifyContent: 'flex-end'
  },

  inputText: {
    borderWidth: 2,
    borderColor: '#0088ffff',
    borderRadius: 50,
    paddingVertical: 8,
    width: "70%",
  },

  taskContainer: {
    flex: 1,
  },

  addTaskButtom: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: '#0088ffff'
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
  },

  sendButtom: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: '#0088ffff'
  },
  
  sendButtomText: {
    fontSize: 14,
    fontWeight: "500",
    color: '#fff'
  }, 
});

export default styles