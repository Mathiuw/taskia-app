import BouncyCheckbox from "react-native-bouncy-checkbox";

import styles from "../styles";
import { FlatList, View, useColorScheme } from "react-native";



function TaskItem({ title, steps, startDate, dueDate, priority }) {

  const scheme = useColorScheme()

  function stepItem(itemData) {
    return (
        <BouncyCheckbox size={25} text={itemData.item.title} fillColor="#909090ff" unFillColor={scheme === 'dark' ? '#000000ff' : '#fff'} style={[styles.taskItem,{ marginVertical: 2}]}/>
    )
  }

  return (
    <View>
      <BouncyCheckbox
        style={styles.taskItem}
        size={25}
        text={title + " - " + startDate.toLocaleDateString("en-GB") + " - " + dueDate.toLocaleDateString("en-GB")}
        fillColor= {priority === "alta" ? "red" : priority === "media" ? "orange" : "green"}
        unFillColor={scheme === 'dark' ? '#000000ff' : '#fff'}
        //onPress={(isChecked) => {}}
      />
      <FlatList style={{marginStart: 30}}
        data={steps}
        renderItem={stepItem}
      />
    </View>
  );
}

export default TaskItem