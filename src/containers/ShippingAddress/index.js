import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Icon } from '../../Omni';
import { getName } from '../../ultils/UserHelpers';
import styles from './styles';
import AddressItem from './AddressItem';
import Languages from '../../common/Languages';
import Color from '../../common/Color';

class ShippingAddress extends Component {
  // constructor(props) {
  //   super(props);

  //   const { route } = props;
  //   const enableSelection = route.params && route.params.enableSelection ? route.params.enableSelection : false;
  //   const selectedId = route.params && route.params.selectedId ? route.params.selectedId : '';
  //   this.state = {
  //     enableSelection,
  //     selectedId,
  //   };
  // }

  componentDidMount() {
    this.props.getAddressList();
  }

  viewEditAddress = item => {
    const { navigation } = this.props;

    navigation.navigate('EditAddressScreen', { address: item || {} });
  };

  handlePressItem = item => {
    const { navigation, route } = this.props;
    const enableSelection =
      route.params && route.params.enableSelection ? route.params.enableSelection : false;

    if (enableSelection) {
      this.props.setSelectedAddress(item.id, item);
      navigation.goBack();
    } else {
      this.viewEditAddress(item);
    }
  };

  render() {
    const {
      addressList,
      userProfile: { user },
      route,
    } = this.props;
    const name = getName(user);
    const enableSelection =
      route.params && route.params.enableSelection ? route.params.enableSelection : false;
    const selectedId = route.params && route.params.selectedId ? route.params.selectedId : '';

    return (
      <View style={styles.container}>
        <ScrollView ref="scrollView">
          <View style={styles.profileSection}>
            <View style={styles.sectionBody}>
              {addressList.map(item => (
                <AddressItem
                  address={item}
                  name={name}
                  phone={user.phone}
                  key={item.id}
                  onPress={() => this.handlePressItem(item)}
                  enableSelection={enableSelection}
                  selectedId={selectedId}
                />
              ))}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.viewEditAddress()}
                style={[styles.itemRow, styles.addressItem]}>
                <Text style={styles.itemLeftText()}>{Languages.AddShippingAddress}</Text>
                <View style={styles.itemRightContainer}>
                  <View style={[styles.itemRight(Color.blue), { padding: 5 }]}>
                    <Icon
                      style={[styles.icon, { color: Color.white, marginRight: 0 }]}
                      size={18}
                      name="plus"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userProfile: user,
  addressList: user.addressList,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  // const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions: UserActions } = require('../../redux/UserRedux');
  const { actions: CartActions } = require('../../redux/CartRedux');
  return {
    ...ownProps,
    ...stateProps,
    getAddressList: () => {
      dispatch(UserActions.loadAddressList());
    },
    setSelectedAddress: (addressId, address) => {
      // dispatch(CartActions.setSelectedAddress(addressId, address));
    },
  };
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(ShippingAddress);
