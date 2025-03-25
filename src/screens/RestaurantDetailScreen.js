// src/screens/RestaurantDetailScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const RestaurantDetailScreen = ({ route, navigation }) => {
  const { id, name } = route.params;
  const [activeCategory, setActiveCategory] = useState('Popular');
  
  // Mock restaurant data
  const restaurant = {
    id,
    name: name || 'Restaurant',
    image: 'https://via.placeholder.com/400x200',
    cuisine: 'Kenyan',
    rating: 4.7,
    reviewCount: 253,
    deliveryTime: '15-25 min',
    deliveryFee: 'KSh 150',
    distance: '1.2 km',
    description: 'Authentic Kenyan cuisine with a modern twist. Serving the best nyama choma and local favorites.',
  };
  
  // Mock menu categories
  const menuCategories = ['Popular', 'Main Dishes', 'Sides', 'Drinks', 'Desserts'];
  
  // Mock menu items
  const menuItems = [
    { 
      id: '1', 
      name: 'Nyama Choma', 
      description: 'Traditional grilled meat seasoned with local spices.', 
      price: 850,
      category: 'Main Dishes',
      popular: true
    },
    { 
      id: '2', 
      name: 'Ugali', 
      description: 'Traditional Kenyan staple made from maize flour.', 
      price: 150,
      category: 'Sides',
      popular: true
    },
    { 
      id: '3', 
      name: 'Pilau', 
      description: 'Spiced rice cooked with meat and aromatic spices.', 
      price: 350,
      category: 'Main Dishes',
      popular: false
    },
  ];
  
  // Filter menu items based on active category
  const filteredMenuItems = menuItems.filter(item => {
    if (activeCategory === 'Popular') return item.popular;
    return item.category === activeCategory;
  });
  
  return (
    <ScrollView style={styles.container}>
      {/* Restaurant Header */}
      <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
      
      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        <Text style={styles.rating}>★ {restaurant.rating} ({restaurant.reviewCount} reviews)</Text>
        <Text style={styles.deliveryInfo}>{restaurant.deliveryTime} • {restaurant.deliveryFee} • {restaurant.distance}</Text>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
      
      {/* Menu Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {menuCategories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              activeCategory === category && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text 
              style={[
                styles.categoryButtonText,
                activeCategory === category && styles.activeCategoryButtonText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {filteredMenuItems.map(item => (
          <View key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemDetails}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <Text style={styles.menuItemPrice}>KSh {item.price}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      {/* Checkout Button */}
      <TouchableOpacity 
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.checkoutButtonText}>View Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#FF9800',
    marginBottom: 4,
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  categoriesContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryButton: {
    backgroundColor: '#FF5722',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activeCategoryButtonText: {
    color: 'white',
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemDetails: {
    flex: 1,
    paddingRight: 16,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  checkoutButton: {
    backgroundColor: '#FF5722',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RestaurantDetailScreen;