import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';
import cartStyles from '../styles';
import { currencyFormatter } from '../../../ultils/product';
import Color from '../../../common/Color';
import Constants from '../../../common/Constants';
import Device from '../../../common/Device';

const SimplePrice = (price, color, fontSize) => {
  return (
    <View style={styles.priceWrapper}>
      <Text style={[styles.priceLabel, {color:  Color.organge}, fontSize && { fontSize }]}>
        {price}
        {/* {currencyFormatter(price)} */}
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
        <Text style={{color: 'white'}}>{props.amount}</Text>
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
    let height = 125;
    let totalMoney = 0;
    for (let i = 0; i < carts.orderItems.length; i++) {
      const element = carts.orderItems[i];
      totalMoney +=  element.total;
    }
    if (hasWallet) height += 20;
    if (Device.isIphoneX) height += 15;

    return (
      <View style={[cartStyles.bottomView, { height }, isAbsolute && cartStyles.floatView]}>
        <View style={cartStyles.buttonContainer}>
          <View/>
            <View style={{width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
              <Text style={styles.checkoutBottomInfoLabel}>Tiền hàng</Text>
              {SimplePrice(totalMoney)}
            </View>
            <View style={{width: '60%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5}}>
              <Text style={styles.checkoutBottomInfoLabel}>Khuyến mại</Text>
              <Text style={[styles.priceLabel, {color:  Color.organge}]}>{carts.couponDetail.discount ? carts.couponDetail.discount : 0} %</Text>
            </View>
            <CheckoutButton
              label={nextText.toUpperCase()}
              amount={totalMoney - (carts.couponDetail.discount ? totalMoney / carts.couponDetail.discount : 0)}
              onPress={onNext}
            />
        </View>
      </View>
    );
  }
}

export default CheckoutBottomActions;