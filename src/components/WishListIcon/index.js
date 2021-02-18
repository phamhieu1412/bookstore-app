import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { toast } from '../../Omni';
import styles from './styles';
import Color from '../../common/Color';
import Button from '../Button/Button';

class WishListIcon extends Component {
  constructor(props) {
    super(props);

    this.addToWishList = this.addToWishList.bind(this);
  }

  addToWishList() {
    const { wishList, product, removeWishListItem, addWishListItem } = this.props;
    const isInWishList =
      wishList.wishListItems.find(item => item.slug === product.slug) !== undefined;

    if (isInWishList) {
      removeWishListItem(product);
    } else addWishListItem(product);
  }
  render() {
    const { wishList, listBuyOne, product, iconStyle } = this.props;
    const isBuyOne = listBuyOne && listBuyOne.includes(product.code);
    if (isBuyOne) {
      return <View />;
    }
    const isInWishList =
      wishList.wishListItems.find(item => item.slug === product.slug) !== undefined;

    return (
      <Button
        icon={isInWishList ? 'heart' : 'heart-outline'}
        iconStyle={[
          styles.icon,
          isInWishList && { color: Color.heartActiveWishList },
          iconStyle && iconStyle,
        ]}
        style={[styles.buttonStyle, this.props.style && this.props.style]}
        onPress={this.addToWishList}
      />
    );
  }
}

const mapStateToProps = ({  }) => ({
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
  };
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(WishListIcon);
