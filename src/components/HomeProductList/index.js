import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';

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

    this.startFetchData(false);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { endReached } = nextProps;
    const { onEndReached } = prevState;

    if (endReached !== onEndReached) {
      if (endReached) {
        const page = prevState.page + 1;

        nextProps.fetchProducts(page);
        return { page, onEndReached: endReached };
      }
      return { onEndReached: endReached };
    }

    return null;
  }

  // componentDidMount() {
  //   if (this.state.page === 1) {
  //     this.startFetchData(true);
  //   }
  // }

  shouldComponentUpdate(nextProps) {
    return nextProps.list.length !== this.props.list.length;
  }

  startFetchData = (setState = true) => {
    if (setState) this.setState({ page: 1 });
    this.props.initProduct();
    this.props.fetchProducts(1);
  };

  fetchNextPage = () => {
    const page = this.state.page + 1;
    this.setState({ page });

    this.props.fetchProducts(page);
  };

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
    const { list } = this.props;

    return (
      <FlatList
        listKey="home-vertical"
        overScrollMode="never"
        contentContainerStyle={Styles.Common.listContainer}
        style={[Styles.Common.columnFlatlist]}
        data={list}
        keyExtractor={(item, index) => `post_${item.slug}_${index}`}
        renderItem={this.renderItem}
        scrollEventThrottle={16}
        numColumns={2}
        // refreshing={isFetching}
        // refreshControl={
        //   <RefreshControl refreshing={isFetching} onRefresh={() => this.startFetchData(true)} />
        // }
        ListHeaderComponent={this.headerComponent}
        // onEndReachedThreshold={0.5}
        // onEndReached={this.fetchNextPage}
        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
      />
    );
  }
}

const mapStateToProps = ({ products, page }) => {
  const list = products.listAll;
  const isFetching = products.isFetching;
  return { list, isFetching, page };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const Product = require('@redux/ProductRedux');

  return {
    ...ownProps,
    ...stateProps,
    fetchProducts: page => {
      Product.actions.fetchAllProducts(dispatch, page, Constants.pagingLimit);
    },
    initProduct: () => dispatch(Product.actions.clearListAllProducts()),
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(HomeProductList);
