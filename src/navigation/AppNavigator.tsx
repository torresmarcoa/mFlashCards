import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen components
import HomeScreen from "../screens/HomeScreen";
import CreateCardScreen from "../screens/CreateCardScreen";
import ViewCardsScreen from "../screens/ViewCardsScreen";
import StudyScreen from "../screens/StudyScreen";

// Create a stack navigator to manage screen transitions and navigation flow.
const Stack = createNativeStackNavigator();

// Main navigator component that sets up the navigation structure and theme for the app.
export default function AppNavigator() {
  // Main theme
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#9DC0FA",
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 250,
          contentStyle: { backgroundColor: "#9DC0FA" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "mFlashCards" }}
        />

        <Stack.Screen
          name="CreateCard"
          component={CreateCardScreen}
          options={{ title: "Create Flashcard" }}
        />

        <Stack.Screen
          name="ViewCards"
          component={ViewCardsScreen}
          options={{ title: "View Flashcards" }}
        />

        <Stack.Screen
          name="Study"
          component={StudyScreen}
          options={{ title: "Study Flashcard" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
