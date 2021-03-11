import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';

import { Icon } from '../../Omni';
import styles from './styles';
import Color from '../../common/Color';

export default class OrderInformation extends React.PureComponent {
  _renderStep = (icon, text, isActive, isFirst) => {
    return (
      <View style={styles.singleStep} key={`step-${icon}`}>
        {!isFirst && (
          <View style={[styles.stepProgress, isActive && { borderColor: Color.secondary }]} />
        )}
        <View style={styles.stepContent}>
          <Icon name={icon} style={[styles.stepIcon, isActive && { color: Color.secondary }]} />
          <Text style={styles.stepText}>{text.toUpperCase()}</Text>
        </View>
      </View>
    );
  };

  _getDateFormat = date => {
    return moment(date).format('DD-MM-YYYY HH:mm');
  };

  render() {
    const { order } = this.props;
    // console.log('order', order)
    const stateGroups = [[1], [2], [3], [4]];
    const steps = [
      {
        icon: 'check-circle',
        text: 'Đặt hàng',
        states: stateGroups[0]
          .concat(stateGroups[1])
          .concat(stateGroups[2])
          .concat(stateGroups[3]),
      },
      {
        icon: 'package-variant-closed',
        text: 'Đóng gói',
        states: stateGroups[1].concat(stateGroups[2]).concat(stateGroups[3]),
      },
      {
        icon: 'truck-fast-outline',
        text: 'Vận chuyển',
        states: stateGroups[2].concat(stateGroups[3]),
      },
      {
        icon: 'account-check-outline',
        text: 'Nhận hàng',
        states: stateGroups[3],
      },
    ];

    return (
      <View style={styles.indicatorContainer}>
        {steps.map((step, index) =>
          this._renderStep(step.icon, step.text, step.states.includes(order.status), index === 0)
        )}
      </View>
    );
  }
}
