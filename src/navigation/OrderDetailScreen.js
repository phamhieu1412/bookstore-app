import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Back, CartSearchIcons } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import Color from '../common/Color';
import Styles from '../common/Styles';
import OrderDetail from '../containers/OrderDetail';

class OrderDetailScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
    };
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.initialized) {
      setBarStyle('light-content');
      setTranslucent(false);
      setBackgroundColor(Color.primary);
      return { initialized: true };
    }

    return null;
  }

  componentDidMount() {
    const { navigation, route } = this.props;
    const { orderNumber, justOrdered } = route.params || {};

    this.props.navigation.setOptions({
      headerTitle: `Đơn #${orderNumber}`,
      headerLeft: () =>
        Back(navigation, Color.white, null, justOrdered ? () => navigation.navigate('Home') : null),
      headerRight: () => CartSearchIcons(navigation, Color.white, Color.white),

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
    const { navigation, route } = this.props;
    const { navigate } = navigation;
    const { orderNumber, justOrdered } = route.params || {};

    if (!orderNumber) return null;

    return (
      <OrderDetail
        navigation={navigation}
        orderNumber={orderNumber}
        showSuccessMessage={justOrdered}
        onViewHomeScreen={() => navigate('Home')}
        onViewProduct={product => navigate('DetailScreen', { product })}
      />
    );
  }
}

export default OrderDetailScreen;
