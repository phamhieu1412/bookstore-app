import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { Back, CartIcon } from './IconNavigation';
import { setBarStyle, setTranslucent, setBackgroundColor } from '../ultils/StatusBar';
import SafeAreaView from '../components/SafeAreaView/index';
import Detail from '../containers/Detail';

class DetailScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    };
  }

  componentDidMount() {
    // const noCartIcon = this.props.route.params && this.props.route.params.noCartIcon;
    const {navigation} = this.props;

    navigation.setOptions({
      headerTitle: () => <Text style={{ fontSize: 18 }}>Thông tin chi tiết sách</Text>,
      headerLeft: () => Back(navigation),
      headerRight: () => CartIcon(navigation),
    });

    this._navListener = navigation.addListener('focus', () => {
      setBarStyle('dark-content');
      setTranslucent(false);
      setBackgroundColor('transparent');
    });
  }

  componentWillUnmount() {
    this._navListener();
  }

  render() {
    const { state, navigate } = this.props.navigation;
    const { route } = this.props;

    return (
      <SafeAreaView isSafeAreaBottom>
        <View style={{ flex: 1 }}>
          {typeof route.params !== 'undefined' && (
            <Detail
              product={route.params.product}
              onViewCart={() => navigate('CartScreen')}
              onViewProductScreen={product => {
                this.props.navigation.setParams(product);
                // navigate("DetailScreen", product)
              }}
              navigation={this.props.navigation}
              onLogin={() => navigate('LoginScreen', { onBack: () => navigate('DetailScreen') })}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default DetailScreen;

