import { useState, useEffect } from "react";
import { GoogleGenAI, Type } from "@google/genai";
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

const scheduleMeetingFunctionDeclaration = {
  name: "schedule_meeting",
  description:
    "Schedules a meeting with specified attendees at a given time and date.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      attendees: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of people attending the meeting.",
      },
      date: {
        type: Type.STRING,
        description: 'Date of the meeting (e.g., "2024-07-29")',
      },
      time: {
        type: Type.STRING,
        description: 'Time of the meeting (e.g., "15:00")',
      },
      topic: {
        type: Type.STRING,
        description: "The subject or topic of the meeting.",
      },
    },
    required: ["attendees", "date", "time", "topic"],
  },
};

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
        config: {
          tools: [
            {
              functionDeclarations: [scheduleMeetingFunctionDeclaration],
            },
          ],
        },
      });
      console.log(response.text);

      // Check for function calls in the response
      if (response.functionCalls && response.functionCalls.length > 0) {
        const functionCall = response.functionCalls[0]; // Assuming one function call
        console.log(`Function to call: ${functionCall.name}`);
        console.log(`Arguments: ${JSON.stringify(functionCall.args)}`);
        // In a real app, you would call your actual function here:
        // const result = await scheduleMeeting(functionCall.args);
      } else {
        console.log("No function call found in the response.");
        console.log(response.text);
      }

      // TTS speak
      Speech.speak(response.text, { language: "pt" });

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

  function addMessage(text, user) {
    if (!text || text.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        key: Math.random(),
        text: text,
        user: user,
      },
    ]);
    console.log(messages);
  }

  const sendMessage = async () => {
    // Add user message to messages
    addMessage(userInput, true);

    setLoading(true);

    const prompt = userInput;
    setUserInput("");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(response.text);

    // TTS speak
    Speech.speak(response.text, { language: "pt" });

    // Add IA message to messages
    addMessage(response.text, false);

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
