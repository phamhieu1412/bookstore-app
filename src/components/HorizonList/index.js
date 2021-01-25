import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import makeGetCollections from '../../selectors/LayoutSelector';
import HList from './HList';
import styles from './styles';
import Button from '../Button/Button';

// @withNavigation
class HorizonList extends Component {
  static propTypes = {
    fetchAllProductsLayout: PropTypes.func.isRequired,
    fetchProductsByCollections: PropTypes.func,
    list: PropTypes.array,
    onShowAll: PropTypes.func,
    onViewProductScreen: PropTypes.func,
    collections: PropTypes.array,
    // setSelectedCategory: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    showCategoriesScreen: PropTypes.func,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { appConfig } = nextProps;
    const layouts =
      appConfig && appConfig.homeLayout && appConfig.homeLayout.length ? appConfig.homeLayout : [];
    if (layouts.length !== prevState.layouts.length) {
      prevState.fetchAllPost();
      return { layouts };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      layouts: [],
      fetchAllPost: this._fetchAllPost,
    };
  }

  // componentDidMount() {
  //   this._fetchAllPost();
  // }

  // getHomeLayout = () => {
  //   const { appConfig } = this.props;
  //   let layouts =
  //     appConfig && appConfig.homeLayout && appConfig.homeLayout.length ? appConfig.homeLayout : [];

  //   return layouts;
  // };

  /**
   * Fetch all products based on layouts
   */
  _fetchAllPost = () => {
    if (this.props.isConnected) {
      this.props.fetchAllProductsLayout();
    }
  };

  _fetchPost = ({ config, index, page }) => {
    const { fetchProductsByCollections } = this.props;
    fetchProductsByCollections(config, page, index);
  };

  _renderItem = ({ item, index }) => {
    const { layouts } = this.state;

    const {
      onShowAll,
      onViewProductScreen,
      collections,
      categoryList,
      // setSelectedCategory,
      fetchProductsByCollections,
      endReached,
      showCategoriesScreen,
      onViewCategory,
    } = this.props;

    return (
      <HList
        horizontal
        onViewProductScreen={onViewProductScreen}
        onShowAll={onShowAll}
        key={`taglist-${index}`}
        config={item}
        index={index}
        isLast={index === layouts.length - 1}
        collection={collections[index]}
        categoryList={[]}
        fetchPost={this._fetchPost}
        fetchProductsByCollections={fetchProductsByCollections}
        endReached={endReached}
        // setSelectedCategory={setSelectedCategory}
        showCategoriesScreen={showCategoriesScreen}
        onViewCategory={onViewCategory}
      />
    );
  };

  render() {
    const { layouts } = this.state;
    const { showCategoriesScreen } = this.props;

    return (
      <>
        <FlatList
          listKey={`home-layout-all`}
          data={layouts}
          keyExtractor={(item, index) => `h_${item.layout}_${index}` || `h_${index}`}
          renderItem={this._renderItem}
          scrollEventThrottle={16}
          // refreshing={isFetching}
          overScrollMode="never"
          scrollPerfTag="scrollAndroid"
          contentContainerStyle={styles.mainList}
          refreshControl={
            <RefreshControl
              // tintColor={Color.Text}
              // refreshing={isFetching}
              onRefresh={this._fetchAllPost}
            />
          }
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={showCategoriesScreen}
            text={'Xem thêm danh mục khác'}
          />
        </View>
        {/* <HomeProductList
          headerLabel={'Mặt hàng'}
          onViewProductScreen={onViewProductScreen}
          endReached={endReached}
        /> */}
      </>
    );
  }
}

const makeMapStateToProps = () => {
  const getCollections = makeGetCollections();
  const mapStateToProps = (state, props) => {
    return {
      appConfig: {},
      // appConfig: state.app.config && state.app.config.app ? state.app.config.app : {},
      collections: getCollections(state, props),
      // categoryList: state.categories.topList,
      // isFetching: state.layouts.isFetching,
      // isConnected: state.netInfo.isConnected,
      isFetching: false,
      isConnected: true,
    };
  };
  return mapStateToProps;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  // const { actions: LayoutActions } = require('@redux/LayoutRedux');
  // const { actions: CategoryActions } = require('@redux/CategoryRedux');
  return {
    ...ownProps,
    ...stateProps,
    // setSelectedCategory: category => dispatch(CategoryActions.setSelectedCategory(category)),

    // fetchProductsByCollections: (config, page, index) => {
    //   LayoutActions.fetchProductsLayout(dispatch, config, page, index);
    // },
    // fetchAllProductsLayout: () => {
    //   dispatch(LayoutActions.fetchAllProductsLayout());
    // },
  };
};

export default connect(
  makeMapStateToProps,
  null,
  mergeProps
)(HorizonList);
