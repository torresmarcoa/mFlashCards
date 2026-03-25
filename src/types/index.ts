export type Difficulty = "Easy" | "Medium" | "Hard";

export type Category = {
  id: string;
  name: string;
};

export type Card = {
  id: string;
  question: string;
  answer: string;
  difficulty: Difficulty;
  categoryId: string;
};

export type FlashcardData = {
  categories: Category[];
  cards: Card[];
};
