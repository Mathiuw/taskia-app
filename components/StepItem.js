  import { View, TextInput, TouchableOpacity,  } from "react-native";
  import Ionicons from "@expo/vector-icons/Ionicons";

  // Step item component
  const stepItem = ({ item, onRemove}) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{ alignSelf: "flex-start", color: "#0088ffff" }}
          defaultValue={item.nomeSubtarefa}
        />
        <TouchableOpacity
          onPress={() => {
            onRemove(item.id);
          }}
        >
          <Ionicons name="remove-circle-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  export default stepItem;