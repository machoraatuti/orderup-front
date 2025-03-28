// src/screens/profile/SavedAddressesScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SavedAddressesScreen = () => {
  const addresses = [
    {
      id: '1',
      type: 'Home',
      address: 'Westlands Apartments, Unit 204',
      details: 'Nairobi, Kenya',
      isDefault: true
    },
    {
      id: '2',
      type: 'Work',
      address: 'Kimathi Street, Floor 5',
      details: 'Nairobi CBD, Kenya',
      isDefault: false
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {addresses.map(address => (
        <View key={address.id} style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <View style={styles.typeContainer}>
              <Text style={styles.addressType}>{address.type}</Text>
              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
              )}
            </View>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.addressText}>{address.address}</Text>
          <Text style={styles.addressDetails}>{address.details}</Text>
        </View>
      ))}
      
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={24} color="#F4845F" />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  addressCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: '#F4845F',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 16,
    marginBottom: 4,
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#F4845F',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: '#F4845F',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default SavedAddressesScreen;