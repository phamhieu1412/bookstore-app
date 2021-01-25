import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Icon } from '../../Omni';
import styles from './styles';
import Languages from '../../common/Languages';

export default class HHeader extends React.PureComponent {
  render() {
    const { config, viewAll } = this.props;

    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.tagHeader]}>
            {(Languages[config.name] ? Languages[config.name] : config.name).toUpperCase()}
          </Text>
        </View>
        {viewAll ? (
          <TouchableOpacity onPress={viewAll} style={styles.headerButton}>
            <Text style={[styles.headerButtonText]}>{Languages.seeAll}</Text>
            <Icon style={styles.icon} name={'chevron-right'} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
