import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';

import Color from '../../common/Color';
import Styles from '../../common/Styles';
import NavigationBarIcon from '../../components/NavigationBarIcon';

const styles = StyleSheet.create({
  container: {
    left: 0,
    backgroundColor: Color.primary,
    // maxWidth: '100%',
    height: 44,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    paddingLeft: 0,
    paddingRight: 20,
    alignItems: 'center',
  },
  label: {
    marginLeft: Platform.OS === 'ios' ? 20 : 10,
    fontSize: 17,
    color: Color.white,
    lineHeight: 25,
  },
});

class BackWithTitleIcons extends Component {
  render() {
    const { background, title, navigation, onPress } = this.props;

    return (
      <View
        style={[
          Styles.Common.Row,
          styles.container,
          background && { backgroundColor: background },
        ]}>
        <NavigationBarIcon
          icon="arrow-left"
          onPress={onPress ? onPress : () => navigation.goBack(null)}
          color={Color.white}
          size={18}
          css={{
            marginLeft: Platform.OS === 'ios' ? 10 : 0,
          }}
        />
        <Text style={styles.label}>{title}</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ carts, wishList }) => ({ carts, wishList });

export default connect(mapStateToProps)(BackWithTitleIcons);
