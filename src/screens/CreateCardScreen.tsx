import { useState, useEffect } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

import type { Category, Difficulty } from "../types";
import { addCard, getCategories, addCategory } from "../storage/storage";

const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

// Screen for creating a new flashcard, including selecting/creating category and setting difficulty level.
export default function CreateCardScreen({ navigation }: any) {
  // State variables to manage form inputs for question, answer, difficulty, category selection, and modal visibility
  // for category management.
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [createCategoryModalVisible, setCreateCategoryModalVisible] =
    useState(false);

  // Load categories on component mount to populate category selection options.
  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();

      setCategories(data);

      if (data.length > 0) {
        setSelectedCategory(data[0]);
      }
    }

    loadCategories();
  }, []);

  // Handles the creation of a new flashcard by validating inputs and saving it to storage,
  // then navigating back to the previous screen.
  const handleCreateCard = async () => {
    if (!difficulty || !selectedCategory) return;

    const newCard = {
      question,
      answer,
      difficulty,
      categoryId: selectedCategory.id,
    };

    await addCard(newCard);

    navigation.goBack();
  };

  // Handles the creation of a new category, updates the category list, and sets the newly created
  // category as selected.
  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;

    await addCategory({ name: newCategory });

    const updated = await getCategories();

    setCategories(updated);
    setNewCategory("");
    const created = updated[updated.length - 1];
    setSelectedCategory(created);
    setCreateCategoryModalVisible(false);
    setCategoryModalVisible(false);
  };

  return (
    <LinearGradient
      colors={["#3B82F6", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.5 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <Pressable
            onPress={() => navigation.goBack()}
            className="flex-row items-center mb-6 px-4 py-2"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text className="ml-2 text-2xl flex-1 text-white">Return</Text>
          </Pressable>
          <Text className="text-4xl font-bold text-center text-white">
            Create Flashcard
          </Text>
          <Text className="mt-5 text-2xl p-4 text-white font-bold">
            Category:
          </Text>
          <Pressable
            className="flex-row gap-4 justify-center items-center bg-white px-10 py-5 rounded-xl m-auto hover:bg-gray-100 active:bg-gray-200"
            onPress={() => {
              setCategoryModalVisible(true);
            }}
          >
            <Text className="text-xl font-extrabold">
              {selectedCategory?.name ?? "Select category"}
            </Text>
            <AntDesign name="caret-down" size={18} color="black" />
          </Pressable>
          <Text className="mt-5 text-2xl p-4 text-white font-bold">
            Difficulty:
          </Text>
          <View className="flex-row justify-between mx-6">
            {difficulties.map((option) => (
              <Pressable
                className={`px-10 py-5 rounded-xl ${
                  difficulty === option ? "bg-blue-600" : "bg-white "
                }`}
                key={option}
                onPress={() => setDifficulty(option)}
              >
                <Text
                  className={`text-lg font-black ${difficulty === option ? "text-white" : "text-black"}`}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text className="mt-5 text-2xl p-4 text-white font-bold">
            Question/Concept:
          </Text>
          <TextInput
            className="bg-white mx-5 ml-6 p-4 font-bold text-xl rounded-xl"
            placeholder="Lorem Ipsum"
            value={question}
            onChangeText={setQuestion}
          />
          <Text className="mt-5 text-2xl p-4 text-white font-bold">
            Answer/Description:
          </Text>
          <TextInput
            className="bg-white mx-5 ml-6 p-4 font-bold text-xl h-auto rounded-xl"
            placeholder="Lorem Ipsum DolorLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            editable
            multiline
            numberOfLines={4}
            maxLength={250}
            value={answer}
            onChangeText={setAnswer}
          />
          <Pressable
            className="mt-10 m-auto bg-blue-600 px-10 py-6 flex-row gap-2 justify-center items-center hover:bg-blue-700 active:bg-blue-800 rounded-xl"
            onPress={handleCreateCard}
          >
            <Ionicons name="create-outline" size={30} color="white" />
            <Text className="text-white text-xl font-bold">Create</Text>
          </Pressable>
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={categoryModalVisible}
        >
          <Pressable
            className="flex-1 justify-center items-center bg-black/40"
            onPress={() => setCategoryModalVisible(false)}
          >
            <View className="bg-white p-8 rounded-3xl w-80">
              <Text className="text-2xl font-bold text-center">
                Select Category
              </Text>

              {categories.map((option) => (
                <Pressable
                  key={option.id}
                  className="mt-3 bg-gray-200 p-4 rounded-xl"
                  onPress={() => {
                    setSelectedCategory(option);
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text className="text-lg text-center font-semibold">
                    {option.name}
                  </Text>
                </Pressable>
              ))}
              <Pressable
                onPress={() => setCreateCategoryModalVisible(true)}
                className="mt-5 items-center rounded-xl bg-blue-600 p-4 flex-row justify-center hover:bg-blue-700 active:bg-blue-800"
              >
                <Ionicons
                  name="add-circle-outline"
                  size={23}
                  color="white"
                  className="mr-1"
                />
                <Text className="text-white text-lg font-semibold">
                  Create Category
                </Text>
              </Pressable>
              <Pressable
                className="mt-6 bg-red-500 p-4 rounded-xl"
                onPress={() => setCategoryModalVisible(false)}
              >
                <Text className="text-white text-lg text-center font-bold">
                  Close
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={createCategoryModalVisible}
        >
          <Pressable
            className="flex-1 justify-center items-center bg-black/40"
            onPress={() => setCreateCategoryModalVisible(false)}
          >
            <View className="bg-white p-8 rounded-3xl w-96">
              <Text className="text-2xl font-bold text-center">
                Create new Category
              </Text>
              <Text className="mt-5 text-xl">Name:</Text>
              <TextInput
                className="bg-gray-200 p-4 rounded-xl mt-2"
                placeholder="e.g. Math, Science, History..."
                value={newCategory}
                onChangeText={setNewCategory}
              />
              <Pressable
                className="mt-6 bg-blue-600 p-4 rounded-xl flex-row justify-center items-center hover:bg-blue-700 active:bg-blue-800"
                onPress={handleCreateCategory}
              >
                <Ionicons
                  name="create-outline"
                  size={23}
                  color="white"
                  className="mr-1"
                />
                <Text className="text-white text-lg font-semibold">Create</Text>
              </Pressable>
              <Pressable
                className="mt-6 bg-red-500 p-4 rounded-xl"
                onPress={() => setCreateCategoryModalVisible(false)}
              >
                <Text className="text-white text-lg text-center font-bold">
                  Close
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}
