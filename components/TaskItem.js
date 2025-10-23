import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useContext } from "react";

import { GlobalContext } from "./GlobalContext";
import styles from "../styles";
import { FlatList, View, Text, useColorScheme } from "react-native";
import { sleep } from "./sleep";

function TaskItem({ id, title, steps, startDate, dueDate, priority, completed, idTag }) {
  const scheme = useColorScheme();
  const { updateTarefa, updateSubtarefa, delTarefa, getTags } = useContext(GlobalContext)

  function stepItem(itemData) {
    return (
      <BouncyCheckbox
        size={25}
        text={itemData.item.nomeSubtarefa}
        fillColor="#909090ff"
        unFillColor={scheme === "dark" ? "#000000ff" : "#fff"}
        style={[styles.taskItem, { marginVertical: 2 }]}
        onPress={(isChecked) => {updateSubtarefa(itemData.item.id, isChecked)}}
        isChecked={itemData.item.concluido}
      />
    );
  }

  // Tag item component
  const TagItem = ({ item }) => {
    return (
      <View style={styles.tagContainer}>
          <Text style={styles.pickerButtomText}>{item.descricao}</Text>
      </View>
    );
  };

  return (
    <View>
      <View>
        <BouncyCheckbox
          style={styles.taskItem}
          size={25}
          text={title + " - " + startDate + " -> " + dueDate}
          fillColor={priority === 2 ? "red" : priority === 1 ? "orange" : "green"}
          unFillColor={scheme === "dark" ? "#000000ff" : "#fff"}
          onPress={async (isChecked) => {
            updateTarefa(id, isChecked)
            if (isChecked === true) {
              await sleep(1000)
              delTarefa(id)
            }
          }}
          isChecked={completed}
        />
      </View>
      <FlatList
        style={{ marginStart: 30 }}
        data={steps}
        renderItem={stepItem}
      />
    </View>
  );
}

export default TaskItem;
