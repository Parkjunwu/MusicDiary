
// 안씀. 문제 없으면 삭제

import { DefaultTheme } from 'styled-components/native';
import { colors } from '../js-assets/color';
// import { Appearance } from 'react-native';

export const lightMode: DefaultTheme = {
  backgroundColor: 'white',
  textColor: 'black',
  textInputBackgroundColor: 'rgba(0,0,0,0.08)',
  // textInputBackgroundColor: colors.beige,
  linkTextColor: colors.darkYellow,
};

export const darkMode: DefaultTheme = {
  backgroundColor: 'black',
  textColor: 'white',
  textInputBackgroundColor: 'rgba(255,255,255,0.4)',
  linkTextColor: colors.yellow,
};

// 얘는 다크모드 / 라이트모드 라서 순서가 헷갈림
// export const isDarkModeFn = () => Appearance.getColorScheme() === "dark";
// 얘는 라이트모드 라고 하니까 뭔지 감이 잘 안옴. 다크모드는 뭔지 직관적으로 느낌이 오지만.
// export const isLightModeFn = () => Appearance.getColorScheme() === "light";