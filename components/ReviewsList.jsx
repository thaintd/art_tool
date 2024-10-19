import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const reviews = [
  {
    id: 1,
    user: {
      username: "Thaintd",
      id: 1
    },
    createdAt: "12-02-2003",
    review: "Oke con de",
    star: 5
  },
  {
    id: 2,
    user: {
      username: "Thaintd",
      id: 2
    },
    createdAt: "12-02-2003",
    review: "Quá đã",
    star: 4
  },
  {
    id: 3,
    user: {
      username: "Thaintd",
      id: 3
    },
    createdAt: "12-02-2003",
    review: "Hơi tệ",
    star: 3
  }
];

// Star rating component
const StarRating = ({ stars }) => {
  const fullStars = Math.floor(stars);
  const emptyStars = 5 - fullStars;

  return (
    <View style={styles.starContainer}>
      {[...Array(fullStars)].map((_, index) => (
        <AntDesign key={index} name="star" size={16} color="gold" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <AntDesign key={index} name="staro" size={16} color="gold" />
      ))}
    </View>
  );
};

// Review component
const Review = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{review.createdAt}</Text>
      </View>
      <StarRating stars={review.star} />
      <Text style={styles.reviewText}>{review.review}</Text>
    </View>
  );
};

// Reviews List component
const ReviewsList = () => {
  const [filterStar, setFilterStar] = React.useState(0); // State to hold filter
  const filteredReviews = filterStar ? reviews.filter((review) => review.star === filterStar) : reviews;

  // Calculate average stars
  const averageStars = (reviews.reduce((acc, review) => acc + review.star, 0) / reviews.length).toFixed(1);

  // Count number of comments for each star rating
  const starCounts = Array.from({ length: 5 }, (_, index) => {
    const starRating = index + 1;
    return {
      starRating,
      count: reviews.filter((review) => review.star === starRating).length
    };
  });

  return (
    <View>
      <Text style={styles.averageRating}>{averageStars} stars</Text>
      <View style={styles.filterContainer}>
        <Text
          style={[styles.filterText, filterStar === 0 && styles.filterTextActive]} // Apply active style if All is selected
          onPress={() => setFilterStar(0)}
        >
          All
        </Text>
        {starCounts.map(({ starRating, count }) => (
          <Text
            key={starRating}
            style={[styles.filterText, filterStar === starRating && styles.filterTextActive]} // Apply active style if this star is selected
            onPress={() => setFilterStar(starRating)}
          >
            {starRating} <AntDesign name="star" color="gold" /> ({count})
          </Text>
        ))}
      </View>

      {filteredReviews.length === 0 ? ( // Check if filteredReviews is empty
        <Text style={styles.noCommentsText}>No comment</Text>
      ) : (
        <FlatList data={filteredReviews} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Review review={item} />} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  username: {
    fontWeight: "bold",
    fontSize: 16
  },
  date: {
    fontSize: 12,
    color: "#888"
  },
  starContainer: {
    flexDirection: "row",
    marginVertical: 5
  },
  reviewText: {
    fontSize: 14,
    color: "#333"
  },
  averageRating: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  },
  filterText: {
    fontSize: 14,
    color: "#fff", // Text color
    backgroundColor: "#007bff", // Background color
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20, // Rounded corners
    textAlign: "center",
    elevation: 2, // For Android shadow
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: 5 // Space between buttons
  },
  noCommentsText: {
    fontSize: 16,
    color: "orange", // Color for "Không có cmt"
    textAlign: "center",
    marginVertical: 10
  },
  filterTextActive: {
    backgroundColor: "#0033cc" // Darker blue for active state
  }
});

export default ReviewsList;
