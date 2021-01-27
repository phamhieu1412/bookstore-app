import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { FocusSearch, CartWishListIcons } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import Color from '../common/Color';

import Categories from '../containers/Categories';

class CategoriesScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const {navigation} = this.props;

    this.props.navigation.setOptions({
      headerLeft: () => FocusSearch(navigation),
      headerRight: () => CartWishListIcons(navigation),
      headerTitle: null,
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
      <View style={{ flex: 1, backgroundColor: Color.background }}>
        <Categories
          onViewProductScreen={item => navigate('DetailScreen', item)}
          onViewCategory={catParam => {
            navigate('CategoryScreen', catParam);
          }}
        />
      </View>
    );
  }
}

export default CategoriesScreen;
