import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favoriteArtTools";

export const saveFavorite = async (tool) => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = [...favorites, tool];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error saving favorite tool:", error);
  }
};

export const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    return [];
  }
};

export const removeFavorite = async (toolId) => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter((item) => item.id !== toolId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error removing favorite tool:", error);
  }
};
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage đã được xóa hoàn toàn.");
  } catch (error) {
    console.error("Lỗi khi xóa AsyncStorage:", error);
  }
};
