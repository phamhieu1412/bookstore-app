import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Back } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import Color from '../common/Color';
import Styles from '../common/Styles';
import RatingDetail from '../containers/OrderDetail/components/RatingDetail';

class RatingScreen extends PureComponent {
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
    const { navigation } = this.props;

    this.props.navigation.setOptions({
      headerTitle: `Đánh giá`,
      headerLeft: () => Back(navigation, Color.white),
      headerRight: () => null,

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
    const { id, items } = route.params;
    if (!id) return null;

    return (
      <RatingDetail
        navigation={navigation}
        orderNumber={id}
        items={items}
        onViewHomeScreen={() => navigate('Home')}
        onViewProduct={product => navigate('DetailScreen', { product })}
      />
    );
  }
}

export default RatingScreen;
