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
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ORDERUP_SERVER } from '@env';
import { Ionicons } from '@expo/vector-icons';

const EditProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Fetch profile data from the server
  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      const response = await fetch(`${ORDERUP_SERVER}/api/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserData({ name: data.name, email: data.email, phone: '' });
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();

    const loadPhoneFromStorage = async () => {
      const savedPhone = await AsyncStorage.getItem('phone');
      if (savedPhone) {
        setUserData((prev) => ({ ...prev, phone: savedPhone }));
      }
    };

    loadPhoneFromStorage();
  }, []);

  const handleSaveChanges = async () => {
    if (!userData.name || !userData.email || !userData.phone) {
      Alert.alert('Error', 'Name, Email, and Phone are required!');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(userData.phone)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    await AsyncStorage.setItem('phone', userData.phone);

    try {
      setSaving(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      const updatedProfile = { name: userData.name, email: userData.email };

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
        setUserData((prev) => ({ ...prev, name: data.name, email: data.email }));
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = () => {
    // Navigate to password change screen or show a modal
    Alert.alert('Change Password', 'Password change functionality will be implemented here');
    // For a real implementation, you would navigate to a change password screen:
    // navigation.navigate('ChangePassword');
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* We're removing the custom header since the navigation header already shows "Edit Profile" */}
        
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={userData.name}
              onChangeText={(text) => setUserData((prev) => ({ ...prev, name: text }))}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={userData.email}
              onChangeText={(text) => setUserData((prev) => ({ ...prev, email: text }))}
              keyboardType="email-address"
              editable={false} // Make email non-editable as shown in screenshot
            />
            <Text style={styles.emailNote}>Email cannot be changed</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={userData.phone}
              onChangeText={(text) => setUserData((prev) => ({ ...prev, phone: text }))}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.passwordSection}>
              <View style={styles.passwordHeader}>
                <Ionicons name="lock-closed-outline" size={20} color="#888" />
                <Text style={styles.passwordLabel}>Password</Text>
              </View>
              <TouchableOpacity onPress={handleChangePassword}>
                <View style={styles.changePasswordButton}>
                  <Text style={styles.changePasswordText}>Change Password</Text>
                  <Ionicons name="chevron-forward" size={20} color="#FF5722" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSaveChanges} 
            disabled={saving}
          >
            <Text style={styles.saveButtonText}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
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
    paddingHorizontal: 20,
    paddingTop: 20,
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
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  emailNote: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  passwordSection: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 14,
  },
  passwordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    color: '#333',
  },
  changePasswordButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  changePasswordText: {
    color: '#FF5722',
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;