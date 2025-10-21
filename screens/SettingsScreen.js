import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import styles from "../styles";
import QuestionnaireScreen from "./QuestionnaireScreen";

const SettingsStack = createNativeStackNavigator()

const SettingsOptionsScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const redoQuestions = () => {
        navigation.navigate("Questions")
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <View style={styles.buttomContainer}>
            <TouchableOpacity style={{justifyContent: "center"}} onPress={redoQuestions}>
            <Text style={styles.pickerButtomText}>Refazer Questionario</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
}

const SettingsScreen = ({navigation}) => {
    <SettingsStack.Navigator initialRouteName="Options" >
        <SettingsStack.Screen name="Options" component={SettingsOptionsScreen} />
        <SettingsStack.Screen name="Questions" component={QuestionnaireScreen} />
    </SettingsStack.Navigator>
};

export default SettingsScreen;
