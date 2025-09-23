import { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../styles";

const GEMINI_API_KEY = "AIzaSyD8wMhMut9pAJTn7I2DCG374y61AL4Ae50";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startChat = async () => {
      setLoading(true);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
      });
      console.log(response.text);

      setMessages([
        {
          text: response.text,
          user: false,
        },
      ]);

      setLoading(false)
    };
    startChat()
  }, []);

  const sendMessage = async () => {
    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages([...messages, userMessage]);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage.text,
    });
    console.log(response.text);
    setMessages([...messages, { text: response.text, user: false }]);

    setUserInput("");
    setLoading(false);
  };

  const renderMessage = ({ item }) => {
    return (
      <View key={item.text} style={{ marginVertical: 10 }}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 10, marginBottom: 5, marginHorizontal: 7 }}>
        <FlatList
          style={{ flex: 1 }}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.text}
        />
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Descreva sua rotina"
          placeholderTextColor={"#0088ffff"}
          onChangeText={setUserInput}
          onSubmitEditing={sendMessage}
          value={userInput}
          style={styles.aiChatInputText}
        />
        {loading && (
          <ActivityIndicator
            size={"small"}
            color={"black"}
            style={{ margin: 10 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default GeminiChat;
