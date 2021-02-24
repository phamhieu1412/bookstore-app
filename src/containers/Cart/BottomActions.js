import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import Button from '../../components/Button/Button';
import Color from '../../common/Color';
import Constants from '../../common/Constants';
import { currencyFormatter } from '../../ultils/Product';

const BottomActions = ({ isAbsolute, carts, nextText, onNext }) => {
  return (
    <View style={[styles.bottomView, isAbsolute && styles.floatView]}>
      <View style={styles.bottomInfo}>
        <Text style={styles.bottomCountLabel}>{carts.orderItems.length} mặt hàng</Text>
        <View style={styles.seperator} />
        <Text style={[styles.bottomAmountLabel, {color: Color.organge}]}>{currencyFormatter(carts.infoCart.subtotal)} {Constants.VND}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text={nextText.toUpperCase()}
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={onNext}
        />
      </View>
    </View>
  );
};

export default BottomActions;
