// src/screens/profile/AddAddressScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddAddressScreen = ({ navigation }) => {
  const [address, setAddress] = useState({
    label: '',
    street: '',
    building: '',
    apartment: '',
    landmark: '',
    city: 'Nairobi',
    isDefault: false
  });

  const updateField = (field, value) => {
    setAddress({
      ...address,
      [field]: value
    });
  };

  const toggleDefault = () => {
    setAddress({
      ...address,
      isDefault: !address.isDefault
    });
  };

  const handleSave = () => {
    // Basic validation
    if (!address.street || !address.building) {
      Alert.alert('Error', 'Please enter street and building information.');
      return;
    }

    // Here you would typically save the address to your backend
    // For now, we'll just simulate success
    Alert.alert(
      'Success',
      'Address saved successfully',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Address Label */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Label</Text>
          <View style={styles.labelOptions}>
            <TouchableOpacity
              style={[
                styles.labelOption,
                address.label === 'Home' && styles.selectedLabel
              ]}
              onPress={() => updateField('label', 'Home')}
            >
              <Ionicons
                name="home-outline"
                size={18}
                color={address.label === 'Home' ? '#FFFFFF' : '#333333'}
              />
              <Text
                style={[
                  styles.labelText,
                  address.label === 'Home' && styles.selectedLabelText
                ]}
              >
                Home
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.labelOption,
                address.label === 'Work' && styles.selectedLabel
              ]}
              onPress={() => updateField('label', 'Work')}
            >
              <Ionicons
                name="briefcase-outline"
                size={18}
                color={address.label === 'Work' ? '#FFFFFF' : '#333333'}
              />
              <Text
                style={[
                  styles.labelText,
                  address.label === 'Work' && styles.selectedLabelText
                ]}
              >
                Work
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.labelOption,
                address.label === 'Other' && styles.selectedLabel
              ]}
              onPress={() => updateField('label', 'Other')}
            >
              <Ionicons
                name="bookmark-outline"
                size={18}
                color={address.label === 'Other' ? '#FFFFFF' : '#333333'}
              />
              <Text
                style={[
                  styles.labelText,
                  address.label === 'Other' && styles.selectedLabelText
                ]}
              >
                Other
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Street Address */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Street Addres</Text>
          <TextInput
            style={styles.input}
            value={address.street}
            onChangeText={(value) => updateField('street', value)}
            placeholder="e.g. Moi Avenue"
          />
        </View>

        {/* Building Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Building</Text>
          <TextInput
            style={styles.input}
            value={address.building}
            onChangeText={(value) => updateField('building', value)}
            placeholder="e.g. KiKo Plaza"
          />
        </View>

        {/* Apartment/Floor */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Apartment/Floor (Optional)</Text>
          <TextInput
            style={styles.input}
            value={address.apartment}
            onChangeText={(value) => updateField('apartment', value)}
            placeholder="e.g. Apartment 4B, 3rd Floor"
          />
        </View>

        {/* Landmark */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Landmark (Optional)</Text>
          <TextInput
            style={styles.input}
            value={address.landmark}
            onChangeText={(value) => updateField('landmark', value)}
            placeholder="e.g. Near Times Tower"
          />
        </View>

        {/* City */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={address.city}
            onChangeText={(value) => updateField('city', value)}
            placeholder="e.g. Nairobi"
          />
        </View>

        {/* Default Address Toggle */}
        <TouchableOpacity
          style={styles.defaultToggle}
          onPress={toggleDefault}
        >
          <View style={styles.checkboxContainer}>
            <View style={[styles.checkbox, address.isDefault && styles.checkboxChecked]}>
              {address.isDefault && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
            </View>
          </View>
          <Text style={styles.defaultText}>Set as default address</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  labelOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flex: 1,
    marginHorizontal: 4,
  },
  selectedLabel: {
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
  },
  labelText: {
    marginLeft: 6,
    fontWeight: '500',
    color: '#333333',
  },
  selectedLabelText: {
    color: '#FFFFFF',
  },
  defaultToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
  },
  defaultText: {
    fontSize: 16,
    color: '#333333',
  },
  saveButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddAddressScreen;