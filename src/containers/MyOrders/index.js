import React, { PureComponent } from 'react';
import { RefreshControl, FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import Languages from '../../common/Languages';
import styles from './styles';
import OrderEmpty from './Empty';
import OrderItem from './OrderItem';

class MyOrders extends PureComponent {
  state = {};

  static getDerivedStateFromProps(nextProps) {
    // nextProps.fetchMyOrder();

    return null;
  }

  componentDidMount() {
    // this.props.invalidateMyOrders();
  }

  refreshMyOrder = () => {
    this.props.clearMyOrders();
    this.props.fetchMyOrder();
  };

  fetchMyOrder = () => {
    const { currentPage } = this.props;
    this.props.fetchMyOrder(currentPage + 1);
  };

  renderError(error) {
    return (
      <OrderEmpty
        text={error}
        onReload={this.fetchMyOrder}
        onViewHome={this.props.onViewHomeScreen}
      />
    );
  }

  renderRow = ({ item, index }) => {
    return (
      <OrderItem
        key={index.toString()}
        order={item}
        onViewOrderDetail={this.props.onViewOrderDetail}
      />
    );
  };

  render() {
    const data = this.props.myOrders.orders;

    if (typeof data === 'undefined' || !data.length) {
      return (
        <OrderEmpty
          text={Languages.NoOrder}
          onReload={this.fetchMyOrder}
          onViewHome={this.props.onViewHomeScreen}
        />
      );
    }

    return (
      <View style={styles.listView}>
        <FlatList
          data={data}
          // onScroll={Animated.event(
          //   [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          //   { useNativeDriver: Platform.OS !== 'android' }
          // )}
          // scrollEventThrottle={16}
          keyExtractor={(item, index) => `${item.id} || ${index}`}
          contentContainerStyle={styles.flatlist}
          renderItem={this.renderRow}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.props.myOrders.isFetching}
          //     onRefresh={this.refreshMyOrder}
          //   />
          // }
          onEndReachedThreshold={0.3}
          // onEndReached={this.fetchMyOrder}
        />
      </View>
    );
  }
}
const mapStateToProps = ({ user, myOrders }) => ({
  user,
  myOrders,
  currentPage: myOrders.currentPage,
});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require('../../redux/OrderRedux');
  const { actions: UserActions } = require('../../redux/UserRedux');
  return {
    ...ownProps,
    ...stateProps,
    fetchMyOrder: (payload) => {
      dispatch(UserActions.loadUserProfile(payload));
      // dispatch(actions.fetchMyOrderIfNeeded(page));
    },
    clearMyOrders: () => {
      dispatch(actions.clearMyOrders());
    },
    invalidateMyOrders: () => {
      dispatch(actions.invalidateMyOrders());
    },
  };
}
export default connect(
  mapStateToProps,
  null,
  mergeProps
)(MyOrders);
