import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconBadge from 'react-native-icon-badge';

import styles from '../styles/styles';
import colors from '../styles/colors';

const HomeHeaderBar = () => {
  return (
    <View
      style={[
        styles.header,
        {
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
          flexDirection: 'row',
          backgroundColor: colors.dark,
        },
      ]}>
      <Text style={{ fontFamily: 'Montserrat', fontSize: 32, color: colors.white_prim_dark }}>Home</Text>
      <Text style={{ textAlign: 'right', flex: 1, marginTop: 3 }}>
        <TouchableOpacity>
          <Ionicons name={'search-outline'} color={colors.white_prim_dark} size={32} />
        </TouchableOpacity>
        {" "}{" "}{" "}
        <TouchableOpacity>
          <IconBadge
            IconBadgeStyle={{
              position:'absolute',
              top: 1,
              right: 1,
              minWidth: 12,
              height: 12,
              borderRadius: 100/2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FF0000'
            }}
            MainElement={
              <Ionicons name={'notifications-outline'} color={colors.white_prim_dark} size={32} />
            }
          />
        </TouchableOpacity>
      </Text>
    </View>
  );
}
const HeaderBar = (props) => {
  return (
    <View
      style={[
        styles.header,
        {
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
          flexDirection: 'row',
        },
      ]}>
      <Text style={{ fontFamily: 'Montserrat', fontSize: 32 }}>{props.name}</Text>
      <Text style={{ textAlign: 'right', flex: 1, marginTop: 3 }}>
        <TouchableOpacity activeOpacity={0.5}>
          <Ionicons name={props.icon} color={'#000'} size={32} />
        </TouchableOpacity>
      </Text>
    </View>
  );
}
export default HomeHeaderBar;