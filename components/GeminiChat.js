import { useState, useEffect, useContext, createRef, useRef } from "react";
import { GoogleGenAI, Type } from "@google/genai";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Markdown from "react-native-markdown-display";
import * as Speech from "expo-speech";
import { useIsFocused } from '@react-navigation/native';

import styles from "../styles";
import { GlobalContext } from "./GlobalContext";

const GEMINI_API_KEY = "AIzaSyDU4T0Fyps3YcA1ZCHCBZVEu6T1cykf9pM";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const createTaskFunctionDeclaration = {
  name: "create_task",
  description:
    "Cria uma tarefa com data de inicio e data de conculusao, com etapas, prioridade e tags",
  parameters: {
    type: Type.OBJECT,
    properties: {
      taskName: {
        type: Type.STRING,
        description: "Nome da tarefa",
      },
      startDate: {
        type: Type.STRING,
        description: 'Data do inicio da tarefa (e.g., "2024-07-29")',
      },
      dueDate: {
        type: Type.STRING,
        description: 'Data do fim da tarefa (e.g., "2024-07-29")',
      },
      steps: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Nome da etapa",
            },
          },
          required: ["title"],
        },
        description: "Etapas da tarefa",
      },
      priority: {
        type: Type.INTEGER,
        description:
          "A prioridade da tarefa, podendo ser: alta, media ou baixa, sendo alta = 2, media = 1 e baixa = 0",
      },
    },
    required: ["taskName", "dueDate", "priority"],
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

  const { setTarefa, aiVoice } = useContext(GlobalContext);

  const flatListRef = useRef()

  const isFocused = useIsFocused();

  useEffect(() => {
    const startChat = async () => {
      await receiveAIMessage("Olá");
    };
    startChat();

    // cleanup on unmount
    return () => {
      try { Speech.stop(); } catch (e) {}
    };
  }, []);

  // stop speech when screen loses focus
  useEffect(() => {
    if (!isFocused) {
      try { Speech.stop(); } catch (e) {}
    }
  }, [isFocused]);

  // scroll to end when keyboard opens so latest messages are visible
  useEffect(() => {
    const onKeyboardShow = () => {
      setTimeout(() => {
        try {
          if (flatListRef.current) {
            if (typeof flatListRef.current.scrollToEnd === 'function') {
              flatListRef.current.scrollToEnd({ animated: true });
            } else if (typeof flatListRef.current.scrollToOffset === 'function') {
              flatListRef.current.scrollToOffset({ offset: 999999, animated: true });
            }
          }
        } catch (e) {
          // ignore
        }
      }, 50);
    };

    const sub = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    return () => {
      try { sub.remove(); } catch (e) {}
    };
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
    flatListRef.current.scrollToEnd();
  }

  const receiveAIMessage = async (prompt) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "Você é uma assistente pessoal do gênero feminino, criada para ajudar\
            estudantes universitários neurodivergentes, especialmente aqueles com\
            Transtorno de Déficit de Atenção e Hiperatividade (TDAH). Seu papel é\
            auxiliar o usuário a organizar, planejar e concluir suas tarefas, atividades e\
            compromissos universitários, garantindo equilíbrio, foco e bem-estar;\
            Você não possui nome próprio e não pode criar ou adotar um nome;\
            Sua existência tem o único propósito de acompanhar o usuário, motivar,\
            organizar sua rotina e ajudá-lo a atingir seus objetivos acadêmicos de\
            maneira leve e eficiente;\
            Sua comunicação deve ser gentil, empática, positiva e acolhedora;\
            Use uma linguagem simples, direta, leve e fácil de entender;\
            Sempre incentive o usuário e elogie seus progressos;\
            Evite palavras vagas, ambíguas ou de duplo sentido;\
            Prefira mensagens curtas, com tópicos, resumos, passos numerados eestrutura visual limpa.\
            Use emojis e cores visuais (quando o contexto permitir) para facilitar a leitura\
            e tornar a experiência mais agradável;\
            Sua língua padrão é Português do Brasil (PT-BR);\
            Seu tom deve ser humano e motivador, nunca mecânico;\
            Antes de interagir com o usuário, você receberá dados de um questionário inicial\
            contendo: \
            O canal de comunicação predominante do usuário (auditivo, visual ou\
            cinestésico) de um usuário que possui TDAH;\
            Você deve ajustar suas respostas, explicações e sugestões de acordo com o canal\
            sensorial predominante do usuário: \
            Usuário Auditivo: \
            Prefira explicações em formato de fala natural, como se estivesse\
            conversando verbalmente;\
            Dê ênfase à entonação e ritmo das frases, com frases curtas e bem articuladas;\
            Use exemplos que envolvam escuta, música, som e narração;\
            Exemplo de aprendizado: o usuário entende uma receita ao ouvi-la explicada\
            por outra pessoa; \
            Usuário Visual: \
            Utilize elementos visuais: listas, bullets, emojis e divisões claras de texto;\
            Descreva as informações como se estivesse mostrando uma cena;\
            Faça comparações visuais e espaciais;\
            Exemplo de aprendizado: o usuário aprende vendo alguém fazer o bolo e\
            observando o resultado final.Usuário Cinestésico:\
            Prefira instruções passo a passo, com verbos de ação;\
            Incentive o usuário a fazer junto com você;\
            Reforce sensações e movimento (“faça”, “experimente”, “teste agora”,\
            “perceba como se sente ao fazer isso”); \
            Exemplo de aprendizado: o usuário aprende fazendo o bolo com as próprias mãos; \
            Sua principal função é ajudar o usuário a organizar sua vida universitária — tarefas,\
            atividades, compromissos, estudos e prazos. Você deve estruturar o dia e a semana\
            do usuário de forma eficiente, leve e personalizada, respeitando suas limitações \
            cognitivas e emocionais; \
            Baseie sua organização em: \
            As informações fornecidas pelo questionário inicial; \
            As falas espontâneas do usuário durante o uso; \
            Os detalhes fornecidos em cada solicitação (Sempre retorne esses dados): \
            Data de início e conclusão; \
            Nível de prioridade; \
            Tipo de tarefa, atividade ou compromisso; \
            Ao planejar, você deve sempre visar: \
            Reduzir a sobrecarga; \
            Manter a motivação e o foco; \
            Ajudar o usuário a terminar o que começou; \
            Para cada tarefa ou atividade, denote especificamente o tempo estimado\
            necessário (em horas ou minutos); \
            Sugira intervalos e pausas quando a atividade exigir descanso ou mudança \
            de foco; \
            Seja realista e empática: leve em conta distrações, hiperfoco e variações de \
            energia mental comuns em pessoas com TDAH; \
            Você deve aprender continuamente com o comportamento do usuário: \
            Observe como ele reage às suas sugestões; \
            Ajuste sua comunicação e formato de resposta conforme o usuário demonstra \
            preferência (mais visual, mais curta, mais detalhada etc.); \
            Se o usuário demonstrar cansaço, sobrecarga ou frustração, responda com \
            empatia e reoriente o foco com leveza; \
            Se ele estiver motivado, reforce o entusiasmo e incentive o progresso; \
            Sua missão é transformar o estudo e a rotina universitária em algo mais leve, \
            motivador e acessível, respeitando sempre as características cognitivas de cada pessoa neurodivergente.",
          tools: [
            {
              functionDeclarations: [createTaskFunctionDeclaration],
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

        await setTarefa(
          functionCall.args.taskName,
          functionCall.args.startDate,
          functionCall.args.dueDate,
          functionCall.args.steps,
          functionCall.args.priority
        );
      } else {
        console.log("No function call found in the response.");
      }

      // TTS speak if enbaled
      if (aiVoice == true) {

        // Remove emotes from text
        const audioResponse = response.text.replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDDFF])/g,
          ""
        );

        // Call TTs api
        Speech.speak(audioResponse, { language: "pt" });
      }

      // Add IA message to messages
      addMessage(response.text, false);
    } catch (error) {

      console.error("Gemini chat input error,", error);
      addMessage(error.toString(), false);
      setLoading(false);
    }

    setLoading(false);
  };

  const sendMessage = async () => {
    // Add user message to messages
    addMessage(userInput, true);
    const prompt = userInput;
    setUserInput("");
    await receiveAIMessage(prompt);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 80}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 10, marginBottom: 5, marginHorizontal: 7 }}>
            <FlatList
              ref={flatListRef}
              style={{ flex: 1 }}
              data={messages}
              renderItem={renderMessage}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              placeholderTextColor={"#0088ffff"}
              onChangeText={setUserInput}
              onSubmitEditing={sendMessage}
              value={userInput}
              style={styles.aiChatInputText}
              returnKeyType="send"
              blurOnSubmit={false}
            />
            {loading && (
              <ActivityIndicator
                size={"small"}
                color={"#0088ffff"}
                style={{ margin: 10 }}
              />
            )}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default GeminiChat;
