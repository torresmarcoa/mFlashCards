import "./global.css";
import { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { initStorage } from "./src/storage/storage";

export default function App() {
  useEffect(() => {
    initStorage();
  }, []);

  return <AppNavigator />;
}
