import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Color from '../../common/Color';
import { Icon } from '../../Omni';

const Checkbox = props => {
  const status = props.status || false;
  let icon = props.icon;
  let color = Color.primary;
  if (!icon) {
    switch (status) {
      case false:
      case 'none':
        icon = 'checkbox-blank-outline';
        color = Color.blackTextSecondary;
        break;
      case 'some':
        icon = 'checkbox-intermediate';
        break;
      case true:
      case 'all':
        icon = 'checkbox-marked-outline';
        break;
    }
  }
  if (props.disabled) {
    color = Color.Text;
  }

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={() => props.onPress()}
      style={[styles.checkbox, props.style && props.style]}
      hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      activeOpacity={0.9}>
      <View style={[styles.checkboxView, props.checkboxView && props.checkboxView]}>
        <Icon
          name={icon}
          style={[styles.checkboxIcon, { color }, props.iconStyle && props.iconStyle]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  checkboxView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxIcon: {
    color: Color.blackTextSecondary,
    fontSize: 22,
    marginHorizontal: 4,
  },
});