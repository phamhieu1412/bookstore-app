import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import Languages from '../../common/Languages';
import ShopButton from '../../components/ShopButton';
import { UboIcon } from '../../Omni';
import styles from './styles';

const CartEmpty = ({ onViewHome }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentEmpty}>
        <View>
          <UboIcon name="cart" style={styles.icon} />
        </View>
        <Text style={styles.title}>{Languages.ShoppingCartIsEmpty}</Text>
        {/* <Text style={styles.message}>{Languages.AddProductToCart}</Text> */}
      </View>

      <ShopButton onPress={onViewHome} />
    </View>
  );
};

CartEmpty.propTypes = {
  onViewHome: PropTypes.func.isRequired,
};

export default CartEmpty;
