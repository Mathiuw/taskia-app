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
import Markdown from "react-native-markdown-display";
import * as Speech from "expo-speech";

import styles from "../styles";

const GEMINI_API_KEY = "AIzaSyCV-zcPQxr7dtoUpiKaPR-s1JZWZTWKfOA";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const renderMessage = ({ item }) => {
  return (
    <View
      key={item.text}
      style={
        item.user ? styles.userMessageContainer : styles.iaMessageContainer
      }
    >
      <Markdown>{item.text}</Markdown>
    </View>
  );
};

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startChat = async () => {
      setLoading(true);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Olá",
      });
      console.log(response.text);

      // TTS speak
      Speech.speak(response.text, { language: 'pt'})

      setMessages([
        {
          key: Math.random(),
          text: response.text,
          user: false,
        },
      ]);

      setLoading(false);
    };
    startChat();
  }, []);

  function addMessage(text, user){
    if (userMessage == "" || userMessage == " ") return

    const userMessage = {
      key: Math.random(),
      text: text,
      user: user,
    };

    setMessages([...messages, userMessage]);
  }

  const sendMessage = async () => {
    
    // Add user message to messages
    addMessage(userInput, true)

    setLoading(true);

    const prompt = userInput
    setUserInput("")

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(response.text)

    // TTS speak
    Speech.speak(response.text, { language: 'pt'})

    // Add IA message to messages
    addMessage(response.text, false)

    setLoading(false);
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
