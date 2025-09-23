import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  chatContainer: {
    flex: 15,
    marginBottom: 16,
    justifyContent: 'flex-end'
  },

  aiChatInputText: {
    borderWidth: 2,
    borderColor: '#0088ffff',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 7,
    marginHorizontal:5,
  },

  addBottomButtom: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: '#0088ffff'
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
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
  
  buttomText: {
    fontSize: 14,
    fontWeight: "500",
    color: '#fff'
  }, 

  messageContainer: {
    borderColor: '#0088ffff',
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 10,
  },

  messageText: {
    fontSize: 12,
    color: '#fff'
  },
  
  inputModalContainer: {
    flex: 1,
    backgroundColor: "#ffffffff",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  nameText: {
    fontSize: 20,
    alignSelf: "flex-start",
    marginHorizontal: 50,
    marginTop: 15
  },

  textInput: {
    borderWidth: 2,
    borderColor: "#0088ffff",
    color: "#0088ffff",
    marginVertical: 5,
    borderRadius: 50,
    width: 300,
    padding: 16,
  },

  buttomContainer: {
    marginTop: 16,
    flexDirection: "row",
  },

  pickerButtom: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#0088ffff'
  },

  pickerButtomText: {
    fontSize: 14,
    fontWeight: "500",
    color: '#fff'
  },  

  datePicker: {
    height: 120,
  }
});

export default styles