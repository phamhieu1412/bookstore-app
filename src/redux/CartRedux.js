import { toast } from '../Omni';
// import Validate from '../ultils/Validate.js';
import { actions as UserRedux } from './UserRedux';
import { actions as ProductRedux } from './ProductRedux';
import antradeWorker from '../api/apiWorker';
// import { logEventAddToCart, logEventPurchase } from '../api/eventLogger';
import { checkPromotionGiftProducts } from '../ultils/Product';
import Languages from '../common/Languages';

const types = {
  ADD_CART_ITEM: 'ADD_CART_ITEM',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
  CHECKOUT_PENDING: 'CHECKOUT_PENDING',
  CHECKOUT_SUCCESS: 'CHECKOUT_SUCCESS',
  CHECKOUT_ERROR: 'CHECKOUT_ERROR',
  VALIDATE_CUSTOMER_INFO: 'VALIDATE_CUSTOMER_INFO',
  INVALIDATE_CUSTOMER_INFO: 'INVALIDATE_CUSTOMER_INFO',
  UPDATE_CART_NOTE_PENDING: 'UPDATE_CART_NOTE_PENDING',
  UPDATE_CART_PENDING: 'UPDATE_CART_PENDING',
  UPDATE_CART_SUCCESS: 'UPDATE_CART_SUCCESS',
  UPDATE_CART_FAILURE: 'UPDATE_CART_FAILURE',

  CREATE_CART_FROM_ITEMS_PENDING: 'CREATE_CART_FROM_ITEMS_PENDING',
  FETCH_CART_PENDING: 'FETCH_CART_PENDING',
  FETCH_CART_SUCCESS: 'FETCH_CART_SUCCESS',
  FETCH_CART_FAILURE: 'FETCH_CART_FAILURE',

  SILENCE_UPDATE_CART_ITEMS_SUCCESS: 'SILENCE_UPDATE_CART_ITEMS_SUCCESS',
  SILENCE_UPDATE_CART_ITEMS_FAILURE: 'SILENCE_UPDATE_CART_ITEMS_FAILURE',
  SILENCE_REMOVE_CART_ITEMS_SUCCESS: 'SILENCE_REMOVE_CART_ITEMS_SUCCESS',
  SILENCE_REMOVE_CART_ITEMS_FAILURE: 'SILENCE_REMOVE_CART_ITEMS_FAILURE',

  FETCH_PROMOTION_CODES_PENDING: 'FETCH_PROMOTION_CODES_PENDING',
  FETCH_PROMOTION_CODES_SUCCESS: 'FETCH_PROMOTION_CODES_SUCCESS',
  FETCH_PROMOTION_CODES_FAILURE: 'FETCH_PROMOTION_CODES_FAILURE',

  FETCH_AWARDED_PROMOTION_PENDING: 'FETCH_AWARDED_PROMOTION_PENDING',
  FETCH_AWARDED_PROMOTION_SUCCESS: 'FETCH_AWARDED_PROMOTION_SUCCESS',
  FETCH_AWARDED_PROMOTION_FAILURE: 'FETCH_AWARDED_PROMOTION_FAILURE',

  CLEAR_CART: 'CLEAR_CART',
  CLEAR_CART_TOKEN: 'CLEAR_CART_TOKEN',

  SET_DONOT_DISPLAY_PROMOTION_MODAL: 'SET_DONOT_DISPLAY_PROMOTION_MODAL',

  // SET_SELECTED_ADDRESS: 'SET_SELECTED_ADDRESS',

  SILENCT_UPDATE_CART_PENDING: 'SILENCT_UPDATE_CART_PENDING',
  SILENCT_UPDATE_CART_SUCCESS: 'SILENCT_UPDATE_CART_SUCCESS',
  SILENCT_UPDATE_CART_FAILURE: 'SILENCT_UPDATE_CART_FAILURE',

  GET_TIME_FRAME_PENDDING: 'GET_TIME_FRAME_PENDDING',
  GET_TIME_FRAME_SUCCESS: 'GET_TIME_FRAME_SUCCESS',
  GET_TIME_FRAME_FAILURE: 'GET_TIME_FRAME_FAILURE',

  GET_TIME_FRAME_BY_ID_PENDDING: 'GET_TIME_FRAME_BY_ID_PENDDING',
  GET_TIME_FRAME_BY_ID_SUCCESS: 'GET_TIME_FRAME_BY_ID_SUCCESS',
  GET_TIME_FRAME_BY_ID_FAILURE: 'GET_TIME_FRAME_BY_ID_FAILURE',


  GET_DETAIL_COUPON_SUCCESS: 'GET_DETAIL_COUPON_SUCCESS',
  GET_DETAIL_COUPON_FAILURE: 'GET_DETAIL_COUPON_FAILURE',

  CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILURE: 'CREATE_ORDER_FAILURE',

  CLEAR_COUPON: 'CLEAR_COUPON',

};

