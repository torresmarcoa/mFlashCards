import { Animated } from "react-native";
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";

// Props for component
type FlipCardProps = {
  frontText: string;
  backText: string;
  difficulty?: string;
  isFlipped: boolean;
  onPress: () => void;
  height?: number;
};

// Reusable component for displaying a flashcard that can be flipped to show the question and answer.
export default function FlipCard({
  frontText,
  backText,
  isFlipped,
  onPress,
  height,
}: FlipCardProps) {
  // Animation value for handling the flip effect of the card, and setting the height of the card based on
  // props or default value.
  const rotateAnim = useState(new Animated.Value(0))[0];
  const cardHeight = height ?? 140;

  // Trigger the flip animation whenever the isFlipped prop changes, animating the rotation of the card
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isFlipped ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  //
  const frontInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  return (
    <Pressable onPress={onPress} className="flex-1">
      <View style={{ height: cardHeight }}>
        <Animated.View
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: [{ rotateY: frontInterpolate }],
          }}
          className="p-4 bg-blue-600 rounded-3xl justify-center"
        >
          <Text className="text-2xl text-white text-center">{frontText}</Text>
        </Animated.View>

        <Animated.View
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: [{ rotateY: backInterpolate }],
          }}
          className="p-4 bg-white rounded-3xl justify-center"
        >
          <Text className="text-xl text-center">{backText}</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}
