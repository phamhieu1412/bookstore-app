import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import Languages from '../../common/Languages';
import ShopButton from '../../components/ShopButton';
import { Icon } from '../../Omni';
import styles from './styles';

class PaymentEmpty extends PureComponent {
  render() {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.content}>
          <View>
            <Icon name="cart" style={styles.icon} />
          </View>
          <Text style={styles.title}>{Languages.MyOrder}</Text>
          <Text style={styles.message}>{this.props.text}</Text>
        </View>

        <ShopButton onPress={this.props.onViewHome} />
      </View>
    );
  }
}

export default PaymentEmpty;
