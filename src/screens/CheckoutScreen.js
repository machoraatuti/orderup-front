import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ORDERUP_SERVER } from "@env";

const CheckoutScreen = ({ navigation }) => {
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    apartment: '',
    city: 'Nairobi',
    instructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Fetch the phone number from AsyncStorage
  useEffect(() => {
    const loadPhoneFromStorage = async () => {
      const savedPhone = await AsyncStorage.getItem('phone');
      if (savedPhone) {
        setPhoneNumber(savedPhone); // Set the phone number
      }
    };

    loadPhoneFromStorage();
  }, []);

  const updateAddress = (field, value) => {
    setDeliveryAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const placeOrder = async () => {
    console.log('Place order button pressed'); // Debugging line

    if (!phoneNumber) {
      Alert.alert('Error', 'Phone number is missing');
      return;
    }

    console.log('Sending data to server...'); // Debugging line

    if (paymentMethod === 'mpesa') {
      try {
        const response = await fetch(`${ORDERUP_SERVER}/api/checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber, // Use the phone number stored locally
            amount: 1359, // The total amount
            accountReference: 'order12345', // Unique reference for the transaction
            transactionDesc: 'Payment for order', // Description of the transaction
          }),
        });

        console.log('Response received:', response); // Debugging line

        const data = await response.json();
        console.log('Parsed response data:', data); // Debugging line

        if (data.ResponseCode === '0') {
          Alert.alert('Success', 'Payment initiated successfully!');
        }
      } catch (error) {
        console.error('Fetch error:', error); // Debugging line
        Alert.alert('Error', 'Error initiating payment: ' + error.message);
      }
    } else {
      Alert.alert('Success', 'Order placed successfully!');
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'MainContent' }],
    });
};


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Checkout</Text>

      {/* Delivery Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Street Address</Text>
          <TextInput
            style={styles.input}
            value={deliveryAddress.street}
            onChangeText={(text) => updateAddress('street', text)}
            placeholder="Enter your street address"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Apartment/Suite (Optional)</Text>
          <TextInput
            style={styles.input}
            value={deliveryAddress.apartment}
            onChangeText={(text) => updateAddress('apartment', text)}
            placeholder="Apartment, suite, etc."
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={deliveryAddress.city}
            onChangeText={(text) => updateAddress('city', text)}
            placeholder="City"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Delivery Instructions (Optional)</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={deliveryAddress.instructions}
            onChangeText={(text) => updateAddress('instructions', text)}
            placeholder="E.g. Apartment building entrance code, landmarks, etc."
            multiline={true}
            numberOfLines={3}
          />
        </View>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'mpesa' && styles.selectedPayment]}
          onPress={() => setPaymentMethod('mpesa')}
        >
          <Text style={styles.paymentOptionText}>M-Pesa</Text>
          {paymentMethod === 'mpesa' && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'card' && styles.selectedPayment]}
          onPress={() => setPaymentMethod('card')}
        >
          <Text style={styles.paymentOptionText}>Credit/Debit Card</Text>
          {paymentMethod === 'card' && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'cash' && styles.selectedPayment]}
          onPress={() => setPaymentMethod('cash')}
        >
          <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
          {paymentMethod === 'cash' && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>KSh 1,120</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>KSh 150</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>KSh 80</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>KSh 1,359</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={placeOrder}
      >
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedPayment: {
    backgroundColor: '#FFF5F0',
  },
  paymentOptionText: {
    fontSize: 16,
  },
  checkmark: {
    fontWeight: 'bold',
    color: '#FF5722',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  placeOrderButton: {
    backgroundColor: '#FF5722',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  placeOrderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
