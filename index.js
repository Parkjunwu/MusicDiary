/**
 * @format
 */

import { AppRegistry, Text, TextInput } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import TrackPlayer from 'react-native-track-player';

// https://kosick.tistory.com/3
// 폰트 크기 이상하면 변경. 시스템 폰트 설정 따라가는게 기본이라 함.
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.autoCorrect = false;
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);

// React Native Track Player
// TrackPlayer.registerPlaybackService(() => require('./service'));
