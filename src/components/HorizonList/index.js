import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import makeGetCollections from '../../selectors/LayoutSelector';
import HList from './HList';
import HomeProductList from '../HomeProductList/index';

// @withNavigation
class HorizonList extends Component {
  static propTypes = {
    fetchAllProductsLayout: PropTypes.func.isRequired,
    fetchProductsByCollections: PropTypes.func,
    list: PropTypes.array,
    onShowAll: PropTypes.func,
    onViewProductScreen: PropTypes.func,
    collections: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    showCategoriesScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { onViewProductScreen, endReached } = this.props;

    return (
      <>
        <HomeProductList
          onViewProductScreen={onViewProductScreen}
          endReached={endReached}
        />
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
