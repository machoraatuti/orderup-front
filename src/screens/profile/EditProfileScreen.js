// src/screens/profile/EditProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ORDERUP_SERVER } from '@env';

const EditProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  // Load user data when component mounts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUserData({
            name: parsedUser.name || '',
            email: parsedUser.email || '',
            phone: parsedUser.phone || '',
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        Alert.alert('Error', 'Failed to load your profile information');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const updateField = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const validateData = () => {
    const newErrors = {};
    
    if (!userData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (userData.phone && !/^\+?[0-9]{10,15}$/.test(userData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateData()) {
      return;
    }

    try {
      setSaving(true);

      // Get the current user
      const savedUser = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      
      if (!savedUser || !token) {
        throw new Error('User data or authentication token not found');
      }
      
      const currentUser = JSON.parse(savedUser);
      
      // In a real app, you would send an API request to update user data
      try {
        const response = await fetch(`${ORDERUP_SERVER}/api/user/update-profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: userData.name,
            phone: userData.phone,
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update profile');
        }
        
        // If we get here, the API request was successful
      } catch (apiError) {
        console.error('API error updating profile:', apiError);
        // Continue with local updates even if API fails
      }
      
      // Update the user in AsyncStorage
      const updatedUser = {
        ...currentUser,
        name: userData.name,
        phone: userData.phone,
        // We don't update email here as that typically requires verification
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      
      Alert.alert('Success', 'Your profile has been updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save your profile information');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5722" />
        <Text style={styles.loadingText}>Loading profile information...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          {/* Name Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              value={userData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="Enter your full name"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
          
          {/* Email Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError, styles.inputDisabled]}
              value={userData.email}
              editable={false}
              placeholder="Your email address"
            />
            <Text style={styles.helperText}>Email cannot be changed</Text>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
          
          {/* Phone Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={userData.phone}
              onChangeText={(value) => updateField('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>
          
          {/* Password Change Section */}
          <View style={styles.passwordSection}>
            <View style={styles.passwordHeader}>
              <Ionicons name="lock-closed-outline" size={18} color="#666" />
              <Text style={styles.passwordTitle}>Password</Text>
            </View>
            <TouchableOpacity style={styles.changePasswordButton}>
              <Text style={styles.changePasswordText}>Change Password</Text>
              <Ionicons name="chevron-forward" size={20} color="#FF5722" />
            </TouchableOpacity>
          </View>
          
          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
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
    color: '#333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF5252',
  },
  inputDisabled: {
    backgroundColor: '#F5F5F5',
    color: '#999',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  passwordSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  passwordTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    color: '#333',
  },
  changePasswordButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  changePasswordText: {
    color: '#FF5722',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#FFCCBC',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;