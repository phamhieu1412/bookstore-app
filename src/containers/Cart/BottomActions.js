import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import Button from '../../components/Button/Button';
import Color from '../../common/Color';
import Constants from '../../common/Constants';

const BottomActions = ({ isAbsolute, carts, nextText, onNext }) => {
  let totalMoney = 0;
  for (let i = 0; i < carts.orderItems.length; i++) {
    const element = carts.orderItems[i];
    totalMoney +=  element.total;
  }

  return (
    <View style={[styles.bottomView, isAbsolute && styles.floatView]}>
      <View style={styles.bottomInfo}>
        <Text style={styles.bottomCountLabel}>{carts.orderItems.length} mặt hàng</Text>
        <View style={styles.seperator} />
        <Text style={[styles.bottomAmountLabel, {color: Color.organge}]}>{totalMoney} {Constants.VND}</Text>
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
