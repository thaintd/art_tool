import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailScreen from "../../screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Screen" navigationKey="homeScreen" component={HomeScreen} />
      <Stack.Screen name="Detail" navigationKey="detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
