import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../../common/Color';

class ProductMeta extends Component {
  render() {
    const { product, style, textStyle } = this.props;
    const discountText =
      product && product.price && product.price.discountText ? product.price.discountText : '';
    if (!discountText) {
      return <View />;
    }

    return (
      <View style={[styles.buttonStyle, style && style]}>
        <Text style={[styles.discountText, textStyle && textStyle]}>{discountText}</Text>
      </View>
    );
  }
}

export default ProductMeta;

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    right: 8,
    bottom: 10,
    minWidth: 35,
    backgroundColor: Color.primary,
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