import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

import like_or_unlike from './like';
import colors from '../styles/colors';

const { width, height } = Dimensions.get('window');

function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle];
}

const ReadMore = ({ text, length = 100 }) => {
  const [showLess, setShowLess] = useState(true);
  if (text.length < length) {
    return text;
  } else {
    return (
      <Text>
        {showLess ? `${text.slice(0, length)}...` : text}
        <Text
          style={{ color: colors.white_sec_dark, fontWeight: 'bold' }}
          onPress={() => setShowLess(!showLess)}>
          {' '}
          Read {showLess ? 'more' : 'less'}
        </Text>
      </Text>
    );
  }
};

function get_post_time(postTimestamp, shorten) {
  var curTimestamp = new Date().getTime();
  var resolution;
  resolution = curTimestamp - postTimestamp;

  var s = resolution / 1000;
  var m = resolution / 1000 / 60;
  var h = resolution / 1000 / 60 / 60;
  var d = resolution / 1000 / 60 / 60 / 24;
  var w = resolution / 1000 / 60 / 60 / 24 / 7;

  var week = Math.round(w).toString().split('.');
  var day = Math.round(d).toString().split('.');
  var hr = Math.round(h).toString().split('.');
  var min = Math.round(m).toString().split('.');
  var sec = Math.round(s).toString().split('.');

  if (w < 0.999 && d < 0.999 && h < 0.999 && m < 0.999 && s < 60) {
    return shorten ? `${sec}s` : `${sec} SECOND(S) AGO`;
  } else if (w < 0.999 && d < 0.999 && h < 0.999 && m < 60) {
    return shorten ? `${min}m` : `${min} MINUTE(S) AGO`;
  } else if (w < 0.999 && d < 0.999 && h < 24) {
    return shorten ? `${hr}h` : `${hr} HOUR(S) AGO`;
  } else if (w < 0.999 && d < 7) {
    return shorten ? `${day}d` : `${day} DAY(S) AGO`;
  } else {
    return shorten ? `${week}w` : `${week} WEEK(S) AGO`;
  }
}

const gray = '#e3e2e3';
export function LoadingLayout() {
  return (
    <Placeholder Animation={Fade}>
      <View>
        <View style={post_styles.infoContainer}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={post_styles.profileImage}>
              <PlaceholderMedia style={post_styles.img} />
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <PlaceholderLine width={35} style={{ marginLeft: 10 }} />
              <PlaceholderLine width={18} style={{ marginLeft: 10 }} />
            </View>
          </View>
          <Ionicons name="ellipsis-horizontal" size={28} color={colors.white_sec_dark} />
        </View>
        <PlaceholderMedia style={post_styles.defImage} />
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 8,
          }}>
          <TouchableOpacity style={{ paddingLeft: 8 }}>
            <Ionicons name="heart-outline" size={32} color={colors.white_sec_dark} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={{ paddingHorizontal: 16 }}>
            <Ionicons name="chatbubble-outline" size={28} color={colors.white_sec_dark} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}>
            <Ionicons name="share-social-outline" size={32} color={colors.white_sec_dark} />
          </TouchableOpacity>
        </View>
        <View style={[post_styles.infoComment, { paddingTop: 12 }]}>
          <View style={{ flexDirection: 'row' }}>
            <PlaceholderLine width={10} style={{ marginLeft: 5 }} />
            <PlaceholderLine width={60} style={{ marginLeft: 5 }} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <PlaceholderLine width={15} style={{ marginLeft: 5 }} />
            <PlaceholderLine width={15} style={{ marginLeft: 5 }} />
            <PlaceholderLine width={20} style={{ marginLeft: 5 }} />
          </View>
        </View>
      </View>
    </Placeholder>
  );
}

export function ImagePost(props) {
  const springVal = new Animated.Value(0.8);
  const [imageStyle, setImageStyle] = useToggle(false);
  const [like, setLike] = useToggle(props.liked);
  const [likeNum, setLikeNum] = useState(props.likes);
  var time = get_post_time(props.time, true);
  const LikeUnlike = (id) => {
    if (!like) {
      setLike(true);
      setLikeNum(likeNum + 1);
      like_or_unlike(1, id);
    } else {
      setLike(false);
      setLikeNum(likeNum - 1);
      like_or_unlike(2, id);
    }
  };
  useEffect(() => {
    spring();
  }, [springVal]);
  const spring = () => {
    Animated.spring(
      springVal,
      {
        toValue: 1,
        friction: 1,
        useNativeDriver: false
      }
    ).start()
  }
  return (
    <Animated.View key={props.id} style={{ transform: [{scale: springVal}] }}>
      <View style={post_styles.infoContainer}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <TouchableOpacity style={post_styles.profileImage}>
            <Image style={post_styles.img} source={{ uri: props.ppic }} />
          </TouchableOpacity>
          <Text style={[post_styles.infoText, { fontSize: 15 }]}>
            {props.username}{' '}
            {props.verified != false ? ( <Ionicons name="checkmark-circle" size={16} color="#2f93f5" /> ) : ('')}
            <Text style={{ color: colors.white_prim_dark, fontSize: 13, fontWeight: 'normal' }}>
              {'\u2022'} {time} {'\u2022'} {likeNum} <Ionicons name="heart" size={12} color={colors.white_sec_dark} />
            </Text>
            {props.verified != false ? (
              <Text style={{ fontSize: 12, fontWeight: 'normal' }}>
                {'\n'}Influencer
              </Text>
            ) : null}
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={28} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={[post_styles.bubble, { flex: 1 }]}>
        <Text style={post_styles.text_post}>
          <ReadMore text={props.caption} length={250} />
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row-reverse',
          paddingBottom: 8,
        }}>
        <TouchableOpacity style={{ paddingHorizontal: 8 }}>
          <Ionicons name="chatbox" size={24} color={colors.white_prim_dark} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => LikeUnlike(props.id)}>
          {like ? (
            <Ionicons name="heart" size={24} color={'crimson'} />
          ) : (
            <Ionicons name="heart" size={24} color={colors.white_prim_dark} />
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const post_styles = StyleSheet.create({
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 12,
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    flex: 1,
    borderRadius: 10,
  },
  defImage: {
    width,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  newImage: {
    width,
    height: width * 0.8,
  },
  text_post: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    color: 'white',
  },
  bubble: {
    marginHorizontal: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#1084ff'
  },
  infoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#242424',
    flex: 1,
    alignItems: 'center',
  },
  infoText: {
    paddingLeft: 10,
    fontWeight: 'bold',
    color: colors.white_prim_dark
  },
  infoComment: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  infoTime: {
    marginTop: 5,
    color: '#a8a8a8',
    fontSize: 11,
  },
});
