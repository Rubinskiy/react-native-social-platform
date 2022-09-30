import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  Platform,
  AsyncStorage,
} from 'react-native';
import Constants from 'expo-constants';

import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import colors from '../../styles/colors';
import styles from '../../styles/styles';
import res from '../../functions/response';

const PostScreen = ({ navigation }) => {
  const [txt, setTxt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve token
  const token_retrieve = async () => {
    try {
      AsyncStorage.getItem('token').then((value) =>
        value === null ? null : fetch_post(value, 'text', txt)
      );
    } catch (error) {
      Platform.OS === 'android' ? ToastAndroid.show('Error connecting to server', ToastAndroid.SHORT) : null;
    }
  };

  // Post function
  const fetch_post = (tkn, tp, txt) => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var data = {
      'f-pst': '9',
      'tkn': JSON.parse(tkn),
      'tp': tp,
      'cptn': txt,
    };
    fetch('https://cdn.hackershaven.eu:443/api/v1/post', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((json) => {
        const decoded = JSON.parse(json);
        const status = decoded['status'];

        if (status == '403') {
          Platform.OS === 'android'
            ? ToastAndroid.show(res.post_msg_403, ToastAndroid.SHORT)
            : Alert.alert(res.post_head_403, res.res.post_msg_403);
        } else if (status == '500') {
          throw new Error(res.login_msg_500);
        } else if (status == '200') {
          navigation.goBack();
        } else {
          throw new Error(res.unknown_format);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        Platform.OS === 'android'
          ? ToastAndroid.show(error, ToastAndroid.SHORT)
          : Alert.alert(res.server_error_head, res.server_error_msg + error);
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={{ marginBottom: '100%' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10%',
            backgroundColor: colors.dark,
          }}>
          <Text style={{ color: '#fff' }}>ASD</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.multiline}
            keyboardAppearance="dark"
            multiline={true}
            placeholder="Write something.."
            placeholderTextColor="#717171"
            value={txt}
            keyboardType="default"
            maxLength={
              30
            } /* <<------>????????????????????????????????????????????????????????????????????? */
            autoCapitalize="none"
            onChangeText={(txt) => setTxt(txt)}
          />

          <TouchableHighlight
            disabled={isLoading}
            underlayColor="#1173d4"
            style={styles.darkBtn}
            onPress={() => {
              setIsLoading(true);
              token_retrieve();
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.darkBtnText}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  'Post!'
                )}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default PostScreen;

{
  /*
  https://reactnavigation.org/docs/headers/

  CHANGE THE ANIMATION STYLE FROM THE AUTH PAGES TOO
  https://reactnavigation.org/docs/stack-navigator/#animation-related-options
  https://callstack.com/blog/custom-screen-transitions-in-react-navigation/
  https://itnext.io/change-react-native-screen-animation-direction-with-react-navigation-8cec0f66f22

  ADD A LABEL LIKE (1/200) CHARS
*/
}
