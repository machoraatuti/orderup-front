// src/screens/CartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const CartScreen = ({ navigation }) => {
  // Add this useEffect to fix the back button text
  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back',  // This changes the back button text from "Login" to "Back"
    });
  }, [navigation]);

  // Mock cart items
  const [cartItems, setCartItems] = useState([
    { 
      id: '1', 
      name: 'Nyama Choma', 
      price: 850,
      quantity: 1,
      restaurant: 'Nyama Mama'
    },
    { 
      id: '2', 
      name: 'Ugali', 
      price: 150,
      quantity: 1,
      restaurant: 'Nyama Mama'
    },
    { 
      id: '3', 
      name: 'Kenyan Tea', 
      price: 120,
      quantity: 1,
      restaurant: 'Nyama Mama'
    },
  ]);
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 150;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;
  
  const updateQuantity = (id, amount) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          if (newQuantity < 1) return item; // Don't allow less than 1
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>KSh {item.price}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, -1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Cart</Text>
      <Text style={styles.restaurantName}>{cartItems[0]?.restaurant}</Text>
      
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        style={styles.cartList}
      />
      
      <View style={styles.totalContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>KSh {subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Delivery Fee</Text>
          <Text style={styles.totalValue}>KSh {deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tax</Text>
          <Text style={styles.totalValue}>KSh {tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.totalRow, styles.finalRow]}>
          <Text style={styles.finalLabel}>Total</Text>
          <Text style={styles.finalValue}>KSh {total.toFixed(2)}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Checkout')}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    paddingHorizontal: 12,
    fontSize: 16,
  },
  totalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 14,
  },
  finalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginTop: 8,
  },
  finalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  finalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  checkoutButton: {
    backgroundColor: '#FF5722',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;