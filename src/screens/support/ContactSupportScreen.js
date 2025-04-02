// src/screens/support/ContactSupportScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactSupportScreen = ({ navigation }) => {
  const [issueType, setIssueType] = useState('order');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const issueTypes = [
    { id: 'order', name: 'Order Issue', icon: 'receipt-outline' },
    { id: 'delivery', name: 'Delivery Problem', icon: 'bicycle-outline' },
    { id: 'account', name: 'Account Help', icon: 'person-outline' },
    { id: 'payment', name: 'Payment Issue', icon: 'card-outline' },
    { id: 'app', name: 'App Technical Issue', icon: 'phone-portrait-outline' },
    { id: 'other', name: 'Other', icon: 'help-circle-outline' },
  ];

  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Request Submitted',
        'Your support request has been submitted. We will get back to you shortly.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }, 1500);
  };

  const validateForm = () => {
    if (!subject.trim()) {
      Alert.alert('Error', 'Please enter a subject for your request');
      return false;
    }

    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message describing your issue');
      return false;
    }

    if (message.trim().length < 20) {
      Alert.alert('Error', 'Please provide more details about your issue (at least 20 characters)');
      return false;
    }

    return true;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Contact Support</Text>
          <Text style={styles.subheader}>We're here to help with any issues you're facing</Text>

          {/* Issue Type Selector */}
          <Text style={styles.sectionTitle}>What can we help you with?</Text>
          <View style={styles.issueTypesContainer}>
            {issueTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.issueTypeButton,
                  issueType === type.id && styles.issueTypeButtonActive
                ]}
                onPress={() => setIssueType(type.id)}
              >
                <Ionicons
                  name={type.icon}
                  size={20}
                  color={issueType === type.id ? '#FFFFFF' : '#666666'}
                />
                <Text
                  style={[
                    styles.issueTypeText,
                    issueType === type.id && styles.issueTypeTextActive
                  ]}
                >
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Subject Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              placeholder="Brief description of your issue"
              value={subject}
              onChangeText={setSubject}
              maxLength={100}
            />
          </View>

          {/* Message Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={styles.textAreaInput}
              placeholder="Please provide as much detail as possible about your issue"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Alternative Contact Methods */}
          <View style={styles.alternativeContactContainer}>
            <Text style={styles.alternativeContactTitle}>
              You can also reach us via:
            </Text>
            
            <View style={styles.contactMethodRow}>
              <Ionicons name="call-outline" size={20} color="#666" />
              <Text style={styles.contactMethodText}>+254 712 345 678</Text>
            </View>
            
            <View style={styles.contactMethodRow}>
              <Ionicons name="mail-outline" size={20} color="#666" />
              <Text style={styles.contactMethodText}>support@orderup.co.ke</Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Request</Text>
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
  contentContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#333',
  },
  issueTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  issueTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  issueTypeButtonActive: {
    backgroundColor: '#FF5722',
  },
  issueTypeText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
  },
  issueTypeTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: 16,
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
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textAreaInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
  },
  alternativeContactContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 24,
  },
  alternativeContactTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#333',
  },
  contactMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactMethodText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#FF5722',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonDisabled: {
    backgroundColor: '#ffab91',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactSupportScreen;