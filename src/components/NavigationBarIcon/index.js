import React, { PureComponent } from 'react';
import { Text, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from '../../Omni';
import Color from '../../common/Color';
import Styles from '../../common/Styles';

class NavigationBarIcon extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      number: props.number,
      numberAnimation: this.numberAnimation,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.number !== 'undefined' && prevState.number !== nextProps.number) {
      prevState.numberAnimation();
      return { number: nextProps.number };
    }

    return null;
  }

  numberAnimation = () => {
    if (this.refs.menu) {
      this.refs.menu.fadeInDown(600);
    }
  };

  render() {
    const { onPress, number, icon, color, numberColor, size, css } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={[styles.iconWrap, css]}>
        <Icon
          name={icon}
          style={[
            styles.icon,
            {
              fontSize: size || Styles.IconSize.ToolBar,
              color: color || Color.black,
              fontWeight: 'bold',
              // width: size || Styles.IconSize.ToolBar,
              // height: size || Styles.IconSize.ToolBar,
            },
          ]}
        />
        {!number ? null : (
          <Animatable.View
            ref="menu"
            style={[styles.numberWrap, numberColor && { backgroundColor: numberColor }]}>
            <Text
              style={[
                styles.number,
                numberColor && numberColor === Color.white
                  ? { color: Color.Text, fontWeight: 'bold' }
                  : {},
              ]}>
              {number}
            </Text>
          </Animatable.View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  iconWrap: {
    ...Styles.Common.ColumnCenter,
    width: 40, // Styles.headerHeight,
    height: Styles.headerHeight,
    marginHorizontal: Platform.OS === 'ios' ? 5 : 0,
  },
  numberWrap: {
    ...Styles.Common.ColumnCenter,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 3 : 10,
    right: Platform.OS === 'ios' ? 3 : 3,
    height: 18,
    minWidth: 18,
    backgroundColor: Color.primary,
    borderRadius: 9,
  },
  number: {
    color: 'white',
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3,
  },
  icon: {
    opacity: 1,
  },
});

NavigationBarIcon.defaultProps = {
  number: 0,
};

export default NavigationBarIcon;
