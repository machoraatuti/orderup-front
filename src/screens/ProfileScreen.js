// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  // Mock user data
  const user = {
    name: 'John Kimani',
    email: 'john.kimani@example.com',
    phone: '+254 712 345 678',
    profileImage: 'https://via.placeholder.com/150',
  };
  
  // Mock order history
  const orderHistory = [
    {
      id: 'ORD12345',
      date: '2023-03-15',
      restaurant: 'Nyama Mama',
      items: ['Nyama Choma', 'Ugali', 'Kenyan Tea'],
      total: 1120,
      status: 'Delivered',
    },
    {
      id: 'ORD12346',
      date: '2023-03-10',
      restaurant: 'Java House',
      items: ['Chicken Burger', 'Fries', 'Lemonade'],
      total: 950,
      status: 'Delivered',
    },
  ];
  
  const handleLogout = () => {
    // In a real app, this would clear auth state
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        <Text style={styles.profilePhone}>{user.phone}</Text>
      </View>
      
      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Saved Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
        </TouchableOpacity>
      </View>
      
      {/* Order History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order History</Text>
        {orderHistory.map(order => (
          <View key={order.id} style={styles.orderItem}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.orderStatus}>{order.status}</Text>
            </View>
            <Text style={styles.orderRestaurant}>{order.restaurant}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
            <Text style={styles.orderItems}>{order.items.join(', ')}</Text>
            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>KSh {order.total}</Text>
              <TouchableOpacity style={styles.reorderButton}>
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  profileHeader: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
  },
  orderItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    fontWeight: 'bold',
  },
  orderStatus: {
    color: '#4CAF50',
  },
  orderRestaurant: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  orderDate: {
    color: '#666',
    marginBottom: 8,
  },
  orderItems: {
    marginBottom: 12,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontWeight: 'bold',
  },
  reorderButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  reorderButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;