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

const GEMINI_API_KEY = "AIzaSyCV-zcPQxr7dtoUpiKaPR-s1JZWZTWKfOA";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startChat = async () => {
      return
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
    if (userMessage == "") return

    setLoading(true)
    const userMessage = { key: Math.random().toString(), text: userInput, user: true }
    setMessages([...messages, userMessage])
    setUserInput("")

    //const testPrompt = "Defina inteligencia artificial para min"

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userInput,
    });
    console.log(response.text)

    setMessages([...messages, { key: Math.random().toString(), text: response.text, user: false }])

    setUserInput("")
    setLoading(false)
  };

  const renderMessage = ({ item }) => {
    return (
      <View key={item.text} style={{ marginVertical: 10 }}>
        <Text>{item.text}</Text>
      </View>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 10, marginBottom: 5, marginHorizontal: 7 }}>
        <FlatList
          style={{ flex: 1 }}
          data={messages}
          renderItem={renderMessage}
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
