import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Styles from '../../common/Styles';
import NavigationBarIcon from '../../components/NavigationBarIcon';

class CartIcons extends Component {
  render() {
    const {
      color,
      carts,
      userProfile,
      // wishList,
      navigation,
      numberColor,
      withSearch,
      withWishlist,
      noCart,
      withUser,
    } = this.props;
    // const totalCart = carts.orderItems?.length;
    const totalCart = 0;
    const user = userProfile.user || {};
    const token = userProfile.token || '';
    // const wishListTotal = wishList.wishListItems.length;
    
    return (
      <View style={Styles.Common.Row}>
        {withSearch && (
          <NavigationBarIcon
            icon="book-search"
            onPress={() => navigation.navigate('SearchScreen')}
            color={color}
            css={{ marginRight: 0 }}
          />
        )}
        {withWishlist && (
          <NavigationBarIcon
            icon="heart-outline"
            // number={wishListTotal}
            numberColor={numberColor}
            onPress={() => navigation.navigate('WishListScreen')}
            color={color}
            css={!noCart && { marginRight: 0 }}
          />
        )}
        {!noCart && (
          <NavigationBarIcon
            icon="cart-minus"
            number={totalCart}
            numberColor={numberColor}
            onPress={(!user || !token) ? () => navigation.navigate('SignInScreen') : () => navigation.navigate('CartScreen')}
            color={color}
          />
        )}
        {withUser && userProfile.token && (
          <NavigationBarIcon
            icon="account-edit-outline"
            // number={wishListTotal}
            numberColor={numberColor}
            onPress={() => navigation.navigate('EditProfileScreen')}
            color={color}
            css={{ marginLeft: -5 }}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ carts, wishList, user }) => ({
  carts,
  wishList,
  userProfile: user, 
});

export default connect(mapStateToProps)(CartIcons);
