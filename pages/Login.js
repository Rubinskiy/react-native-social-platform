import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Button,
  Alert,
  Image,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import { useFonts } from 'expo-font';
import ThisJuly from '../assets/fonts/ThisJuly-2oZ8.ttf';
import Loading from '../components/LoadingScreen';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import base64 from 'react-native-base64';
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles';
import colors from '../styles/colors';
import res from '../functions/response';
import { storeTokens, retrieveTokens } from '../auth/auth';

// Regex patterns for textinputs
const validate_un = (un) => {
  var u_pattern = /^[a-z0-9_](?!.*?\.{2})[a-z0-9_.]{1,22}[a-z0-9_]$/;
  return u_pattern.test(un);
};
const validate_em = (em) => {
  var e_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return e_pattern.test(em);
};

export default function Login({ navigation }) {
  const [loaded] = useFonts({
    ThisJuly,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsdisabled] = useState(false);
  const [unem, setUnem] = useState('');
  const [pw, setPw] = useState('');

  const pwdField = createRef();
  const [hidePass, setHidePass] = useState(true);

  // Login function
  const fetch_login = (unem, pw) => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var data = {
      'f-log': '2',
      unem: unem,
      pw: pw,
    };
    fetch('https://cdn.hackershaven.eu:443/api/v1/auth', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((json) => {
        const decoded = JSON.parse(json);
        const status = decoded['status'];

        if (status == '403') {
          Alert.alert(res.login_head_403, res.login_msg_403);
        } else if (status == '500') {
          throw new Error(res.login_msg_500);
        } else if (status == '200') {
          var acc_token = JSON.stringify(decoded['token']);
          var acc_splitted = acc_token.split('-');
          var exp_date = base64.decode(acc_splitted[1]);
          storeTokens(acc_token, exp_date, unem);
          AsyncStorage.setItem('is_logged', '1');

          navigation.replace('TabNavigationRoutes');
        } else {
          throw new Error(res.unknown_format);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        Alert.alert(res.server_error_head, res.server_error_msg + error);
        setIsLoading(false);
      });
  };

  if (!loaded) {
    return (
      <Loading />
    );
  }

  return (
    <KeyboardAvoidingWrapper>
      <View style={{ marginTop: 30, marginBottom: 30 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15%',
          }}>
          <Text style={[styles.introFont, { fontFamily: 'ThisJuly' }]}>
            grstgrm
          </Text>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            keyboardAppearance="dark"
            placeholder="Email or Username"
            placeholderTextColor="#717171"
            value={unem}
            returnKeyType="next"
            keyboardType="email-address"
            autocorrect={false}
            maxLength={30}
            autoCapitalize="none"
            onChangeText={(unem) => setUnem(unem)}
            onSubmitEditing={() => pwdField.current && pwdField.current.focus()}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              keyboardAppearance="dark"
              placeholder="Password"
              placeholderTextColor="#717171"
              ref={pwdField}
              value={pw}
              returnKeyType="go"
              secureTextEntry={hidePass ? true : false}
              maxLength={30}
              onChangeText={(pw) => setPw(pw)}
            />
            <Ionicons
              name={hidePass ? 'eye-off' : 'eye'}
              color={'#fff'}
              size={20}
              onPress={() => setHidePass(!hidePass)}
              style={{
                position: 'absolute',
                right: 3,
                height: 40,
                width: 35,
                padding: 5,
              }}
            />
          </View>

          <TouchableHighlight
            disabled={isLoading}
            underlayColor="#1173d4"
            style={styles.darkBtn}
            onPress={() => {
              if (isLoading === true) {
                setIsLoading(false);
              } else {
                setIsLoading(true);
                if (validate_un(unem) || validate_em(unem)) {
                  // valid username or email
                  fetch_login(unem, pw);
                } else {
                  // invalid username or email
                  Alert.alert(
                    'Invalid format',
                    'Please provide a valid username or email format.\n\nOnly use lowercase latin letters, numbers, underscores or periods in your username or email.'
                  );
                  setIsLoading(false);
                }
              }
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.darkBtnText}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  'Login'
                )}
              </Text>
            </View>
          </TouchableHighlight>

          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#505050' }} />
            <View>
              <Text style={{ width: 50, textAlign: 'center', color: colors.white_prim_dark }}>OR</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: '#505050' }} />
          </View>

          <TouchableHighlight
            disabled={isLoading}
            underlayColor="#f0f0f0"
            onPress={() => navigation.navigate('Register')}
            style={styles.lightBtn}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.lightBtnText}>Register</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.link} onPress={retrieveTokens}>
            Forgot password (Get token)
          </Text>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
}
