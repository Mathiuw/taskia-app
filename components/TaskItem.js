import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useContext, useRef } from "react";

import { GlobalContext } from "./GlobalContext";
import styles from "../styles";
import { FlatList, View, Text, useColorScheme, Pressable } from "react-native";
import { sleep } from "./sleep";

function TaskItem({
  id,
  title,
  steps,
  startDate,
  dueDate,
  priority,
  completed,
  idTag,
  updateState,
  onTaskLongPress,
}) {
  const scheme = useColorScheme();
  const { updateTarefa, updateSubtarefa, delTarefa, getTags } = useContext(GlobalContext);
  const longPressRef = useRef(false);

  function stepItem(itemData) {
    return (
      <BouncyCheckbox
        size={25}
        text={itemData.item.nomeSubtarefa}
        fillColor="#909090ff"
        unFillColor={scheme === "dark" ? "#000000ff" : "#fff"}
        style={[styles.taskItem, { marginVertical: 2 }]}
        onPress={(isChecked) => {
          updateSubtarefa(itemData.item.id, isChecked);
        }}
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
          fillColor={
            priority === 2 ? "red" : priority === 1 ? "orange" : "green"
          }
          unFillColor={scheme === "dark" ? "#000000ff" : "#fff"}
          onPress={async (isChecked) => {
            if (longPressRef.current) {
              longPressRef.current = false;
              return;
            }
            updateTarefa(id, isChecked);
            if (isChecked === true) {
              console.log("Deleting task id: " + id);
              //await sleep(500)
              await delTarefa(id);
              updateState(Math.random());
            }
          }}
          isChecked={completed}
          onLongPress={() => {
            longPressRef.current = true;
            console.log("Long pressed task id: " + id);
            onTaskLongPress?.(id);
          }}
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
