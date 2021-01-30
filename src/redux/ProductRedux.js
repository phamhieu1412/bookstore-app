import moment from 'moment';

import { actions as NetInfoActions } from './NetInfoRedux';
import { toast } from '../Omni';
import antradeWorker from '../api/apiWorker';
import Constants from '../common/Constants';
import Languages from '../common/Languages';

const types = {
  FETCH_PRODUCTS_PENDING: 'FETCH_PRODUCTS_PENDING',
  FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
  FETCH_ALL_PRODUCTS_SUCCESS: 'FETCH_ALL_PRODUCTS_SUCCESS',
  FETCH_ALL_PRODUCTS_MORE: 'FETCH_ALL_PRODUCTS_MORE',
  FETCH_PRODUCTS_FAILURE: 'FETCH_PRODUCTS_FAILURE',
  CLEAR_LIST_PRODUCTS: 'CLEAR_LIST_PRODUCTS',
  CLEAR_LIST_ALL_PRODUCTS: 'CLEAR_LIST_ALL_PRODUCTS',

  FETCH_PRODUCTS_BY_NAME_PENDING: 'FETCH_PRODUCTS_BY_NAME_PENDING',
  FETCH_PRODUCTS_BY_NAME_SUCCESS: 'FETCH_PRODUCTS_BY_NAME_SUCCESS',
  FETCH_PRODUCTS_BY_NAME_MORE: 'FETCH_PRODUCTS_BY_NAME_MORE',
  FETCH_PRODUCTS_BY_NAME_FAILURE: 'FETCH_PRODUCTS_BY_NAME_FAILURE',

  FETCH_POS_PROMOTION_PRODUCTS_PENDING: 'FETCH_POS_PROMOTION_PRODUCTS_PENDING',
  FETCH_POS_PROMOTION_PRODUCTS_SUCCESS: 'FETCH_POS_PROMOTION_PRODUCTS_SUCCESS',
  FETCH_POS_PROMOTION_PRODUCTS_FAILED: 'FETCH_POS_PROMOTION_PRODUCTS_FAILED',
  CLEAR_POS_PROMOTION_PRODUCTS: 'CLEAR_POS_PROMOTION_PRODUCTS',

  ADD_NEW_PRODUCTS_TO_CACHE: 'ADD_NEW_PRODUCTS_TO_CACHE',
  CLEAR_PRODUCTS_CACHE: 'CLEAR_PRODUCTS_CACHE',

  ADD_TO_REQUIRED_LOGIN: 'ADD_TO_REQUIRED_LOGIN',
  CLEAR_REQUIRED_LOGIN: 'CLEAR_REQUIRED_LOGIN',
  ADD_TO_BUY_ONE: 'ADD_TO_BUY_ONE',
  CLEAR_BUY_ONE: 'CLEAR_BUY_ONE',

  FETCH_PRODUCTS_DETAIL_PENDING: 'FETCH_PRODUCTS_DETAIL_PENDING',
  FETCH_PRODUCTS_DETAIL_SUCCESS: 'FETCH_PRODUCTS_DETAIL_SUCCESS',
  FETCH_PRODUCTS_DETAIL_FAIL: 'FETCH_PRODUCTS_DETAIL_FAIL',
  // SWITCH_LAYOUT_HOME: 'SWITCH_LAYOUT_HOME',
  SAVE_SEARCH_HISTORY: 'SAVE_SEARCH_HISTORY',
  CLEAR_SEARCH_HISTORY: 'CLEAR_SEARCH_HISTORY',
};

function _parseFilter(filters = {}) {
  const filterParams = {};
  if (filters.category) {
    filterParams.categorySlug = filters.category;
  }
  if (filters.maxPrice && filters.maxPrice > 0) {
    filterParams.price = { to: filters.maxPrice };
  }

  return filterParams;
}

