import antradeWorker from '../api/apiWorker';
import Languages from '../common/Languages';

const types = {
  FETCH_MY_ORDERS_PENDING: 'FETCH_MY_ORDERS_PENDING',
  FETCH_MY_ORDERS_SUCCESS: 'FETCH_MY_ORDERS_SUCCESS',
  FETCH_MY_ORDERS_MORE: 'FETCH_MY_ORDERS_MORE',
  FETCH_MY_ORDERS_FAILURE: 'FETCH_MY_ORDERS_FAILURE',
  FETCH_ORDER_DETAIL_PENDING: 'FETCH_ORDER_DETAIL_PENDING',
  FETCH_ORDER_DETAIL_SUCCESS: 'FETCH_ORDER_DETAIL_SUCCESS',
  FETCH_ORDER_DETAIL_FAILURE: 'FETCH_ORDER_DETAIL_FAILURE',
  CANCEL_ORDER_ITEM_PENDING: 'CANCEL_ORDER_ITEM_PENDING',
  CANCEL_ORDER_ITEM_SUCCESS: 'CANCEL_ORDER_ITEM_SUCCESS',
  CANCEL_ORDER_ITEM_FAILURE: 'CANCEL_ORDER_ITEM_FAILURE',
  CLEAR_MY_ORDERS: 'CLEAR_MY_ORDERS',
  INVALIDATE_MY_ORDERS: 'INVALIDATE_MY_ORDERS',
  REVIEW_ORDERS_PENDING: 'REVIEW_ORDERS_PENDING',
  REVIEW_ORDERS_SUCCESS: 'REVIEW_ORDERS_SUCCESS',
  REVIEW_ORDERS_FAILURE: 'REVIEW_ORDERS_FAILURE',
  GET_REVIEW_ORDERS_PENDING: 'GET_REVIEW_ORDERS_PENDING',
  GET_REVIEW_ORDERS_SUCCESS: 'GET_REVIEW_ORDERS_SUCCESS',
  GET_REVIEW_ORDERS_FAILURE: 'GET_REVIEW_ORDERS_FAILURE',
};

export const actions = {
  fetchMyOrder: () => async dispatch => {
    dispatch({ type: types.FETCH_MY_ORDERS_PENDING });

    const json = await antradeWorker.getListOrders();
    if (json.data && json.data.data && json.code === 200) {
      dispatch(actions.fetchMyOrdersSuccess(json.data, 1));
    } else {
      dispatch(actions.fetchMyOrdersFailure(Languages.GetDataError));
    }
  },
  // fetchMyOrder: async (dispatch, page = 1, pageSize = 16, filter = {}) => {
    // dispatch({ type: types.FETCH_MY_ORDERS_PENDING });
    // const payload = {
    //   Page: page,
    //   PageSize: pageSize,
    //   ...filter,
    // };
    // const json = await antradeWorker.getListOrders();
    // if (json === undefined || json.error) {
    //   dispatch(actions.fetchMyOrdersFailure(Languages.GetDataError));
    // } else {
    //   if (page > 1) {
    //     dispatch(actions.fetchMyOrdersMore(json, page));
    //   } else {
    //     dispatch(actions.fetchMyOrdersSuccess(json, page));
    //   }
    // }
  // },
  fetchMyOrderIfNeeded: (page = 1, pageSize = 16, filter = {}) => (dispatch, getState) => {
    const state = getState().myOrders;
    if (
      !state.isFetching &&
      (state.didInvalidate || (state.stillFetch && page === state.currentPage + 1))
    ) {
      actions.fetchMyOrder(dispatch, page, pageSize, filter);
    }
  },
  fetchOrderDetail: (orderId, meta) => async (dispatch) => {
    dispatch({ type: types.FETCH_ORDER_DETAIL_PENDING });
    const json = await antradeWorker.getOrderDetail(orderId);

    if (json.data && json.data.data && json.code === 200) {
      dispatch(actions.fetchOrderDetailSuccess(json.data));
      meta.onSuccess();
    } else {
      dispatch(actions.fetchOrderDetailFailure(Languages.GetDataError));
      meta.onFailure();
    }
  },
  cancelOrderItem: async (dispatch, orderNumber, productCode) => {
    dispatch({ type: types.CANCEL_ORDER_ITEM_PENDING });
    const json = await antradeWorker.cancelOrderItem(orderNumber, productCode);

    if (json === undefined || json.error) {
      dispatch(actions.cancelOrderItemFailure(Languages.GetDataError));
    } else {
      dispatch(actions.cancelOrderItemSuccess(json));
      dispatch(actions.invalidateMyOrders());
    }
  },
  getReviewOrders: async (dispatch, orderNumber) => {
    dispatch({ type: types.GET_REVIEW_ORDERS_PENDING });
    const json = await antradeWorker.getReviewOrders(orderNumber);

    if (json === undefined || json.error) {
      dispatch({ type: types.GET_REVIEW_ORDERS_FAILURE });
    } else {
      dispatch(actions.getReviewOrdersSuccess(json));
    }
  },
  postReviewOrders: async (dispatch, reviewInfo, meta) => {
    dispatch({ type: types.REVIEW_ORDERS_PENDING });
    const json = await antradeWorker.postReviewOrders(reviewInfo);

    if (json.data && json.data.data && json.code === 200) {
      dispatch(actions.postReviewOrdersSuccess(json));
      // dispatch(actions.getReviewOrders(dispatch, json.data.orderCode));
      meta.onSuccess();
    } else {
      dispatch({ type: types.REVIEW_ORDERS_FAILURE });
      meta.onFailure();
    }
  },
  clearMyOrders: () => ({
    type: types.CLEAR_MY_ORDERS,
  }),
  fetchMyOrdersSuccess: (json, page) => {
    return { type: types.FETCH_MY_ORDERS_SUCCESS, json, page };
  },
  fetchMyOrdersMore: (json, page) => {
    return { type: types.FETCH_MY_ORDERS_MORE, json, page };
  },
  invalidateMyOrders: () => {
    return { type: types.INVALIDATE_MY_ORDERS };
  },
  fetchMyOrdersFailure: error => {
    return { type: types.FETCH_MY_ORDERS_FAILURE, error };
  },
  fetchOrderDetailSuccess: json => {
    return { type: types.FETCH_ORDER_DETAIL_SUCCESS, json };
  },
  fetchOrderDetailFailure: error => {
    return { type: types.FETCH_ORDER_DETAIL_FAILURE, error };
  },
  cancelOrderItemSuccess: json => {
    return { type: types.CANCEL_ORDER_ITEM_SUCCESS, json };
  },
  cancelOrderItemFailure: error => {
    return { type: types.CANCEL_ORDER_ITEM_FAILURE, error };
  },
  postReviewOrdersSuccess: json => {
    return { type: types.REVIEW_ORDERS_SUCCESS, json };
  },
  getReviewOrdersSuccess: json => {
    return { type: types.GET_REVIEW_ORDERS_SUCCESS, json };
  },
};

