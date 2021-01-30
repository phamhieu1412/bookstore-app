import { flatten } from 'lodash';
import antradeWorker from '../api/apiWorker';
import Languages from '../common/Languages';

const types = {
  LAYOUT_FETCHING: 'LAYOUT_FETCHING',
  LAYOUT_FETCH_FAILURE: 'LAYOUT_FETCH_FAILURE',
  LAYOUT_FETCH_SUCCESS: 'LAYOUT_FETCH_SUCCESS',
  LAYOUT_FETCH_MORE: 'LAYOUT_FETCH_MORE',
  LAYOUT_ALL_FETCHING: 'LAYOUT_ALL_FETCHING',
  LAYOUT_ALL_FETCH_SUCCESS: 'LAYOUT_ALL_FETCH_SUCCESS',
};

export const actions = {
  fetchAllProductsLayout: (page = 1) => async (dispatch, getState) => {
    const { app: appState } = getState();
    const appConfig = appState.config && appState.config.app ? appState.config.app : {};
    dispatch({ type: types.LAYOUT_ALL_FETCHING });
    const layouts =
      appConfig && appConfig.homeLayout && appConfig.homeLayout.length ? appConfig.homeLayout : [];

    const promises = [];
    layouts.forEach((layout, index) => {
      const { predefined } = layout;
      if (predefined !== 'category-bubbles') {
        promises.push(dispatch(actions.fetchProductsLayout(dispatch, layout, page, index)));
      }
    });
    Promise.all(promises).then(() => {
      dispatch({ type: types.LAYOUT_ALL_FETCH_SUCCESS });
    });
  },
  fetchProductsLayout: (dispatch, layout, page, index) => {
    const { predefined, code } = layout;
    if (predefined === 'category') {
      if (code) {
        return actions.fetchProductsLayoutCategory(dispatch, code, index, page);
      }
    } else if (predefined === 'supplier' && code) {
      return actions.fetchProductsLayoutSupplier(dispatch, code, index, page);
    } else if (predefined === 'tag' && code) {
      return actions.fetchProductsLayoutTag(dispatch, code, index, page); // @TODO: no page
    } else if (predefined !== 'category-bubbles') {
      return actions.fetchPredefinedCollection(dispatch, predefined, index, page);
    }

    return Promise.resolve();
  },
  fetchProductsByCollections: async (dispatch, layout, page, index) => {
    let json;
    const { predefined, code } = layout;
    if (predefined === 'category') {
      if (code) {
        json = await antradeWorker.productsByCategoryCode(code, page);
      }
    } else if (predefined === 'supplier') {
      if (code) {
        json = await antradeWorker.productsBySupplierCode(code, page);
      }
    } else if (predefined !== 'category-bubbles') {
      json = await antradeWorker.getPredefinedCollection(layout.predefined, page);
    }

    if (json === undefined || json.error) {
      dispatch(actions.fetchProductsLayoutFailure(Languages.getDataError));
    } else {
      dispatch({
        type: page > 1 ? types.LAYOUT_FETCH_MORE : types.LAYOUT_FETCH_SUCCESS,
        payload: json,
        extra: { index },
        finish: json.length === 0,
      });
    }
  },
  fetchPredefinedCollection: (dispatch, collection = '', index, page = 1) => {
    return () => {
      dispatch({ type: types.LAYOUT_FETCHING, extra: { index } });
      return antradeWorker.getPredefinedCollection(collection, page).then(json => {
        if (json === undefined || json.error) {
          dispatch(actions.fetchProductsLayoutFailure(Languages.getDataError));
        } else {
          dispatch({
            type: types.LAYOUT_FETCH_SUCCESS,
            payload: json,
            extra: { index },
            finish: true, // json.length === 0, // collection has no pagination
          });
        }
      });
    };
  },
  fetchProductsLayoutCategory: (dispatch, categoryCode = '', index, page = 1) => {
    return () => {
      dispatch({ type: types.LAYOUT_FETCHING, extra: { index } });
      return antradeWorker.productsByCategoryCode(categoryCode, page).then(json => {
        if (json === undefined || json.error) {
          dispatch(actions.fetchProductsLayoutFailure(Languages.getDataError));
        } else {
          dispatch({
            type: types.LAYOUT_FETCH_SUCCESS,
            payload: json,
            extra: { index },
            finish: true, // json.length === 0, // horizon Item has no pagination
          });
        }
      });
    };
  },
  fetchProductsLayoutSupplier: (dispatch, supplierSlug = '', index, page = 1) => {
    return () => {
      dispatch({ type: types.LAYOUT_FETCHING, extra: { index } });
      return antradeWorker.productsBySupplierCode(supplierSlug, page).then(json => {
        if (json === undefined || json.error) {
          dispatch(actions.fetchProductsLayoutFailure(Languages.getDataError));
        } else {
          dispatch({
            type: types.LAYOUT_FETCH_SUCCESS,
            payload: json,
            extra: { index },
            finish: true, // json.length === 0, // horizon Item has no pagination
          });
        }
      });
    };
  },
  fetchProductsLayoutTag: (dispatch, tag = '', index, page = 1) => {
    return () => {
      dispatch({ type: types.LAYOUT_FETCHING, extra: { index } });
      return antradeWorker.productsByTags([tag], page).then(json => {
        if (json === undefined || json.error) {
          dispatch(actions.fetchProductsLayoutFailure(Languages.getDataError));
        } else {
          dispatch({
            type: types.LAYOUT_FETCH_SUCCESS,
            payload: json,
            extra: { index },
            finish: true, // json.length === 0, // horizon Item has no pagination
          });
        }
      });
    };
  },
  fetchProductsLayoutFailure: error => ({
    type: types.LAYOUT_FETCH_FAILURE,
    error,
  }),
};

const initialState = {
  layout: [],
  isFetching: false,
};

export const reducer = (state = initialState, action) => {
  const { extra, type, payload, finish } = action;

  switch (type) {
    case types.LAYOUT_ALL_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.LAYOUT_ALL_FETCH_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      };
    }

    case types.LAYOUT_FETCH_SUCCESS: {
      const layout = [...state.layout];
      layout[extra.index] = layout[extra.index] || {};
      layout[extra.index] = {
        ...layout[extra.index],
        list: flatten(payload),
        isFetching: false,
      };
      return {
        ...state,
        layout,
      };
    }

    case types.LAYOUT_FETCH_MORE: {
      const layout = [...state.layout];
      layout[extra.index] = layout[extra.index] || {};
      layout[extra.index] = {
        ...layout[extra.index],
        list: layout[extra.index].list.concat(payload),
        isFetching: false,
        finish,
      };
      return {
        ...state,
        layout,
      };
    }

    case types.LAYOUT_FETCHING: {
      const layout = [...state.layout];
      layout[extra.index] = layout[extra.index] || {};
      layout[extra.index] = {
        ...layout[extra.index],
        isFetching: false,
      };
      return {
        ...state,
        layout,
      };
    }

    default:
      return state;
  }
};
