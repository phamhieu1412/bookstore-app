import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import { connect } from 'react-redux';

import { BlockTimer } from '../../Omni';
import LogoSpinner from '../../components/LogoSpinner';
import Empty from '../../components/Empty';
import SubCategories from './SubCategories';
// import { logEventViewCategory } from '../../api/eventLogger';
import ProductListItem from '../../components/ProductListItem';
import Color from '../../common/Color';
import Styles from '../../common/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
});

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      loadingBuffer: true,
      onEndReached: false,
      currentCategorySlug: '',
      pageNumber: 0,
    };
    // this.pageNumber = 1;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { category } = nextProps;
    if (category.slug !== prevState.currentCategorySlug) {
      nextProps.clearProducts();
      // nextProps.fetchProductsByCategorySlug(category.slug, 1);
      // eventLogger
    //   logEventViewCategory(category);
      return { currentCategorySlug: category.slug, pageNumber: 1, loadingBuffer: true };
    } else {
      // const { endReached } = nextProps;
      // if (endReached !== prevState.onEndReached) {
      //   if (endReached) {
      //     const { products, fetchProductsByCategorySlug } = nextProps;
      //     if (!products.isFetching && products.stillFetch) {
      //       fetchProductsByCategorySlug(category.slug, prevState.pageNumber + 1);
      //       return { onEndReached: endReached, pageNumber: prevState.pageNumber + 1 };
      //     }
      //   }
      //   return { onEndReached: endReached };
      // }
    }

    if (prevState.loadingBuffer) {
      return { loadingBuffer: false };
    }

    return null;
  }

  render() {
    const { loadingBuffer } = this.state;
    const { products, category } = this.props;

    // if (!category) return null;

    // if (products.error) {
    //   return <Empty text={products.error} />;
    // }

    // if (loadingBuffer) {
    //   return <LogoSpinner fullStretch />;
    // }

    return (
      <View style={styles.container}>
        {this.renderList()}
      </View>
    );
  }

  renderList = () => {
    const { booksRelate } = this.props;

    return (
      <FlatList
        style={Styles.Common.columnFlatlist}
        data={booksRelate.items}
        keyExtractor={(item, index) => `product_${item.id}_${index}`}
        renderItem={this.renderItem}
        scrollEventThrottle={16}
        numColumns={2}
        // refreshing={isFetching}
        // refreshControl={<RefreshControl refreshing={isFetching} onRefresh={this.onRefreshHandle} />}
        // onEndReachedThreshold={0.3}
        // onEndReached={this.onEndReached}
        onScroll={Animated.event(
          [{nativeEvent:{contentOffset:{y: this.state.scrollY}}}],
          {useNativeDriver: false}
        )}
      />
    );
  };

  renderItem = ({ item, index }) => {
    if (item === null) return <View key="post_" />;

    return (
      <ProductListItem
        product={item}
        key={`item-${index}-${item.id}`}
        onViewProduct={() => this.onProductClickHandle(item)}
      />
    );
  };

  onCategoryPressHandle = category => {
    const { onViewCategoryScreen, category: parent } = this.props;
    // BlockTimer.execute(() => {
    //   setSelectedCategory({
    //     ...category,
    //     mainCategory: category,
    //   });
    // }, 500);
    Object.assign(category, { parent });
    onViewCategoryScreen(category);
  };

  onProductClickHandle = product => {
    BlockTimer.execute(() => {
      this.props.onViewProductScreen({ product });
    }, 500);
  };

  onRefreshHandle = () => {
    const { clearProducts, category } = this.props;
    // const { fetchProductsByCategorySlug, clearProducts, category } = this.props;
    this.pageNumber = 1;
    clearProducts();
    // fetchProductsByCategorySlug(category.slug, this.pageNumber++);
  };
}

const mapStateToProps = state => {
  return {
    // selectedCategory: state.categories.selectedCategory,
    netInfo: state.netInfo,
    displayMode: state.categories.displayMode,
    products: state.products,
    // wishListItems: state.wishList.wishListItems,
    filters: state.categories.filters,
    booksRelate: state.products.booksRelate,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions } = require('../../redux/ProductRedux');
  // const NetInfoRedux = require('@redux/NetInfoRedux');
  return {
    ...ownProps,
    ...stateProps,
    // fetchProductsByCategorySlug: (categorySlug, page) => {
    //   if (!netInfo.isConnected) {
    //     NetInfoRedux.actions.renewConnectionStatus(dispatch);
    //   } else {
    //     // actions.fetchProductsByCategorySlug(dispatch, categorySlug, page);
    //   }
    // },
    clearProducts: () => dispatch(actions.clearListProducts()),
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(CategoryScreen);
