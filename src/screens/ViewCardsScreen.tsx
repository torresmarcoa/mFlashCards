import { useEffect, useState } from "react";
import type { Card } from "../types";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { getCards } from "../storage/storage";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Category } from "../types";
import { getCategories, addCategory } from "../storage/storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import FlipCard from "../components/FlipCard";

// Screen for viewing all flashcards, filtering by category, and starting a study session with the selected cards.
export default function ViewCardsScreen({ navigation }: any) {
  // State variables to manage cards, categories, selected category, and modal visibility for category selection and creation.
  const [cards, setCards] = useState<Card[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [createCategoryModalVisible, setCreateCategoryModalVisible] =
    useState(false);
  const ALL_CATEGORY = { id: "all", name: "All" } as Category;
  const [newCategory, setNewCategory] = useState("");

  const [flippedId, setFlippedId] = useState<string | null>(null);

  // Load Cards in the storage
  useEffect(() => {
    async function loadCards() {
      const data = await getCards();
      setCards(data);
    }

    loadCards();
  }, []);

  // Load categories
  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();

      const categoriesWithAll = [ALL_CATEGORY, ...data];

      setCategories(categoriesWithAll);
      setSelectedCategory(ALL_CATEGORY);
    }

    loadCategories();
  }, []);

  // Handles the creation of a new category, updates the category list, and sets the newly created
  // category as selected.
  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;

    await addCategory({ name: newCategory });

    const updated = await getCategories();

    const updatedWithAll = [ALL_CATEGORY, ...updated];
    setCategories(updatedWithAll);
    setSelectedCategory(ALL_CATEGORY);
    setNewCategory("");
    const created = updated[updated.length - 1];
    setSelectedCategory(created);
    setCreateCategoryModalVisible(false);
    setCategoryModalVisible(false);
  };

  // Filters cards by category. Front end filtering.
  const filteredCards =
    selectedCategory?.id === "all"
      ? cards
      : cards.filter((c) => c.categoryId === selectedCategory?.id);

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
        <Text className="text-3xl p-4 text-white text-center font-bold">
          Category:
        </Text>
        <Pressable
          className="flex-row mb-5 gap-4 justify-center items-center bg-white px-10 py-5 rounded-xl m-auto hover:bg-gray-100 active:bg-gray-200"
          onPress={() => {
            setCategoryModalVisible(true);
          }}
        >
          <Text className="text-xl font-extrabold">
            {selectedCategory?.name ?? "Select category"}
          </Text>
          <AntDesign name="caret-down" size={18} color="black" />
        </Pressable>
        <FlatList
          data={filteredCards}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
          contentContainerStyle={{ gap: 12, paddingBottom: 40 }}
          renderItem={({ item }) => (
            <FlipCard
              frontText={item.question}
              backText={item.answer}
              isFlipped={flippedId === item.id}
              onPress={() =>
                setFlippedId(flippedId === item.id ? null : item.id)
              }
            />
          )}
          ListEmptyComponent={
            <Text className="text-3xl text-center mt-10">
              No cards available
            </Text>
          }
        />
        <Pressable
          onPress={() => navigation.navigate("Study", { cards: filteredCards })}
          className="self-center mb-4 bg-white w-72 h-20 px-6 py-3 rounded-xl hover:bg-gray-100 active:bg-gray-200"
        >
          <Text className="text-black font-bold text-2xl m-auto text-center">
            Study
          </Text>
        </Pressable>

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
