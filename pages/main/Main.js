import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  Alert,
  StyleSheet,
  Dimensions,
  StatusBar,
  Linking,
  Platform,
  ToastAndroid,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
{
  /* Icon search: https://icons.expo.fyi/ */
}

import styles from '../../styles/styles';
import colors from '../../styles/colors';
import generateID from '../../functions/makeID';

import Home from './Home';
import Market from './Market';
import Profile from './Profile';
import Message from './Announcement';

const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;

function HomeScreen(props) {
  return <Home nav={props.nav} refRB={props.refRB} />;
}
function MarketScreen(props) {
  return <Market nav={props.nav} refRB={props.refRB} />;
}
function ProfileScreen(props) {
  return <Profile nav={props.nav} refRB={props.refRB} />;
}

const Tab = createBottomTabNavigator();
export default function MainPage({ navigation }) {
  const refRBSheet = useRef();

  retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        Platform.OS === 'android'
          ? ToastAndroid.show(
              'Logged out of ' + value + '.',
              ToastAndroid.SHORT
            ) : Alert.alert('Logged out', 'You have logged out of ' + value + '.');
      }
    } catch (error) {
      Platform.OS === 'android'
        ? ToastAndroid.show(
            'You have logged out of Growstagram',
            ToastAndroid.SHORT
          ) : Alert.alert('Logged out', 'You have logged out of Growstagram.');
    }
  };

  const MessagePanel = () => {
    return (
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType={'fade'}
        openDuration={400}
        height={h * 0.55}
        customStyles={{
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,.5)',
          },
          draggableIcon: {
            backgroundColor: '#dadada',
          },
        }}>
        <Message refRB={refRBSheet} />
      </RBSheet>
    );
  };

  const read = () => {
    setTimeout(() => {
      refRBSheet.current.open();
    }, 1000);
    AsyncStorage.setItem('beta_id', generateID(6));
  };

  useEffect(() => {
    AsyncStorage.getItem('beta_id', (error, result) => {
      if (result === null) read();
      else {
        /* do nothing */
      }
    });
  });

  return (
    <>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: colors.dark }}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: '#000',
          inactiveTintColor: '#757575',
          headerLeft: null,
          gesturesEnabled: false,
          /*activeBackgroundColor: '#f9f9f9',
        inactiveBackgroundColor: '#b55031',*/
          style: {
            backgroundColor: colors.dark,
            width: Dimensions.get('window').width,
            padding: Platform.OS === 'ios' ? 0 : 8,
            height: Platform.OS === 'ios' ? 80 : 55,
          },
        }}
        initialRouteName="Home"
        backBehavior="initialRoute">
        <Tab.Screen
          name="Home"
          options={{
            showLabel: false,
            showIcon: true,
            tabBarIcon: ({ focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={28} color={colors.white_prim_dark} />
            ),
          }}>
          {(props) => <HomeScreen nav={navigation} refRB={refRBSheet} />}
        </Tab.Screen>
        <Tab.Screen
          name="Marketplace"
          component={MarketScreen}
          options={{
            showLabel: false,
            showIcon: true,
            tabBarIcon: ({ focused }) => (
              <Ionicons name={focused ? 'cart' : 'cart-outline'} size={32} color={colors.white_prim_dark} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          options={{
            showLabel: false,
            showIcon: true,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={28}
                color={colors.white_prim_dark}
              />
            ),
          }}>
          {(props) => <ProfileScreen nav={navigation} refRB={refRBSheet} />}
        </Tab.Screen>
      </Tab.Navigator>
      <MessagePanel />
    </>
  );
}
