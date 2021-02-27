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

  FETCH_PUBLISHER_PENDING: 'FETCH_PUBLISHER_PENDING',
  FETCH_PUBLISHER_SUCCESS: 'FETCH_PUBLISHER_SUCCESS',
  FETCH_PUBLISHER_FAIL: 'FETCH_PUBLISHER_FAIL',

  FETCH_AUTHOR_PENDING: 'FETCH_AUTHOR_PENDING',
  FETCH_AUTHOR_SUCCESS: 'FETCH_AUTHOR_SUCCESS',
  FETCH_AUTHOR_FAIL: 'FETCH_AUTHOR_FAIL',

  FETCH_PRODUCTS_DETAIL_PENDING: 'FETCH_PRODUCTS_DETAIL_PENDING',
  FETCH_PRODUCTS_DETAIL_SUCCESS: 'FETCH_PRODUCTS_DETAIL_SUCCESS',
  FETCH_PRODUCTS_DETAIL_FAIL: 'FETCH_PRODUCTS_DETAIL_FAIL',

  FETCH_BOOKS_BY_NAME_DETAIL_PENDING: 'FETCH_BOOKS_BY_NAME_DETAIL_PENDING',
  FETCH_BOOKS_BY_NAME_DETAIL_SUCCESS: 'FETCH_BOOKS_BY_NAME_DETAIL_SUCCESS',
  FETCH_BOOKS_BY_NAME_DETAIL_FAIL: 'FETCH_BOOKS_BY_NAME_DETAIL_FAIL',

  FETCH_BOOKS_BY_PRICE_DETAIL_PENDING: 'FETCH_BOOKS_BY_PRICE_DETAIL_PENDING',
  FETCH_BOOKS_BY_PRICE_DETAIL_SUCCESS: 'FETCH_BOOKS_BY_PRICE_DETAIL_SUCCESS',
  FETCH_BOOKS_BY_PRICE_DETAIL_FAIL: 'FETCH_BOOKS_BY_PRICE_DETAIL_FAIL',

  FETCH_CATEGORY_BY_ID_PENDING: 'FETCH_CATEGORY_BY_ID_PENDING',
  FETCH_CATEGORY_BY_ID_SUCCESS: 'FETCH_CATEGORY_BY_ID_SUCCESS',
  FETCH_CATEGORY_BY_ID_FAIL: 'FETCH_CATEGORY_BY_ID_FAIL',

  FETCH_BOOK_BY_CATEGORY_PENDING: 'FETCH_BOOK_BY_CATEGORY_PENDING',
  FETCH_BOOK_BY_CATEGORY_SUCCESS: 'FETCH_BOOK_BY_CATEGORY_SUCCESS',
  FETCH_BOOK_BY_CATEGORY_FAIL: 'FETCH_BOOK_BY_CATEGORY_FAIL',
  // SWITCH_LAYOUT_HOME: 'SWITCH_LAYOUT_HOME',
  SAVE_SEARCH_HISTORY: 'SAVE_SEARCH_HISTORY',
  CLEAR_SEARCH_HISTORY: 'CLEAR_SEARCH_HISTORY',
  CLEAR_BOOKS: 'CLEAR_BOOKS',
  GET_REVIEW_BOOKS_PENDING: 'GET_REVIEW_BOOKS_PENDING',
  GET_REVIEW_BOOKS_SUCCESS: 'GET_REVIEW_BOOKS_SUCCESS',
  GET_REVIEW_BOOKS_FAILURE: 'GET_REVIEW_BOOKS_FAILURE',

  FETCH_PRODUCTS_BEST_SELLER_PENDING: 'FETCH_PRODUCTS_BEST_SELLER_PENDING',
  FETCH_ALL_PRODUCTS_BEST_SELLER_MORE: 'FETCH_ALL_PRODUCTS_BEST_SELLER_MORE',
  FETCH_ALL_PRODUCTS_BEST_SELLER_SUCCESS: 'FETCH_ALL_PRODUCTS_BEST_SELLER_SUCCESS',
  FETCH_PRODUCTS_BEST_SELLER_FAILURE: 'FETCH_PRODUCTS_BEST_SELLER_FAILURE',
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
  fetchCategoriesById: categoryId => async (dispatch) => {
    dispatch({ type: types.FETCH_CATEGORY_BY_ID_PENDING });
    const json = await antradeWorker.searchCategoriesById(categoryId);

    if (json.books) {
      dispatch({
        type: types.FETCH_CATEGORY_BY_ID_SUCCESS,
        items: json,
      });
    } else {
      dispatch({
        type: types.FETCH_CATEGORY_BY_ID_FAIL,
        message: Languages.ErrorMessageRequest,
      });
    }
  },
  getPublisherById: id => async (dispatch, getState) => {
    dispatch({ type: types.FETCH_PUBLISHER_PENDING });
    const json = await antradeWorker.getPublisherById(id);

    if (json.id) {
      dispatch({ type: types.FETCH_PUBLISHER_SUCCESS, items: json });
    } else {
      toast(Languages.ErrorMessageRequest);
      dispatch({
        type: types.FETCH_PUBLISHER_FAIL,
        message: json.message,
      });
    }
  },
  getAuthorById: id => async (dispatch, getState) => {
    dispatch({ type: types.FETCH_AUTHOR_PENDING });
    const json = await antradeWorker.getAuthorById(id);

    if (json.id) {
      dispatch({ type: types.FETCH_AUTHOR_SUCCESS, items: json });
    } else {
      toast(Languages.ErrorMessageRequest);
      dispatch({
        type: types.FETCH_AUTHOR_FAIL,
        message: json.message,
      });
    }
  },
  getBookDetail: productId => async (dispatch, getState) => {
    dispatch({ type: types.FETCH_PRODUCTS_DETAIL_PENDING });
    const json = await antradeWorker.getBookDetail(productId);

    if (json.code === 200 && json.data) {
      dispatch({ type: types.FETCH_PRODUCTS_DETAIL_SUCCESS, items: json.data });
    } else {
      toast(Languages.ErrorMessageRequest);
      dispatch({
        type: types.FETCH_PRODUCTS_DETAIL_FAIL,
        message: json.message,
      });
    }
  },
  fetchBooksByCategory: (payload) => async (dispatch) => {
    dispatch({ type: types.FETCH_BOOK_BY_CATEGORY_PENDING });
    const json = await antradeWorker.getBooksByCategory(payload);

    if (json.data && json.code === 200) {
      dispatch({
        type: types.FETCH_BOOK_BY_CATEGORY_SUCCESS,
        items: json.data,
      });
    } else {
      dispatch({
        type: types.FETCH_BOOK_BY_CATEGORY_FAIL,
        message: Languages.ErrorMessageRequest,
      });
    }
  },
  getReviewsBook: async (dispatch, productId) => {
    dispatch({ type: types.GET_REVIEW_BOOKS_PENDING });
    const json = await antradeWorker.getReviewsBook(productId);

    if (json.code === 200 && json.data && json.data.items) {
      dispatch(actions.getReviewBooksSuccess(json.data));
    } else {
      dispatch({ type: types.GET_REVIEW_BOOKS_FAILURE });
    }
  },
  fetchAllBooks: async (dispatch, page = 1, pageSize = Constants.pagingLimit) => {
    // if (page === 1)
    dispatch({ type: types.FETCH_PRODUCTS_PENDING });
    const json = await antradeWorker.getAllBooks(page);

    if (json.code === 200 && json.data) {
      if (page > 1) {
        dispatch({
          type: types.FETCH_ALL_PRODUCTS_MORE,
          items: json.data.data,
          page,
        });
      } else {
        dispatch({
          type: types.FETCH_ALL_PRODUCTS_SUCCESS,
          items: json.data.data,
          page,
        });
      }
    } else {
      dispatch({
        type: types.FETCH_PRODUCTS_FAILURE,
        message: Languages.ErrorMessageRequest,
      });
    }
  },
  fetchBooksIfNeeded: (page = 1, pageSize = Constants.pagingLimit) => (dispatch, getState) => {
    // actions.clearBooks(dispatch);
    const state = getState().products;

    if (!state.isFetching && state.stillFetchAll  && page === state.currentPage + 1) {
      actions.fetchAllBooks(dispatch, page, pageSize);
    }
  },
  searchBooksByName: payload => async (dispatch, page = 1, pageSize = Constants.pagingLimit) => {
    dispatch({ type: types.FETCH_BOOKS_BY_NAME_DETAIL_PENDING });
    const json = await antradeWorker.searchBooks(payload);

    if (json.code === 200 && json.data && json.data.data) {
      dispatch({
        type: types.FETCH_BOOKS_BY_NAME_DETAIL_SUCCESS,
        items: json.data.data,
      });
    } else {
      dispatch({
        type: types.FETCH_BOOKS_BY_NAME_DETAIL_FAIL,
      });
    }
  },
  searchBooksByPrice: payload => async (dispatch, page = 1, pageSize = Constants.pagingLimit) => {
    dispatch({ type: types.FETCH_BOOKS_BY_PRICE_DETAIL_PENDING });
    const json = await antradeWorker.searchBooksByPrice(payload);

    if (json.data && json.data.data && json.code === 200) {
      dispatch({
        type: types.FETCH_BOOKS_BY_PRICE_DETAIL_SUCCESS,
        items: json.data.data,
      });
    } else {
      dispatch({
        type: types.FETCH_BOOKS_BY_PRICE_DETAIL_FAIL,
      });
    }
  },
  getBooksBestSeller: async (dispatch, page = 1, pageSize = Constants.pagingLimit) => {
    // if (page === 1)
    dispatch({ type: types.FETCH_PRODUCTS_BEST_SELLER_PENDING });
    const json = await antradeWorker.getBooksBestSeller(page);

    if (json.code === 200 && json.data) {
      if (page > 1) {
        dispatch({
          type: types.FETCH_ALL_PRODUCTS_BEST_SELLER_MORE,
          items: json.data.data,
          page,
        });
      } else {
        dispatch({
          type: types.FETCH_ALL_PRODUCTS_BEST_SELLER_SUCCESS,
          items: json.data.data,
          page,
        });
      }
    } else {
      dispatch({
        type: types.FETCH_PRODUCTS_BEST_SELLER_FAILURE,
        message: Languages.ErrorMessageRequest,
      });
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
  clearBooks: (dispatch) => {
    dispatch({ type: types.CLEAR_BOOKS });
  },
  getReviewBooksSuccess: json => {
    return { type: types.GET_REVIEW_BOOKS_SUCCESS, json };
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
  pages: 1,
  isFetchingDetail: false,
  productDetail: {},
  publisherDetail: {},
  authorDetail: {},
  productsByName: [],
  booksByName: [],
  booksByPrice: [],
  currentPage: 0,
  booksRelate: [],
  booksBestSeller: [],
  stillFetchBestSeller: true,
  reviewBooks: {},
};

export const reducer = (state = initialState, action) => {
  const { type, error, items, page } = action;

  switch (type) {
    case types.FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        isFetching: true,
      }
    case types.FETCH_PRODUCTS_BEST_SELLER_PENDING:
      return {
        ...state,
        isFetching: true,
      }
    case types.FETCH_BOOKS_BY_NAME_DETAIL_PENDING:
      return {
        ...state,
        isFetching: true,
      }
    case types.FETCH_BOOKS_BY_PRICE_DETAIL_PENDING:
      return {
        ...state,
        isFetching: true,
      }

      // return {
      //   ...state,
      //   isFetching: true,
      //   error: null,
      //   message: '',
      // };

    case types.FETCH_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        booksRelate: items.books,
        isFetching: false,
      }

    case types.FETCH_CATEGORY_BY_ID_FAIL:
      return {
        ...state,
        isFetching: false,
        error,
      };

    case types.FETCH_BOOK_BY_CATEGORY_PENDING:
      return {
        ...state,
        isFetching: true,
      }
    case types.FETCH_BOOK_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        booksRelate: items.data,
        isFetching: false,
      }
    case types.FETCH_BOOK_BY_CATEGORY_FAIL:
      return {
        ...state,
        isFetching: false,
        error,
      };

    case types.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error,
      };
    
      case types.FETCH_PRODUCTS_BEST_SELLER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error,
      };

    case types.FETCH_ALL_PRODUCTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        listAll: items.items,
        stillFetchAll: items.items.length !== 0,
        error: null,
        currentPage: action.page,
      });
      
      // return {
      //   ...state,
      //   listAll: items.items,
      //   // numberOfUnread:
      //   //   action.json.meta && action.json.meta.numberOfUnread ? action.json.meta.numberOfUnread : 0,
      //   curP: items.page,
      //   stillFetchAll: items.items.length !== 0,
      //   // meta: action.json.meta,
      //   error: null,
      //   isFetching: false,
      //   pages: items.pages,
      // };

    case types.FETCH_ALL_PRODUCTS_BEST_SELLER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        booksBestSeller: items.items,
        stillFetchBestSeller: items.items.length !== 0,
        error: null,
        currentPage: action.page,
      });

    case types.FETCH_ALL_PRODUCTS_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        listAll: state.listAll.concat(items.items),
        stillFetchAll: items.items.length !== 0,
        error: null,
        currentPage: action.page
      });
      // return {
      //   ...state,
      //   listAll: state.listAll.concat(items.items),
      //   // numberOfUnread:
      //   //   action.json.meta && action.json.meta.numberOfUnread ? action.json.meta.numberOfUnread : 0,
      //   error: null,
      //   pages: items.pages,
      //   curP: items.page,
      //   stillFetchAll: items.items.length !== 0,
      //   // meta: action.json.meta,
      //   isFetching: false,
      //   // didInvalidate: false,
      // };
    }

    case types.FETCH_ALL_PRODUCTS_BEST_SELLER_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        booksBestSeller: state.booksBestSeller.concat(items.items),
        stillFetchBestSeller: items.items.length !== 0,
        error: null,
        currentPage: action.page
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

    case types.FETCH_BOOKS_BY_NAME_DETAIL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        booksByPrice: items.items,
      };
    }

    case types.FETCH_BOOKS_BY_NAME_DETAIL_FAIL: {
      return {
        ...state,
        isFetching: false,
        booksByPrice: [],
      };
    }

    case types.FETCH_BOOKS_BY_PRICE_DETAIL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        booksByPrice: items.items,
      };
    }

    case types.FETCH_BOOKS_BY_PRICE_DETAIL_FAIL: {
      return {
        ...state,
        isFetching: false,
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

    case types.FETCH_PUBLISHER_PENDING:
      return {
        ...state,
        isFetchingDetail: true,
      };
    case types.FETCH_CATEGORY_BY_ID_PENDING:
      return {
        ...state,
        isFetchingDetail: true,
      };

    case types.FETCH_PUBLISHER_FAIL:
      return {
        ...state,
        publisherDetail: {},
        isFetchingDetail: false,
      };

    case types.FETCH_PUBLISHER_SUCCESS: {
      const nextState = { ...state, isFetchingDetail: false, publisherDetail: items };

      return nextState;
    }

    case types.FETCH_AUTHOR_PENDING:
      return {
        ...state,
        isFetchingDetail: true,
      };

    case types.FETCH_AUTHOR_FAIL:
      return {
        ...state,
        authorDetail: {},
        isFetchingDetail: false,
      };

    case types.FETCH_AUTHOR_SUCCESS: {
      const nextState = { ...state, isFetchingDetail: false, authorDetail: items };

      return nextState;
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
      const nextState = { ...state, isFetchingDetail: false, productDetail: items.data };

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
    case types.CLEAR_BOOKS: {
      return {
        ...initialState,
      };
    }
    case types.GET_REVIEW_BOOKS_PENDING:
      return {
        ...state,
      };
    case types.GET_REVIEW_BOOKS_SUCCESS:
      return {
        ...state,
        reviewBooks: action.json,
      };
    case types.GET_REVIEW_BOOKS_FAILURE:
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
};
