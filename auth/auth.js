import React from 'react';
import { Alert, AsyncStorage } from 'react-native';

const acc = 'token';
const exp = 'acc_exp';
const un = 'uname';
const storeTokens = async (acc_token, acc_exp, uname) => {
  try {
    await AsyncStorage.setItem(acc, acc_token);
    await AsyncStorage.setItem(exp, acc_exp);
    await AsyncStorage.setItem(un, uname);
  } catch (error) {
    Alert.alert('Error', 'An error occurred while saving your login tokens.');
  }
};
const retrieveTokens = async () => {
  try {
    const acc_value = await AsyncStorage.getItem(acc);
    const exp_value = await AsyncStorage.getItem(exp);
    const un_value = await AsyncStorage.getItem(un);

    alert(acc_value + '\n\n' + exp_value + '\n\n' + un_value);
  } catch (error) {
    Alert.alert(
      'Error',
      'An error occurred while retrieving your login tokens.'
    );
  }
};

export { storeTokens, retrieveTokens };