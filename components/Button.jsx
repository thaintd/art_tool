import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const FavoriteButton = ({ isFavorite, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginTop: 10
  },
  text: {
    color: "#fff",
    textAlign: "center"
  }
});

export default FavoriteButton;
