import React, { Component } from 'react';
import { FlatList, Text, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import ProductListItem from '../ProductListItem';
import Constants from '../../common/Constants';
import Styles from '../../common/Styles';
import Color from '../../common/Color';

// const HEADER_MIN_HEIGHT = 40;
// const HEADER_SCROLL_DISTANCE = Constants.Window.headerHeight - HEADER_MIN_HEIGHT;

class HomeProductList extends Component {
  constructor(props) {
    super(props);
    // this.page = 1;
    this.limit = Constants.pagingLimit;
    this.state = { onEndReached: false, page: 1 };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    nextProps.fetchProducts(2);

    return null;
  }
  componentDidMount() {
  }

  refreshBooks = () => {
    this.props.clearBooks();
    this.props.fetchProducts();
  };

  fetchProducts = () => {
    const { currentPage } = this.props;
    // this.props.fetchProducts(currentPage + 1);
  };

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.list.length !== this.props.list.length;
  // }

  onRowClickHandle = item => {
    this.props.onViewProductScreen({ product: item });
  };

  renderItem = ({ item, index }) => {
    if (item == null) return <View />;

    return (
      <ProductListItem
        product={item}
        key={`key-${index}`}
        onViewProduct={() => this.onRowClickHandle(item)}
      />
    );
  };

  headerComponent = () => {
    const { headerLabel } = this.props;

    if (typeof headerLabel != 'undefined') {
      return (
        <View style={styles.headerLabel}>
          <View style={styles.headerLeft}>
            <Text style={[styles.tagHeader, { color: Color.Text }]}>
              {headerLabel.toUpperCase()}
            </Text>
          </View>
        </View>
      );
    }

    return <View />;
  };

  render() {
    const { list, isFetching, booksBestSeller } = this.props;
    let arrayBooksBestSeller = [];
    for (let i = 0; i < 4; i++) {
      const element = booksBestSeller[i];
      arrayBooksBestSeller.push(element);
    }

    return (
      <>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1.5, y: 1.5}}
          colors={['#982649', '#FE5F00']}
          style={styles.titleCategory}>
          <Text style={{ color: 'white', fontWeight: '700' }}>MUA NHIỀU</Text>
        </LinearGradient>
        <FlatList
          contentContainerStyle={Styles.Common.listContainer}
          style={[Styles.Common.columnFlatlist]}
          data={arrayBooksBestSeller}
          keyExtractor={(item, index) => `post_${item.id}_${index}`}
          renderItem={this.renderItem}
          scrollEventThrottle={16}
          numColumns={2}
        />

        
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1.5, y: 1.5}}
          colors={['#552649', '#C4EF00']}
          style={styles.titleCategory}>
          <Text style={{ color: 'white', fontWeight: '700' }}>LOẠI SÁCH KHÁC</Text>
        </LinearGradient>
        <FlatList
          // listKey="home-vertical"
          // overScrollMode="never"
          contentContainerStyle={Styles.Common.listContainer}
          style={[Styles.Common.columnFlatlist]}
          data={list}
          keyExtractor={(item, index) => `post_${item.id}_${index}`}
          renderItem={this.renderItem}
          scrollEventThrottle={16}
          numColumns={2}
          // refreshing={isFetching}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={this.refreshBooks} />
          }
          // ListHeaderComponent={this.headerComponent}
          onEndReachedThreshold={0.3}
          onEndReached={this.fetchProducts}
          // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
        />
      </>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  list: products.listAll,
  booksBestSeller: products.booksBestSeller,
  isFetching: products.isFetching,
  pages: products.pages,
  currentPage: products.currentPage,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const Product = require('../../redux/ProductRedux.js');

  return {
    ...ownProps,
    ...stateProps,
    fetchProducts: (page=1) => {
      dispatch(Product.actions.fetchBooksIfNeeded(page));
    },
    clearBooks: () => {
      Product.actions.clearBooks(dispatch);
    },
    initProduct: () => dispatch(Product.actions.clearListAllProducts()),
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(HomeProductList);
