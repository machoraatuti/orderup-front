// src/screens/LandingScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={styles.logo}>OrderUp</Text>
        
        {/* Hero Image and Text */}
        <View style={styles.heroContainer}>
          <Image 
            source={require('../../assets/images/food-table.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Skip the Wait</Text>
            <Text style={styles.heroTitle}>Not the Experience</Text>
            <Text style={styles.heroSubtitle}>Pre-order your meals and make the most of your time</Text>
          </View>
        </View>

        {/* Why OrderUp Section */}
        <Text style={styles.sectionTitle}>Why OrderUp?</Text>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureIconContainer}>
            <Ionicons name="time-outline" size={30} color="white" />
          </View>
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Save Time</Text>
            <Text style={styles.featureDescription}>No more waiting in queues. Your meal is ready when you arrive.</Text>
          </View>
        </View>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureIconContainer}>
            <Ionicons name="options-outline" size={30} color="white" />
          </View>
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Customize Orders</Text>
            <Text style={styles.featureDescription}>Easily customize your meal exactly as you want it.</Text>
          </View>
        </View>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureIconContainer}>
            <Ionicons name="card-outline" size={30} color="white" />
          </View>
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Easy Payment</Text>
            <Text style={styles.featureDescription}>Pay in advance and forget about waiting for the bill.</Text>
          </View>
        </View>
        
        {/* Steps */}
        <View style={styles.stepsContainer}>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Browse Restaurants</Text>
            <Text style={styles.stepDescription}>Find restaurants near you with our easy search</Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Pre-Order</Text>
            <Text style={styles.stepDescription}>Select your meals and set your arrival time</Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Pay in App</Text>
            <Text style={styles.stepDescription}>Secure payment for a seamless experience</Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Enjoy!</Text>
            <Text style={styles.stepDescription}>Arrive, pick up your meal, and enjoy!</Text>
          </View>
        </View>
        
        {/* Call to Action */}
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaTitle}>Ready to skip the wait?</Text>
          <Text style={styles.ctaDescription}>Join thousands of users saving time while enjoying their favorite restaurants.</Text>
          
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.secondaryButtonText}>I Already Have an Account</Text>
          </TouchableOpacity>
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>About Us</Text>
            <Text style={styles.footerLink}>Terms</Text>
            <Text style={styles.footerLink}>Privacy</Text>
            <Text style={styles.footerLink}>Contact</Text>
          </View>
          <Text style={styles.copyright}>© 2023 OrderUp. All rights reserved.</Text>
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
    paddingBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5722',
    padding: 20,
  },
  heroContainer: {
    position: 'relative',
    height: 250,
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 34,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
    maxWidth: '80%',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDescription: {
    color: '#666',
    fontSize: 14,
  },
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 20,
  },
  stepItem: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  ctaContainer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#FF5722',
    width: '90%',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    width: '90%',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF5722',
  },
  secondaryButtonText: {
    color: '#FF5722',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  footerLink: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 14,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
  },
});

export default LandingScreen;