export const actions = {
  createNewOrder: (payload, meta) => async dispatch => {
    const json = await antradeWorker.createNewOrder(payload);

    if (json.code === 200 && json.data && json.data.data) {
      dispatch({ type: types.CREATE_ORDER_SUCCESS,json });
      meta.onSuccess();
    } else {
      dispatch({ type: types.CREATE_ORDER_FAILURE });
      meta.onFailure();
    }
  },
  getCouponDetail: (id, meta) => async dispatch => {
    const json = await antradeWorker.getCouponDetail(id);

    if (json.data && json.code === 200 && json.data.data) {
      dispatch({ type: types.GET_DETAIL_COUPON_SUCCESS, json: json.data });
      meta.onSuccess(json.data.data);
      dispatch(actions.fetchCart());
    } else {
      dispatch({ type: types.GET_DETAIL_COUPON_FAILURE });
      meta.onFailure();
    }
  },
  addToCart: (payload, meta) => async dispatch => {
    const json = await antradeWorker.addToCart(payload);

    if (json.code === 200 && json.data) {
      toast(json.message);
      meta.onSuccess();
    } else {
      toast(json.message);
      meta.onFailure();
    }
  },
  updateCartItem: (dispatch, product, quantity) => {
    // const orderItem = product.productCode ? product : productInfoToOrderItem(product, quantity);
    // dispatch(actions.silentUpdateCartItem({ productCode: orderItem.productCode, quantity }));
    // dispatch({
    //   type: types.UPDATE_CART_ITEM,
    //   orderItem,
    //   quantity,
    // });
    // eventLogger
    // logEventAddToCart(orderItem);
  },

  removeCartItem: (bookId)=> async (dispatch, getState) => {
    dispatch({ type: types.UPDATE_CART_PENDING });
    const { user } = getState();
    const json = await antradeWorker.deleteBookInCart(bookId);

    dispatch(actions.fetchCart(user.token));
    if ((json.code === 200 || json.code === 204) && json.status === true) {
      dispatch({ type: types.UPDATE_CART_SUCCESS });
      toast('Đã cập nhật giỏ hàng');
    } else {
      dispatch({ type: types.UPDATE_CART_FAILURE });
      toast('Cập nhật giỏ hàng lỗi');
    }
  },

  updateCartNote: note => async (dispatch, getState) => {
    const { app: appState, carts } = getState();
    dispatch({ type: types.UPDATE_CART_NOTE_PENDING });
    const json = await antradeWorker.updateCartNote(
      { Note: note, Token: carts.token },
      appState.location
    );

    if (json === undefined || json.error || !json.token) {
      dispatch(actions.fetchCartFailure(Languages.GetDataError));
    } else {
      dispatch(actions.fetchCartSuccess(json));
    }
  },

  updateCart: (id, payload) => async (dispatch, getState) => {
    const { user } = getState();
    dispatch({ type: types.UPDATE_CART_PENDING });
    const json = await antradeWorker.updateQuantity(id, payload);

    if (json.data && json.code === 200) {
      dispatch({ type: types.UPDATE_CART_SUCCESS });
      toast('Đã cập nhật giỏ hàng');
    } else {
      dispatch({ type: types.UPDATE_CART_FAILURE });
      toast('Cập nhật giỏ hàng lỗi');
    }
    dispatch(actions.fetchCart(user.token));
  },

  checkout: (payload, onFinishOrder) => async (dispatch, getState) => {
    const appState = getState().app;
    dispatch({ type: types.CHECKOUT_PENDING });
    const json = await antradeWorker.checkout(payload, appState.location);

    if (
      json === undefined ||
      json.error ||
      !(json.order && json.order.state && json.order.state === 'checkout' && json.order.orderNumber)
    ) {
      toast(Languages.OrderFailed);
      dispatch({
        type: types.CHECKOUT_ERROR,
        message: Languages.OrderFailed,
      });
    } else {
      // dispatch({type: types.EMPTY_CART});
      dispatch({ type: types.CHECKOUT_SUCCESS });
      onFinishOrder(json.order.orderNumber);
      dispatch(actions.fetchCart(undefined, true)); // start new cart

      // eventLogger
      logEventPurchase(json.order);
    }
  },
  setSelectedAddress: addressId => (dispatch, getState) => {
    const { user: userState } = getState();
    if (!userState || !userState.user || !userState.user.name) {
      return;
    }

    dispatch(
      actions.updateCart({
        ShippingAddressId: addressId,
      })
    );
  },
  fetchPromotionCodes: async (dispatch, cartToken) => {
    dispatch({ type: types.FETCH_PROMOTION_CODES_PENDING });
    const json = await antradeWorker.getPromotionCodes(cartToken);

    if (json === undefined || json.error) {
      dispatch(actions.fetchPromotionCodesFailure(Languages.GetDataError));
    } else {
      dispatch(actions.fetchPromotionCodesSuccess(json));
    }
  },

  fetchPromotionCodesIfNeeded: () => (dispatch, getState) => {
    const { carts } = getState();
    if (carts.token && !carts.isFetchingPromotionCodes && carts.didInvalidatePromotionCodes) {
      actions.fetchPromotionCodes(dispatch, carts.token);
    }
  },
  fetchCart: () => async (dispatch, getState) => {
    const { user } = getState();
    if (!user || !user.token) {
      return;
    }

    dispatch({ type: types.FETCH_CART_PENDING });
    const json = await antradeWorker.getCart();

    if (json.code === 200 && json.data) {
      dispatch(actions.fetchCartSuccess(json.data.data));
    } else {
      dispatch(actions.fetchCartFailure(Languages.GetDataError));
    }
  },
  fetchCartSuccess: json => {
    return { type: types.FETCH_CART_SUCCESS, json };
  },
  fetchCartFailure: error => {
    // toast('Có lỗi khi lấy thông tin giỏ hàng');
    return { type: types.FETCH_CART_FAILURE, error };
  },
  silenceUpdateCartItemsSuccess: json => {
    toast('Đã cập nhật giỏ hàng');
    return { type: types.SILENCE_UPDATE_CART_ITEMS_SUCCESS, json };
  },
  silenceUpdateCartItemsFailure: error => {
    return { type: types.SILENCE_UPDATE_CART_ITEMS_FAILURE, error };
  },
  silenceAddCartItemsSuccess: json => {
    toast('Đã thêm mặt hàng vào giỏ');
    return { type: types.SILENCE_UPDATE_CART_ITEMS_SUCCESS, json };
  },
  silenceAddCartItemsFailure: error => {
    return { type: types.SILENCE_UPDATE_CART_ITEMS_FAILURE, error };
  },
  silenceRemoveCartItemsSuccess: json => {
    toast('Đã xóa mặt hàng khỏi giỏ');
    return { type: types.SILENCE_REMOVE_CART_ITEMS_SUCCESS, json };
  },
  silenceRemoveCartItemsFailure: error => {
    toast('Hiện không thể xóa mặt hàng này khỏi giỏ');
    return { type: types.SILENCE_REMOVE_CART_ITEMS_FAILURE, error };
  },
  fetchPromotionCodesSuccess: json => {
    return { type: types.FETCH_PROMOTION_CODES_SUCCESS, json };
  },
  fetchPromotionCodesFailure: error => {
    toast('Có lỗi khi lấy thông tin khuyến mại');
    return { type: types.FETCH_PROMOTION_CODES_FAILURE, error };
  },
  setDonotDisplayPromotionModal: () => ({
    type: types.SET_DONOT_DISPLAY_PROMOTION_MODAL,
  }),
  clearCart: () => {
    // used when LOGOUT
    return { type: types.CLEAR_CART };
  },
  clearCoupon: () => {
    // used when LOGOUT
    return { type: types.CLEAR_COUPON };
  },
  clearCartToken: () => {
    // used when LOGOUT
    return { type: types.CLEAR_CART_TOKEN };
  },
  silentAddCartItem: async (dispatch, item) => {
    dispatch(actions.silentUpdateCartItem(item, true));
  },
  silentUpdateCartItem: (item, isAdding = false) => async (dispatch, getState) => {
    const { app: appState, carts, user } = getState();
    let cartToken = carts.token;
    if (!cartToken && user.token && user.user.defaultPosCode) {
      const getCart = await antradeWorker.getCart();
      if (getCart && !getCart.error && getCart.token) {
        cartToken = getCart.token;
      }
    }

    if (cartToken) {
      const json = await antradeWorker.updateCartItem(cartToken, item, appState.location);

      if (json === undefined || json.error || !json.token) {
        dispatch(
          isAdding
            ? actions.silenceAddCartItemsFailure(Languages.GetDataError)
            : actions.silenceUpdateCartItemsFailure(Languages.GetDataError)
        );

        if (json.error && json.error.status) {
          switch (json.error.status) {
            case 461:
              toast('Giỏ hàng chưa đủ điều kiện mua mặt hàng này. Hãy thêm mặt hàng khác trước.');
              break;
            case 462:
              toast('POS của bạn không mua được hàng khuyến mại này. Hãy đổi POS.');
              break;
            case 408:
              toast('Mặt hàng này chỉ được mua một lần');
              break;
            case 405:
            case 406:
              toast('Bạn chỉ được mua một mặt hàng khuyến mại loại này');
              break;
            default:
              if (isAdding) toast('Hiện không thể thêm mặt hàng này vào giỏ');
              else toast('Hiện không thể cập nhật giỏ hàng');

              break;
          }
        }
        dispatch(actions.fetchCart(cartToken, true));
      } else {
        dispatch(
          isAdding
            ? actions.silenceAddCartItemsSuccess(json)
            : actions.silenceUpdateCartItemsSuccess(json)
        );
        if (checkPromotionGiftProducts(json.order)) {
          dispatch(
            ProductRedux.getAndStoreProductsToCache(json.order.promotion.value.giftProducts)
          );
        }
      }
    }
  },
  silentRemoveCartItem: cartId => async (dispatch, getState) => {
    // const { app: appState, user } = getState();
    // const json = await antradeWorker.deleteBookInCart(cartId);

    // if (json.message == "Cart deleted.") {
    //   dispatch(actions.silenceRemoveCartItemsSuccess(json));
    //   dispatch(actions.fetchCart(user.token));
    // } else {
    //   dispatch(actions.silenceRemoveCartItemsFailure(Languages.GetDataError));
    //   dispatch(actions.fetchCart(user.token));
    // }
  },
  createCartFromItems: () => async (dispatch, getState) => {
    const { app: appState, carts, user } = getState();
    if (!user || !user.user || !user.user.defaultPosCode) {
      return;
    }

    const currentCartLength = carts.orderItems.length;
    if (currentCartLength && !carts.token) {
      dispatch({ type: types.CREATE_CART_FROM_ITEMS_PENDING });
      const itemsPayload = [];
      carts.orderItems.forEach(item => {
        itemsPayload.push({ ProductCode: item.productCode, Quantity: item.quantity });
      });

      const json = await antradeWorker.createCartFromItems(itemsPayload, null, appState.location);
      if (json === undefined || json.error || !json.token) {
        dispatch(actions.fetchCartFailure(Languages.GetDataError));
        if (json && json.error && json.error.status === 401) {
          UserRedux.logout(dispatch);
        }
      } else {
        if (
          currentCartLength &&
          json.order &&
          ((json.order.orderItems && json.order.orderItems.length !== currentCartLength) ||
            json.order.paymentAmount !== carts.paymentAmount)
        ) {
          toast('Giỏ hàng có thay đổi sau khi đồng bộ với hệ thống');
        }
        dispatch(actions.fetchCartSuccess(json));
      }
    } else {
      dispatch(actions.fetchCart(undefined, true));
    }
  },
  _cartToPayload: carts => {
    const payload = {
      Token: carts.token,
      POSCode: carts.shipping.posCode,
      PromotionId: carts.promotion.promotionId || '',
      SelectedGiftProductCode:
        carts.promotion && carts.promotion.value && carts.promotion.value.selectedGiftProductCode
          ? carts.promotion.value.selectedGiftProductCode
          : '',
      PaidFromWallet: !!carts.promotion.isPaidFromWallet,
      ShowGiftProducts: carts.promotion.showGiftProducts,
      ShipToCustomer: !!carts.shipping.shipToCustomer,
    };
    const deliveryTime = carts.shipping.deliveryTime;
    const deliveryMoment = moment(deliveryTime);
    payload.DeliveryDate = deliveryMoment.format(Constants.isoDateFormat);
    payload.DeliveryTime = deliveryMoment.format('HH:mm');

    return payload;
  },
};

