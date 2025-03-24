// src/screens/RestaurantsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const RestaurantsScreen = ({ navigation }) => {
  // Mock data for restaurants
  const restaurants = [
    { 
      id: '1', 
      name: 'Nyama Mama', 
      image: 'https://via.placeholder.com/150', 
      cuisine: 'Kenyan', 
      rating: 4.7,
      deliveryTime: '15-25 min',
      deliveryFee: 'KSh 150'
    },
    { 
      id: '2', 
      name: 'Java House', 
      image: 'https://via.placeholder.com/150', 
      cuisine: 'Cafe', 
      rating: 4.5,
      deliveryTime: '20-30 min',
      deliveryFee: 'KSh 200'
    },
    { 
      id: '3', 
      name: 'Galitos', 
      image: 'https://via.placeholder.com/150', 
      cuisine: 'Fast Food', 
      rating: 4.3,
      deliveryTime: '25-35 min',
      deliveryFee: 'KSh 180'
    },
  ];
  
  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.restaurantItem}
      onPress={() => navigation.navigate('RestaurantDetail', { id: item.id, name: item.name })}
    >
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
        <View style={styles.restaurantMeta}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {item.rating}</Text>
          </View>
          <Text style={styles.restaurantDelivery}>
            {item.deliveryTime} • {item.deliveryFee}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    padding: 16,
  },
  restaurantItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantImage: {
    width: 100,
    height: 100,
  },
  restaurantInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '500',
    color: '#FF9800',
  },
  restaurantDelivery: {
    fontSize: 12,
    color: '#666',
  },
});

export default RestaurantsScreen;