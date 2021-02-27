import React from 'react';
import { Text, View } from 'react-native';

import { Icon } from '../../Omni';
import styles from './styles';

export default class SuccessMessage extends React.PureComponent {
  render() {
    return (
      <View style={styles.successMessage}>
        <Icon name="check-circle" style={styles.successIcon} />
        <Text name="check-circle" style={styles.successText}>
          Bạn đã đặt hàng thành công
        </Text>
      </View>
    );
  }
}
