import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { fetchArtTools } from "../services/api";
import ArtToolItem from "../components/ArtToolCard";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import AntDesign from "react-native-vector-icons/AntDesign"; // Import icon library
import { getFavorites, saveFavorite, removeFavorite } from "../utils/storage";

const HomeScreen = ({ navigation }) => {
  const [artTools, setArtTools] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [brands, setBrands] = useState([]); // State for brands and their product counts
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchText, setSearchText] = useState(""); // State for search text
  const [searchResult, setSearchResult] = useState([]); // State for search result
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Start loading
      const data = await fetchArtTools();
      setArtTools(data);
      setFilteredTools(data);

      // Get unique brands and the number of products for each brand
      const brandCounts = data.reduce((acc, tool) => {
        acc[tool.brand] = (acc[tool.brand] || 0) + 1;
        return acc;
      }, {});

      // Add the "All" option with the total number of products
      setBrands([{ name: "All", count: data.length }, ...Object.keys(brandCounts).map((brand) => ({ name: brand, count: brandCounts[brand] }))]);

      const favs = await getFavorites();
      setFavorites(favs);
      setLoading(false); // Stop loading after data is fetched
    };
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const updateFavorites = async () => {
        const favs = await getFavorites();
        setFavorites(favs);
      };
      updateFavorites();
    }, [])
  );

  // Function to handle favorite toggle
  const handleFavoriteToggle = async (tool) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === tool.id);
    if (isAlreadyFavorite) {
      await removeFavorite(tool.id);
      setFavorites(favorites.filter((fav) => fav.id !== tool.id));
    } else {
      await saveFavorite(tool);
      setFavorites([...favorites, tool]);
    }
  };

  // Function to filter by selected brand
  const filterByBrand = (brand) => {
    setSelectedBrand(brand);
    if (brand === "All") {
      setFilteredTools(artTools);
    } else {
      const filtered = artTools.filter((tool) => tool.brand === brand);
      setFilteredTools(filtered);
    }
  };

  // Function to search by artName
  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = filteredTools.filter((tool) => tool.artName.toLowerCase().includes(text.toLowerCase()));
      setSearchResult(filtered);
    } else {
      setSearchResult(filteredTools); // Reset if no search text
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchText("");
    setSearchResult(filteredTools); // Reset search result
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    return <ArtToolItem tool={item} isFavorite={isFavorite} onPress={() => navigation.navigate("Detail", { tool: item })} onFavoriteToggle={() => handleFavoriteToggle(item)} />;
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} value={searchText} onChangeText={handleSearch} placeholder="Search by art name" />
        {searchText ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            {/* "X" icon to clear search */}
            <AntDesign name="closecircle" size={20} color="gray" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Show loading indicator while data is being fetched */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="tomato" />
        </View>
      ) : (
        <>
          {/* Show "Không tìm thấy" when search result is empty */}
          {searchText && searchResult.length === 0 ? (
            <Text style={styles.noResultText}>Không tìm thấy</Text>
          ) : (
            <>
              {/* Scrollable Brand Filter Section */}
              <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                  {brands.map((brand) => (
                    <TouchableOpacity key={brand.name} onPress={() => filterByBrand(brand.name)} style={[styles.brandButton, selectedBrand === brand.name && styles.selectedBrand]}>
                      <Text style={styles.brandText}>
                        {brand.name} ({brand.count}) {/* Show brand name and product count */}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* FlatList for displaying art tools */}
              <FlatList
                numColumns={2}
                columnWrapperStyle={styles.row}
                data={searchText ? searchResult : filteredTools} // Use search result if there's a search, otherwise use filtered tools
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10
  },
  searchInput: {
    flex: 1,
    padding: 10
  },
  clearButton: {
    marginLeft: 10
  },
  noResultText: {
    fontSize: 16,
    color: "orange",
    textAlign: "center",
    marginTop: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  filterContainer: {
    height: 50, // Limit the height to avoid expanding
    marginBottom: 10
  },
  scrollViewContent: {
    alignItems: "center"
  },
  row: {
    justifyContent: "space-between"
  },
  brandButton: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginRight: 10 // Add margin to space out buttons
  },
  selectedBrand: {
    backgroundColor: "tomato"
  },
  brandText: {
    fontSize: 16
  }
});

export default HomeScreen;