export const actions = {
  fetchProductsByCategorySlug: async (
    dispatch,
    categorySlug,
    page,
    pageSize = Constants.pagingLimit,
    filters = {}
  ) => {
    dispatch({ type: types.FETCH_PRODUCTS_PENDING });
    const filterParams = _parseFilter(filters);
    const slug =
      categorySlug || (filterParams && filterParams.category ? filterParams.category : '');
    delete filterParams.category; // already have categorySlug
    const json = await antradeWorker.productsByCategorySlug(slug, page, pageSize, filterParams);
    if (json === undefined || json.error) {
      toast(Languages.ErrorMessageRequest);
      if (json && json.error.status === 0) {
        NetInfoActions.renewConnectionStatus(dispatch);
      }
      dispatch(actions.fetchProductsFailure(Languages.GetDataError));
    } else {
      dispatch(actions.fetchProductsSuccess(json));
    }
  },
  fetchProductsSuccess: items => ({
    type: types.FETCH_PRODUCTS_SUCCESS,
    items,
  }),
  fetchProductsFailure: error => ({
    type: types.FETCH_PRODUCTS_FAILURE,
    error,
  }),

  fetchProductsByName: async (
    dispatch,
    name,
    pageSize = Constants.pagingLimit,
    page = 1,
    filter = {}
  ) => {
    dispatch({ type: types.FETCH_PRODUCTS_BY_NAME_PENDING });
    const params = Object.assign(
      {
        q: name,
        pageSize,
        page,
      },
      _parseFilter(filter)
    );
    const json = await antradeWorker.searchProducts(params);

    if (json === undefined || json.error) {
      dispatch({
        type: types.FETCH_PRODUCTS_BY_NAME_FAILURE,
        message: Languages.ErrorMessageRequest,
      });
    } else {
      dispatch({
        type: page === 1 ? types.FETCH_PRODUCTS_BY_NAME_SUCCESS : types.FETCH_PRODUCTS_BY_NAME_MORE,
        productsByName: json,
        isMore: json.length === pageSize,
        currentSearchPage: page,
      });
    }
  },
  fetchAllProducts: async (dispatch, page = 1, pageSize = Constants.pagingLimit) => {
    dispatch({ type: types.FETCH_PRODUCTS_PENDING });
    const json = await antradeWorker.getAllProducts(page, pageSize);
    if (json === undefined || json.error) {
      dispatch({
        type: types.FETCH_PRODUCTS_FAILURE,
        message: Languages.ErrorMessageRequest,
      });
    } else if (page > 1) {
      dispatch({
        type: types.FETCH_ALL_PRODUCTS_MORE,
        items: json,
        page,
      });
    } else {
      dispatch({
        type: types.FETCH_ALL_PRODUCTS_SUCCESS,
        items: json,
        page,
      });
    }
  },
  fetchPOSPromotionProducts: () => async (dispatch, getState) => {
    const { app: appState, products: productState } = getState();
    const prevlocationString = productState.currentPOSPromotionLocation;
    const newlocationString = appState.location
      ? `${appState.location.latitude}-${appState.location.longitude}`
      : '';

    if (!productState.isFetchingPOSPromotion && newlocationString !== prevlocationString) {
      if (!newlocationString) {
        dispatch({
          type: types.FETCH_POS_PROMOTION_PRODUCTS_FAILED,
          items: [],
          location: '',
        });
      } else {
        dispatch({ type: types.FETCH_POS_PROMOTION_PRODUCTS_PENDING });

        const json = await antradeWorker.getPOSBasedPromotion(appState.location);

        if (json === undefined || json.error) {
          dispatch({
            type: types.FETCH_POS_PROMOTION_PRODUCTS_FAILED,
            items: [],
            location: newlocationString,
          });
        } else {
          dispatch({
            type: types.FETCH_POS_PROMOTION_PRODUCTS_SUCCESS,
            items: json,
            location: newlocationString,
          });
          dispatch(actions.addToRequiredLogin(json));
          dispatch(actions.addToBuyOne(json));
        }
      }
    }
  },
  getProductDetail: product => async (dispatch, getState) => {
    const { products: productState } = getState();
    const { productDetail, viewedProducts } = productState;
    if (product.slug === productDetail.slug) {
      return;
    }

    const cachedProduct = actions._getCachedProduct(product.code, viewedProducts);
    if (cachedProduct) {
      dispatch({ type: types.FETCH_PRODUCTS_DETAIL_SUCCESS, items: cachedProduct, isCached: true });
      return;
    }

    dispatch({ type: types.FETCH_PRODUCTS_DETAIL_PENDING });
    const json = await antradeWorker.getProductDetail(product.slug);

    if (json === undefined || json.error) {
      toast(Languages.ErrorMessageRequest);
      if (json && json.error.status === 0) {
        NetInfoActions.renewConnectionStatus(dispatch);
      }
      dispatch({
        type: types.FETCH_PRODUCTS_DETAIL_FAIL,
        message: Languages.ErrorMessageRequest,
      });
    } else if (!json.slug) {
      dispatch({
        type: types.FETCH_PRODUCTS_DETAIL_FAIL,
        message: json.message,
      });
    } else {
      dispatch({ type: types.FETCH_PRODUCTS_DETAIL_SUCCESS, items: json });
    }
  },
  getAndStoreProductsToCache: slugsOrCodes => async (dispatch, getState) => {
    const { products: productState } = getState();
    const { viewedProducts } = productState;

    const unavalableProducts = slugsOrCodes.filter(slugOrCode => {
      const code = actions._convertSlugToCode(slugOrCode);
      return !viewedProducts[code];
    });

    if (unavalableProducts && unavalableProducts.length) {
      const json = await antradeWorker.getProductsBySlugs(unavalableProducts);
      if (json && !json.error) {
        dispatch({ type: types.ADD_NEW_PRODUCTS_TO_CACHE, items: json });
      }
    }
  },
  clearPOSPromotionProducts: () => ({ type: types.CLEAR_POS_PROMOTION_PRODUCTS }),
  clearListProducts: () => ({ type: types.CLEAR_LIST_PRODUCTS }),
  clearListAllProducts: () => ({ type: types.CLEAR_LIST_ALL_PRODUCTS }),
  clearViewedProducts: () => {
    return { type: types.CLEAR_PRODUCTS_CACHE };
  },
  addToRequiredLogin: products => {
    const items = products.map(p => p.code);
    return { type: types.ADD_TO_REQUIRED_LOGIN, items };
  },
  clearRequiredLogin: () => {
    return { type: types.CLEAR_REQUIRED_LOGIN };
  },
  addToBuyOne: products => {
    const items = products.map(p => p.code);
    return { type: types.ADD_TO_BUY_ONE, items };
  },
  clearBuyOne: () => {
    return { type: types.CLEAR_BUY_ONE };
  },
  // switchLayoutHomePage: layout => {
  //   return { type: types.SWITCH_LAYOUT_HOME, layout };
  // },
  saveSearchHistory: (dispatch, searchText) => {
    dispatch({ type: types.SAVE_SEARCH_HISTORY, searchText });
  },
  clearSearchHistory: dispatch => {
    dispatch({ type: types.CLEAR_SEARCH_HISTORY });
  },

  _getCachedProduct: (code, viewedProducts) => {
    const cachedProduct = viewedProducts[code];
    // don't get cached product that has limited quantity
    if (cachedProduct && cachedProduct.viewedTime && !cachedProduct.Quantity) {
      const viewedTime = moment(cachedProduct.viewedTime);
      if (viewedTime.isAfter(moment().subtract(30, 'minutes'))) {
        return viewedProducts[code];
      }
    }

    return null;
  },

  _getNoTimeoutCachedProduct: (code, viewedProducts) => {
    const cachedProduct = viewedProducts[code];
    if (cachedProduct) {
      return viewedProducts[code];
    }

    return null;
  },

  _convertSlugToCode: slugOrCode => {
    const splitedSlug = slugOrCode.split('-');
    return splitedSlug[splitedSlug.length - 1];
  },
};

