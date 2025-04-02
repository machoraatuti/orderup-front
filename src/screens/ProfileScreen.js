import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ORDERUP_SERVER } from "@env";

const ProfileScreen = ({ navigation }) => {
  // user data
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch user data
    const fetchData = async () => {
      try {
        // retrieve user data
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          // set state and change to object
          const parsedUser = JSON.parse(savedUser);
          console.log("Retrieved User:", parsedUser);  // Log to check the structure
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Error retrieving user data:", err);
      }
    };
    fetchData();
  }, []);

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

  const handleLogout = async () => {
    try {
      // retrieve token for logout
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.warn("No Token");
      }

      const response = await fetch(`${ORDERUP_SERVER}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // attach token to auth header
        },
        body: JSON.stringify({ token })
      });

      if (response.ok) {
        await AsyncStorage.removeItem("token");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }]
        });
      } else {
        console.error("Logout failed:", await response.text());
      }

    } catch (err) {
      console.error("Logout Error", err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
              {user ? (
          <>
            <Image source={{ uri: user.profileImage || 'default-image-url' }} style={styles.profileImage} />
            <Text style={styles.profileName}>{user.name || 'No name available'}</Text>
            <Text style={styles.profileEmail}>{user.email || 'No email available'}</Text>
            <Text style={styles.profilePhone}>{user.phone}</Text>
          </>
        ) : (
          <Text>Loading profile...</Text>  // This is the corrected part
        )}
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Ionicons name="person-outline" size={24} color="#666" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>Personal Information</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('SavedAddresses')}
        >
          <Ionicons name="location-outline" size={24} color="#666" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>Saved Addresses</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('PaymentMethods')}
        >
          <Ionicons name="card-outline" size={24} color="#666" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={24} color="#666" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
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
        <Ionicons name="log-out-outline" size={20} color="white" style={{ marginRight: 8 }} />
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
    color: '000',
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
  logoutButton: {
    backgroundColor: '#f44336',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
