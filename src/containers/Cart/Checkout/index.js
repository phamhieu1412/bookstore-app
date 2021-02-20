import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Tcomb from 'tcomb-form-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Icon, UboIcon, toast } from '../../../Omni';
import { checkPromotionGiftProducts } from '../../../ultils/Product';
import DeliveryDateSelect from './DeliveryDateSelect';
// import PromotionCode from './PromotionCode';
// import RequestShipping from './RequestShipping';
import BottomActions from './CheckoutBottomActions';
import styles from './styles';
import cartStyles from '../styles';
import Languages from '../../../common/Languages';
import Constants from '../../../common/Constants';
// import { AwaredProducts } from '@components';

const Form = Tcomb.form.Form;

const _tomorrow = () => {
  const nextDay = moment().hour() >= 20 ? 2 : 1;
  return moment()
    .add(nextDay, 'days')
    .format(Constants.isoDateFormat);
};

class Checkout extends Component {
  constructor(props) {
    super(props);
    const { user: userProfile, carts, cartToken } = props;
    const user = userProfile && userProfile.user ? userProfile.user : false;

    const posCode = carts.shipping.posCode
      ? carts.shipping.posCode
      : user && user.defaultPosCode
      ? user.defaultPosCode
      : '';
    const promotionId = carts.promotion.promotionId ? carts.promotion.promotionId : '';
    this.state = {
      currentCartToken: cartToken,
      value: {
        posCode,
        deliveryTime: carts.shipping.deliveryTime
          ? moment(carts.shipping.deliveryTime).format(Constants.isoDateFormat)
          : _tomorrow(),
        promotionId,
      },
      showScrollIndicator: promotionId && checkPromotionGiftProducts(carts),
      valueCouponCode: '',
      coupon: {},
      valuePercentCoupon: 0,
      valueComment: '',
    };

    this.initFormValues();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { cartToken, carts, user, getWallet, fetchPromotionCodesIfNeeded } = nextProps;
    // const { value } = prevState;
    fetchPromotionCodesIfNeeded();
    getWallet();

    let posCode = carts.shipping.posCode ? carts.shipping.posCode : '';
    const deliveryTime = carts.shipping.deliveryTime
      ? moment(carts.shipping.deliveryTime).format(Constants.isoDateFormat)
      : _tomorrow();
    const promotionId = carts.promotion.promotionId ? carts.promotion.promotionId : '';

    if (!posCode && user && user.defaultPosCode) {
      posCode = user.defaultPosCode;

      const { updateCart } = nextProps;
      updateCart({ POSCode: posCode });

      return null;
      // } else if (posCode && !prevState.value.posCode) {
      //   return {
      //     value: {
      //       posCode,
      //       deliveryTime,
      //       promotionId,
      //     },
      //   };
    }

    if (cartToken !== prevState.currentCartToken) {
      return {
        currentCartToken: cartToken,
        value: {
          posCode,
          deliveryTime,
          promotionId,
        },
      };
    }

    return null;
  }

  componentDidMount() {
    const { navigation } = this.props;

    this._navListener = navigation.addListener('focus', () => {
      const { user, fetchCart, fetchPromotionCodes } = this.props;
      if (user.token) {
        // fetchPromotionCodes();
        fetchCart(user.token);
      }
    });
  }

  componentWillUnmount() {
    this._navListener();
  }

  onChange = value => {
    this.setState({ value });
    this.submitForm(value);
  };

  // onPress = () => this.refs.form.getValue();

  initFormValues = () => {
    // const { carts } = this.props;
    // define customer form
    const formDefinition = {
      deliveryTime: Tcomb.String,
    };

    this.Customer = Tcomb.struct(formDefinition);
    // form options
    this.options = {
      auto: 'none', // we have labels and placeholders as option here (in Engrish, ofcourse).
      // stylesheet: css,
      fields: {
        deliveryTime: {
          label: 'Chọn thời gian nhận hàng',
          mode: 'date',
          // minimumDate: _tomorrow(),
          template: DeliveryDateSelect, // Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid,
          nullOption: false,
        },
      },
      i18n: {
        optional: '',
        required: '',
        // add: 'Add', // add button
        // remove: '✘', // remove button
        // up: '↑', // move up button
        // down: '↓', // move down button
      },
    };
  };

  submitForm = value => {
    const { updateCart } = this.props;
    const payload = {};
    const { posCode, deliveryTime, promotionId } = value;
    // if (deliveryTime && posCode) {
    //   const deliveryMoment = moment(deliveryTime);
    //   payload.DeliveryDate = deliveryMoment.format(Constants.isoDateFormat);
    //   payload.DeliveryTime = '10:00'; // deliveryMoment.format('HH:mm');

    //   const validatedPOSCode = this.validatePOSCode(posCode);
    //   if (validatedPOSCode) payload.POSCode = validatedPOSCode;
    // }

    // payload.PromotionId = promotionId || '';

    // updateCart(payload);
  };

  onFinishOrder = orderNumber => {
    const { onFinishOrder, invalidateMyOrders } = this.props;
    onFinishOrder(orderNumber);
    invalidateMyOrders();
  };

  updateRequestShipping = value => {
    this.props.updateCart({ ShipToCustomer: value });
  };

