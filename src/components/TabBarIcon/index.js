/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import Styles from '../../common/Styles';
import Color from '../../common/Color';
import { UboIcon } from '../../Omni';

class TabBarIcon extends PureComponent {
  static propTypes = {
    icon: PropTypes.any,
    color: PropTypes.string,
    css: PropTypes.any,
    // carts: PropTypes.object,
    // cartIcon: PropTypes.any,
    // wishList: PropTypes.any,
    // wishlistIcon: PropTypes.any,
    myMessages: PropTypes.any,
    messageIcon: PropTypes.any,
  };

  render() {
    const {
      icon,
      image,
      color,
      css,
      // carts,
      // cartIcon,
      // wishList,
      // wishlistIcon,
      messageIcon,
      myMessages,
    } = this.props;

    const numberWrap = (number = 0) => (
      <View style={styles.numberWrap}>
        <Text style={styles.number}>{number}</Text>
      </View>
    );
    return (
      <View style={{ justifyContent: 'center', backgroundColor: 'transparent' }}>
        {icon ? (
          <UboIcon
            ref={comp => (this._image = comp)}
            name={icon}
            style={[styles.icon, { color: color }, css]}
          />
        ) : image ? (
          <Image
            ref={comp => (this._image = comp)}
            source={image}
            color={color}
            style={[styles.image, css]}
          />
        ) : null}
        {/* {wishlistIcon && wishList.total > 0 && numberWrap(wishList.total || 0)}
        {cartIcon && carts.orderItems.length > 0 && numberWrap(carts.orderItems.length || 0)} */}
        {messageIcon && myMessages.numberOfUnread > 0 && numberWrap(myMessages.numberOfUnread || 0)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    color: Color.darkGrey,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  numberWrap: {
    ...Styles.Common.ColumnCenter,
    position: 'absolute',
    top: -5,
    right: -15,
    height: 18,
    minWidth: 18,
    backgroundColor: Color.primary,
    borderRadius: 9,
  },
  number: {
    color: 'white',
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3,
  },
});

const mapStateToProps = ({ myMessages }) => ({ myMessages });
export default connect(
  mapStateToProps,
  null,
  null
)(TabBarIcon);
