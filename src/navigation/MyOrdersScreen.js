import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MyOrders from '../containers/MyOrders';
import Languages from '../common/Languages';
import Styles from '../common/Styles';
import { Back, CartWishListIcons } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';

export default class MyOrdersScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    navigation: PropTypes.object,
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.props.navigation.setOptions({
      headerLeft: () => Back(navigation),
      headerRight: () => CartWishListIcons(navigation),
      headerTitle: Languages.MyOrder,

      headerTitleStyle: [Styles.Common.headerStyle],
    });

    this._navListener = this.props.navigation.addListener('focus', () => {
      setBarStyle('dark-content');
      setTranslucent(false);
      setBackgroundColor('transparent');
    });
  }

  componentWillUnmount() {
    this._navListener();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <MyOrders
        navigate={this.props.navigation}
        onViewHomeScreen={() => navigate('Home')}
        onViewOrderDetail={orderNumber =>
          navigate('OrderDetailScreen', { orderNumber, justOrdered: false })
        }
      />
    );
  }
}
