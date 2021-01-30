import antradeWorker from '../api/apiWorker';
// import { logEventAddToWishList } from '../api/eventLogger';
import Languages from '../common/Languages';

const types = {
  ADD_WISHLIST_ITEM: 'ADD_WISHLIST_ITEM',
  REMOVE_WISHLIST_ITEM: 'REMOVE_WISHLIST_ITEM',
  EMPTY_WISHLIST: 'EMPTY_WISHLIST',

  FETCH_WISHLIST_PENDING: 'FETCH_WISHLIST_PENDING',
  FETCH_WISHLIST_SUCCESS: 'FETCH_WISHLIST_SUCCESS',
  FETCH_WISHLIST_FAILURE: 'FETCH_WISHLIST_FAILURE',
};

export const actions = {
  addWishListItem: (dispatch, product) => {
    dispatch({
      type: types.ADD_WISHLIST_ITEM,
      product,
    });
  },

  removeWishListItem: (dispatch, product) => {
    dispatch({
      type: types.REMOVE_WISHLIST_ITEM,
      product,
    });
  },
  emptyWishList: dispatch => {
    dispatch({
      type: types.EMPTY_WISHLIST,
    });
  },

  fetchWishList: async dispatch => {
    dispatch({ type: types.FETCH_WISHLIST_PENDING });
    const json = await antradeWorker.getWishList();
    if (json === undefined || json.error) {
      dispatch(actions.fetchWishListFailure(Languages.GetDataError));
    } else {
      dispatch(actions.fetchWishListSuccess(json));
    }
  },
  fetchWishListSuccess: items => {
    return { type: types.FETCH_WISHLIST_SUCCESS, items };
  },
  fetchWishListFailure: error => {
    return { type: types.FETCH_WISHLIST_FAILURE, error };
  },
};

const initialState = {
  wishListItems: [],
  total: 0,
  // paymentAfterSaleOff: 0,
};

export const reducer = (state = initialState, action) => {
  const { type, error } = action;

  switch (type) {
    case types.ADD_WISHLIST_ITEM: {
      const { product } = action;
      const isExisted = productExistedInWishList(product, state.wishListItems);

      if (!isExisted) {
        // no await so that user don't have to wait for server response
        antradeWorker.addWishListItem(product.slug);

        // eventLogger
        // logEventAddToWishList(product);

        return Object.assign({}, state, {
          wishListItems: [...state.wishListItems, productToWishListItem(product)],
          total: state.total + 1,
        });
      }
      return state;
    }
    case types.REMOVE_WISHLIST_ITEM: {
      const { product } = action;
      const index1 = state.wishListItems.findIndex(wishListItem =>
        compareWishListItem(wishListItem, product)
      ); // check if existed

      if (index1 === -1) {
        return state;
      }

      // no await so that user don't have to wait for server response
      antradeWorker.removeWishListItem(product.slug);
      return index1 === -1
        ? state // This should not happen, but catch anyway
        : Object.assign({}, state, {
            wishListItems: state.wishListItems.filter(
              wishListItem => !compareWishListItem(wishListItem, product)
            ),
            total: state.total - 1,
          });
    }
    case types.EMPTY_WISHLIST:
      state.wishListItems.forEach(item => {
        // don't await so that user don't have to wait for server response
        antradeWorker.removeWishListItem(item.slug);
      });
      return Object.assign({}, state, {
        wishListItems: [],
        total: 0,
      });
    case types.FETCH_WISHLIST_PENDING: {
      return {
        ...state,
        error: null,
      };
    }
    case types.FETCH_WISHLIST_FAILURE: {
      return {
        ...state,
        error,
      };
    }
    case types.FETCH_WISHLIST_SUCCESS: {
      const { items } = action;
      if (!items || !items.length) {
        return state;
      }

      const mergedList = mergeWishList(items, state.wishListItems);
      return {
        ...state,
        wishListItems: mergedList || [],
        total: mergedList.length,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};

const compareWishListItem = (wishListItem, product) => {
  return wishListItem.slug === product.slug;
};

const productExistedInWishList = (product, wishListItems) => {
  return (
    wishListItems.length &&
    wishListItems.find(wishListItem => compareWishListItem(wishListItem, product))
  );
};

const productToWishListItem = product => {
  return product;
};

const mergeWishList = (products, wishListItems) => {
  products.forEach(product => {
    if (!productExistedInWishList(product, wishListItems)) {
      wishListItems.push(productToWishListItem(product));
    }
  });
  wishListItems.forEach(item => {
    if (!productExistedInWishList(item, products)) {
      // no await so that user don't have to wait for server response
      antradeWorker.addWishListItem(item.slug);
    }
  });

  return wishListItems;
};