  updateShippingAddress = value => {
    this.props.updateCart({ ShippingAddress: value });
  };

  checkout = () => {
    const {
      value: { deliveryTime },
      valueCouponCode,
      valueComment,
    } = this.state;
    const { carts, createNewOrder, navigation } = this.props;
    // const orderDetails = [];
    // for (let i = 0; i < carts.orderItems.length; i++) {
    //   const e = carts.orderItems[i];
    //   orderDetails.push({
    //     book_id: `${e.book_id}`,
    //     quantity: e.quantity,
    //   });
    // }
    // if (!deliveryTime) {
    //   toast('Bạn chưa chọn thời gian nhận hàng');
    //   return;
    // }
    // createNewOrder(
    //   {
    //     required_date: `${new Date(deliveryTime).getTime() / 1000}`,
    //     comment: `${valueComment}`,
    //     coupon_code: valueCouponCode,
    //     order_details: orderDetails,
    //   },
    //   {
    //     onSuccess: () => {
    //       toast('Thêm đơn hàng thành công');
    //       navigation.navigate('Home');
    //     },
    //     onFailure: () => {
    //       toast('Thêm đơn hàng thất bại');
    //     },
    //   },
    // );
    console.log('payload', 
      {
        content: `${valueComment}`,
        coupon_code: valueCouponCode,
        address_id: 'address_id',
      })
  };

  onGetCouponDetail = () => {
    const { getCouponDetail } = this.props;
    
    getCouponDetail(this.state.valueCouponCode, {
      onSuccess: (coupon) => {
        console.log(coupon)
        this.setState({ valueCouponCode: coupon.code, coupon })
      },
      onFailure: () => {
        toast('Mã khuyến mại không đúng.');
      },
    });
  };

  isCloseToBottomView = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  hideScrollIndicator = () => {
    if (this.state.showScrollIndicator) {
      this.setState({ showScrollIndicator: false });
    }
  };

  showScrollIndicator = () => {
    if (!this.state.showScrollIndicator) {
      this.setState({ showScrollIndicator: true });
    }
  };

  render() {
    const { carts, cartToken, user, wallet, updateCart, updateDefaultShippingAddress } = this.props;
    const { showScrollIndicator, valueComment, valueCouponCode, coupon } = this.state;

    if (!user || !user.user) {
      return <View />;
    }
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.form}
          enableOnAndroid
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottomView(nativeEvent)) {
              this.hideScrollIndicator();
            } else {
              this.showScrollIndicator();
            }
          }}
          scrollEventThrottle={400}>
          <View style={styles.formContainer}>
            {/* bo thoi gian giao hang */}
            {/* <Form
              ref="form"
              type={this.Customer}
              options={this.options}
              value={this.state.value}
              onChange={this.onChange}
            />

            <View style={styles.divider} /> */}

            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Mã giảm giá</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.setState({ valueCouponCode: text })}
                value={valueCouponCode}
                onEndEditing={this.onGetCouponDetail}
              />
              {coupon && coupon.description && (
                <Text style={{ fontSize: 13, opacity: 0.6 }}>
                  {`Chi tiết: ${coupon.description}`}
                </Text>
              )}
            </View>

            <View style={styles.divider} />

            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Ghi chú</Text>
              <TextInput
                multiline
                numberOfLines={4}
                style={{ height: 80, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.setState({ valueComment: text })}
                value={valueComment}
              />
            </View>
          </View>

        </KeyboardAwareScrollView>

        <BottomActions
          carts={carts}
          wallet={wallet}
          nextText={Languages.Checkout}
          updateCart={updateCart}
          onNext={this.checkout}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ carts, user, pos, products }) => {
  return {
    user,
    pos,
    promotionCodes: carts.promotionCodes || [],
    carts,
    cartToken: carts.token,
    wallet: user.wallet,
    viewedProducts: products.viewedProducts,
    // userFetching: user.isFetching,
    // isFetching: carts.isFetching,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { carts } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions: CartActions } = require('../../../redux/CartRedux');
  const { actions: UserActions } = require('../../../redux/UserRedux');
  const { actions: OrderActions } = require('../../../redux/OrderRedux');

  return {
    ...ownProps,
    ...stateProps,
    fetchCart: cartToken => {
      dispatch(CartActions.fetchCart(cartToken));
    },
    fetchPromotionCodesIfNeeded: () => {
      dispatch(CartActions.fetchPromotionCodesIfNeeded());
    },
    fetchPromotionCodes: () => {
      CartActions.fetchPromotionCodes(dispatch, carts.token);
    },
    getWallet: () => dispatch(UserActions.loadWalletIfNeeded()),
    updateDefaultShippingAddress: address =>
      UserActions.updateDefaultShippingAddress(dispatch, address),
    updateCart: payload => {
      dispatch(CartActions.updateCart(payload));
    },
    getCouponDetail: (id, meta) => {
      dispatch(CartActions.getCouponDetail(id, meta));
    },
    createNewOrder: (payload, meta) => {
      dispatch(CartActions.createNewOrder(payload, meta));
    },
    checkout: (payload, onFinishOrder) => dispatch(CartActions.checkout(payload, onFinishOrder)),
    invalidateMyOrders: () => dispatch(OrderActions.invalidateMyOrders()),
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps,
)(Checkout);
