import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';

import { UboIcon } from '../../Omni';
import Color from '../../common/Color';
import Styles from '../../common/Styles';

const defaultSearchTerms = [
  'Kính vạn hoa',
  'Thiên hạ chi vương',
  'Người chết thuê',
];

class NavigationBarSearch extends Component {
  constructor(props) {
    super(props);
    const randomSearchTerms = defaultSearchTerms;
    const term = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];
    this.state = { term };
  }

  render() {
    const { onPress, colorScheme } = this.props;
    const { term } = this.state;
    const background = colorScheme && colorScheme === 'light' ? Color.background : '#EFEFF4';

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.iconWrap, Styles.Common.Row, { backgroundColor: background }]}>
        <UboIcon
          name="search"
          style={[
            styles.icon,
            // { tintColor: iconColor },
            {
              fontSize: 12,
              color: '#848484',
            },
          ]}
          resizeMode="contain"
        />
        <Text style={styles.searchTerm}>{term}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  iconWrap: {
    flexDirection: 'row',
    left: 10,
    width: Math.min(251, Styles.width - 131),
    alignItems: 'center',
    height: 33,
    opacity: 0.8,
    backgroundColor: '#EFEFF4',
    borderRadius: 16.5,
    padding: 3,
    marginLeft: Platform.OS === 'ios' ? 10 : 5,
  },
  searchTerm: {
    fontSize: 14,
    color: '#848484',
    marginLeft: 15,
  },
  icon: {
    width: 13,
    height: 13,
    left: 7,
  },
});

const mapStateToProps = ({ app }) => ({
  appConfig: {},
  // appConfig: app.config && app.config.app ? app.config.app : {},
});

export default connect(mapStateToProps)(NavigationBarSearch);
