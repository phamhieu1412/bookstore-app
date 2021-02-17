import React, { PureComponent } from 'react';

import Color from '../common/Color';
import Styles from '../common/Styles';
import Languages from '../common/Languages';
import Checkout from '../containers/Cart/Checkout';

import { Back, WishlistSearchIcons } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';

export default class CheckoutScreen extends PureComponent {
  componentDidMount() {
    const {navigation} = this.props;

    navigation.setOptions({
      // headerLeft: () => Back(navigation, Color.white, null, () => navigation.navigate('CartScreen')),
      // headerRight: () => WishlistSearchIcons(navigation, Color.white, Color.white),
      headerTitle: Languages.Cart,

      headerStyle: [Styles.Common.toolbar(), { backgroundColor: Color.primary }],
      headerTintColor: Color.headerTintColor,
      headerTitleStyle: [Styles.Common.headerStyle, { color: Color.white }],
    });

    this._navListener = this.props.navigation.addListener('focus', () => {
      setBarStyle('light-content');
      setTranslucent(false);
      setBackgroundColor(Color.primary);
    });
  }

  componentWillUnmount() {
    this._navListener();
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Checkout
        onBack={() => navigate('CartScreen')}
        onFinishOrder={orderNumber =>
          navigate('OrderDetailScreen', { orderNumber, justOrdered: true })
        }
        onViewHome={() => navigate('Home')}
        // onViewProduct={product => navigate('Detail', product)}
        navigation={this.props.navigation}
      />
    );
  }
}
