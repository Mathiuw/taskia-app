import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useContext } from "react";

import { GlobalContext } from "./GlobalContext";
import styles from "../styles";
import { FlatList, View, useColorScheme } from "react-native";

function TaskItem({ id, title, steps, startDate, dueDate, priority, completed }) {
  const scheme = useColorScheme();
  const { updateTarefa } = useContext(GlobalContext)

  function stepItem(itemData) {
    return (
      <BouncyCheckbox
        size={25}
        text={itemData.item.title}
        fillColor="#909090ff"
        unFillColor={scheme === "dark" ? "#000000ff" : "#fff"}
        style={[styles.taskItem, { marginVertical: 2 }]}
      />
    );
  }

  return (
    <View>
      <BouncyCheckbox
        style={styles.taskItem}
        size={25}
        text={
          title +
          " - " + startDate
          //startDate.toLocaleDateString("en-GB") +
          + " - " + dueDate
          //dueDate.toLocaleDateString("en-GB")
        }
        fillColor={priority === 2 ? "red" : priority === 1 ? "orange" : "green"}
        unFillColor={scheme === "dark" ? "#000000ff" : "#fff"}
        onPress={(isChecked) => {updateTarefa(id, isChecked)}}
        isChecked={completed}
      />
      <FlatList
        style={{ marginStart: 30 }}
        data={steps}
        renderItem={stepItem}
      />
    </View>
  );
}

export default TaskItem;
