// src/screens/ProfileScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ORDERUP_SERVER } from "@env";
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  // State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const defaultImage = 'https://via.placeholder.com/150?text=User';

  useEffect(() => {
    // fetch user data
    const fetchData = async () => {
      try {
        setLoading(true);
        // retrieve user data
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          // set state and change to object
          const parsedUser = JSON.parse(savedUser);
          console.log("Retrieved User:", parsedUser);
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Error retrieving user data:", err);
        Alert.alert("Error", "Could not load profile data");
      } finally {
        setLoading(false);
      }
    };
    
    // Load data when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    // Initial data load
    fetchData();
    
    // Cleanup
    return unsubscribe;
  }, [navigation]);

  const handleSelectImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant permission to access your photos');
        return;
      }
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        handleUploadImage(selectedImage.uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Could not select image');
    }
  };
  
  const handleUploadImage = async (imageUri) => {
    try {
      setUploading(true);
      
      // In a real app, you would upload the image to your server here
      // For now, we'll just simulate a successful upload
      
      // Create a new user object with the updated image
      const updatedUser = {
        ...user,
        profileImage: imageUri
      };
      
      // Save to AsyncStorage (in a real app, save to server too)
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      
      Alert.alert('Success', 'Profile image updated successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Could not upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // retrieve token for logout
      const token = await AsyncStorage.getItem("token");
      
      if (!token) {
        // If no token, just clear local storage and navigate
        await AsyncStorage.removeItem("user");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }]
        });
        return;
      }

      // Show loading indicator
      setLoading(true);

      try {
        const response = await fetch(`${ORDERUP_SERVER}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ token })
        });

        // Whether the server accepts the logout or not, clear local storage
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
      } catch (error) {
        console.error("Logout request failed:", error);
        // Still clear local storage even if server request fails
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
      }

      // Navigate to login
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }]
      });
      
    } catch (err) {
      console.error("Logout Error:", err);
      Alert.alert("Error", "Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5722" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <TouchableOpacity 
          style={styles.profileImageContainer}
          onPress={handleSelectImage}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#FF5722" style={styles.profileImage} />
          ) : (
            <>
              <Image 
                source={{ uri: user?.profileImage || defaultImage }} 
                style={styles.profileImage} 
              />
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={18} color="white" />
              </View>
            </>
          )}
        </TouchableOpacity>
        
        <Text style={styles.profileName}>{user?.name || 'User'}</Text>
        <Text style={styles.profileEmail}>{user?.email || 'No email available'}</Text>
        {user?.phone && <Text style={styles.profilePhone}>{user.phone}</Text>}
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Ionicons name="person-outline" size={24} color="#666" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>Personal Information</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('SavedAddresses')}
        >
          <Ionicons name="location-outline" size={24} color="#666" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>Saved Addresses</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('PaymentMethods')}
        >
          <Ionicons name="card-outline" size={24} color="#666" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={24} color="#666" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Help & Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help & Support</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('FAQ')}
        >
          <Ionicons name="help-circle-outline" size={24} color="#666" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>FAQ</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('ContactSupport')}
        >
          <Ionicons name="call-outline" size={24} color="#666" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>Contact Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => navigation.navigate('TermsConditions')}
        >
          <Ionicons name="document-text-outline" size={24} color="#666" style={styles.settingIcon} />
          <Text style={styles.settingLabel}>Terms & Conditions</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <>
            <Ionicons name="log-out-outline" size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
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
  profileHeader: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF5722',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;