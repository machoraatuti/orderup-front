// src/screens/SignupScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
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
  const [errors, setErrors] = useState({});

  const updateFormField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  const validate = () => {
    const { name, email, password, confirmPassword } = formData;
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) {
      return;
    }

    const { name, email, password } = formData;
    setLoading(true);

    try {
      const response = await fetch(`${ORDERUP_SERVER}/api/auth/signup`, {
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

      Alert.alert(
        'Success',
        'Account created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );

    } catch (error) {
      console.log('Signup error:', error);
      
      if (error.message.includes('duplicate') || error.message.includes('already exists')) {
        setErrors({ email: 'This email is already registered' });
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.logo}>OrderUp</Text>
            <Text style={styles.tagline}>Create your account</Text>
            
            <View style={styles.form}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  value={formData.name}
                  onChangeText={(value) => updateFormField('name', value)}
                  placeholder="Enter your full name"
                  returnKeyType="next"
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  value={formData.email}
                  onChangeText={(value) => updateFormField('email', value)}
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
                  value={formData.password}
                  onChangeText={(value) => updateFormField('password', value)}
                  placeholder="Create a password"
                  secureTextEntry
                  returnKeyType="next"
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={[styles.input, errors.confirmPassword && styles.inputError]}
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateFormField('confirmPassword', value)}
                  placeholder="Confirm your password"
                  secureTextEntry
                  returnKeyType="done"
                  onSubmitEditing={handleSignup}
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
              </View>
              
              <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]}
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
    </KeyboardAvoidingView>
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
  inputError: {
    borderColor: '#ff5252',
  },
  errorText: {
    color: '#ff5252',
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#FF5722',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ffab91',
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