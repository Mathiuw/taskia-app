import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  chatContainer: {
    flex: 15,
    marginBottom: 16,
    justifyContent: "flex-end",
  },

  aiChatInputText: {
    borderWidth: 2,
    height: 48,
    borderColor: "#0088ffff",
    color: "#0088ffff",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },

  addBottomButtom: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#0088ffff",
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
  },

  sendButtom: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#0088ffff",
  },

  buttomText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },

  iaMessageContainer: {
    backgroundColor: "#0088ffff",
    alignSelf: "flex-start",
    borderRadius: 15,
    marginVertical: 15,
    maxWidth: '80%',
    padding: 5,
    paddingHorizontal: 10,
  },

  userMessageContainer: {
    backgroundColor: "#ffffffff",
    alignSelf: "flex-end",
    borderRadius: 15,
    marginVertical: 15,
    maxWidth: '80%',
    padding: 5,
    paddingHorizontal: 10,
  },

  messageText: {
    fontSize: 12,
    color: "#fff",
  },

  inputModalContainer: {
    flex: 1,
    alignItems:"center"
  },

  nameTextLight: {
    fontSize: 20,
    alignSelf: "flex-start",
    marginHorizontal: 50,
    marginTop: 15,
  },

  nameTextDark: {
    fontSize: 20,
    alignSelf: "flex-start",
    marginHorizontal: 50,
    marginTop: 15,
    color: '#fff'
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

  priorityInput: {
    borderWidth: 2,
    borderColor: "#0088ffff",
    color: "#0088ffff",
    marginVertical: 5,
    justifyContent: "center",
    paddingHorizontal:10,
    borderRadius: 50,
    height: 50,
    width: 300,
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
    backgroundColor: "#0088ffff",
  },

  pickerButtomText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },

  datePicker: {
    height: 120,
  },

  taskItemContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  taskItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    color: "white",
    overflow: "hidden",
  },

  tagContainer: {
    backgroundColor: "#0088ffff",
    borderRadius: 4,
    padding: 4,
    marginRight: 5,
    marginBottom: 5,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#0088ffff",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0088ffff",
  },

  filterButton: {
    backgroundColor: "#0088ffff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  filterButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    maxHeight: "70%",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0088ffff",
    marginBottom: 16,
    textAlign: "center",
  },

  modalButton: {
    backgroundColor: "#0088ffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },

  clearButton: {
    backgroundColor: "#ff4444",
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    paddingVertical: 20,
  },
});

export default styles;
