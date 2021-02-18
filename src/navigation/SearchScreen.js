import React, { PureComponent } from 'react';

import { Back, CartWishListIcons } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import Search from '../components/Search/index';
import Languages from '../common/Languages';
import Styles from '../common/Styles';

export default class SearchScreen extends PureComponent {
  componentDidMount() {
    const {navigation} = this.props;

    navigation.setOptions({
      headerLeft: () => Back(navigation),
      headerRight: () => CartWishListIcons(navigation),
      headerTitle: Languages.Search,

      headerTitleStyle: [
        Styles.Common.headerStyle,
        {
          color: 'black',
        }
      ],
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
    const { navigate, goBack } = this.props.navigation;

    return (
      <Search
        onBack={goBack}
        onViewProductScreen={product => navigate('DetailScreen', product)}
        navigation={this.props.navigation}
        showFilterBox={(onSearch, values) => navigate('FiltersScreen', { onSearch, values })}
      />
    );
  }
}
