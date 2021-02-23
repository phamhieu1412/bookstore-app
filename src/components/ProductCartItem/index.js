import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { IconIO } from '../../Omni';
import Constants from '../../common/Constants';
import {
  currencyFormatter,
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
    const { carts, product, updateCart, removeCartItem } = this.props;
    if (quantity > 0) {
      updateCart(
        product.id,
        {
          product_id: product.productId,
          quantity,
        },
      );
    } else {
      removeCartItem(product.id);
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
    const priceObj = {
      newPrice: product.productPrice - product.productDiscount,
      oldPrice: product.productPrice ? Math.floor(product.productPrice / 100) * 100 : 0,
    };
    const isGiftProduct = product.isGiftProduct;
    if (isGiftProduct) priceObj.newPrice = 0;
    // const productPriceSale = priceObj.onSale ? `${currencyFormatter(priceObj.oldPrice)} ` : null;
    return (
      <View style={[styles.container]}>
        <View style={styles.content}>
          {product.thumbnailUrl ? (
            <TouchableOpacity
              style={{ justifyContent: 'center' }}
              onPress={() => onPress({ product })}
              activeOpacity={0.8}>
              <Image source={getProductImageSource(product.thumbnailUrl)} style={styles.image} />
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
              {/* <Text style={[styles.unit]}>quyển</Text> */}
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
              <Text style={styles.price}>
                {currencyFormatter(product.productPrice - product.productDiscount)}
              </Text>
              <Text style={styles.price}>{Constants.VND}</Text>
            </View>
          </View>
          {trashIcon && onPressRemove && !isGiftProduct ? (
            <TouchableOpacity
              style={[styles.btnTrash, isBuyOne || !viewQuantity ? { right: 0 } : null]}
              onPress={() => onPressRemove(product)}
              activeOpacity={0.8}>
              <IconIO name="trash" size={24} style={styles.trashIcon} />
            </TouchableOpacity>
          ) : null}
          {viewQuantity && !isBuyOne && !isGiftProduct ? (
            <ChangeQuantity
              style={styles.quantity}
              quantity={product.quantity}
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
                <IconIO name="plus" size={24} style={[styles.addToCartIcon]} />
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

const mapStateToProps = ({ products, carts }) => {
  return {
    buyOne: products.buyOne,
    carts,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { buyOne } = stateProps;
  const { dispatch } = dispatchProps;
  const { product } = ownProps;
  const { actions } = require('../../redux/CartRedux');
  const ProductRedux = require('../../redux/ProductRedux');

  return {
    ...ownProps,
    ...stateProps,
    isBuyOne: product.productCode && buyOne.includes(product.productCode),
    updateCart: (id, payload) => {
      dispatch(actions.updateCart(id, payload));
    },
    removeCartItem: product => {
      dispatch(actions.removeCartItem(product));
    },
    getBookDetail: productId => {
      dispatch(ProductRedux.actions.getBookDetail(productId));
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(ProductCartItem);
