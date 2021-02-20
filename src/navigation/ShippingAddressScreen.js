import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';

import { Back } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import AddressContainer from '../containers/ShippingAddress';
import Languages from '../common/Languages';
import Styles from '../common/Styles';
import Color from '../common/Color';

const EditAddress = onPress => {
  return (
    <View style={Styles.Common.Row}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          Styles.Common.ColumnCenter,
          {
            width: 40, // Styles.headerHeight,
            height: Styles.headerHeight,
            marginHorizontal: Platform.OS === 'ios' ? 5 : 0,
          },
        ]}>
        <Text style={{ color: Color.primary, fontSize: 16, fontWeight: '300' }}>
          {Languages.Edit}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

class ShippingAddressScreen extends PureComponent {
  componentDidMount() {
    const { navigation, route } = this.props;

    const enableSelection =
      route.params && route.params.enableSelection ? route.params.enableSelection : false;

    navigation.setOptions({
      headerLeft: () => Back(navigation),
      headerRight: enableSelection
        ? () => EditAddress(() => navigation.navigate('ShippingAddressScreen'))
        : null,
      headerTitle: enableSelection ? Languages.SelectShippingAddress : Languages.ShippingAddress,
    });

    this._navListener = this.props.navigation.addListener('didFocus', () => {
      setBarStyle('dark-content');
      setTranslucent(false);
      setBackgroundColor('transparent');
    });
  }

  render() {
    const { navigation, route } = this.props;

    return <AddressContainer navigation={navigation} route={route} />;
  }
}

export default ShippingAddressScreen;
