import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, Button, Alert } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { getFavorites, removeFavorite } from "../utils/storage";
import FavoriteCard from "../components/FavoriteCard";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(favorites.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectItem = (id) => {
    const isSelected = selectedItems.includes(id);
    const newSelectedItems = isSelected ? selectedItems.filter((item) => item !== id) : [...selectedItems, id];

    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === favorites.length);
  };

  const handleDelete = () => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete the selected items?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        onPress: async () => {
          // Remove each selected item from storage
          for (const id of selectedItems) {
            await removeFavorite(id); // Assuming removeFavorite(id) deletes from storage
          }

          // Update the favorites list after deletion
          const newFavorites = favorites.filter((item) => !selectedItems.includes(item.id));
          setFavorites(newFavorites);
          setSelectedItems([]);
          setSelectAll(false);
        }
      }
    ]);
  };

  const renderItem = ({ item }) => <FavoriteCard tool={item} isSelected={selectedItems.includes(item.id)} onSelect={() => toggleSelectItem(item.id)} onPress={() => navigation.navigate("Detail", { tool: item })} />;

  return (
    <View style={styles.container}>
      {/* If no favorites, show a message */}
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>Không có sản phẩm yêu thích</Text>
      ) : (
        <>
          {favorites.length > 0 && (
            <View style={styles.header}>
              <Checkbox status={selectAll ? "checked" : "unchecked"} onPress={toggleSelectAll} />
              <Text>Select All</Text>
            </View>
          )}
          <FlatList data={favorites} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
          {selectedItems.length > 0 && <Button title="Delete Selected" onPress={handleDelete} color="red" />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  noFavoritesText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "gray"
  }
});

export default FavoritesScreen;
