import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ORDERUP_SERVER } from "@env";  // Assuming this is defined in .env
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = ({ navigation }) => {
  // Set initial state for name, email, and phone
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');  // Retrieve the token
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }
      // Fetch user profile data using token
      const response = await fetch(`${ORDERUP_SERVER}/api/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Replace with actual auth token
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone); // Handle optional phone
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
  }, []);

  const handleSaveChanges = async () => {
    if (!name || !email) {
      Alert.alert('Error', 'Name and Email are required!');
      return;
    }
  
    const updatedProfile = { name, email, phone };
  
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }
  
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
        // Update the user state with the new data
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
  
        // Optionally, fetch the updated profile data
        fetchProfileData();
  
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
      console.error(error);
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
          placeholder="Phone Number"
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
