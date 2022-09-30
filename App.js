import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableHighlight,
  Image,
  AsyncStorage,
  Button,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/main/Main';
import TabNavigationRoutes from './pages/TabNavigationRoutes';
import Splash from './pages/Splash';
import PostScreen from './pages/main/PostScreen';

import styles from './styles/styles';
import colors from './styles/colors';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
function LoginAndRegister() {
  return (
    // Not logged in
    <View style={PageStyles.container}>
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{ backgroundColor: colors.dark }}
          swipeEnabled={false}
          /*tabBarOptions={{ indicatorStyle:{borderBottomColor:'darkslateblue',borderBottomWidth:2} */
          tabBarOptions={{
            indicatorStyle: {
              borderBottomColor: '#fff',
              borderBottomWidth: 2,
            },
            style: {
              backgroundColor: '#ffffff',
              margin: 0,
              height: 0,
            },
            labelStyle: { fontSize: 0 },
          }}>
          <Tab.Screen
            name="Login"
            component={Login}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
              },
            }}
          />
          <Tab.Screen
            name="Register"
            component={Register}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

// duplicate animation in App
const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={horizontalAnimation}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.dark },
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.dark },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          gestureDirection: 'horizontal',
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
          headerStyle: {
            backgroundColor: colors.dark,
            borderBottomColor: '#fff',
            borderBottomWidth: 0.2
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            paddingRight: 56,
          },
        }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigationRoutes"
          component={TabNavigationRoutes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={{
            headerShown: true,
            title: 'Post'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const PageStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.dark,
  },
});

export default App;
