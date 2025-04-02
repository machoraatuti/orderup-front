// src/screens/support/FAQScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FAQScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqData = [
    {
      question: 'How do I place an order?',
      answer: 'To place an order, browse restaurants, select your items, add them to cart, and proceed to checkout. Follow the steps to complete your payment and wait for delivery.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept M-Pesa, credit/debit cards, and cash on delivery in select areas. You can manage your payment methods in your profile settings.'
    },
    {
      question: 'How long will my delivery take?',
      answer: 'Delivery times vary based on your location, the restaurant, and current demand. The estimated delivery time will be shown before you place your order and you can track your delivery in real-time.'
    },
    {
      question: 'Can I cancel my order?',
      answer: 'You can cancel your order within 5 minutes of placing it. After that, the order may have already been processed by the restaurant and cannot be canceled. Contact customer support for assistance.'
    },
    {
      question: 'What if my order is missing items?',
      answer: 'If items are missing from your delivery, please report it immediately through the app by going to your order history and selecting "Report a Problem" on the affected order.'
    },
    {
      question: 'How do I get a refund?',
      answer: 'Refunds can be requested through the app for valid issues. Go to your order history, select the problematic order, and choose "Request Refund". Our support team will review your request within 24 hours.'
    },
    {
      question: 'Do you deliver to my area?',
      answer: 'We deliver to most areas in major cities. Enter your address in the app to see available restaurants in your area. Delivery radius depends on restaurant partners in your vicinity.'
    },
  ];

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Frequently Asked Questions</Text>
        <Text style={styles.subheader}>Find answers to common questions about OrderUp</Text>
        
        {faqData.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity 
              style={styles.questionContainer}
              onPress={() => toggleAccordion(index)}
            >
              <Text style={styles.questionText}>{item.question}</Text>
              <Ionicons 
                name={expandedIndex === index ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
            
            {expandedIndex === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            )}
          </View>
        ))}
        
        <View style={styles.contactSection}>
          <Text style={styles.contactText}>
            Can't find what you're looking for?
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    color: '#333',
  },
  answerContainer: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  answerText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  contactSection: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 16,
  },
  contactText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#666',
  },
  contactButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default FAQScreen;