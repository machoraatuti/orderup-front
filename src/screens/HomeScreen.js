// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  
  const featuredRestaurants = [
    {
      id: '1',
      name: 'Java House',
      image: require('../../assets/images/java-house.jpg'),
      category: 'Cafe',
      distance: '1.2 km',
      discount: '20% OFF'
    },
    {
      id: '2',
      name: 'Chicken Inn',
      image: require('../../assets/images/chicken-inn.jpg'),
      category: 'Fast Food',
      distance: '0.8 km'
    }
  ];

  const categories = [
    { id: '1', name: 'Burgers', icon: 'fast-food-outline' },
    { id: '2', name: 'Pizza', icon: 'pizza-outline' },
    { id: '3', name: 'Coffee', icon: 'cafe-outline' },
    { id: '4', name: 'Chicken', icon: 'restaurant-outline' },
    { id: '5', name: 'Salads', icon: 'leaf-outline' },
    { id: '6', name: 'Drinks', icon: 'wine-outline' },
    { id: '7', name: 'Dessert', icon: 'ice-cream-outline' },
    { id: '8', name: 'More', icon: 'add-outline' }
  ];

  const popularRestaurants = [
    {
      id: '1',
      name: 'KFC',
      image: require('../../assets/images/kfc.jpg'),
      rating: 4.7,
      reviewCount: '200+',
      category: 'Fast Food',
      deliveryTime: '15-20 min'
    },
    {
      id: '2',
      name: 'Artcaffe',
      image: require('../../assets/images/artcaffe.jpg'),
      rating: 4.5,
      reviewCount: '150+',
      category: 'Cafe',
      deliveryTime: '20-25 min'
    },
    {
      id: '3',
      name: 'Burger King',
      image: require('../../assets/images/burger-king.jpg'),
      rating: 4.3,
      reviewCount: '180+',
      category: 'Fast Food',
      deliveryTime: '15-20 min'
    }
  ];

  const handleSearch = (text) => {
    setSearchText(text);
    // You could implement filtering logic here if needed
  };

  const navigateToRestaurant = (restaurant) => {
    navigation.navigate('RestaurantDetail', { 
      id: restaurant.id,
      name: restaurant.name,
      image: restaurant.image,
      // Pass any other data you need
    });
  };

  const navigateToCategory = (category) => {
    navigation.navigate('RestaurantsList', {
      category: category.name,
      // You could pass additional filtering parameters
    });
  };

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.featuredCard}
      onPress={() => navigateToRestaurant(item)}
    >
      <Image source={item.image} style={styles.featuredImage} />
      {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      )}
      <View style={styles.featuredInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantDetail}>{item.category} • {item.distance}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigateToCategory(item)}
    >
      <View style={styles.categoryIcon}>
        <Ionicons name={item.icon} size={24} color="#333" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPopularItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.popularCard}
      onPress={() => navigateToRestaurant(item)}
    >
      <Image source={item.image} style={styles.popularImage} />
      <Text style={styles.popularName}>{item.name}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.rating}>{item.rating}</Text>
        <Text style={styles.reviewCount}>({item.reviewCount})</Text>
      </View>
      <Text style={styles.category}>{item.category} • {item.deliveryTime}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Location Selector */}
        <View style={styles.locationContainer}>
          <Text style={styles.appTitle}>OrderUp</Text>
          <TouchableOpacity style={styles.locationSelector}>
            <Ionicons name="location" size={20} color="#FF5722" />
            <Text style={styles.locationText}>Nairobi, Kenya</Text>
            <Ionicons name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Find restaurants, cuisines..."
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filters */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
              <Text style={styles.activeFilterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Nearby</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Fast Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Healthy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Offers</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Featured Restaurants */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Restaurants</Text>
          <FlatList
            data={featuredRestaurants}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
          />
        </View>

        {/* Popular Restaurants */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Restaurants</Text>
          <FlatList
            data={popularRestaurants}
            renderItem={renderPopularItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 4,
    marginRight: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#FF5722',
  },
  filterText: {
    color: '#333',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '500',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  featuredCard: {
    width: 180,
    marginLeft: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredImage: {
    width: '100%',
    height: 120,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  featuredInfo: {
    padding: 8,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantDetail: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
  },
  popularCard: {
    width: 160,
    marginLeft: 16,
    marginBottom: 16,
  },
  popularImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  popularName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  rating: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  reviewCount: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
  },
  category: {
    fontSize: 12,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#999',
  },
  activeNavText: {
    color: '#FF5722',
  },
});

export default HomeScreen;