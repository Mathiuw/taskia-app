import { StyleSheet, Text, Pressable, View } from "react-native";

function NoteItem(props) {
    return (
        <Pressable 
        android_ripple={{color: '#cbd26bff'}}
        style={({pressed}) => pressed && styles.pressedItem}
        onPress={props.onDeleteItem.bind(this, props.id)}>
            <View style={styles.goalItem} >
                <Text style={styles.noteTitle}>{props.title}</Text>
                <Text>{props.text}</Text>
            </View>
        </Pressable>
    );
};

export default NoteItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: "#f7ff84ff",
        color: "white",
        overflow: "hidden",
    },

    noteTitle: {
        marginBottom: 6,
        fontWeight: "bold",
    },

    pressedItem: 
    {
        opacity: 0.5
    },
});