import React, { useState, useCallback, useEffect } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Platform,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import Axios from 'axios';
import Constants from 'expo-constants';
import { FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import Montserrat from '../../assets/fonts/Montserrat-Black.ttf';
import Loading from '../../components/LoadingScreen';

import HomeHeaderBar from '../../components/HeaderBar';
import WavyHeader from '../../components/WavyHeader';
import styles from '../../styles/styles';
import colors from '../../styles/colors';
import { ImagePost, LoadingLayout } from '../../functions/MakePost';

export default function Home(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [postsAreLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loaded] = useFonts({
    Montserrat,
  });
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const getFeed = (value) => {
    const data = JSON.stringify({
      'f-ed': '5',
      ofs: 0,
      tkn: JSON.parse(value),
    });
    Axios.post('https://cdn.hackershaven.eu:443/api/v1/feed', data, {
      headers: headers,
    }).then((res) => {
      if (res.data.status == '200') {
        setPosts(res.data.posts);
      } else if (res.data.status == '403') {
        ToastAndroid.show('Error during request', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Internal server error', ToastAndroid.SHORT);
      }
      setLoading(false);
    });
  };
  const getFeedRefresh = (value) => {
    setRefreshing(true);
    const data = JSON.stringify({
      'f-ed': '5',
      ofs: 0,
      tkn: JSON.parse(value),
    });
    Axios.post('https://cdn.hackershaven.eu:443/api/v1/feed', data, {
      headers: headers,
    }).then((res) => {
      if (res.data.status == '200') {
        setPosts(res.data.posts);
      } else if (res.data.status == '403') {
        ToastAndroid.show('Error during request', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Internal server error', ToastAndroid.SHORT);
      }
      setLoading(false);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    AsyncStorage.getItem('token').then((value) =>
      value === null
        ? Platform.OS === 'android'
          ? ToastAndroid.show('Error retrieving token', ToastAndroid.SHORT)
          : null
        : getFeed(value)
    );
  }, []);
  const onRefresh = useCallback(() => {
    setPosts([]);
    AsyncStorage.getItem('token').then((value) =>
      value === null
        ? Platform.OS === 'android'
          ? ToastAndroid.show('Error retrieving token', ToastAndroid.SHORT)
          : null
        : getFeedRefresh(value)
    );
  }, []);

  if (!loaded) {
    return <Loading />;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight,
        backgroundColor: colors.dark,
      }}>
      <HomeHeaderBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>

        {postsAreLoading != true ? (
          posts.map((post) => (
            <ImagePost
              id={post.id}
              username={post.user.username.toString()}
              ppic={post.user.ppic.toString()}
              verified={post.user.is_verified}
              image={post.image.toString()}
              liked={post.liked}
              likes={post.likes}
              caption={post.caption.toString()}
              time={post.timestamp.toString()}
            />
          ))
        ) : (
          <LoadingLayout />
        )}

      </ScrollView>
      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: colors.blue_dark }}
        small={false}
        icon={({ size, color }) => (
          <Ionicons name="add-circle" size={size} color={color} />
        )}
        label={"Post"}
        color={"#fff"}
        onPress={() => props.nav.navigate('PostScreen')}
      />
    </View>
  );
}