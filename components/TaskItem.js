import BouncyCheckbox from "react-native-bouncy-checkbox";

import styles from "../styles";

function TaskItem(props) {
    return (
        <BouncyCheckbox 
        style = {styles.taskItem}
        size={25}
        text={props.text + " - " + props.startDate + " - " + props.dueDate}
        fillColor= "red"
        unFillColor="#fff"
        //onPress={(isChecked) => {}}
        />
    );
};

export default TaskItem;