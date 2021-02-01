import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';

import styles from './styles';
import Color from '../../common/Color';
import ProductSwiperItem from '../ProductSwiperItem';

class ProductRelated extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onViewProductScreen: PropTypes.func,
    products: PropTypes.array,
  };

  onRowClickHandle = product => this.props.onViewProductScreen({ product });

  render() {
    const { title, products } = this.props;

    if (products.length === 0) {
      return <View />;
    }
    return (
      <View style={[styles.wrap, { backgroundColor: Color.background }]}>
        <View style={styles.head}>
          <Text style={[styles.headTitle, { color: Color.Text }]}>{title.toUpperCase()}</Text>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            keyExtractor={(item, index) => `related__${index}`}
            overScrollMode="never"
            showsHorizontalScrollIndicator={false}
            horizontal
            data={products}
            renderItem={({ item }) => (
              <ProductSwiperItem product={item} onViewProduct={() => this.onRowClickHandle(item)} />
            )}
          />
        </View>
      </View>
    );
  }
}

ProductRelated.defaultProps = {
  products: [],
};

export default ProductRelated;
