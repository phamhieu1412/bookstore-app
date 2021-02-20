import React, { PureComponent } from 'react';

import { Back } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import EditAddressContainer from '../containers/EditAddress';
import Languages from '../common/Languages';

class EditAddressScreen extends PureComponent {
  componentDidMount() {
    const { navigation } = this.props;

    navigation.setOptions({
      headerLeft: () => Back(navigation),
      headerRight: null,
      headerTitle: Languages.ShippingAddress,
    });

    this._navListener = this.props.navigation.addListener('didFocus', () => {
      setBarStyle('dark-content');
      setTranslucent(false);
      setBackgroundColor('transparent');
    });
  }

  render() {
    const { navigation, route } = this.props;

    return <EditAddressContainer navigation={navigation} route={route} />;
  }
}

export default EditAddressScreen;
