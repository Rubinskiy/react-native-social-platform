import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import Constants from 'expo-constants';

import styles from '../../styles/styles';
import HomeHeaderBar from '../../components/HeaderBar';

export default function Profile(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight,
      }}>
      <HomeHeaderBar />
      <TouchableHighlight
        underlayColor="#1173d4"
        onPress={() => {
          this.retrieveData('uname');
          AsyncStorage.removeItem('is_logged');
          AsyncStorage.removeItem('acc_token');
          AsyncStorage.removeItem('acc_exp');
          AsyncStorage.removeItem('ref_token');
          AsyncStorage.removeItem('uname');
          props.nav.navigate('Splash');
        }}
        style={styles.darkBtn}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.darkBtnText}>Log out</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor="#1173d4"
        onPress={() => {
          props.refRB.current.open();
        }}
        style={styles.darkBtn}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.darkBtnText}>View announcements</Text>
        </View>
      </TouchableHighlight>

        <View style={{ paddingTop: '5%' }}></View>
    </View>
  );
}