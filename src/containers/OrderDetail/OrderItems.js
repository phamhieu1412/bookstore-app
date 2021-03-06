import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import { currencyFormatter } from '../../ultils/Product';
import Constants from '../../common/Constants';
import Color from '../../common/Color';
import Languages from '../../common/Languages';

export default class OrderItems extends React.Component {
  _renderAttribute = (label, context, _style, _styleLabel) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.rowLabel, _styleLabel]}>{label}</Text>
        <Text style={[styles.rowText, _style]} numberOfLines={2}>
          {context}
        </Text>
      </View>
    );
  };

  render() {
    const { order, onPress, onLongPress } = this.props;

    // disable cancel order item
    const cancellable = ['pending', 'received'].includes(order.status);
    const shippingFee = order.shipping ? order.shipping : 0;
    
    return (
      <View>
        <View style={styles.itemContainer}>
          {order.items.map((o, i) => {
            const isCancelled =
              o.weight === 0 || (o.state && (o.state === 'cancelled' || o.state === 'returned'));
            const isGiftProduct = !!o.isGiftProduct;
            return (
              <View key={i.toString()} style={styles.lineItemWrapper}>
                <View style={styles.lineItem}>
                  <TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={() => onPress(o)}
                    activeOpacity={0.8}>
                    <Image style={styles.image} source={{ uri: o && o.product && o.product.images && o.product.images[0] }} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'flex-start', marginRight: 7 }}
                    onPress={() => onPress(o)}
                    activeOpacity={0.8}>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                      {o && o.product && o.product.title && o.product.title}
                    </Text>
                    <Text style={styles.price}>{o && o.product && o.product.category && o.product.category.name}</Text>
                  </TouchableOpacity>
                  <Text style={[styles.text, { alignSelf: 'flex-end' }]}>{`x${o.quantity}`}</Text>
                  {cancellable ? (
                    <TouchableOpacity
                      style={{ width: 100, alignSelf: 'flex-end' }}
                      onPress={() => {}}
                      onLongPress={() => {
                        if (!isCancelled) onLongPress(o.productCode);
                      }}
                      hitSlop={{ top: 10, bottom: 5, left: 0, right: 5 }}
                      activeOpacity={0.8}>
                      <Text style={[styles.price, { textAlign: 'right' }]}>{`${currencyFormatter(
                        10
                      )} ${Constants.VND}`}</Text>
                      <Text
                        style={[
                          styles.text,
                          { width: 100, textAlign: 'right' },
                        ]}>{`${currencyFormatter(isGiftProduct ? 0 : 0)} ${
                        Constants.VND
                      }`}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ width: 100, alignSelf: 'flex-end' }}>
                      <Text style={[styles.price, { textAlign: 'right' }]}>{`${currencyFormatter(
                        o.price
                      )} ${Constants.VND}`}</Text>
                      <Text style={[styles.text, { textAlign: 'right' }]}>
                        {`${currencyFormatter(o.price * o.quantity)} ${Constants.VND}`}
                      </Text>
                    </View>
                  )}
                </View>
                {isCancelled && <View style={styles.cancelledOverllay} />}
                {isCancelled && <View style={styles.cancelledLineThrough} />}
                <View style={styles.lineItemSeperator} />
              </View>
            );
          })}
          <View style={styles.orderAmountWrapper}>
            {cancellable && (
              <View style={styles.orderMessage}>
                <Text style={styles.orderMessageText}>
                  Bạn có thể huỷ bỏ mặt hàng bằng cách nhấn giữ số tiền trên danh sách
                </Text>
                <View style={[styles.lineItemSeperator, { flex: 1 }]} />
              </View>
            )}
            <View style={styles.orderMoney}>
              <View style={styles.orderMoneyInfo}>
                {this._renderAttribute(
                  Languages.SubTotal,
                  `${currencyFormatter(order.subtotal)} ${Constants.VND}`,
                  { textAlign: 'right' }
                )}
                {this._renderAttribute(
                  'Giảm giá từ mã',
                  `-${currencyFormatter(order.discount)} ${Constants.VND}`,
                  { color: Color.checkout.discount, textAlign: 'right' }
                )}
                {this._renderAttribute(
                  'Giảm giá từ sản phẩm',
                  `-${currencyFormatter(order.itemDiscount)} ${Constants.VND}`,
                  { color: Color.checkout.discount, textAlign: 'right' }
                )}
                {this._renderAttribute(
                  'Phí Ship',
                  `+${currencyFormatter(shippingFee)} ${Constants.VND}`,
                  { color: Color.secondary, textAlign: 'right' }
                )}
              </View>
              <View style={styles.orderMoneyTotal}>
                <View style={styles.lineItemSeperator} />
                {this._renderAttribute(
                  Languages.OrderTotal,
                  `${currencyFormatter(order.grandTotal)} ${Constants.VND}`,
                  {
                    fontWeight: 'bold',
                    color: '#FF0025',
                    textAlign: 'right',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingRight: 15,
                    justifyContent: 'center',
                  },
                  {
                    fontWeight: 'bold',
                    paddingTop: 7,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    justifyContent: 'center',
                  }
                )}
              </View>
            </View>
          </View>
          <View style={styles.lineItemSeperator} />
          <View style={{ marginTop: 20, height: 20 }} />
        </View>
      </View>
    );
  }
}