const initialState = {
  isFetching: false,
  error: null,
  list: [],
  isFetchingByName: false,
  listAll: [],
  isFetchingPOSPromotion: false,
  posPromotionProducts: [],
  currentPOSPromotionLocation: '',
  viewedProducts: {},
  cachedProducts: {},
  requiredLogin: [],
  buyOne: [],
  stillFetch: true,
  stillFetchAll: true,
  page: 1,
  isFetchingDetail: false,
  productDetail: {},
  productsByName: [],
};

export const reducer = (state = initialState, action) => {
  const { type, error, items, page } = action;

  switch (type) {
    case types.FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        isFetching: true,
        error: null,
        message: '',
      };

    case types.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error,
      };

    case types.FETCH_ALL_PRODUCTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        listAll: items,
        stillFetchAll: items.length !== 0,
        error: null,
        page,
      });

    case types.FETCH_ALL_PRODUCTS_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        listAll: state.listAll.concat(items),
        stillFetchAll: items.length !== 0,
        error: null,
        page,
      });
    }

    case types.FETCH_PRODUCTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        list: state.list.concat(items),
        stillFetch: items.length !== 0,
        error: null,
      });
    }

    case types.FETCH_PRODUCTS_BY_NAME_PENDING:
      return {
        ...state,
        isFetchingByName: true,
      };

    case types.FETCH_PRODUCTS_BY_NAME_FAILURE:
      return {
        ...state,
        isFetchingByName: false,
        error,
      };

    case types.FETCH_PRODUCTS_BY_NAME_SUCCESS: {
      return {
        ...state,
        isFetchingByName: false,
        productsByName: action.productsByName,
        isSearchMore: action.isMore,
        currentSearchPage: action.currentSearchPage,
      };
    }

    case types.FETCH_PRODUCTS_BY_NAME_MORE: {
      return {
        ...state,
        isFetchingByName: false,
        productsByName: state.productsByName.concat(action.productsByName),
        isSearchMore: action.isMore,
        currentSearchPage: action.currentSearchPage,
      };
    }

    case types.FETCH_PRODUCTS_DETAIL_PENDING:
      return {
        ...state,
        isFetchingDetail: true,
      };

    case types.FETCH_PRODUCTS_DETAIL_FAIL:
      return {
        ...state,
        productDetail: {},
        isFetchingDetail: false,
      };

    case types.FETCH_PRODUCTS_DETAIL_SUCCESS: {
      const nextState = { ...state, isFetchingDetail: false, productDetail: items };
      if (!action.isCached && !items.Quantity) {
        // don't cache product that has limited quantity
        nextState.viewedProducts[items.code] = {
          ...items,
          viewedTime: moment(),
        };
      }

      return nextState;
    }

    case types.ADD_NEW_PRODUCTS_TO_CACHE: {
      const viewedProducts = { ...state.viewedProducts };
      items.forEach(item => {
        if (item.code) {
          viewedProducts[item.code] = {
            ...item,
            viewedTime: moment(),
          };
        }
      });

      return {
        ...state,
        viewedProducts,
      };
    }

    case types.CLEAR_PRODUCTS_CACHE: {
      return {
        ...state,
        viewedProducts: {},
      };
    }

    case types.FETCH_POS_PROMOTION_PRODUCTS_PENDING:
      return {
        ...state,
        isFetchingPOSPromotion: true,
      };

    case types.FETCH_POS_PROMOTION_PRODUCTS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingPOSPromotion: false,
        posPromotionProducts: items,
        currentPOSPromotionLocation: action.location,
      });

    case types.FETCH_POS_PROMOTION_PRODUCTS_FAILED:
      return Object.assign({}, state, {
        isFetchingPOSPromotion: false,
        posPromotionProducts: [],
        currentPOSPromotionLocation: action.location,
        requiredLogin: [],
        buyOne: [],
      });

    case types.CLEAR_POS_PROMOTION_PRODUCTS:
      return Object.assign({}, state, {
        isFetchingPOSPromotion: false,
        currentPOSPromotionLocation: '',
        // only clear the location so that we can get new value --> no flashing because of rerendering
        // posPromotionProducts: [],
        // requiredLogin: [],
        // buyOne: [],
      });

    case types.CLEAR_LIST_PRODUCTS:
      return {
        ...state,
        list: [],
        stillFetch: true,
      };

    case types.CLEAR_LIST_ALL_PRODUCTS:
      return {
        ...state,
        listAll: [],
        stillFetchAll: true,
        page: 1,
      };

    case types.ADD_TO_REQUIRED_LOGIN:
      return Object.assign({}, state, {
        requiredLogin: items,
      });

    case types.CLEAR_REQUIRED_LOGIN:
      return Object.assign({}, state, {
        requiredLogin: [],
      });

    case types.ADD_TO_BUY_ONE:
      return Object.assign({}, state, {
        buyOne: items,
      });

    case types.CLEAR_BUY_ONE:
      return Object.assign({}, state, {
        buyOne: [],
      });

    // case types.SWITCH_LAYOUT_HOME: {
    //   return {
    //     ...state,
    //     layoutHome: action.layout,
    //   };
    // }
    case types.SAVE_SEARCH_HISTORY: {
      let histories = state.histories;
      if (histories === undefined) {
        histories = [];
      }
      if (histories.indexOf(action.searchText) === -1) {
        histories.unshift(action.searchText);
      }
      if (histories.length > 10) {
        histories.pop();
      }
      return {
        ...state,
        histories,
      };
    }
    case types.CLEAR_SEARCH_HISTORY: {
      return {
        ...state,
        histories: [],
      };
    }
    default: {
      return state;
    }
  }
};
