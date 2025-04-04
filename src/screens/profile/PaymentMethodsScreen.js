// src/screens/profile/PaymentMethodsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentMethodsScreen = () => {
  const paymentMethods = [
    {
      id: '1',
      type: 'M-Pesa',
      number: '254712XXXXX',
      isDefault: true,
      icon: 'phone-portrait-outline'
    },
    {
      id: '2',
      type: 'Credit Card',
      number: 'Visa ending in 4821',
      isDefault: false,
      icon: 'card-outline'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {paymentMethods.map(method => (
        <View key={method.id} style={styles.paymentCard}>
          <View style={styles.paymentHeader}>
            <View style={styles.methodInfo}>
              <View style={styles.methodIconContainer}>
                <Ionicons name={method.icon} size={24} color="#F4845F" />
              </View>
              <View>
                <Text style={styles.methodType}>{method.type}</Text>
                <Text style={styles.methodNumber}>{method.number}</Text>
              </View>
            </View>
            
            {method.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Default</Text>
              </View>
            )}
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Set as Default</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={24} color="#F4845F" />
        <Text style={styles.addButtonText}>Add Payment Method</Text>
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
  paymentCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  methodNumber: {
    fontSize: 14,
    color: '#666',
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    marginLeft: 16,
  },
  actionButtonText: {
    color: '#F4845F',
    fontWeight: '500',
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

export default PaymentMethodsScreen;