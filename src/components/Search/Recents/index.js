import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import Chips from '../../Chips';
import styles from './styles';
import Languages from '../../../common/Languages';

class Recents extends React.PureComponent {
  render() {
    const { histories, onClear, onSearch, searchText } = this.props;

    if (histories.length === 0) {
      return <View />;
    }

    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>{Languages.Result}</Text>

          <TouchableOpacity onPress={onClear}>
            <Image source={require('../../../images/ic_trash.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Chips items={histories} selectedItem={searchText} onPress={onSearch} />
      </View>
    );
  }
}

export default Recents;
