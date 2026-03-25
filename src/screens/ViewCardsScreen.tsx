import { useEffect, useState } from "react";
import type { Card } from "../types";
import { View, Text, Pressable } from "react-native";
import { getCards } from "../storage/storage";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ViewCardsScreen({ navigation }: any) {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    async function loadCards() {
      const data = await getCards();
      setCards(data);
    }

    loadCards();
  }, []);

  return (
    <LinearGradient
      colors={["#3B82F6", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.5 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <Pressable
          onPress={() => navigation.goBack()}
          className="flex-row items-center mb-6 px-4 py-2"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text className="ml-2 text-2xl flex-1 text-white">Return</Text>
        </Pressable>
        <View>
          {cards.length === 0 ? (
            <Text>No cards yet</Text>
          ) : (
            cards.map((card) => (
              <View key={card.id}>
                <Text>{card.question}</Text>
                <Text>{card.answer}</Text>
              </View>
            ))
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
