import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";

const FavoriteCard = ({ tool, isSelected, onSelect, onPress }) => {
  return (
    <View style={styles.card}>
      <Checkbox
        status={isSelected ? "checked" : "unchecked"}
        onPress={onSelect}
        color="#6200ee" // Custom checkbox color
      />
      <TouchableOpacity onPress={onPress} style={styles.touchableArea}>
        <Image source={{ uri: tool.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {tool.artName}
          </Text>
          <Text style={styles.price}>${tool.price}</Text>
          {tool.limitedTimeDeal > 0 && <Text style={styles.deal}>{tool.limitedTimeDeal * 100}% Off</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2, // Shadow for card depth on Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  touchableArea: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#f0f0f0" // Placeholder background color
  },
  info: {
    flex: 1,
    justifyContent: "center"
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2e7d32" // Darker green for price
  },
  deal: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#d32f2f", // Red color for the deal
    marginTop: 4,
    backgroundColor: "#ffebee", // Light red background for emphasis
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: "flex-start"
  }
});

export default FavoriteCard;