const initialState = {
  orderItems: [],
  promotionCodes: [],
  shipping: {},
  promotion: {},
  awaredPromotion: {},
  customer: {},
  orderNumber: '',
  paymentAmount: 0,
  paymentAfterSaleOff: 0,
  isFetching: false,
  isFetchingPromotionCodes: false,
  didInvalidatePromotionCodes: true,
  note: '',
  donotDisplayPromotionModalAgain: false,
  token: '',
  couponDetail: {},
  infoCart: {},
};

export const reducer = (state = initialState, action) => {
  const { type, orderItem } = action;

  switch (type) {
    case types.ADD_CART_ITEM: {
      const indexItem = orderItemIndexInCart(orderItem, state.orderItems); // check if existed
      if (indexItem >= 0) {
        // already checked so we shouldn't run into this
        return state;
      }

      const newState = Object.assign({}, state);
      newState.orderItems = newState.orderItems.slice(0);
      const { quantity } = action;
      newState.orderItems.push(Object.assign({}, orderItem));
      newState.paymentAfterSaleOff = state.paymentAfterSaleOff + quantity * getPrice(orderItem);
      newState.paymentAmount = newState.paymentAfterSaleOff;
      newState.didInvalidatePromotionCodes = true;

      return newState;
    }
    case types.UPDATE_CART_ITEM: {
      const indexItem = orderItemIndexInCart(orderItem, state.orderItems); // check if existed
      if (indexItem === -1) {
        return state;
      }

      const newState = Object.assign({}, state);
      newState.orderItems = newState.orderItems.slice(0);
      const { quantity } = action;
      const quantityDiff = quantity - state.orderItems[indexItem].quantity;
      newState.orderItems[indexItem].quantity = quantity;
      newState.paymentAfterSaleOff = state.paymentAfterSaleOff + quantityDiff * getPrice(orderItem);
      newState.paymentAmount = newState.paymentAfterSaleOff;
      newState.didInvalidatePromotionCodes = true;

      return newState;
    }
    case types.REMOVE_CART_ITEM: {
      const isExisted = orderItemIndexInCart(orderItem, state.orderItems) > -1;
      const paymentAfterSaleOff = Math.max(
        0,
        state.paymentAfterSaleOff - orderItem.quantity * getPrice(orderItem)
      );
      return !isExisted
        ? state // This should not happen, but catch anyway
        : Object.assign({}, state, {
            orderItems: state.orderItems.filter(cartItem => !compareCartItem(cartItem, orderItem)),
            paymentAfterSaleOff,
            paymentAmount: paymentAfterSaleOff,
            didInvalidatePromotionCodes: true,
          });
    }
    case types.EMPTY_CART:
      return Object.assign({}, state, initialState, {
        type: types.EMPTY_CART,
      });
    case types.CHECKOUT_SUCCESS:
      return Object.assign({}, state, initialState, {
        type: types.CHECKOUT_SUCCESS,
      });
    case types.CHECKOUT_ERROR:
      return Object.assign({}, state, {
        type: types.CHECKOUT_ERROR,
        message: action.message,
        isFetching: false,
      });
    case types.CHECKOUT_PENDING:
    case types.CREATE_CART_FROM_ITEMS_PENDING:
    case types.UPDATE_CART_PENDING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.UPDATE_CART_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case types.UPDATE_CART_FAILURE: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case types.FETCH_CART_PENDING: {
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    }
    case types.SILENCE_UPDATE_CART_ITEMS_FAILURE:
    case types.SILENCE_REMOVE_CART_ITEMS_FAILURE:
    case types.FETCH_CART_FAILURE: {
      const { error } = action;
      return {
        ...state,
        error,
        isFetching: false,
      };
    }
    case types.SILENCE_UPDATE_CART_ITEMS_SUCCESS:
    case types.SILENCE_REMOVE_CART_ITEMS_SUCCESS:
    case types.FETCH_CART_SUCCESS: {
      const { json } = action;
      return {
        ...state,
        orderItems: json.items,
        infoCart: json,
        isFetching: false,
        didInvalidatePromotionCodes: true,
        error: null,
      };
    }
    case types.FETCH_PROMOTION_CODES_PENDING:
      return {
        ...state,
        isFetchingPromotionCodes: true,
      };
    case types.FETCH_PROMOTION_CODES_FAILURE: {
      const { error } = action;
      return {
        ...state,
        error,
        isFetchingPromotionCodes: false,
        didInvalidatePromotionCodes: false,
      };
    }
    case types.FETCH_PROMOTION_CODES_SUCCESS: {
      if (!action.json) {
        return {
          ...state,
          isFetchingPromotionCodes: false,
          didInvalidatePromotionCodes: false,
        };
      }

      return {
        ...state,
        promotionCodes: action.json,
        isFetchingPromotionCodes: false,
        didInvalidatePromotionCodes: false,
        error: null,
      };
    }
    case types.FETCH_AWARDED_PROMOTION_SUCCESS: {
      if (!action.json) {
        return state;
      }

      return {
        ...state,
        awaredPromotion: { products: action.json },
      };
    }
    case types.SET_DONOT_DISPLAY_PROMOTION_MODAL: {
      return {
        ...state,
        donotDisplayPromotionModalAgain: true,
      };
    }
    case types.CLEAR_CART: {
      return initialState;
    }
    case types.CLEAR_CART_TOKEN: {
      return {
        ...state,
        shipping: {},
        promotion: {},
        customer: {},
        orderNumber: '',
        note: '',
        token: '',
      };
    }
    case types.INVALIDATE_PROMOTION_CODES: {
      return {
        ...state,
        didInvalidatePromotionCodes: true,
      };
    }

    case types.GET_DETAIL_COUPON_SUCCESS: {
      return {
        ...state,
        couponDetail: action.json.data,
      }
    }

    case types.CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        couponDetail: {},
      }
    }

    case types.CLEAR_COUPON: {
      return {
        ...state,
        couponDetail: {},
      }
    }

    case types.CREATE_ORDER_FAILURE: {
      return {
        ...state,
        couponDetail: {},
      }
    }

    default: {
      return state;
    }
  }
};

// get price
function getPrice(orderItem) {
  return orderItem.sellingPrice;
}

const compareCartItem = (orderItem, product) => {
  return orderItem.productSlug === product.productSlug;
};

function orderItemIndexInCart(product, orderItems) {
  return orderItems.findIndex(orderItem => compareCartItem(orderItem, product));
}

function productInfoToOrderItem(product, quantity) {
  return {
    productName: product.name,
    productCode: product.code,
    quantity,
    productSlug: product.slug,
    supplierName: product.supplier.name,
    supplierSlug: product.supplier.slug,
    categoryCode: product && product.category ? product.category.code : '',
    mobiImage: product.mobiImage,
    webImage: product.webImage,
    productUnit: product.price.unit,
    price: product.price.listedPrice ? Math.floor(product.price.listedPrice / 100) * 100 : 0,
    sellingPrice: product.price.price,
  };
}
