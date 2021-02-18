import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { currencyFormatter, getProductPrice, checkGiftProduct } from '../../ultils/Product';
import styles from './styles';
import Constants from '../../common/Constants';
import Languages from '../../common/Languages';
import Color from '../../common/Color';

class ProductPrice extends PureComponent {
  static propTypes = {
    product: PropTypes.object,
    priceObject: PropTypes.object,
    // showDiscount: PropTypes.bool,
    style: PropTypes.any,
  };

  render() {
    const { product, priceObject, style, fontStyle } = this.props;
    if (product && product.outOfStock) {
      return (
        <View style={[styles.priceWrapper, style && style]}>
          <Text style={[styles.price, { color: Color.checkout.discount }, fontStyle && fontStyle]}>
            {Languages.OutOfStock}
          </Text>
        </View>
      );
    }

    const priceObj = priceObject || getProductPrice(product);
    const isGiftProduct = checkGiftProduct(product);
    const newPrice = priceObj.newPrice;
    // const newPrice = isGiftProduct ? 0 : priceObj.newPrice;
    const onSale = priceObj.onSale;
    return (
      <View style={[styles.priceWrapper, style && style]}>
        <Text style={[styles.price, fontStyle && fontStyle]}>
          {`${newPrice >= 0 ? currencyFormatter(newPrice) : Languages.OutOfStock}`}
        </Text>
        {newPrice >= 0 ? <Text style={styles.priceSymbol}>{Constants.VND}</Text> : <View />}
        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
          <Text style={{ textDecorationLine: 'line-through', fontSize: 13 }}>{currencyFormatter(newPrice - product.discount)}</Text>
          <Text style={{ textDecorationLine: 'line-through', fontSize: 13 }}>{Constants.VND}</Text>
        </View>
        {/* {onSale && (
          <Text style={[styles.salePrice]}>
            {onSale ? currencyFormatter(priceObj.oldPrice, true) : ''}
          </Text>
        )} */}
      </View>
    );
  }
}

export default ProductPrice;
