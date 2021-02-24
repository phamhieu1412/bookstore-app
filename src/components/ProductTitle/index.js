import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';

import { Icon } from '../../Omni';
import Color from '../../common/Color';
import Constants from '../../common/Constants';

class ProductTitle extends PureComponent {
  render() {
    const { product, style, numberOfLines } = this.props;
    return product.productTitle ? (
      <Text style={[styles.productName, style && style]} numberOfLines={numberOfLines || 3}>
        <Icon name="flash" size={18} color="#FF0025"></Icon>
        {product.productTitle}
      </Text>
    ) : (
        <Text style={[styles.productName, style && style]} numberOfLines={numberOfLines || 3}>
          {product.title}
        </Text>
      );
  }
}

export default ProductTitle;

const styles = StyleSheet.create({
  productName: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 21,
    color: Color.productTitle,
    marginBottom: 3,
    fontFamily: Constants.fontHeader,
  },
});