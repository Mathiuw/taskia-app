import { StyleSheet, View, Text, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function GoalItem(props) {
    return (
        <BouncyCheckbox 
        style = {styles.goalItem}
        size={25}
        text={props.text + " - " + props.date}
        fillColor="red"
        unFillColor="#fff"
        //onPress={(isChecked) => {}}
        />
    );
};

export default GoalItem;

const styles = StyleSheet.create({
    goalItemContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    
    goalItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        //backgroundColor: "#0088ffff",
        color: "white",
        overflow: "hidden",
    },

    pressedItem: 
    {
        opacity: 0.5
    },
});