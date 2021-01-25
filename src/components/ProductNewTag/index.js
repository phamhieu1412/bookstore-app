import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Languages from '../../common/Languages';

class ProductNewTag extends Component {
  render() {
    const { product, style, textStyle } = this.props;
    const isNew = product && product.isNew;

    return isNew ? (
      <View style={[styles.buttonStyle, style && style]}>
        <Text style={[styles.labelText, textStyle && textStyle]}>{Languages.NEW}</Text>
      </View>
    ) : null;
  }
}

export default ProductNewTag;

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    right: 8,
    top: 9,
    width: 30,
    height: 30,
    backgroundColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 100,
  },
  labelText: {
    fontSize: 11,
    color: Color.white,
    fontWeight: '600',
    transform: [{ rotate: '-20deg' }],
  },
});