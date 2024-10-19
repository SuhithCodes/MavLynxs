import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import BottomNavbar from '../components/BottomNavbar';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <BottomNavbar />
    </NavigationContainer>
  );
};

export default AppNavigator;