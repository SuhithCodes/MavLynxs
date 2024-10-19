// components/BottomNavbar.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen'; // Make sure paths are correct
import EssentialsScreen from '../screens/EssentialsScreen'; // Adjust imports
import NetworkingScreen from '../screens/NetworkingScreen';
import CampusScreen from '../screens/CampusScreen';
import ExplorationScreen from '../screens/ExplorationScreen';

const Tab = createBottomTabNavigator();

const BottomNavbar = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Essentials') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Networking') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Campus') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Exploration') {
            iconName = focused ? 'football' : 'football-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          elevation: 0,
          backgroundColor: colors.card,
          borderRadius: 15,
          height: 60,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
      })}
    >
      <Tab.Screen name="Essentials" component={EssentialsScreen} />
      <Tab.Screen name="Networking" component={NetworkingScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Campus" component={CampusScreen} />
      <Tab.Screen name="Exploration" component={ExplorationScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavbar;
