import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Spinner } from '../../components/Spinner';

import Checkout from './Checkout/index';
import styles from './styles';

class CheckoutContainer extends PureComponent {
  render() {
    const { isFetching, onFinishOrder, navigation } = this.props;

    return (
      <View style={[styles.fill]}>
        <View style={styles.content}>
          <Checkout key="pos" onFinishOrder={onFinishOrder} navigation={navigation} />
        </View>
        {isFetching ? <Spinner mode="overlay" /> : null}
      </View>
    );
  }
}

const mapStateToProps = ({ carts, user }) => ({
  isFetching:
    user.isFetching || user.isFetchingWallet || carts.isFetching || carts.isFetchingPromotionCodes,
});

export default connect(
  mapStateToProps,
  undefined,
  undefined
)(CheckoutContainer);
