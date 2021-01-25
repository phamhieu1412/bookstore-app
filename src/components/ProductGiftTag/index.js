import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Languages from '../../common/Languages';

class ProductGiftTag extends Component {
  render() {
    const { style, textStyle } = this.props;

    return (
      <View style={[styles.buttonStyle, style && style]}>
        <Text style={[styles.discountText, textStyle && textStyle]}>
          {Languages.GiftProduct.toUpperCase()}
        </Text>
      </View>
    );
  }
}

export default ProductGiftTag;

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    right: 8,
    bottom: 10,
    minWidth: 35,
    backgroundColor: '#4ee474',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 3,
  },
  discountText: {
    fontSize: 11,
    color: Color.white,
    // fontWeight: '600',
  },
});