import React, { PureComponent } from 'react';

import { Back, WishlistSearchIcons } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import Color from '../common/Color';
import Styles from '../common/Styles';
import Languages from '../common/Languages';
import Cart from '../containers/Cart';

export default class CartScreen extends PureComponent {
  componentDidMount() {
    const {navigation} = this.props;

    navigation.setOptions({
      headerLeft: () => Back(navigation, Color.white),
      headerRight: () => WishlistSearchIcons(navigation, Color.white),
      headerTitle: Languages.Cart,

      headerStyle: [
        Styles.Common.toolbar(),
        {
          backgroundColor: Color.primary,
        }
      ],
      headerTintColor: Color.headerTintColor,
      headerTitleStyle: [
        Styles.Common.headerStyle,
        {
          color: Color.white,
        }
      ],
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
      <Cart
        // onMustLogin={() => {
        //   navigate('LoginScreen', { onCart: true });
        // }}
        onBack={() => navigate('Home')}
        onViewHome={() => navigate('Home')}
        onViewProduct={product => navigate('DetailScreen', { product, noCartIcon: true })}
        navigation={this.props.navigation}
      />
    );
  }
}
