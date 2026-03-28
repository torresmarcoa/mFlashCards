import "./global.css";
import { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { initStorage } from "./src/storage/storage";

// Initialization of the storage system, seeding the app with one sample flashcard if no other card exists.
export default function App() {
  useEffect(() => {
    initStorage();
  }, []);

  // Render the main navigation container that manages all app's screens and navigation logic.
  return <AppNavigator />;
}
