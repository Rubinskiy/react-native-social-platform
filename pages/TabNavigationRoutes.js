import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from './main/Main';

const Stack = createStackNavigator();
const TabNavigationRoutes = ({ navigation }) => {
  return (
    <MainPage navigation={navigation} />
  );
};

export default TabNavigationRoutes;