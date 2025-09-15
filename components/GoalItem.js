import { StyleSheet, Text, Pressable } from "react-native";

function GoalItem(props) {
    return (
        <Pressable 
        android_ripple={{color: '#35aeff8e'}}
        style={({pressed}) => pressed && styles.pressedItem}
        onPress={props.onDeleteItem.bind(this, props.id)}>
            <Text style={styles.goalItem} >{props.text}</Text>
        </Pressable>
    );
};

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: "#0088ffff",
        color: "white",
        overflow: "hidden",
    },

    pressedItem: 
    {
        opacity: 0.5
    },
});