// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ORDERUP_SERVER } from "@env";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debug the API URL to ensure environment variable is loading correctly
  useEffect(() => {
    console.log('API URL:', ORDERUP_SERVER);
  }, []); // Empty dependency array makes it run only once

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    // Prevent duplicate submissions
    if (isSubmitting || loading) return;
    
    // Email and password validation
    if (!validate()) return;
    
    setLoading(true);
    setIsSubmitting(true);
    setErrors({});

    try {
      console.log('Attempting login with:', email);
      
      // Set a timeout to prevent hanging UI
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out - check if server is running')), 10000)
      );
      
      // Your existing fetch call
      const fetchPromise = fetch(`${ORDERUP_SERVER}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      // Race the fetch against the timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      const data = await response.json();
      
      // Error to login
      if (!response.ok) {
        throw new Error(data.message || "Login Failed!");
      }
      
      // Store token
      await AsyncStorage.setItem("user", JSON.stringify(data.user)); // User
      await AsyncStorage.setItem("token", data.token); // JWT
      
      // Navigate to main screen with reset to prevent going back
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }]
      });
    } catch (err) {
      console.log('Login error:', err);
      
      // Show error in UI
      if (err.message.includes('timed out')) {
        Alert.alert(
          'Connection Error', 
          'Unable to connect to the server. Please check your internet connection and make sure the server is running.'
        );
      } else {
        setErrors((prev) => ({...prev, general: err.message}));
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to a password reset screen
    Alert.alert(
      'Password Reset',
      'A password reset link will be sent to your email address.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Send Link',
          onPress: () => {
            if (!email) {
              Alert.alert('Please enter your email address first');
            } else {
              Alert.alert('Password reset link sent to your email');
            }
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.logo}>OrderUp</Text>
          <Text style={styles.tagline}>Skip the wait, not the experience</Text>
          
          <View style={styles.form}>
            {errors.general && (
              <View style={styles.generalError}>
                <Text style={styles.generalErrorText}>{errors.general}</Text>
              </View>
            )}
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
            
            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, (loading || isSubmitting) && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading || isSubmitting}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
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
  generalError: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  generalErrorText: {
    color: '#c62828',
    textAlign: 'center',
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
  inputError: {
    borderColor: '#ff5252',
  },
  errorText: {
    color: '#ff5252',
    fontSize: 14,
    marginTop: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#FF5722',
  },
  button: {
    backgroundColor: '#FF5722',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ffab91',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#FF5722',
    fontWeight: '500',
  },
});

export default LoginScreen;