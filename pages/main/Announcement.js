import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './../../styles/styles';

const guide_url = "";
export default function Message(props) {
  {/* https://uireactnative.com/input/react-native-raw-bottom-sheet.html */}
  return (
    <>
    <View style={PageStyles.panelView}>
      <Text style={PageStyles.panelHeader}>
        Welcome to Growstagram Beta <Ionicons name="flask" size={18} />
      </Text>
      <Text style={PageStyles.panelText}>
        Congratulations! you've made it as our Beta tester.
      </Text>
      <Text style={PageStyles.panelText}>
        {'\n'}+ Make sure to{' '}
        <Text style={{ fontWeight: 'bold' }}>
          test out as much as you can
        </Text>
        .{'\n'}+ If you notice any{' '}
        <Text style={{ fontWeight: 'bold' }}>bugs</Text> or would like to
        give <Text style={{ fontWeight: 'bold' }}>feedback</Text>, tap
        the{' '}
        <Text style={{ textDecorationLine: 'underline' }}>
          Blue circle on the bottom right
        </Text>{' '}
        of your screen.{'\n'}
      </Text>
      <Text style={PageStyles.panelText}>
        You can also read the
        <Text
          style={{ color: '#2f93f5' }}
          onPress={() => Linking.openURL(guide_url)}>
          {' '}
          Beta testing Guide{' '}
        </Text>
        on our Website.
      </Text>
    </View>
    <View style={PageStyles.panelContinue}>
      <TouchableHighlight
        underlayColor="#1173d4"
        onPress={() => {
          props.refRB.current.close();
        }}
        style={[styles.darkBtn, { width: '90%' }]}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.darkBtnText}>Continue</Text>
        </View>
      </TouchableHighlight>
    </View>
    </>
  );
}

const PageStyles = StyleSheet.create({
  panelView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 25,
  },
  panelHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  panelText: {
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  panelContinue: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  }
});