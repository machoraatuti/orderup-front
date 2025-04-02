// src/screens/support/TermsConditionsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TermsConditionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Terms & Conditions</Text>
        <Text style={styles.lastUpdated}>Last Updated: April 2, 2025</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.paragraph}>
            Welcome to OrderUp ("we," "our," or "us"). These Terms and Conditions govern your use of the OrderUp mobile application and website (collectively, the "Service"), and any related services provided by OrderUp.
          </Text>
          <Text style={styles.paragraph}>
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Use of the Service</Text>
          <Text style={styles.paragraph}>
            OrderUp provides a platform to connect users with local restaurants for food ordering and delivery services. You may use our Service only for lawful purposes and in accordance with these Terms.
          </Text>
          <Text style={styles.paragraph}>
            To access and use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Ordering and Payment</Text>
          <Text style={styles.paragraph}>
            When you place an order through our Service, you are making an offer to purchase food items from the restaurants available on our platform. OrderUp acts as a facilitator between you and the restaurant.
          </Text>
          <Text style={styles.paragraph}>
            You are responsible for all charges incurred under your account. We use third-party payment processors to process payments made to us. Your payment information will be processed and stored by these payment processors and is subject to their privacy policies and terms of service.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Delivery</Text>
          <Text style={styles.paragraph}>
            OrderUp provides estimated delivery times, but these are not guaranteed. Various factors can affect delivery times, including weather conditions, traffic, and restaurant preparation times.
          </Text>
          <Text style={styles.paragraph}>
            We are not responsible for the quality of the food items provided by restaurants. However, if you are not satisfied with your order, please contact our customer support for assistance.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. User Content</Text>
          <Text style={styles.paragraph}>
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the Service, including its legality, reliability, and appropriateness.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            The Service and its original content, features, and functionality are and will remain the exclusive property of OrderUp and its licensors. The Service is protected by copyright, trademark, and other laws of both Kenya and foreign countries.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Termination</Text>
          <Text style={styles.paragraph}>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </Text>
          <Text style={styles.paragraph}>
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            In no event shall OrderUp, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Governing Law</Text>
          <Text style={styles.paragraph}>
            These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.
          </Text>
          <Text style={styles.paragraph}>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </Text>
          <Text style={styles.paragraph}>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about these Terms, please contact us at:
          </Text>
          <Text style={styles.paragraph}>
            OrderUp Ltd.
            {'\n'}P.O. Box 12345-00100
            {'\n'}Nairobi, Kenya
            {'\n'}Email: legal@orderup.co.ke
            {'\n'}Phone: +254 712 345 678
          </Text>
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
  lastUpdated: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    marginBottom: 12,
  },
});

export default TermsConditionsScreen;