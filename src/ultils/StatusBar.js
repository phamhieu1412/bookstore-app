import { Platform, StatusBar } from 'react-native';

export const setBarStyle = (barStyle = 'dark-content') => {
  StatusBar.setBarStyle(barStyle);
};

export const setTranslucent = (value = true) => {
  if (Platform.OS === 'android') StatusBar.setTranslucent(value);
};

export const setBackgroundColor = (background = '#ffffff') => {
  if (Platform.OS === 'android') StatusBar.setBackgroundColor(background, false);
};
