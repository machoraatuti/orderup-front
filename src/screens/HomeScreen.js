// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // Mock featured restaurants data
  const featuredRestaurants = [
    { id: '1', name: 'Nyama Mama', image: 'https://via.placeholder.com/150', cuisine: 'Kenyan', rating: 4.7 },
    { id: '2', name: 'Java House', image: 'https://via.placeholder.com/150', cuisine: 'Cafe', rating: 4.5 },
    { id: '3', name: 'Galitos', image: 'https://via.placeholder.com/150', cuisine: 'Fast Food', rating: 4.3 },
  ];
  
  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.username}>User</Text>
      </View>
      
      {/* Hero Banner */}
      <View style={styles.heroBanner}>
        <Text style={styles.heroTitle}>Skip the Wait,{'\n'}Not the Experience</Text>
        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={() => navigation.navigate('Restaurants')}
        >
          <Text style={styles.exploreButtonText}>Explore Restaurants</Text>
        </TouchableOpacity>
      </View>
      
      {/* Featured Restaurants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Restaurants</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {featuredRestaurants.map(restaurant => (
            <TouchableOpacity 
              key={restaurant.id}
              style={styles.restaurantCard}
              onPress={() => navigation.navigate('RestaurantDetail', { id: restaurant.id, name: restaurant.name })}
            >
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: restaurant.image }} 
                  style={styles.restaurantImage} 
                />
              </View>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>★ {restaurant.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {['Kenyan', 'Fast Food', 'Indian', 'Chinese', 'Cafe', 'Dessert'].map(category => (
            <TouchableOpacity key={category} style={styles.categoryItem}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  heroBanner: {
    backgroundColor: '#FF5722',
    padding: 20,
    borderRadius: 12,
    margin: 20,
    marginTop: 0,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: '#FF5722',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  restaurantCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 120,
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 12,
    marginBottom: 4,
  },
  restaurantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginBottom: 12,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '500',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  categoryItem: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryText: {
    fontWeight: '500',
  },
});

export default HomeScreen;