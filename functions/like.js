import React from 'react';
import { Alert, AsyncStorage, Platform, ToastAndroid } from 'react-native';
import res from './response';

export default like_or_unlike = async (mode, pid) => {
  try {
    if (mode == 1) {
      AsyncStorage.getItem('token').then((value) =>
        value === null ? null : request_like_to_server(pid, value)
      );
    } else {
      AsyncStorage.getItem('token').then((value) =>
        value === null ? null : request_unlike_to_server(pid, value)
      );
    }
  } catch (error) {
    Platform.OS === 'android' ? ToastAndroid.show('Error connecting to server', ToastAndroid.SHORT) : null;
  }
};

const request_like_to_server = (pid, tkn) => {
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  var data = {
    'f-lk': '2',
    'pid': pid,
    'tkn': JSON.parse(tkn),
  };
  fetch('https://cdn.hackershaven.eu:443/api/v1/activity', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((json) => {
      const decoded = JSON.parse(json);
      const status = decoded['status'];

      if (status == '500') {
        throw new Error(res.msg_500);
      } else {
        // success
      }
    })
    .catch((error) => {
      Platform.OS === 'android' ? ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT) : null;
    });
};

const request_unlike_to_server = (pid, tkn) => {
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  var data = {
    'f-ulk': '3',
    'pid': pid,
    'tkn': JSON.parse(tkn),
  };
  fetch('https://cdn.hackershaven.eu:443/api/v1/activity', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((json) => {
      const decoded = JSON.parse(json);
      const status = decoded['status'];

      if (status == '500') {
        throw new Error(res.msg_500);
      } else {
        // success
      }
    })
    .catch((error) => {
      Platform.OS === 'android' ? ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT) : null;
    });
};
