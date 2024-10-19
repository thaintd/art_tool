import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet, FlatList } from "react-native";
import { getFavorites, saveFavorite, removeFavorite } from "../utils/storage";
import ReviewsList from "../components/ReviewsList";

const DetailScreen = ({ route }) => {
  const { tool } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]); // To hold reviews

  useEffect(() => {
    const checkFavorite = async () => {
      const favs = await getFavorites();
      setIsFavorite(favs.some((fav) => fav.id === tool.id));
    };
    checkFavorite();
  }, [tool]);

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      await removeFavorite(tool.id);
    } else {
      await saveFavorite(tool);
    }
    setIsFavorite(!isFavorite);
  };

  // Function to render tool details
  const renderToolDetails = () => (
    <View style={styles.toolDetails}>
      <Image source={{ uri: tool.image }} style={styles.image} />
      <Text style={styles.name}>{tool.artName}</Text>
      <Text style={styles.price}>${tool.price}</Text>
      {tool.limitedTimeDeal > 0 ? <Text style={styles.deal}>Deal: {tool.limitedTimeDeal * 100}% Off</Text> : <Text style={[styles.deal, { visibility: "hidden" }]}> </Text>}
      <Text style={styles.description}>{tool.description}</Text>
      <Button title={isFavorite ? "Remove from Favorites" : "Add to Favorites"} onPress={handleFavoriteToggle} />
    </View>
  );

  // Function to render reviews
  const renderReviews = () => (
    <View style={styles.reviewsContainer}>
      <Text style={styles.reviewsHeader}>Reviews</Text>
      <ReviewsList />
    </View>
  );

  // FlatList data
  const data = [
    { key: "toolDetails", render: renderToolDetails },
    { key: "reviews", render: renderReviews }
  ];

  return <FlatList data={data} renderItem={({ item }) => item.render()} keyExtractor={(item) => item.key} />;
};

const styles = StyleSheet.create({
  toolDetails: { padding: 20 },
  image: { width: "100%", height: 200 },
  name: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  price: { color: "green", fontSize: 18 },
  description: { marginVertical: 10 },
  reviewsContainer: { padding: 20 },
  reviewsHeader: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  deal: {
    color: "red"
  }
});

export default DetailScreen;
