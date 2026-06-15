import React from 'react';
import { createBottomTabNavigator } from '@react-bottom-tabs/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import PestDiseaseScreen from '../screens/PestDiseaseScreen';

const Tab = createBottomTabNavigator();

// KISAN AI Custom Center Button Icon
const CustomAiIcon = () => (
  <View style={styles.aiButton}>
    <Text style={styles.aiIconText}>🍃</Text>
  </View>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#2E7D32',
          tabBarInactiveTintColor: '#888',
        }}
      >
        <Tab.Screen 
          name="HomeTab" 
          component={HomeScreen} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🏠</Text>,
          }} 
        />
        
        <Tab.Screen 
          name="KisanAI" 
          component={PestDiseaseScreen} // Linking AI features here
          options={{
            tabBarLabel: 'KISAN AI',
            tabBarIcon: () => <CustomAiIcon />,
          }} 
        />
        
        <Tab.Screen 
          name="ProfileTab" 
          component={ProfileSetupScreen} 
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>👤</Text>,
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 10,
  },
  aiButton: {
    width: 60,
    height: 60,
    backgroundColor: '#2E7D32',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Elevates the button slightly above the bar
    borderWidth: 4,
    borderColor: '#FFF',
    elevation: 5,
  },
  aiIconText: {
    fontSize: 28,
  }
});
