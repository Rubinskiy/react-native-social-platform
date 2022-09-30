import React, { useState, createRef } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button,
  Alert,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';

import { useFonts } from 'expo-font';
import ThisJuly from '../assets/fonts/ThisJuly-2oZ8.ttf';
import Loading from '../components/LoadingScreen';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import styles from '../styles/styles';
import colors from '../styles/colors';
import res from '../functions/response';

// Terms and policies linking
const terms_url = '';
const policy_url = '';

export default function Register({ navigation }) {
  const [loaded] = useFonts({
    ThisJuly,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [ageSelection, setAgeSelection] = useState(false);
  const [termsSelection, setTermsSelection] = useState(false);

  const [fn, setFn] = useState('');
  const [em, setEm] = useState('');
  const [un, setUn] = useState('');
  const [pw, setPw] = useState('');

  const emField = createRef();
  const unField = createRef();
  const pwField = createRef();

  const [hidePass, setHidePass] = useState(true);

  // Regex patterns for textinputs
  const [fnValid, setFnValid] = useState(null);
  const validate_fn = (fn) => {
    const f_pattern = /^([A-Za-z ,.-]+$)/;
    if (fn.length >= 3 && fn.length <= 48) {
      if (f_pattern.test(fn)) {
        setFnValid(true);
        return true;
      } else {
        setFnValid(false);
        return false;
      }
    } else {
      setFnValid(false);
      return false;
    }
  };
  const [emValid, setEmValid] = useState(null);
  const validate_em = (em) => {
    const e_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (em.length >= 5 && em.length <= 30) {
      if (e_pattern.test(em)) {
        setEmValid(true);
        return true;
      } else {
        setEmValid(false);
        return false;
      }
    } else {
      setEmValid(false);
      return false;
    }
  };
  const [unValid, setUnValid] = useState(null);
  const validate_un = (un) => {
    const u_pattern = /^[a-z0-9_](?!.*?\.{2})[a-z0-9_.]{1,22}[a-z0-9_]$/;
    if (un.length >= 3 && un.length <= 24) {
      if (u_pattern.test(un)) {
        setUnValid(true);
        return true;
      } else {
        setUnValid(false);
        return false;
      }
    } else {
      setUnValid(false);
      return false;
    }
  };

  // Register function
  const fetch_register = (fn, em, un, pw) => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var data = {
      'frmdet-reg': '1',
      fn: fn,
      em: em,
      un: un,
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
          Alert.alert(res.reg_head_403, res.reg_msg_403);
        } else if (status == '500') {
          throw new Error(res.reg_msg_500);
        } else if (status == '200') {
          Alert.alert(
            'Account created!',
            'Welcome to Growstagram, ' + un + '! Please proceed to logging in.'
          );
          navigation.navigate('Login');
        } else if (status == '100') {
          Alert.alert(res.head_100, res.msg_100);
        } else if (status == '101') {
          Alert.alert(res.head_101, res.msg_101);
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              keyboardAppearance="dark"
              placeholder="Full name"
              placeholderTextColor="#717171"
              value={fn}
              returnKeyType="next"
              autocorrect={false}
              maxLength={48}
              onChangeText={(fn) => {
                setFn(fn);
                validate_fn(fn);
              }}
              onSubmitEditing={() => emField.current && emField.current.focus()}
            />
            <Ionicons
              name={
                fnValid ? 'checkmark-circle-outline' : 'alert-circle-outline'
              }
              color={fnValid ? '#00ff00' : '#ff0000'}
              size={20}
              style={{
                position: 'absolute',
                right: 3,
                height: 40,
                width: 35,
                padding: 5,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              keyboardAppearance="dark"
              placeholder="Email address"
              placeholderTextColor="#717171"
              ref={emField}
              value={em}
              returnKeyType="next"
              keyboardType="email-address"
              autocorrect={false}
              maxLength={30}
              autoCapitalize="none"
              onChangeText={(em) => {
                setEm(em);
                validate_em(em);
              }}
              onSubmitEditing={() => unField.current && unField.current.focus()}
            />
            <Ionicons
              name={
                emValid ? 'checkmark-circle-outline' : 'alert-circle-outline'
              }
              color={emValid ? '#00ff00' : '#ff0000'}
              size={20}
              style={{
                position: 'absolute',
                right: 3,
                height: 40,
                width: 35,
                padding: 5,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              keyboardAppearance="dark"
              placeholder="Username"
              placeholderTextColor="#717171"
              ref={unField}
              value={un}
              returnKeyType="next"
              autocorrect={false}
              maxLength={24}
              autoCapitalize="none"
              onChangeText={(un) => {
                setUn(un);
                validate_un(un);
              }}
              onSubmitEditing={() => pwField.current && pwField.current.focus()}
            />
            <Ionicons
              name={
                unValid ? 'checkmark-circle-outline' : 'alert-circle-outline'
              }
              color={unValid ? '#00ff00' : '#ff0000'}
              size={20}
              style={{
                position: 'absolute',
                right: 3,
                height: 40,
                width: 35,
                padding: 5,
              }}
            />
          </View>

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
              ref={pwField}
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

          <View style={styles.checkContainer}>
            <CheckBox
              value={ageSelection}
              onValueChange={setAgeSelection}
              style={{ alignSelf: 'center' }}
              tintColors={{ true: '#2f93f5', false: colors.white_prim_dark }}
            />
            <Text style={styles.checkLabel}>
              I confirm that I am above 13 years of age.
            </Text>
          </View>
          <View style={styles.checkContainer}>
            <CheckBox
              value={termsSelection}
              onValueChange={setTermsSelection}
              style={{ alignSelf: 'center' }}
              tintColors={{ true: '#2f93f5', false: colors.white_prim_dark }}
            />
            <Text style={styles.checkLabel}>
              I have read and agreed to the Growstagram's
              <Text
                style={{ color: '#2f93f5' }}
                onPress={() => Linking.openURL(terms_url)}>
                {' '}
                Terms of use
              </Text>{' '}
              and
              <Text
                style={{ color: '#2f93f5' }}
                onPress={() => Linking.openURL(policy_url)}>
                {' '}
                Privacy policy
              </Text>
              .{'\n'}
            </Text>
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
                if (validate_fn(fn) == true) {
                  // valid fullname
                  if (validate_em(em) == true) {
                    // valid email
                    if (validate_un(un) == true) {
                      // valid username
                      if (pw.length >= 6 && pw.length <= 30) {
                        // valid password
                        if (ageSelection == true) {
                          // age checked
                          if (termsSelection == true) {
                            // terms checked
                            fetch_register(fn, em, un, pw);
                          } else {
                            Alert.alert(
                              'Failed',
                              'You must read and agree the Terms and policies in order to proceed.'
                            );
                            setIsLoading(false);
                          }
                        } else {
                          Alert.alert(
                            'Underage',
                            'You have to be above 13 years of age to use Growstagram.'
                          );
                          setIsLoading(false);
                        }
                      } else {
                        Alert.alert(
                          'Weak password',
                          'Have between 6 and 30 characters in your password.'
                        );
                        setIsLoading(false);
                      }
                    } else {
                      Alert.alert(
                        'Invalid Username format',
                        'Only use lowercase latin letters, numbers, underscores or periods as well as no spaces. Have between 3 and 24 characters in your Username.'
                      );
                      setIsLoading(false);
                    }
                  } else {
                    Alert.alert(
                      'Invalid Email format',
                      "Either that Email is too long, or it doesn't seem valid.\n\nIf the problem presists, try using another one."
                    );
                    setIsLoading(false);
                  }
                } else {
                  Alert.alert(
                    'Invalid Name format',
                    "Don't include symbols and have between 3 and 26 latin letters in your name."
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
                  'Register'
                )}
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}>
            Have an account? <Text style={{ color: '#2f93f5' }}>Log in</Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
}
