import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { UboIcon } from '../../Omni';
import {
  // currencyFormatter,
  getProductImageSource,
  getProductCartPrice,
  // checkGiftProduct,
} from '../../ultils/Product';
import styles from './styles';
import ChangeQuantity from '../ChangeQuantity';
import ProductPrice from '../ProductPrice';
import ProductTitle from '../ProductTitle';
import ProductGiftTag from '../ProductGiftTag';
import ProductFreshTag from '../ProductFreshTag';

class ProductCartItem extends PureComponent {
  onChangeQuantity = quantity => {
    if (quantity > 0) {
      this.props.updateCartItem(this.props.product, quantity);
    } else {
      this.props.removeCartItem(this.props.product);
    }
  };

  render() {
    const {
      product,
      quantity,
      trashIcon,
      onPressRemove,
      viewQuantity,
      viewAddToCart,
      onPress,
      addToCart,
      isBuyOne,
    } = this.props;

    const priceObj = getProductCartPrice(product);
    const isGiftProduct = product.isGiftProduct;
    if (isGiftProduct) priceObj.newPrice = 0;
    // const productPriceSale = priceObj.onSale ? `${currencyFormatter(priceObj.oldPrice)} ` : null;
    return (
      <View style={[styles.container]}>
        <View style={styles.content}>
          {product.mobiImage ? (
            <TouchableOpacity
              style={{ justifyContent: 'center' }}
              onPress={() => onPress({ product })}
              activeOpacity={0.8}>
              <Image source={getProductImageSource(product.mobiImage)} style={styles.image} />
              <ProductFreshTag
                product={product}
                style={{
                  paddingVertical: 2,
                  paddingHorizontal: 3,
                }}
                iconStyle={{
                  fontSize: 11,
                }}
              />
            </TouchableOpacity>
          ) : null}

          <View style={[styles.infoView, { width: Dimensions.get('window').width - 180 }]}>
            <TouchableOpacity onPress={() => onPress({ product })} activeOpacity={0.8}>
              {<ProductTitle product={product} numberOfLines={1} style={styles.title} />}
              <Text style={[styles.unit]}>{product.productUnit || product.price.unit}</Text>
            </TouchableOpacity>

            {isGiftProduct ? (
              <ProductGiftTag
                style={{
                  position: 'relative',
                  alignSelf: 'flex-start',
                  marginTop: 10,
                  bottom: 'auto',
                  right: 'auto',
                }}
              />
            ) : (
              <ProductPrice
                priceObject={priceObj}
                style={{ marginTop: 10 }}
                fontStyle={{ fontSize: 14, fontWeight: '600' }}
              />
            )}
          </View>
          {trashIcon && onPressRemove && !isGiftProduct ? (
            <TouchableOpacity
              style={[styles.btnTrash, isBuyOne || !viewQuantity ? { right: 0 } : null]}
              onPress={() => onPressRemove(product)}
              activeOpacity={0.8}>
              <UboIcon name="trash" size={24} style={styles.trashIcon} />
            </TouchableOpacity>
          ) : null}
          {viewQuantity && !isBuyOne && !isGiftProduct ? (
            <ChangeQuantity
              style={styles.quantity}
              quantity={quantity}
              onChangeQuantity={this.onChangeQuantity}
            />
          ) : null}
          {viewAddToCart ? (
            <View style={styles.addToCart}>
              <View style={styles.seperator} />
              <TouchableOpacity
                onPress={() => addToCart()}
                style={styles.addToCartButton}
                activeOpacity={0.9}>
                <UboIcon name="plus" size={24} style={[styles.addToCartIcon]} />
                <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        {/* {viewQuantity && (
          <TouchableOpacity style={styles.btnTrash} onPress={() => onPressRemove(product)}>
            <Image source={require('@images/ic_trash.png')} style={[styles.icon]} />
          </TouchableOpacity>
        )} */}
      </View>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    buyOne: products.buyOne,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { buyOne } = stateProps;
  const { dispatch } = dispatchProps;
  const { product } = ownProps;
  const { actions } = require('@redux/CartRedux');
  return {
    ...ownProps,
    ...stateProps,
    isBuyOne: product.productCode && buyOne.includes(product.productCode),
    updateCartItem: (product, quantity) => {
      actions.updateCartItem(dispatch, product, quantity);
    },
    removeCartItem: product => {
      actions.removeCartItem(dispatch, product);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(ProductCartItem);
