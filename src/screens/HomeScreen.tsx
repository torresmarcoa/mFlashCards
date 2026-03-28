import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

// Main screen for the app, gives the user options to interact with the flashcards. Create and view flashcards.
export default function HomeScreen({ navigation }: any) {
  return (
    <LinearGradient
      colors={["#3B82F6", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 items-center justify-center"
    >
      <SafeAreaView className="flex-1 items-center justify-center p-4">
        <Text className="text-center text-4xl font-bold text-white">
          Welcome to mFlashCards!
        </Text>
        <Text className="text-center text-2xl text-gray-100 mt-2">
          Create and study flashcards to improve your learning!
        </Text>
        <Animatable.View animation="bounceIn" duration={2000}>
          <MaterialCommunityIcons
            name="card-multiple-outline"
            size={50}
            color="#2563eb"
            className="mt-10 mb-5 bg-white rounded-full p-3 border-2 border-blue-600"
          />
        </Animatable.View>
        <Pressable
          onPress={() => navigation.navigate("CreateCard")}
          className="mt-6 w-96 items-center rounded bg-blue-600 px-10 py-6 flex-row gap-2 justify-center hover:bg-blue-700 active:bg-blue-800"
        >
          <Ionicons name="add-circle-outline" size={25} color="white" />
          <Text className="text-white text-2xl font-bold">
            Create Flashcard
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("ViewCards")}
          className="mt-3 w-96 items-center bg-white rounded border border-blue-600 px-10 py-6 flex-row gap-2 justify-center hover:bg-gray-100 active:bg-gray-200"
        >
          <Ionicons name="albums-outline" size={25} color="#2563eb" />
          <Text className="text-blue-600 text-2xl font-bold">
            View Flashcards
          </Text>
        </Pressable>
        <StatusBar style="auto" />
      </SafeAreaView>
    </LinearGradient>
  );
}
