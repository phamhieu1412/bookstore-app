import React, { PureComponent } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { SwipeRow } from 'react-native-swipe-list-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { UboIcon } from '../../../Omni';
import styles from './styles';
import cartStyles from '../styles';
import Styles from '../../../common/Styles';
import ProductCartItem from '../../../components/ProductCartItem'   ;
import ConfirmModal from '../../../components/ConfirmModal';

class MyCart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      note: props.carts.note,
      removingProduct: null,
      isConfirmModalOpen: false,
    };
  }

  openConfirmModal = () => {
    this.setState({ isConfirmModalOpen: true });
  };

  closeConfirmModal = () => {
    this.setState({ isConfirmModalOpen: false });
  };

  onPressRemoveItem = product => {
    this.openConfirmModal();
    this.setState({ removingProduct: product });
  };

  onRemoveCartItem = () => {
    const { removeCartItem } = this.props;
    const { removingProduct } = this.state;

    removeCartItem(removingProduct.cartId);
    this.closeConfirmModal();
  };

  render() {
    const { user, carts, updateCartNote, onViewProduct, products } = this.props;
    const arrayCarts = [];

    if(carts.orderItems && products.listAll) {
      for (let i = 0; i < carts.orderItems.length; i++) {
        const element = carts.orderItems[i].book_id;
        var __FOUND = products.listAll.find(function(book, index) {
        if(book.id == element)
          return true;
        });
        arrayCarts.push({
          ...__FOUND,
          quantityInCart: carts.orderItems[i].quantity,
          cartId: carts.orderItems[i].id
        })
      }
    }

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid>
          <View style={[styles.list, Styles.Common.shadowBottom]}>
            {arrayCarts.length &&
              arrayCarts.map((item, index) => (
                <SwipeRow
                  key={`swipeRow-${index}-${item.id}`}
                  disableRightSwipe
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  recalculateHiddenLayout>
                  {this.renderHiddenRow(item, index)}
                  <ProductCartItem
                    key={index.toString()}
                    product={item}
                    viewQuantity
                    trashIcon
                    quantity={item.quantityInCart}
                    onPress={() => onViewProduct(item)}
                    onPressRemove={this.onPressRemoveItem}
                  />
                </SwipeRow>
              ))}
          </View>
          {user.token ? this.renderSeperator() : null}
        </KeyboardAwareScrollView>
        {this.renderConfirmModal()}
      </View>
    );
  }

  renderSeperator = () => {
    return <View style={{ height: 9, backgroundColor: '#F0F0F0' }} />;
  };

  renderConfirmModal() {
    return (
      <ConfirmModal
        isModalVisible={this.state.isConfirmModalOpen}
        messageText={'Bạn có chắc chắn muốn xóa quyển sách này?'}
        closeModal={this.closeConfirmModal}
        onPressYes={this.onRemoveCartItem}
      />
    );
  }

  renderHiddenRow = (rowData, index) => {
    return (
      <TouchableOpacity
        key={`hiddenRow-${index}-${rowData.productSlug}`}
        style={styles.hiddenRow}
        onPress={() => this.props.removeCartItem(rowData)}>
        <View style={{ marginRight: 23 }}>
          <FontAwesome name="trash" size={30} color="white" />
        </View>
      </TouchableOpacity>
    );
  };
}

const mapStateToProps = ({ carts, products, user }) => {
  return {
    user,
    carts,
    products,
    orderItems: carts.orderItems,
    paymentAfterSaleOff: carts.paymentAfterSaleOff,

    isFetching: products.isFetching,
    type: products.type,
    message: products.message,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { carts } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions } = require('@redux/CartRedux');

  return {
    ...ownProps,
    ...stateProps,
    removeCartItem: product => {
      actions.removeCartItem(dispatch, product, carts);
    },
    updateCartNote: note => {
      dispatch(actions.updateCartNote(note, carts));
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(MyCart);
