// src/screens/RestaurantsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RestaurantsScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Get category parameter if coming from category navigation
  const categoryParam = route.params?.category;
  
  React.useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);
  
  // Enhanced restaurant data with more options
  const restaurants = [
    {
      id: '1',
      name: 'Nyama Mama',
      image: require('../../assets/images/nyama-mama.jpg'),
      cuisine: 'Kenyan',
      rating: 4.7,
      deliveryTime: '15-25 min',
      deliveryFee: 'KSh 150',
      featured: true
    },
    {
      id: '2',
      name: 'Java House',
      image: require('../../assets/images/java-house.jpg'),
      cuisine: 'Cafe',
      rating: 4.5,
      deliveryTime: '20-30 min',
      deliveryFee: 'KSh 200',
      featured: true
    },
    {
      id: '3',
      name: 'Galitos',
      image: require('../../assets/images/galitos.jpg'),
      cuisine: 'Fast Food',
      rating: 4.3,
      deliveryTime: '25-35 min',
      deliveryFee: 'KSh 180',
      featured: false
    },
    {
      id: '4',
      name: 'KFC',
      image: require('../../assets/images/kfc.jpg'),
      cuisine: 'Fast Food',
      rating: 4.2,
      deliveryTime: '15-25 min',
      deliveryFee: 'KSh 150',
      featured: false
    },
    {
      id: '5',
      name: 'Artcaffe',
      image: require('../../assets/images/artcaffe.jpg'),
      cuisine: 'Cafe',
      rating: 4.6,
      deliveryTime: '20-30 min',
      deliveryFee: 'KSh 180',
      featured: true
    },
    {
      id: '6',
      name: 'Burger King',
      image: require('../../assets/images/burger-king.jpg'),
      cuisine: 'Fast Food',
      rating: 4.1,
      deliveryTime: '15-25 min',
      deliveryFee: 'KSh 150',
      featured: false
    },
    {
      id: '7',
      name: 'Chicken Inn',
      image: require('../../assets/images/chicken-inn.jpg'),
      cuisine: 'Fast Food',
      rating: 4.0,
      deliveryTime: '20-30 min',
      deliveryFee: 'KSh 120',
      featured: false
    }
  ];

  // Filter restaurants based on search query and category
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Text search filter
    const matchesSearch = searchQuery 
      ? restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
      
    // Category filter
    const matchesCategory = selectedCategory === 'All' 
      ? true 
      : restaurant.cuisine === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });

  // Categories for horizontal scrolling
  const categories = [
    { id: '1', name: 'All', icon: 'restaurant-outline' },
    { id: '2', name: 'Fast Food', icon: 'fast-food-outline' },
    { id: '3', name: 'Cafe', icon: 'cafe-outline' },
    { id: '4', name: 'Kenyan', icon: 'nutrition-outline' },
    { id: '5', name: 'Indian', icon: 'flame-outline' },
    // Fixed the icon for Chinese cuisine
    { id: '6', name: 'Chinese', icon: 'restaurant-outline' }
  ];

  const handleCategoryPress = (category) => {
    setSelectedCategory(category.name);
  };

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.restaurantItem}
      onPress={() => navigation.navigate('RestaurantDetail', { id: item.id, name: item.name })}
    >
      <Image source={item.image} style={styles.restaurantImage} />
      {item.featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
        <View style={styles.restaurantMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.restaurantDelivery}>
            {item.deliveryTime} • {item.deliveryFee}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem, 
        selectedCategory === item.name && styles.selectedCategoryItem
      ]}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={[
        styles.categoryIcon,
        selectedCategory === item.name && styles.selectedCategoryIcon
      ]}>
        <Ionicons 
          name={item.icon} 
          size={20} 
          color={selectedCategory === item.name ? "#fff" : "#FF5722"} 
        />
      </View>
      <Text style={[
        styles.categoryName,
        selectedCategory === item.name && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants or cuisines..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Restaurant List */}
      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="restaurant-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No restaurants found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    height: 36,
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    opacity: 0.8,
  },
  selectedCategoryItem: {
    opacity: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE0D6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedCategoryIcon: {
    backgroundColor: '#FF5722',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
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
    width: 120,
    height: 120,
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF5722',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  restaurantInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  restaurantName: {
    fontSize: 18,
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
  },
  restaurantDelivery: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  }
});

export default RestaurantsScreen;