import React from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import colors from '../styles/colors';

const KeyboardAvoidingWrapper = ({ children }) => {
	return (
		<KeyboardAvoidingView style={{ backgroundColor: colors.dark }}>
			<ScrollView>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default KeyboardAvoidingWrapper;