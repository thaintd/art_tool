import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ArtToolItem = ({ tool, onPress, isFavorite, onFavoriteToggle }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: tool.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {tool.artName}
          </Text>
          <Text style={styles.price}>${tool.price}</Text>
          {tool.limitedTimeDeal > 0 ? <Text style={styles.deal}>Deal: {tool.limitedTimeDeal * 100}% Off</Text> : <Text style={[styles.deal, { visibility: "hidden" }]}> </Text>}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onFavoriteToggle} style={styles.favoriteIcon}>
        <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={20} color={isFavorite ? "red" : "gray"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    borderWidth: 1,
    maxWidth: "48%",
    borderColor: "#ccc",
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#fff"
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 5
  },
  info: {
    marginVertical: 5
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  },
  price: {
    color: "green"
  },
  deal: {
    color: "red"
  },
  favoriteIcon: {
    alignSelf: "flex-end"
  }
});

export default ArtToolItem;
