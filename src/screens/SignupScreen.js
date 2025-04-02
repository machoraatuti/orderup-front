// src/screens/SignupScreen.js
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { ORDERUP_SERVER } from "@env";

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);



  const updateFormField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = formData;

    //  Basic Validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${ ORDERUP_SERVER }/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed.');
      }

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');

    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.logo}>OrderUp</Text>
          <Text style={styles.tagline}>Create your account</Text>
          
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => updateFormField('name', value)}
                placeholder="Enter your full name"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => updateFormField('email', value)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(value) => updateFormField('password', value)}
                placeholder="Create a password"
                secureTextEntry
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormField('confirmPassword', value)}
                placeholder="Confirm your password"
                secureTextEntry
              />
            </View>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF5722',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#FF5722',
    fontWeight: '500',
  },
});

export default SignupScreen;
