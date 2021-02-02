import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
// import { Constants, warn, Color, Styles, Device } from '@common';
// import { SafeAreaView } from 'react-navigation';

/**
|--------------------------------------------------
| Fixed safe area view on IphoneX, so just fix bottom screen
|--------------------------------------------------
*/
export default class SafeArea extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    barColor: PropTypes.string.isRequired,
    isSafeArea: PropTypes.bool.isRequired,
    isSafeAreaBottom: PropTypes.bool.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    backgroundColor: 'transparent',
    barColor: 'dark-content',
    isSafeArea: true,
    isSafeAreaBottom: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      barColor: props.backgroundColor !== 'transparent' ? 'light-content' : 'dark-content',
    };
  }

  render() {
    const { isSafeArea, children } = this.props;

    if (!isSafeArea) return children;

    return (
      <View style={{ flex: 1 }}>
        {children}
      </View>
    );
  }
}
