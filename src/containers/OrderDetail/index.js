/** @format */

import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { Icon } from '../../Omni';
import SuccessMessage from './SuccessMessage';
import StateIndicators from './StateIndicators';
import OrderInformation from './OrderInformation';
import OrderItems from './OrderItems';
import RatingDetail from './components/RatingDetail';
import OrderEmpty from '../MyOrders/Empty';
import { convertCartItemToProduct } from '../../ultils/Product';
import styles from './styles';
import Images from '../../common/Images';
import Languages from '../../common/Languages';
import Spinner from '../../components/Spinner';
import ConfirmModal from '../../components/ConfirmModal';
import ShopButton from '../../components/ShopButton';

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderNumber: '',
      showOrderItems: true,
      showRating: false,
      cancellingCode: '',
      isConfirmModalOpen: false,
      initializedRating: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      orderNumber: nextOrderNumber,
      getOrderDetail,
      getReviewOrders,
      reviewOrders,
      order,
    } = nextProps;
    const { orderNumber: prevOrderNumber, initializedRating } = prevState;
    if (nextOrderNumber !== prevOrderNumber) {
      getOrderDetail(nextOrderNumber);
      getReviewOrders(nextOrderNumber);

      return { orderNumber: nextOrderNumber };
    } else if (
      order &&
      order.state === 'completed' &&
      (!reviewOrders || !reviewOrders.id) &&
      !initializedRating
    ) {
      return {
        showOrderItems: false,
        showRating: true,
        initializedRating: true,
      };
    }

    return null;
  }

  _getStatus = status => {
    const statusList = {
      checkout: 'Đặt hàng',
      pending: 'Đặt hàng',
      received: 'Đặt hàng',
      processing: 'Đặt hàng',
      shipping: 'Đóng gói',
      shipped: 'Tới POS',
      completed: 'Nhận hàng',
      cancelled: 'Đã hủy',
      returned: 'Đã trả lại',
    };

    return statusList[status] || 'Đặt hàng';
  };

  findPos = posCode => {
    const { pos } = this.props;
    if (!pos || !pos.list || !pos.list.length) {
      return false;
    }
    return pos.list.find(item => item.code === posCode);
  };

  toggleShowOrderItems = () => {
    this.setState({ showOrderItems: !this.state.showOrderItems, showRating: false });
  };

  goToRatingScreen = () => {
    const { order, navigation } = this.props;

    navigation.navigate('RatingScreen', order );
  };

  closeConfirmModal = () => {
    this.setState({ isConfirmModalOpen: false });
  };

  openConfirmModal = () => {
    this.setState({ isConfirmModalOpen: true });
  };

  onLongPress = productCode => {
    this.openConfirmModal();
    this.setState({ cancellingCode: productCode });
  };

  onCancelOrderItem = () => {
    const {
      order: { orderNumber },
      cancelOrderItem,
    } = this.props;
    const { cancellingCode } = this.state;

    cancelOrderItem(orderNumber, cancellingCode);
    this.closeConfirmModal();
  };

  goToHome = () => {
    const { onViewHomeScreen } = this.props;
    onViewHomeScreen();
  };

  onViewProduct = product => {
    const { onViewProduct } = this.props;
    onViewProduct(convertCartItemToProduct(product));
  };

  renderConfirmModal() {
    return (
      <ConfirmModal
        isModalVisible={this.state.isConfirmModalOpen}
        messageText={'Bạn có chắc chắn muốn hủy bỏ mặt hàng?'}
        closeModal={this.closeConfirmModal}
        onPressYes={this.onCancelOrderItem}
      />
    );
  }

  render() {
    const {
      order,
      showSuccessMessage,
      isFetching,
      postReviewOrders,
      reviewOrders,
      user,
    } = this.props;
    const { showOrderItems, showRating } = this.state;
    const posCode = order && order.shipping && order.shipping.posCode ? order.shipping.posCode : '';
    const selectedPos = this.findPos(posCode);

    return (
      <View style={{ position: 'relative', flex: 1 }}>
        {order && order.id ? (
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Xem khi nao don hang duoc hoan thanh */}
            {showSuccessMessage && <SuccessMessage />}

            <StateIndicators order={order} />

            <OrderInformation order={order} pos={selectedPos} />

            <OrderItems
              order={order}
              onPress={this.onViewProduct}
              onLongPress={this.onLongPress}
            />

            {/* <ShopButton
              text={Languages.ContinueShopping}
              onPress={this.goToHome}
              css={{ marginTop: 35 }}
            /> */}
          </ScrollView>
        ) : (
            <OrderEmpty text={'Hiện không thể xem đơn hàng này'} onViewHome={this.goToHome} />
          )}
        {isFetching ? <Spinner mode="overlay" /> : null}
        {order && order.id ? this.renderConfirmModal() : null}
        {
          order && order.status && order.status === 1 ?
            <View style={styles.viewButttonRating}>
              {reviewOrders.id ? (
                <TouchableOpacity
                  style={styles.buttonContent}
                  onPress={this.goToRatingScreen}
                  activeOpacity={0.8}
                >
                  <Text style={styles.toggleButtonText}>Mua lại</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    style={styles.buttonContent}
                    onPress={this.goToRatingScreen}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.toggleButtonText}>Đánh giá</Text>
                  </TouchableOpacity>
                )}
            </View>
            : <></>
        }
      </View>
    );
  }
}

const mapStateToProps = ({ myOrders, pos, user }) => {
  const { orderDetail: order, isDetailFetching: isFetching, reviewOrders } = myOrders;

  return { order, pos, isFetching, reviewOrders, user };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions: orderActions } = require('../../redux/OrderRedux');
  return {
    ...ownProps,
    ...stateProps,
    cancelOrderItem: (orderNumber, productCode) => {
      orderActions.cancelOrderItem(dispatch, orderNumber, productCode);
    },
    getOrderDetail: orderNumber => {
      orderActions.fetchOrderDetail(dispatch, orderNumber);
    },
    postReviewOrders: reviewInfo => {
      orderActions.postReviewOrders(dispatch, reviewInfo);
    },
    getReviewOrders: orderNumber => {
      orderActions.getReviewOrders(dispatch, orderNumber);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(OrderDetail);
