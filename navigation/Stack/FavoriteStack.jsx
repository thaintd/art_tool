import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "../../screens/ListFavouriteScreen";
import DetailScreen from "../../screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

const FavoriteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default FavoriteStack;
