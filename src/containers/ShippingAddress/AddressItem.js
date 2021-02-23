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
            <Text style={styles.addressInfo}>{address.phone}</Text>
            {address.address ? <Text style={styles.addressInfo}>{address.address}</Text> : null}
            {address?.state? (
              <Text style={styles.addressInfo}>{address.state}</Text>
            ) : null}
            {address?.district? (
              <Text style={styles.addressInfo}>{address.district}</Text>
            ) : null}
            {address?.city ? (
              <Text style={styles.addressInfo}>{address.city}</Text>
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
