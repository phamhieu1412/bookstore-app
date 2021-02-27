import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';

import styles from './styles';
import { currencyFormatter } from '../../ultils/Product';
import Constants from '../../common/Constants';
import Languages from '../../common/Languages';

export default class OrderInformation extends React.PureComponent {
  _renderAttribute = (label, context, _style) => {
    return (
      <View style={[styles.row, { marginBottom: 8 }]}>
        <Text style={[styles.rowLabel]}>{label}</Text>
        <Text style={[styles.rowText, _style]} numberOfLines={3}>
          {context}
        </Text>
      </View>
    );
  };

  _getDateFormat = date => {
    return moment(date).format('DD-MM-YYYY HH:mm');
  };

  _getDateTimeFormat = (date, timeFrom, timeTo) => {
    return `${moment(date).format(Constants.displayDateFormat)} ${moment(timeFrom).format(
      'HH:mm'
    )} - ${moment(timeTo).format('HH:mm')}`;
  };
  
  render() {
    const { order } = this.props;
    return (
      <View style={styles.informationContainer}>
        <View style={{ padding: 5 }}>
          {this._renderAttribute(Languages.OrderNumber, order.id, {
            fontWeight: 'bold',
          })}
          {this._renderAttribute(Languages.OrderDate, this._getDateFormat(order.createdAt))}
          {this._renderAttribute(
            Languages.OrderTotal,
            `${currencyFormatter(order.grandTotal)} ${Constants.VND}`,
            {
              fontWeight: 'bold',
              color: '#FF0025',
            }
          )}
          {order.content ? (
            <View style={[styles.lineItemSeperator, { maxWidth: '95%', marginBottom: 10 }]} />
          ) : null}
          {order.address && order.address.id
            ? this._renderAttribute(Languages.ShipTo, `${order.address.address}, ${order.address.district}, ${order.address.city}`, {
                fontStyle: 'italic',
              })
            : null}
          {order.content
            ? this._renderAttribute(Languages.Note, order.content, { fontStyle: 'italic' })
            : null}
        </View>
      </View>
    );
  }
}
