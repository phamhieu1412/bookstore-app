import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';
import cartStyles from '../styles';
import { currencyFormatter } from '../../../ultils/Product';
import Color from '../../../common/Color';
import Constants from '../../../common/Constants';
import Device from '../../../common/Device';

const SimplePrice = (price, color, fontSize) => {
  return (
    <View style={styles.priceWrapper}>
      <Text style={[styles.priceLabel, { color:  Color.organge }, fontSize && { fontSize }]}>
        {currencyFormatter(price)}
      </Text>
      <Text
        style={[styles.priceSymbol, color && { color }, fontSize && { fontSize: fontSize - 4 }]}>
        {Constants.VND}
      </Text>
    </View>
  );
};

const CheckoutButton = props => (
  <TouchableOpacity
    onPress={() => props.onPress()}
    style={[styles.button, cartStyles.button]}
    activeOpacity={0.9}>
    <View style={styles.infoRow}>
      <Text style={styles.buttonLabel}>{props.label}</Text>
      <View style={styles.buttonAmount}>
        <Text style={{color: 'white'}}>{currencyFormatter(Math.ceil(props.amount))}{Constants.VND}</Text>
        <Text style={styles.buttonNote}>({props.note || 'tạm tính'})</Text>
      </View>
    </View>
  </TouchableOpacity>
);

class CheckoutBottomActions extends Component {
  updateUseWallet = useWallet => {
    // this.setState({ useWallet: !this.state.useWallet });
    const { updateCart } = this.props;
    const payload = { PaidFromWallet: useWallet };

    updateCart(payload);
  };

  render() {
    const { isAbsolute, carts, wallet, nextText, onNext } = this.props;
    const hasWallet = wallet && wallet.balance > 0;
    const useWallet = !!carts.isPaidFromWallet;
    const walletAmount = useWallet && carts.paymentFromWallet ? 0 - carts.paymentFromWallet : 0;
    let height = 145;
    let totalMoney = 0;
    let discountMoney = 0;
    let totalPayment = 0;
    for (let i = 0; i < carts.orderItems.length; i++) {
      const element = carts.orderItems[i];
      totalMoney +=  (element.productPrice - element.productDiscount) * element.quantity;
    }
    if (hasWallet) height += 20;
    if (Device.isIphoneX) height += 15;
    // if (carts.couponDetail.code) {
    //   discountMoney = totalMoney * carts.couponDetail.value / 100;

    //   if ((discountMoney - carts.couponDetail.maxValue) < 0) {
    //     totalPayment = totalMoney - carts.couponDetail.maxValue;
    //   }
    //   totalPayment = totalMoney - discountMoney;
    // }
    console.log('aa', carts.infoCart)
    return (
      <View style={[cartStyles.bottomView, { height }, isAbsolute && cartStyles.floatView]}>
        <View style={cartStyles.buttonContainer}>
          <View/>
            <View style={[styles.blockPrice, { marginTop: 5 }]}>
              <Text style={styles.checkoutBottomInfoLabel}>Tiền sách</Text>
              {SimplePrice(carts.infoCart.subtotal)}
            </View>
            <View style={[styles.blockPrice, { marginTop: 3 }]}>
              <Text style={styles.checkoutBottomInfoLabel}>Tiền giảm giá từ sách</Text>
              <View style={[styles.priceLabel, { color: Color.organge }]}>
                <Text style={{ color: Color.organge }}>-</Text>
                {SimplePrice(carts.infoCart.itemDiscount)}
              </View>
            </View>
            <View style={[styles.blockPrice, { marginTop: 3 }]}>
              <Text style={styles.checkoutBottomInfoLabel}>Khuyến mại</Text>
              <View style={[styles.priceLabel, { color: Color.organge }]}>
                <Text style={{ color: Color.organge }}>-</Text>
                {carts.infoCart && carts.infoCart.promo ? SimplePrice(carts.infoCart.discount) : 0}
              </View>
            </View>
            <View style={[styles.blockPrice, { marginTop: 3, marginBottom: 5 }]}>
              <Text style={styles.checkoutBottomInfoLabel}>Phí ship</Text>
              <View style={[styles.priceLabel, { color: Color.organge }]}>
                <Text style={{ color: Color.organge }}>+</Text>
                {SimplePrice(carts.infoCart.shipping)}
              </View>
            </View>
            <CheckoutButton
              label={nextText.toUpperCase()}
              amount={carts.infoCart.grandTotal}
              onPress={onNext}
            />
        </View>
      </View>
    );
  }
}

export default CheckoutBottomActions;
