import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import type { FlashcardData, Card, Category } from "../types";

// Storage Key for AsyncStorage to store all flashcard data under a single key.
const STORAGE_KEY = "@mflashcards:data";

// Seed data, default categories and cards to initialize the app with if no existing data is found in storage.
const defaultData: FlashcardData = {
  categories: [{ id: "8e678bad-aa70-46ca-8054-cc8231d9f1db", name: "General" }],
  cards: [
    {
      id: "aa5307d1-5df5-41f2-8376-d96c7f5224cc",
      question: "What is Lorem Ipsum?",
      answer: "Example placeholder text",
      difficulty: "Easy",
      categoryId: "8e678bad-aa70-46ca-8054-cc8231d9f1db",
    },
  ],
};

// Creates a unique ID using the Crypto API, used for generating IDs for new cards and categories.
const createId = (): string => Crypto.randomUUID();

// Initializes the storage by checking if data already exists under the defined STORAGE_KEY, and if not,
// it sets the default data.
export const initStorage = async () => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);

    if (!existing) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    }
  } catch (error) {
    console.error("Error initializing storage:", error);
  }
};

// Retrieves all flashcard data (categories and cards) from storage, returning the default data if
// no data is found or if an error occurs.
export const getData = async (): Promise<FlashcardData> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);

    if (!json) {
      return defaultData;
    }

    return JSON.parse(json);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return defaultData;
  }
};

// Saves the provided flashcard data (categories and cards) to storage under the defined STORAGE_KEY.
const saveData = async (data: FlashcardData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

// Retrieves all cards from storage, returning an empty array if an error occurs.
export const getCards = async (): Promise<Card[]> => {
  try {
    const data = await getData();

    return data.cards;
  } catch (error) {
    console.error("Error retrieving card data:", error);
  }
  return [];
};

// Adds a new card to storage by first retrieving existing data, checking for duplicate IDs, and then saving
// the updated data with the new card included.
export const addCard = async (card: Omit<Card, "id"> & { id?: string }) => {
  try {
    const data = await getData();
    const id = card.id ?? createId();

    const exists = data.cards.some((c) => c.id === id);
    if (exists) return;

    const updated: FlashcardData = {
      ...data,
      cards: [...data.cards, { ...card, id }],
    };

    await saveData(updated);
  } catch (error) {
    console.error("Error adding card:", error);
  }
};

// Retrieves all categories from storage, returning an empty array if an error occurs.
export const getCategories = async (): Promise<Category[]> => {
  try {
    const data = await getData();
    return data.categories;
  } catch (error) {
    console.error("Error retrieving category data:", error);
  }
  return [];
};

// Adds a new category to storage by first retrieving existing data, checking for duplicate IDs, and then saving
// the updated data with the new category included.
export const addCategory = async (
  category: Omit<Category, "id"> & { id?: string },
) => {
  try {
    const data = await getData();
    const id = category.id ?? createId();

    const exists = data.categories.some((c) => c.id === id);
    if (exists) return;

    const updated: FlashcardData = {
      ...data,
      categories: [...data.categories, { ...category, id }],
    };

    await saveData(updated);
  } catch (error) {
    console.error("Error adding category:", error);
  }
};
