import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeStack from "./Stack/HomeStack";
import FavoriteStack from "./Stack/FavoriteStack";

const Tab = createBottomTabNavigator();

const LayoutView = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "Favorite") {
              iconName = focused ? "heart-circle-sharp" : "heart-circle-outline";
            }

            // Return the Ionicons component with the respective icon
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato", // Màu khi tab đang chọn
          tabBarInactiveTintColor: "gray", // Màu khi tab không chọn
          headerShown: false, // Ẩn header cho cả tab
          unmountOnBlur: true // Bỏ mount khi tab blur
        })}
      >
        <Tab.Screen name="Home" navigationKey="home" component={HomeStack} />
        <Tab.Screen name="Favorite" navigationKey="favorite" component={FavoriteStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default LayoutView;
