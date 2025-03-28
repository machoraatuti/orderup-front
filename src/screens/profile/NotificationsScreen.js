// src/screens/profile/NotificationsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';

const NotificationsScreen = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: false,
    statusChanges: true,
    deliveryAlerts: true,
    specialOffers: true,
    appUpdates: false
  });
  
  const toggleSetting = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Order Notifications</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Order Status Updates</Text>
          <Text style={styles.settingDescription}>Receive updates when your order status changes</Text>
        </View>
        <Switch
          value={notificationSettings.orderUpdates}
          onValueChange={() => toggleSetting('orderUpdates')}
          trackColor={{ false: '#ddd', true: '#F4845F' }}
          thumbColor="white"
        />
      </View>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Delivery Alerts</Text>
          <Text style={styles.settingDescription}>Get notified when your order is on the way or delivered</Text>
        </View>
        <Switch
          value={notificationSettings.deliveryAlerts}
          onValueChange={() => toggleSetting('deliveryAlerts')}
          trackColor={{ false: '#ddd', true: '#F4845F' }}
          thumbColor="white"
        />
      </View>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Status Changes</Text>
          <Text style={styles.settingDescription}>Receive alerts for important status changes</Text>
        </View>
        <Switch
          value={notificationSettings.statusChanges}
          onValueChange={() => toggleSetting('statusChanges')}
          trackColor={{ false: '#ddd', true: '#F4845F' }}
          thumbColor="white"
        />
      </View>
      
      <Text style={styles.sectionTitle}>Marketing Notifications</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Promotions</Text>
          <Text style={styles.settingDescription}>Receive promotional messages from restaurants</Text>
        </View>
        <Switch
          value={notificationSettings.promotions}
          onValueChange={() => toggleSetting('promotions')}
          trackColor={{ false: '#ddd', true: '#F4845F' }}
          thumbColor="white"
        />
      </View>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Special Offers</Text>
          <Text style={styles.settingDescription}>Get notified about special deals and discounts</Text>
        </View>
        <Switch
          value={notificationSettings.specialOffers}
          onValueChange={() => toggleSetting('specialOffers')}
          trackColor={{ false: '#ddd', true: '#F4845F' }}
          thumbColor="white"
        />
      </View>
      
      <Text style={styles.sectionTitle}>App Notifications</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>App Updates</Text>
          <Text style={styles.settingDescription}>Receive notifications about app updates and new features</Text>
        </View>
        <Switch
          value={notificationSettings.appUpdates}
          onValueChange={() => toggleSetting('appUpdates')}
          trackColor={{ false: '#ddd', true: '#F4845F' }}
          thumbColor="white"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationsScreen;