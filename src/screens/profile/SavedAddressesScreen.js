import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SavedAddressesScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([
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
  ]);

  const handleEdit = (address) => {
    navigation.navigate('EditAddressScreen', { address }); // Pass address data to the Edit screen
  };

  const handleAddNewAddress = () => {
    navigation.navigate('AddAddress'); // Navigate to the Add Address screen
  };

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
            <TouchableOpacity onPress={() => handleEdit(address)}>
              <Ionicons name="create-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.addressText}>{address.address}</Text>
          <Text style={styles.addressDetails}>{address.details}</Text>
        </View>
      ))}
      
      <TouchableOpacity style={styles.addButton} onPress={handleAddNewAddress}>
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
