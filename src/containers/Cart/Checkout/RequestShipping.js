import React from 'react';
import { Text, View, Switch, TextInput } from 'react-native';

import { Icon } from '../../../Omni';
import cartStyles from '../styles';
import styles from './styles';
import Languages from '../../../common/Languages';
import Color from '../../../common/Color';
import Checkbox from '../../../components/Checkbox';

class RequestShipping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      useAsDefaultAddress: false,
      shippingAddress: props.shippingAddress,
      defaultShippingAddress: props.defaultShippingAddress,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.defaultShippingAddress !== prevState.defaultShippingAddress) {
      // reset useAsDefaultAddress if changed default address
      return {
        useAsDefaultAddress: false,
        defaultShippingAddress: nextProps.defaultShippingAddress,
      };
    }

    return null;
  }

  onUpdateRequestShipping = value => {
    this.props.updateRequestShipping(value);
  };

  onUpdateShippingAddress = value => {
    const {
      defaultShippingAddress,
      updateShippingAddress,
      updateDefaultShippingAddress,
    } = this.props;

    updateShippingAddress(value.trim());

    if (!defaultShippingAddress || this.state.useAsDefaultAddress) {
      updateDefaultShippingAddress(value.trim());
    }
  };

  setUseAsDefaultAddress = () => {
    const useAsDefaultAddress = this.state.useAsDefaultAddress;
    this.setState({
      useAsDefaultAddress: !useAsDefaultAddress,
    });
    const { defaultShippingAddress, updateDefaultShippingAddress } = this.props;
    const { shippingAddress } = this.state;
    if (!useAsDefaultAddress) {
      if (shippingAddress.trim() !== defaultShippingAddress) {
        updateDefaultShippingAddress(shippingAddress.trim());
      }
    } else {
      if (shippingAddress.trim() !== defaultShippingAddress) {
        updateDefaultShippingAddress(defaultShippingAddress.trim());
      }
    }
  };

  render() {
    const { selectedPos, needShipping, defaultShippingAddress } = this.props;
    const { shippingAddress } = this.state;
    if (!selectedPos || !selectedPos.shipping || !selectedPos.shipping.shippingSupported) {
      return <View />;
    }
    const showSetAsShippingAddress =
      shippingAddress &&
      defaultShippingAddress &&
      shippingAddress !== defaultShippingAddress.trim();

    return (
      <View
        style={{
          marginHorizontal: 15,
          marginBottom: 20,
        }}>
        <View style={styles.requestShip}>
          <View style={[cartStyles.fieldIconWrapper, { width: 75 }]}>
            <View style={cartStyles.fieldIconWithText}>
              <Switch
                value={needShipping}
                trackColor={Color.primary}
                // ios_backgroundColor={Color.primary}
                style={[styles.requestShipSwitch]}
                onValueChange={this.onUpdateRequestShipping}
              />
            </View>
            <View style={[cartStyles.fieldSeparator, { height: 55 }]} />
          </View>
          <View style={[cartStyles.fieldContent]}>
            <Text style={cartStyles.fieldLabel} numberOfLines={2}>
              {'Yêu cầu ship'}
            </Text>
            {selectedPos.shipping.pricing ? (
              <Text style={cartStyles.fieldInfo} numberOfLines={5} ellipsizeMode="tail">
                {selectedPos.shipping.pricing}
              </Text>
            ) : null}
          </View>
          {/* <View style={styles.requestShipAction}>
            <Switch
              value={needShipping}
              trackColor={Color.primary}
              // ios_backgroundColor={Color.primary}
              style={styles.requestShipSwitch}
              onValueChange={this.onUpdateRequestShipping}
            />
            <Text style={styles.requestShipLabel}>Yêu cầu ship</Text>
          </View> */}
          {/* {selectedPos.shipping.pricing ? (
            <View style={styles.requestShipPolicy}>
              <Text
                style={[cartStyles.fieldInfo, { fontSize: 12, maxWidth: '90%' }]}
                numberOfLines={5}
                ellipsizeMode="tail">
                {selectedPos.shipping.pricing}
              </Text>
            </View>
          ) : null} */}
        </View>
        {needShipping ? (
          <React.Fragment>
            <View
              style={[
                cartStyles.fieldContainer,
                {
                  minHeight: 65,
                  flexDirection: 'row',
                },
              ]}>
              <View style={cartStyles.fieldIconWrapper}>
                <View style={cartStyles.fieldIconWithText}>
                  <Icon name="truck-fast" size={27} style={[cartStyles.fieldIcon]} />
                  {/* <Text style={cartStyles.editableText}>Thay đổi</Text> */}
                </View>
                <View style={[cartStyles.fieldSeparator, { height: 55 }]} />
              </View>
              <View style={[cartStyles.fieldContent]}>
                <TextInput
                  multiline
                  // numberOfLines={3}
                  value={shippingAddress}
                  onChangeText={shippingAddress => this.setState({ shippingAddress })}
                  onEndEditing={evt => this.onUpdateShippingAddress(evt.nativeEvent.text)}
                  style={styles.shippingAddressInput}
                  underlineColorAndroid="transparent"
                  // autoCapitalize="none"
                  placeholder={Languages.ShippingAddress}
                  placeholderTextColor={Color.blackTextSecondary}
                />
              </View>
            </View>
            {showSetAsShippingAddress ? (
              <View style={styles.useAsDefaultAddress}>
                <Text style={[cartStyles.fieldInfo, styles.useAsDefaultAddressText]}>
                  Dùng làm địa chỉ mặc định
                </Text>
                <Checkbox
                  iconStyle={styles.useAsDefaultAddressCheckbox}
                  status={this.state.useAsDefaultAddress}
                  onPress={this.setUseAsDefaultAddress}
                />
              </View>
            ) : null}
          </React.Fragment>
        ) : null}
      </View>
    );
  }
}

export default RequestShipping;
