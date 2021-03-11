import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export const setBarStyle = (barStyle = 'dark-content') => {
  StatusBar.setBarStyle(barStyle);
};

export const setTranslucent = (value = true) => {
  if (Platform.OS === 'android') StatusBar.setTranslucent(value);
};

export const setBackgroundColor = (background = '#ffffff') => {
  if (Platform.OS === 'android') StatusBar.setBackgroundColor(background, false);
};

export const FocusAwareStatusBar = (props) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}