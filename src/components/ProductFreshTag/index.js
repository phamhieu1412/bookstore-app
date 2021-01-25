import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Icon } from '../../Omni';
import Color from '../../common/Color';
import Languages from '../../common/Languages';

class ProductNewTag extends Component {
  render() {
    const { product, deliveryText, style, textStyle, iconStyle } = this.props;
    const productType = product ? product.type || product.productType || '' : '';
    const isFresh = productType.toLowerCase() === 'fresh';

    return isFresh ? (
      <View style={[styles.container, style && style]}>
        <Icon
          name="clock-outline"
          style={[styles.icon, deliveryText && { marginRight: 4 }, iconStyle && iconStyle]}
        />
        {deliveryText ? (
          <Text style={[styles.labelText, textStyle && textStyle]}>
            {Languages.DelayDeliveryTime}
          </Text>
        ) : null}
      </View>
    ) : null;
  }
}

export default ProductNewTag;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 8,
    left: 7,
    paddingVertical: 2,
    paddingHorizontal: 3,
    backgroundColor: '#FB931B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center',
    borderRadius: 30,
  },
  icon: {
    color: Color.white,
    fontSize: 13,
  },
  labelText: {
    fontSize: 14,
    color: Color.white,
    fontWeight: '600',
  },
});