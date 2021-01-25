import React from 'react';
import { View, Platform, Text } from 'react-native';

import Styles from '../common/Styles';
import NavigationBarSearch from '../components/NavigationBarSearch';
import NavigationBarIcon from '../components/NavigationBarIcon';
import BackWithTitleIcons from '../components/BackWithTitleIcons';
import CartIcons from '../components/CartIcons';

const BackWithTitle = (navigation, title, background, onPress) => (
  <BackWithTitleIcons
    navigation={navigation}
    title={title}
    background={background}
    onPress={onPress}
  />
);

const FocusSearch = (navigation, colorScheme) => (
  <NavigationBarSearch onPress={() => navigation.navigate('SearchScreen')} colorScheme={colorScheme} />
);

const EmptyView = () => (
  <View style={[Styles.Common.Row, { right: -5 }, Platform.OS !== 'ios' && { right: -12 }]} />
);

const SearchRight = (navigation, color) => (
  <View style={[Styles.Common.Row]}>
    <NavigationBarIcon icon="search" onPress={() => navigation.navigate('SearchScreen')} color={color} />
  </View>
);

const WishlistSearchIcons = (navigation, color, numberColor) => (
  <CartIcons
    navigation={navigation}
    color={color}
    numberColor={numberColor}
    withSearch
    withWishlist
    noCart
  />
);

const CartWishListSearchIcons = (navigation, color, numberColor) => (
  <CartIcons
    navigation={navigation}
    color={color}
    numberColor={numberColor}
    withSearch
    withWishlist
  />
);

const CartWishListUserIcons = (navigation, color, numberColor) => (
  <CartIcons
    navigation={navigation}
    color={color}
    numberColor={numberColor}
    withWishlist
    withUser
  />
);

const CartSearchIcons = (navigation, color, numberColor) => (
  <CartIcons navigation={navigation} color={color} numberColor={numberColor} withSearch />
);

const CartWishListIcons = (navigation, color, numberColor) => (
  <CartIcons navigation={navigation} color={color} numberColor={numberColor} withWishlist />
);

const CartIcon = (navigation, color, numberColor) => (
  <CartIcons navigation={navigation} color={color} numberColor={numberColor} />
);

const Back = (navigation, color, icon, onPress) => (
  <View style={Styles.Common.Row}>
    <NavigationBarIcon
      icon={icon || 'arrow-left'}
      onPress={onPress ? onPress : () => navigation.goBack(null)}
      color={color}
      size={18}
    />
  </View>
);

const RightIcon = (icon, onPress, dark) => (
  <View style={[Styles.Common.Row]}>
    <NavigationBarIcon icon={icon} size={24} onPress={onPress} />
  </View>
);

const Title = (title, textColor) => (
  <View>
    <Text style={[Styles.Common.headerTitleStyle, { color: textColor }]}>{title}</Text>
  </View>
);

export {
  // Logo,
  // Menu,
  SearchRight,
  EmptyView,
  FocusSearch,
  BackWithTitle,
  WishlistSearchIcons,
  CartWishListSearchIcons,
  CartSearchIcons,
  CartWishListIcons,
  CartIcon,
  Back,
  RightIcon,
  Title,
  CartWishListUserIcons,
};
