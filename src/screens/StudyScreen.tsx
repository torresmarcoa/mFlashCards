import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import FlipCard from "../components/FlipCard";
import { SafeAreaView } from "react-native-safe-area-context";

// Screen for studying flashcards, allows users to flip through cards and view questions/answers.
export default function StudyScreen({ route, navigation }: any) {
  // Get the cards passed from the previous screen and set up state for tracking the current card
  // index and whether the answer is shown.
  const { cards } = route.params;
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const current = cards[index];

  // If there are no cards to study, display a message to the user.
  if (!cards || cards.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No cards to study.</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#3B82F6", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.5 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 p-6">
          <Pressable
            onPress={() => navigation.goBack()}
            className="flex-row items-center mb-6"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text className="ml-2 text-xl text-white">Return</Text>
          </Pressable>
          <View className="flex-1 justify-center mt-48">
            <FlipCard
              frontText={current.question}
              backText={current.answer}
              isFlipped={showAnswer}
              onPress={() => setShowAnswer(!showAnswer)}
              height={260}
            />
          </View>

          <View className="flex-row justify-between mt-6">
            <Pressable
              onPress={() => {
                if (index > 0) {
                  setIndex(index - 1);
                  setShowAnswer(false);
                }
              }}
              className="bg-white px-6 py-3 rounded-xl"
            >
              <Text className="text-blue-600 font-bold">Prev</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                if (index < cards.length - 1) {
                  setIndex(index + 1);
                  setShowAnswer(false);
                }
              }}
              className="bg-white px-6 py-3 rounded-xl"
            >
              <Text className="text-blue-600 font-bold">Next</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
