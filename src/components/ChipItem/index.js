import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

class Item extends React.PureComponent {
  static defaultProps = {
    label: 'Restaurants',
  };

  render() {
    const { item, label, onPress, selected } = this.props;

    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={[styles.container, selected && styles.selected]}>
        <Text
          style={[
            styles.text,
            selected && styles.textSelected,
            item.level && styles[`level${item.level}`],
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Item;
