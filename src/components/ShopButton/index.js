'use strict';
import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './styles';
import Button from '../../components/Button/Button';
import Languages from '../../common/Languages';

export default class ShopButton extends Component {
  render() {
    return (
      <View style={[styles.buttonContainer, this.props.style && this.props.style]}>
        <Button
          text={this.props.text ? this.props.text : Languages.ShopNow}
          style={[styles.button, this.props.disabled && styles.buttonDisabled, this.props.css]}
          textStyle={styles.buttonText}
          onPress={this.props.onPress}
          disabled={this.props.disabled}
        />
      </View>
    );
  }
}
