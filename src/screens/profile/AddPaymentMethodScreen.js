// src/screens/profile/AddPaymentMethodScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddPaymentMethodScreen = ({ navigation }) => {
  const [paymentType, setPaymentType] = useState('mpesa'); // 'mpesa' or 'card'
  const [loading, setLoading] = useState(false);
  
  // MPesa form data
  const [mpesaData, setMpesaData] = useState({
    phoneNumber: '',
    name: ''
  });
  
  // Credit card form data
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const updateMpesaField = (field, value) => {
    setMpesaData({
      ...mpesaData,
      [field]: value
    });
  };
  
  const updateCardField = (field, value) => {
    setCardData({
      ...cardData,
      [field]: value
    });
  };
  
  const formatCardNumber = (text) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Add spaces after every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substring(0, 19); // Limit to 16 digits (19 with spaces)
  };
  
  const formatExpiryDate = (text) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Format as MM/YY
    if (cleaned.length > 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };
  
  const validateMpesaForm = () => {
    // Basic validation
    if (!mpesaData.phoneNumber) {
      Alert.alert('Error', 'Please enter your M-Pesa phone number');
      return false;
    }
    
    if (!/^254\d{9}$/.test(mpesaData.phoneNumber.replace(/\s/g, ''))) {
      Alert.alert('Error', 'Please enter a valid Kenyan phone number starting with 254');
      return false;
    }
    
    return true;
  };
  
  const validateCardForm = () => {
    // Basic validation
    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 16) {
      Alert.alert('Error', 'Please enter a valid card number');
      return false;
    }
    
    if (!cardData.cardholderName) {
      Alert.alert('Error', 'Please enter the cardholder name');
      return false;
    }
    
    if (!cardData.expiryDate || cardData.expiryDate.length < 5) {
      Alert.alert('Error', 'Please enter a valid expiry date');
      return false;
    }
    
    if (!cardData.cvv || cardData.cvv.length < 3) {
      Alert.alert('Error', 'Please enter a valid CVV');
      return false;
    }
    
    return true;
  };
  
  const handleSave = () => {
    const isValid = paymentType === 'mpesa' ? validateMpesaForm() : validateCardForm();
    
    if (!isValid) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Success message
      Alert.alert(
        'Payment Method Added',
        'Your payment method has been saved successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }, 1500);
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          {/* Payment Type Selection */}
          <View style={styles.paymentTypeContainer}>
            <TouchableOpacity
              style={[
                styles.paymentTypeButton,
                paymentType === 'mpesa' && styles.paymentTypeButtonActive
              ]}
              onPress={() => setPaymentType('mpesa')}
            >
              <Ionicons
                name="phone-portrait-outline"
                size={24}
                color={paymentType === 'mpesa' ? '#FFFFFF' : '#666666'}
              />
              <Text
                style={[
                  styles.paymentTypeText,
                  paymentType === 'mpesa' && styles.paymentTypeTextActive
                ]}
              >
                M-Pesa
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.paymentTypeButton,
                paymentType === 'card' && styles.paymentTypeButtonActive
              ]}
              onPress={() => setPaymentType('card')}
            >
              <Ionicons
                name="card-outline"
                size={24}
                color={paymentType === 'card' ? '#FFFFFF' : '#666666'}
              />
              <Text
                style={[
                  styles.paymentTypeText,
                  paymentType === 'card' && styles.paymentTypeTextActive
                ]}
              >
                Credit Card
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* M-Pesa Form */}
          {paymentType === 'mpesa' && (
            <View style={styles.formContent}>
              <Text style={styles.sectionTitle}>Add M-Pesa</Text>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="254712345678"
                  value={mpesaData.phoneNumber}
                  onChangeText={(value) => updateMpesaField('phoneNumber', value)}
                  keyboardType="phone-pad"
                />
                <Text style={styles.helperText}>Enter your M-Pesa registered number starting with 254</Text>
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Name (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="E.g. My Personal M-Pesa"
                  value={mpesaData.name}
                  onChangeText={(value) => updateMpesaField('name', value)}
                />
              </View>
            </View>
          )}
          
          {/* Credit Card Form */}
          {paymentType === 'card' && (
            <View style={styles.formContent}>
              <Text style={styles.sectionTitle}>Add Credit/Debit Card</Text>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Card Number</Text>
                <View style={styles.cardNumberContainer}>
                  <Ionicons name="card-outline" size={20} color="#999" style={styles.cardIcon} />
                  <TextInput
                    style={styles.cardNumberInput}
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChangeText={(value) => updateCardField('cardNumber', formatCardNumber(value))}
                    keyboardType="number-pad"
                    maxLength={19}
                  />
                </View>
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Cardholder Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="JOHN SMITH"
                  value={cardData.cardholderName}
                  onChangeText={(value) => updateCardField('cardholderName', value.toUpperCase())}
                  autoCapitalize="characters"
                />
              </View>
              
              <View style={styles.rowContainer}>
                <View style={[styles.formGroup, styles.halfWidth, { marginRight: 8 }]}>
                  <Text style={styles.label}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    value={cardData.expiryDate}
                    onChangeText={(value) => updateCardField('expiryDate', formatExpiryDate(value))}
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                </View>
                
                <View style={[styles.formGroup, styles.halfWidth]}>
                  <Text style={styles.label}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    value={cardData.cvv}
                    onChangeText={(value) => updateCardField('cvv', value.replace(/\D/g, ''))}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          )}
          
          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save Payment Method</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 16,
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paymentTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  paymentTypeButtonActive: {
    backgroundColor: '#FF5722',
  },
  paymentTypeText: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 16,
    color: '#333',
  },
  paymentTypeTextActive: {
    color: '#FFFFFF',
  },
  formContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
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
    color: '#333',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  cardIcon: {
    marginRight: 8,
  },
  cardNumberInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  halfWidth: {
    flex: 1,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#FF5722',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonDisabled: {
    backgroundColor: '#ffab91',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPaymentMethodScreen;