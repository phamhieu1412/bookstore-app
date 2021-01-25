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
    // const wishListTotal = wishList.wishListItems.length;

    return (
      <View style={Styles.Common.Row}>
        {withSearch && (
          <NavigationBarIcon
            icon="search"
            onPress={() => navigation.navigate('SearchScreen')}
            color={color}
            css={{ marginRight: 0 }}
          />
        )}
        {withWishlist && (
          <NavigationBarIcon
            icon="heart"
            // number={wishListTotal}
            numberColor={numberColor}
            onPress={() => navigation.navigate('WishListScreen')}
            color={color}
            css={!noCart && { marginRight: 0 }}
          />
        )}
        {!noCart && (
          <NavigationBarIcon
            icon="cart"
            number={totalCart}
            numberColor={numberColor}
            onPress={() => navigation.navigate('CartScreen')}
            color={color}
          />
        )}
        {withUser && (
          <NavigationBarIcon
            icon="account-edit"
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

const mapStateToProps = ({ carts, wishList }) => ({ carts, wishList });

export default connect(mapStateToProps)(CartIcons);
