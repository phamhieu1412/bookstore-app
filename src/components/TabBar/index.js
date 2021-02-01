import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
// import { StackActions } from 'react-navigation';
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';

import Device from '../../common/Device';
import Color from '../../common/Color';

const styles = StyleSheet.create({
  tabbar: {
    height: Device.isIphoneX ? 76 : 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  tab: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        justifyContent: Device.isIphoneX ? 'flex-start' : 'center',
        paddingTop: Device.isIphoneX ? 14 : 0,
      },
      android: {
        justifyContent: 'center',
      },
    }),
  },
  label: {
    color: Color.darkGrey,
    fontSize: 12,
    marginTop: 2,
    letterSpacing: -0.22,
  },
});

class TabBar extends PureComponent {
  onPress = (index, route) => {
    // back to main screen when is staying child route
    if (route.routes && route.routes.length > 1 && index !== 1) {
      this.props.navigation.dispatch(StackActions.popToTop({ key: route.key, immediate: true }));
    } else {
      this.props.navigation.navigate(route.key);
    }
  };

  render() {
    const {
      navigation,
      renderIcon,
      getLabelText,
      activeTintColor,
      inactiveTintColor,
      // theme: {
      //   colors: { background },
      // },
    } = this.props;

    const { routes } = navigation.state;

    const ignoreScreen = [
      'DetailScreen',
      'SearchScreen',
      'Detail',
      'SignUpScreen',
      'CategoryDetail',
      'Search',
      'CheckoutScreen',
      'WishListScreen',
      'CartScreen',
      'MyOrders',
      'Login',
    ];

    return (
      <View
        style={[styles.tabbar, { backgroundColor: 'transparent', borderTopColor: 'transparent' }]}>
        {routes &&
          routes.map((route, index) => {
            const focused = index === navigation.state.index;
            const tintColor = focused ? activeTintColor : inactiveTintColor;

            if (ignoreScreen.indexOf(route.key) > -1) {
              return <View key={route.key} />;
            }

            if (this.props.user === null && route.key === 'MyOrders') {
              return <View key={route.key} />;
            }

            return (
              <TouchableWithoutFeedback
                key={route.key}
                style={styles.tab}
                onPress={() => this.onPress(index, route)}>
                <View ref={`tabItem${index}`} style={styles.tab}>
                  {renderIcon({
                    route,
                    index,
                    focused,
                    tintColor,
                  })}
                  <Text style={[styles.label, { color: tintColor }]}>
                    {getLabelText({ route })}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
      </View>
    );
  }
}

TabBar.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
  renderIcon: PropTypes.any,
  activeTintColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
  jumpTo: PropTypes.func,
};
const mapStateToProps = ({ user }) => ({ user: user.user });
export default connect(mapStateToProps)(TabBar);
