import BouncyCheckbox from "react-native-bouncy-checkbox";

import styles from "../styles";
import { FlatList, View } from "react-native";

function stepItem(itemData) {
    return (
        <BouncyCheckbox size={25} text={itemData.item.title}/>
    )
}

function TaskItem({ title, steps, startDate, dueDate, priority }) {
  return (
    <View>
      <BouncyCheckbox
        style={styles.taskItem}
        size={25}
        text={title + " - " + startDate + " - " + dueDate}
        fillColor= {priority === "alta" ? "red" : priority === "media" ? "orange" : "green"}
        unFillColor="#fff"
        //onPress={(isChecked) => {}}
      />
      <FlatList 
        data={steps}
        renderItem={stepItem}
      />
    </View>
  );
}

export default TaskItem