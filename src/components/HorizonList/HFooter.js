import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import { Icon } from '../../Omni';
import Languages from '../../common/Languages';

export default class HFooter extends React.PureComponent {
  render() {
    const { viewAll } = this.props;

    return (
      <View style={styles.footer}>
        <TouchableOpacity onPress={viewAll} style={styles.footerButton}>
          <Text style={[styles.footerButtonText]}>{Languages.seeAll}</Text>
          <Icon style={styles.icon} name={'chevron-right'} />
        </TouchableOpacity>
      </View>
    );
  }
}
