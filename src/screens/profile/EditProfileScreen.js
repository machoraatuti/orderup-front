import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ORDERUP_SERVER } from "@env";  // Assuming this is defined in .env

const EditProfileScreen = ({ navigation }) => {
  // Set initial state for name, email, and phone
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch profile data (name, email) from the server
  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');  // Retrieve the token
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }
      // Fetch user profile data (name, email) using token
      const response = await fetch(`${ORDERUP_SERVER}/api/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setName(data.name);
        setEmail(data.email);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch profile data');
    }
  };

  useEffect(() => {
    // Fetch existing profile data when the screen loads
    fetchProfileData();

    // Retrieve phone number from AsyncStorage (if available)
    const loadPhoneFromStorage = async () => {
      const savedPhone = await AsyncStorage.getItem('phone');
      if (savedPhone) {
        setPhone(savedPhone);  // Set the saved phone number
      }
    };

    loadPhoneFromStorage();
  }, []);

  const handleSaveChanges = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Error', 'Name, Email, and Phone are required!');
      return;
    }

    // Basic validation for phone number (e.g., 10 digits)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!phoneRegex.test(phone)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    // Save phone number locally using AsyncStorage
    await AsyncStorage.setItem('phone', phone);

    // Optionally, save other profile details to a server if required (e.g., name, email)
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      const updatedProfile = { name, email }; // Only send name and email to the server

      const response = await fetch(`${ORDERUP_SERVER}/api/profile/edit`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      const data = await response.json();
      if (response.ok) {
        setName(data.name);
        setEmail(data.email);
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input}
          placeholder="Name"
          value={name} // Bind value to state
          onChangeText={setName}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input}
          placeholder="Email"
          value={email} // Bind value to state
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput 
          style={styles.input}
          placeholder="254712345678"
          value={phone} // Bind value to state
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
      
      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={handleSaveChanges}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Text>
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#F4845F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfileScreen;

