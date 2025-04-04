// src/navigation/MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

// Main Screens
import HomeScreen from '../screens/HomeScreen';
import RestaurantsScreen from '../screens/RestaurantsScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Profile screens
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SavedAddressesScreen from '../screens/profile/SavedAddressesScreen';
import AddAddressScreen from '../screens/profile/AddAddressScreen';
import PaymentMethodsScreen from '../screens/profile/PaymentMethodsScreen';
import AddPaymentMethodScreen from '../screens/profile/AddPaymentMethodScreen';
import NotificationsScreen from '../screens/profile/NotificationsScreen';

// Support screens
import FAQScreen from '../screens/support/FAQScreen';
import ContactSupportScreen from '../screens/support/ContactSupportScreen';
import TermsConditionsScreen from '../screens/support/TermsConditionsScreen';

// Authentication screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

// Auth Navigator
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
  </AuthStack.Navigator>
);

// Home Stack
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeScreen" 
      component={HomeScreen} 
      options={{ 
        headerShown: false 
      }} 
    />
    <Stack.Screen 
      name="RestaurantDetail" 
      component={RestaurantDetailScreen} 
      options={({ route }) => ({ 
        title: route.params?.name || 'Restaurant' 
      })} 
    />
  </Stack.Navigator>
);

// Restaurant Stack
const RestaurantStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="RestaurantsList" 
      component={RestaurantsScreen} 
      options={({ navigation }) => ({ 
        title: 'Restaurants',
        // Custom back button that goes to Home instead of Auth
        headerLeft: () => (
          <TouchableOpacity 
            style={{ marginLeft: 15 }}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen 
      name="RestaurantDetail" 
      component={RestaurantDetailScreen} 
      options={({ route }) => ({ 
        title: route.params?.name || 'Restaurant' 
      })} 
    />
  </Stack.Navigator>
);

// Cart Stack
const CartStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="CartItems" 
      component={CartScreen} 
      options={({ navigation }) => ({
        title: 'Your Cart',
        // Custom back button that goes to Home
        headerLeft: () => (
          <TouchableOpacity 
            style={{ marginLeft: 15 }}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen 
      name="Checkout" 
      component={CheckoutScreen} 
      options={{ 
        title: 'Checkout' 
      }} 
    />
  </Stack.Navigator>
);

// Profile Stack
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProfileMain" 
      component={ProfileScreen} 
      options={{ 
        title: 'Profile',
        headerLeft: null, // Remove back button on profile main screen
      }} 
    />
    <Stack.Screen 
      name="EditProfile" 
      component={EditProfileScreen} 
      options={{ 
        title: 'Edit Profile' 
      }} 
    />
    <Stack.Screen 
      name="SavedAddresses" 
      component={SavedAddressesScreen} 
      options={{ 
        title: 'Saved Addresses' 
      }} 
    />
    <Stack.Screen 
      name="AddAddress" 
      component={AddAddressScreen} 
      options={{ 
        title: 'Add Address' 
      }} 
    />
    <Stack.Screen 
      name="PaymentMethods" 
      component={PaymentMethodsScreen} 
      options={{ 
        title: 'Payment Methods' 
      }} 
    />
    <Stack.Screen 
      name="AddPaymentMethod" 
      component={AddPaymentMethodScreen} 
      options={{ 
        title: 'Add Payment Method' 
      }} 
    />
    <Stack.Screen 
      name="Notifications" 
      component={NotificationsScreen} 
      options={{ 
        title: 'Notifications' 
      }} 
    />
    <Stack.Screen 
      name="FAQ" 
      component={FAQScreen} 
      options={{ 
        title: 'FAQ' 
      }} 
    />
    <Stack.Screen 
      name="ContactSupport" 
      component={ContactSupportScreen} 
      options={{ 
        title: 'Contact Support' 
      }} 
    />
    <Stack.Screen 
      name="TermsConditions" 
      component={TermsConditionsScreen} 
      options={{ 
        title: 'Terms & Conditions' 
      }} 
    />
  </Stack.Navigator>
);

// Main Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Restaurants') {
          iconName = focused ? 'restaurant' : 'restaurant-outline';
        } else if (route.name === 'Cart') {
          iconName = focused ? 'cart' : 'cart-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF5722',
      tabBarInactiveTintColor: 'gray',
      headerShown: false
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Restaurants" component={RestaurantStack} />
    <Tab.Screen name="Cart" component={CartStack} />
    <Tab.Screen 
      name="Profile" 
      component={ProfileStack}
    />
  </Tab.Navigator>
);

// Root Navigator - prevent going back to Auth after login
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Auth" 
        component={AuthNavigator} 
        options={{ gestureEnabled: false }} // Disable swipe back
      />
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ 
          gestureEnabled: false, // Disable swipe back to Auth
          headerLeft: null // Remove back button
        }} 
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;