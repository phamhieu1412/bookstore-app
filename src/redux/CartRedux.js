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
};

export const actions = {
  addCartItem: (dispatch, product, quantity, carts) => {
    const { orderItems } = carts;
    const orderItem = productInfoToOrderItem(product, quantity);
    const indexItem = orderItemIndexInCart(orderItem, orderItems); // check if existed

    if (indexItem >= 0) {
      const updateQuantity = indexItem >= 0 ? orderItems[indexItem].quantity + quantity : quantity;
      orderItem.quantity = updateQuantity;
      actions.updateCartItem(dispatch, orderItem, updateQuantity);
    } else {
      actions.silentAddCartItem(dispatch, orderItem);
      dispatch({
        type: types.ADD_CART_ITEM,
        orderItem,
        quantity,
      });
      // eventLogger
    //   logEventAddToCart(orderItem);
    }
  },
  updateCartItem: (dispatch, product, quantity) => {
    const orderItem = product.productCode ? product : productInfoToOrderItem(product, quantity);
    dispatch(actions.silentUpdateCartItem({ productCode: orderItem.productCode, quantity }));
    dispatch({
      type: types.UPDATE_CART_ITEM,
      orderItem,
      quantity,
    });
    // eventLogger
    // logEventAddToCart(orderItem);
  },

  removeCartItem: (dispatch, orderItem) => {
    dispatch({
      type: types.REMOVE_CART_ITEM,
      orderItem,
    });
    dispatch(actions.silentRemoveCartItem(orderItem));
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

  updateCart: payload => async (dispatch, getState) => {
    const { app: appState, carts: cartsState } = getState();
    const cartPayload = actions._cartToPayload(cartsState);
    const combinedPayload = { ...cartPayload, ...payload };
    if (!combinedPayload.Token) {
      // don't update if there's no cart
      return;
    }

    dispatch({ type: types.UPDATE_CART_PENDING });
    const json = await antradeWorker.updateCart(combinedPayload, appState.location);

    if (json === undefined || json.error || !json.token) {
      toast('Hiện không thể cập nhật giỏ hàng');
      dispatch(actions.fetchCartFailure(Languages.GetDataError));
    } else {
      if (json.order) {
        if (
          cartsState.orderItems.length &&
          (!json.order.orderItems ||
            !json.order.orderItems.length ||
            json.order.orderItems.length < cartsState.orderItems.length)
        ) {
          toast('Đã có mặt hàng bị xóa khỏi giỏ.');
        } else if (json.order.paymentAmount !== cartsState.paymentAmount) {
          toast('Đã cập nhật giỏ hàng');
        }
      }
      dispatch(actions.fetchCartSuccess(json));
      if (checkPromotionGiftProducts(json.order)) {
        dispatch(ProductRedux.getAndStoreProductsToCache(json.order.promotion.value.giftProducts));
      }
    }
  },

  getTimeFrame: () => async dispatch => {
    dispatch({ type: types.GET_TIME_FRAME_PENDDING });
    const json = await antradeWorker.getTimeFrame();

    if (json === undefined || json.error) {
      dispatch(actions.getTimeFrameFailure(Languages.ErrorGetTimeFrame));
    } else {
      dispatch(actions.getTimeFrameSuccess(json));
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
      dispatch({ type: types.CHECKOUT_SUCCESS });
      onFinishOrder(json.order.orderNumber);
      dispatch(actions.fetchCart(undefined, true)); // start new cart

      // eventLogger
    //   logEventPurchase(json.order);
    }
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
  fetchCart: (cartToken, noMessage = false) => async (dispatch, getState) => {
    const { carts: cartsState, app: appState, user } = getState();
    if (!user || !user.user || !user.user.name) {
      return;
    }

    if (cartsState.isFetching) {
      return;
    }

    dispatch({ type: types.FETCH_CART_PENDING });
    const json = await antradeWorker.getCart(cartToken, appState.location);

    if (json === false) {
      dispatch(actions.fetchCartFailure());
    } else if (json === undefined || json.error || !json.token) {
      dispatch(actions.fetchCartFailure(Languages.GetDataError));
      if (json && json.error && json.error.status === 401) {
        UserRedux.logout(dispatch);
      }
    } else {
      if (json.order && json.order.paymentAmount !== cartsState.paymentAmount) {
        if (!noMessage) toast('Giỏ hàng có thay đổi sau khi đồng bộ với hệ thống');
      }
      dispatch(actions.fetchCartSuccess(json));
      if (checkPromotionGiftProducts(json.order)) {
        dispatch(ProductRedux.getAndStoreProductsToCache(json.order.promotion.value.giftProducts));
      }
      if ((!json.order.shipping || !json.order.shipping.shippingAddress) && user.defaultAddress) {
        dispatch(actions.setSelectedAddress(user.defaultAddress.id, user.defaultAddress));
      }
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
  getTimeFrameSuccess: timeFrame => {
    return { type: types.GET_TIME_FRAME_SUCCESS, timeFrame };
  },
  getTimeFrameFailure: error => {
    return { type: types.GET_TIME_FRAME_FAILURE, error };
  },
  clearCart: () => {
    // used when LOGOUT
    return { type: types.CLEAR_CART };
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
    if (!cartToken && user.token && user.user.name) {
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
  silentRemoveCartItem: item => async (dispatch, getState) => {
    const { app: appState, carts } = getState();
    if (carts.token) {
      const json = await antradeWorker.removeCartItem(carts.token, item, appState.location);

      if (json === undefined || json.error || !json.token) {
        dispatch(actions.silenceRemoveCartItemsFailure(Languages.GetDataError));
        dispatch(actions.fetchCart(carts.token));
      } else {
        dispatch(actions.silenceRemoveCartItemsSuccess(json));
      }
    }
  },
  createCartFromItems: () => async (dispatch, getState) => {
    const { app: appState, carts, user } = getState();
    if (!user || !user.user || !user.user.name) {
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
          dispatch(actions.fetchCart(undefined, true));
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
        carts.promotion && carts.promotion.value && carts.promotion.value.selectedGiftProduct
          ? carts.promotion.value.selectedGiftProduct
          : '',
      PaidFromWallet: !!carts.promotion.isPaidFromWallet,
      ShowGiftProducts: carts.promotion.showGiftProducts,
      ShipToCustomer: !!carts.shipping.shipToCustomer,
      ShippingAddressId: carts?.shipping?.shippingAddressId || undefined,
    };

    payload.DeliveryDate = carts.shipping.deliveryTimeTo;
    payload.DeliveryTWId = carts.shipping.deliveryTwId;

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
  isFetchingCheckout: false,
  isFetchingTimeFrame: false,
  isFetchingPromotionCodes: false,
  didInvalidatePromotionCodes: true,
  note: '',
  donotDisplayPromotionModalAgain: false,
  token: '',
  arrayTimeFrame: [],
  selectedAddressId: '',
  selectedAddressText: '',
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

    case types.GET_TIME_FRAME_PENDDING:
      return {
        ...state,
        isFetchingTimeFrame: true,
      };
    case types.GET_TIME_FRAME_SUCCESS:
      return {
        ...state,
        arrayTimeFrame: action.timeFrame,
        isFetchingTimeFrame: false,
      };
    case types.GET_TIME_FRAME_FAILURE:
      return {
        ...state,
        isFetchingTimeFrame: false,
      };

    case types.CHECKOUT_SUCCESS:
      return Object.assign({}, state, initialState, {
        type: types.CHECKOUT_SUCCESS,
      });
    case types.CHECKOUT_ERROR:
      return Object.assign({}, state, {
        type: types.CHECKOUT_ERROR,
        message: action.message,
        isFetchingCheckout: false,
      });
    case types.CHECKOUT_PENDING: {
      return {
        ...state,
        isFetchingCheckout: true,
      };
    }
    case types.CREATE_CART_FROM_ITEMS_PENDING:
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
      if (!action.json || !action.json.token) {
        return {
          ...state,
          isFetching: false,
        };
      }

      const { json } = action;
      const { order, token } = json;
      return {
        ...state,
        ...order,
        orderItems: order.orderItems || [],
        token,
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
    // case types.SET_SELECTED_ADDRESS: {
    //   const { addressId, addressText } = action;

    //   return {
    //     ...state,
    //     selectedAddressId: addressId,
    //     selectedAddressText: addressText,
    //   };
    // }
    case types.SET_DONOT_DISPLAY_PROMOTION_MODAL: {
      return {
        ...state,
        donotDisplayPromotionModalAgain: true,
      };
    }
    case types.CLEAR_CART: {
      return {
        ...initialState,
        arrayTimeFrame: state.arrayTimeFrame,
      };
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
