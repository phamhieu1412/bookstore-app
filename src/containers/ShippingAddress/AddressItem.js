import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Icon, log } from '../../Omni';
// import _ from 'lodash';
import styles from './styles';
import Color from '../../common/Color';

class AddressItem extends PureComponent {
  render() {
    const { address, onPress, style, name, phone, enableSelection, selectedId } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[styles.addressContainer, style && style]}>
        <View style={styles.addressItem}>
          <Text style={styles.addressName}>{address.name || name}</Text>
          <Text style={styles.addressDefault}>{address.default ? '[Mặc định]' : ''}</Text>
        </View>
        <View style={styles.addressItem}>
          <View style={styles.addressContent}>
            <Text style={styles.addressInfo}>{address.phoneNumber || phone}</Text>
            {address.text ? <Text style={styles.addressInfo}>{address.text}</Text> : null}
            {address?.ward?.name ? (
              <Text style={styles.addressInfo}>{address.ward.name}</Text>
            ) : null}
            {address?.district?.name ? (
              <Text style={styles.addressInfo}>{address.district.name}</Text>
            ) : null}
            {address?.city?.name ? (
              <Text style={styles.addressInfo}>{address.city.name}</Text>
            ) : null}
          </View>
          {enableSelection ? (
            address.id === selectedId ? (
              <Icon
                style={[styles.addressRightIcon, { color: Color.primary }]}
                size={22}
                name="checkbox-marked-circle"
              />
            ) : null
          ) : (
            <Icon style={styles.addressRightIcon} size={22} name="chevron-right" />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default AddressItem;
