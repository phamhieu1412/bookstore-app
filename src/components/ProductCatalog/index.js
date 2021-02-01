import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import Item from '../ChipItem';
import Languages from '../../common/Languages';

class ProductCatalog extends React.PureComponent {
  static defaultProps = {
    categories: [],
  };

  render() {
    const { categories, selected } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.text}>{Languages.ProductCatalog}</Text>
        </View>

        <View style={styles.container}>
          {categories.map((item, index) => (
            <Item
              item={item}
              key={index}
              label={item.name}
              onPress={this.onPress}
              selected={selected === item.slug}
            />
          ))}
        </View>
      </View>
    );
  }

  onPress = item => {
    this.props.onSelectCategory(item);
  };
}

export default ProductCatalog;
