import React, { useState, useCallback, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import Montserrat from '../assets/fonts/Montserrat-Black.ttf';
import Loading from '../components/LoadingScreen';

import styles from '../styles/styles';