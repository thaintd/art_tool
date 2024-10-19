import axios from "axios";

const API_URL = "https://66f923ff2a683ce973110dbd.mockapi.io/art";

export const fetchArtTools = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching art tools:", error);
    return [];
  }
};
