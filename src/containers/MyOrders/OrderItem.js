import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import moment from 'moment';

import { Icon } from '../../Omni';
import styles from './styles';
import { currencyFormatter } from '../../ultils/Product';
import Constants from '../../common/Constants';
import Languages from '../../common/Languages';

const cardMargin = Constants.Dimension.ScreenWidth(0.05);

export default class OrderItem extends React.PureComponent {
  _renderAttribute = (label, context, _style) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.rowLabel]}>{label}</Text>
        <Text style={[styles.rowLabel, _style]}>{context}</Text>
      </View>
    );
  };

  _getDateFormat = date => {
    return moment(date * 1000).format('DD-MM-YYYY HH:mm');
  };

  _getStatus = status => {
    const statusList = {
      checkout: { name: 'Đặt hàng', icon: 'check-circle' },
      pending: { name: 'Đặt hàng', icon: 'check-circle' },
      received: { name: 'Đặt hàng', icon: 'check-circle' },
      processing: { name: 'Đặt hàng', icon: 'check-circle' },
      shipping: { name: 'Đóng gói', icon: 'packing-heart' },
      shipped: { name: 'Tới POS', icon: 'layout' },
      completed: { name: 'Nhận hàng', icon: 'user-check' },
      cancelled: { name: 'Đã hủy', icon: 'trash' },
      returned: { name: 'Đã trả lại', icon: 'trash' },
    };

    return statusList[status] || 'Đặt hàng';
  };

  render() {
    const { order, onViewOrderDetail } = this.props;
    const status = this._getStatus(order.status);

    return (
      <View style={{ margin: cardMargin, marginBottom: 0 }}>
        <TouchableOpacity
          hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
          activeOpacity={0.8}
          onPress={() => onViewOrderDetail(order.id)}>
          <View style={styles.labelView}>
            <View style={styles.labelGroup}>
              {/* <Icon style={styles.labelIcon} name={status.icon} /> */}
              <Text style={styles.label} numberOfLines={1}>{order.id}</Text>
            </View>
            {/* <Text style={styles.orderDetailLabel}>{Languages.OrderDetails}</Text> */}
            <Icon style={styles.labelNextIcon} name={'chevron-right'} />
          </View>
        </TouchableOpacity>
        <View style={{ padding: 5, paddingTop: 0 }}>
          {this._renderAttribute(
            Languages.OrderTotal,
            `${currencyFormatter(order.grandTotal)} ${Constants.VND}`,
            {
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: Constants.fontHeader,
            }
          )}
          {this._renderAttribute(Languages.OrderDate, this._getDateFormat(order.createdAt))}
          {/* {this._renderAttribute(Languages.OrderPayment, this._getDateFormat(order.deliveryAt))} */}
          {this._renderAttribute(Languages.OrderStatus, status)}
        </View>
      </View>
    );
  }
}