const initialState = {
  orders: [],
  currentPage: 0,
  orderDetail: {},
  isFetching: false,
  isDetailFetching: false,
  stillFetch: true,
  didInvalidate: true,
  reviewOrders: {},
  orderDetail: {},
};

export const reducer = (state = initialState, action) => {
  const { type } = action;
  let normalItems;
  let cancelledItems;

  switch (type) {
    case types.FETCH_MY_ORDERS_PENDING:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_ORDER_DETAIL_PENDING:
      return {
        ...state,
        isDetailFetching: true,
      };
    case types.CANCEL_ORDER_ITEM_PENDING:
      return {
        ...state,
        isDetailFetching: true,
      };

    case types.FETCH_MY_ORDERS_SUCCESS:
      return {
        ...state,
        ...action.json,
        orders: action.json.data.items,
        currentPage: action.page,
        stillFetch: !action.json.data.items || action.json.data.items.length !== 0,
        isFetching: false,
        didInvalidate: false,
      };

    case types.FETCH_MY_ORDERS_MORE:
      return {
        ...state,
        orders: state.orders.concat(action.json.orders),
        currentPage: action.page,
        stillFetch: !action.json.orders || action.json.orders.length !== 0,
        isFetching: false,
        didInvalidate: false,
      };

    case types.FETCH_MY_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      };

    case types.FETCH_ORDER_DETAIL_SUCCESS: 
      return {
        ...state,
        orderDetail: action.json.data,
        isDetailFetching: false,
        didInvalidate: false
      }
    case types.CANCEL_ORDER_ITEM_SUCCESS:
      normalItems = action.json.order.orderItems.filter(
        item => !item.state || item.state !== 'cancelled'
      );
      cancelledItems = action.json.order.orderItems.filter(
        item => item.state && item.state === 'cancelled'
      );
      return Object.assign({}, state, {
        isDetailFetching: false,
        orderDetail: {
          ...action.json.order,
          orderItems: normalItems.concat(cancelledItems),
        },
      });

    case types.FETCH_ORDER_DETAIL_FAILURE:
      return {
        ...state,
        isDetailFetching: false,
      };
    case types.CANCEL_ORDER_ITEM_FAILURE:
      return {
        ...state,
        isDetailFetching: false,
      };

    case types.CLEAR_MY_ORDERS:
      return { ...initialState };

    case types.INVALIDATE_MY_ORDERS: {
      return {
        ...state,
        didInvalidate: true,
      };
    }

    case types.GET_REVIEW_ORDERS_PENDING:
      return {
        ...state,
      };
    case types.GET_REVIEW_ORDERS_SUCCESS:
      const { data } = action.json;
      return {
        ...state,
        reviewOrders: data ? data[data.length - 1] : {},
      };
    case types.GET_REVIEW_ORDERS_FAILURE:
      return {
        ...state,
      };

    case types.REVIEW_ORDERS_PENDING:
      return {
        ...state,
        isDetailFetching: true,
      };

    case types.REVIEW_ORDERS_FAILURE:
      return {
        ...state,
        // reviewOrders: action.json.data,
        isDetailFetching: false,
      };

    case types.REVIEW_ORDERS_SUCCESS:
      return {
        ...state,
        isDetailFetching: false,
      };

    default: {
      return state;
    }
  }
};
