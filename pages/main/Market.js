import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import styles from '../../styles/styles';
import colors from '../../styles/colors';

function Card(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ paddingRight: props.padding }}>
      <View style={[swipe_box.view, { backgroundColor: props.color }]}>
        <Text
          style={{
            textAlign: 'center',
            flex: 1, // marginTop: 50,
            marginTop: 24,
            fontSize: 15,
            fontFamily: 'Montserrat',
            color: '#fff',
            flexDirection: 'row',
          }}>
          <Ionicons name={props.icon} color={'#fff'} size={56} />
          {'\n'}
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Market(props) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    {/**/}
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight,
        backgroundColor: colors.dark,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>

        <View>
          <View style={{ height: 120, width: '100%' }}>
            <ImageBackground
              source={{ uri: 'https://i.imgur.com/Hj7DKa4.png' }}
              style={{ width: '100%', height: '100%' }}
              imageStyle={{ resizeMode: 'repeat' }}>
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: 36,
                  color: colors.white_prim_dark,
                  textAlign: 'center',
                  marginTop: 30,
                  marginBottom: 80,
                }}>
                Marketplace
              </Text>
            </ImageBackground>
          </View>
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          ref={(scrollView) => {
            this.scrollView = scrollView;
          }}
          style={swipe_box.container}
          horizontal={true}
          decelerationRate={0}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}>

          <Card color={'magenta'} icon={'rocket-outline'} />
          <Card color={'orange'} icon={'pencil'} />
          <Card color={'cyan'} icon={'newspaper'} />
          <Card color={'purple'} icon={'newspaper'} padding={24} />

          {/*
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              paddingVertical: '2.5%'
            }}>
            <View
              style={{
                marginLeft: '5%',
                borderRadius: 25,
                width: 100,
                height: 100,
                backgroundColor: 'red',
              }}></View>
            <View
              style={{
                marginLeft: '5%',
                borderRadius: 25,
                width: 100,
                height: 100,
                backgroundColor: 'blue',
              }}></View>
          </View>
          */}

          </ScrollView>
      </ScrollView>
    </View>
  );
}

const swipe_box = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingLeft: 5,
  },
  view: {
    marginTop: 5,
    width: 100,
    height: 100,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 25,
  },
});