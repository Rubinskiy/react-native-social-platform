import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function WavyHeader({ customStyles }) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: '#2f93f5', height: 160 }}>
        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top: 130 }}
        >
          <Path
            fill="#2f93f5"
            d="M0,192L360,128L720,224L1080,64L1440,288L1440,0L1080,0L720,0L360,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
}