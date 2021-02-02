import React, { Component } from 'react';
import { FlatList, Platform, RefreshControl, Animated, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import ProductListItem from '../ProductListItem';
import Spinkit from '../Spinkit';
import Constants from '../../common/Constants';
import Color from '../../common/Color';

// const HEADER_MIN_HEIGHT = 40;
// const HEADER_SCROLL_DISTANCE =
//   Constants.Window.headerHeight - HEADER_MIN_HEIGHT;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class ProductListAll extends Component {
  state = { scrollY: new Animated.Value(0) };

  constructor(props) {
    super(props);

    this.page = props.page ? props.page : 0;
    this.limit = Constants.pagingLimit;
  }

  componentDidMount() {
    this.page === 0 && this.fetchData();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.list !== this.props.list;
  }

  fetchData = (reload = false) => {
    if (reload) {
      this.page = 1;
    }
    const { config, index, fetchProductsByCollections } = this.props;
    fetchProductsByCollections(config, this.page, index);
  };

  handleLoadMore = () => {
    if (!this.props.finish) {
      this.page += 1;
      this.fetchData();
    }
  };

  onRowClickHandle = item => {
    this.props.onViewProductScreen({ product: item });
  };

  renderItem = ({ item, index }) => {
    if (item == null) return <View />;
    const { itemWidth } = this.props;

    return (
      <ProductListItem
        product={item}
        key={`key-${index}-${item.slug}`}
        itemWidth={itemWidth}
        onViewProduct={() => this.onRowClickHandle(item)}
      />
    );
  };

  render() {
    const { list, isFetching } = this.props;

    const renderFooter = () => isFetching && <Spinkit />;

    return (
      <View style={[styles.listView, { backgroundColor: Color.background }]}>
        <AnimatedFlatList
          contentContainerStyle={styles.flatlist}
          data={list}
          keyExtractor={(item, index) => `${item.slug} || ${index}`}
          renderItem={this.renderItem}
          ListFooterComponent={renderFooter()}
          numColumns={2}
          refreshing={isFetching}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={() => this.fetchData(true)} />
          }
          onEndReachedThreshold={0.5}
          onEndReached={distance => distance.distanceFromEnd > 100 && this.handleLoadMore()}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: Platform.OS !== 'android' }
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ layouts }, ownProp) => {
  const index = ownProp.index;
  const list = layouts.layout[index].list;
  const isFetching = layouts.layout[index].isFetching;
  const finish = layouts.layout[index].finish;
  return { list, isFetching, finish };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions: LayoutActions } = require('@redux/LayoutRedux');
  return {
    ...ownProps,
    ...stateProps,
    fetchProductsByCollections: (config, page, index) => {
      LayoutActions.fetchProductsByCollections(dispatch, config, page, index);
    },
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(ProductListAll);
