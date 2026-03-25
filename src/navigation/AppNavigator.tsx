import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CreateCardScreen from "../screens/CreateCardScreen";
import ViewCardsScreen from "../screens/ViewCardsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
