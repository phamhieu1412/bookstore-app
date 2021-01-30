import { actions as NetInfoActions } from './NetInfoRedux';
import { toast } from '../Omni';
import antradeWorker from '../api/apiWorker';
import { flattenCategories } from '../ultils/Product';
import Config from '../common/Config';
import Languages from '../common/Languages';

const types = {
  FETCH_CATEGORIES_PENDING: 'FETCH_CATEGORIES_PENDING',
  FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE: 'FETCH_CATEGORIES_FAILURE',
  FETCH_TOP_CATEGORIES_PENDING: 'FETCH_TOP_CATEGORIES_PENDING',
  FETCH_TOP_CATEGORIES_SUCCESS: 'FETCH_TOP_CATEGORIES_SUCCESS',
  FETCH_TOP_CATEGORIES_FAILURE: 'FETCH_TOP_CATEGORIES_FAILURE',

  SWITCH_DISPLAY_MODE: 'SWITCH_DISPLAY_MODE',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  CATEGORY_SELECT_LAYOUT: 'CATEGORY_SELECT_LAYOUT',

  UPDATE_CATEGORY_FILTER: 'UPDATE_CATEGORY_FILTER',
};

export const DisplayMode = {
  ListMode: 'ListMode',
  GridMode: 'GridMode',
  CardMode: 'CardMode',
};

export const actions = {
  fetchCategories: async dispatch => {
    dispatch({ type: types.FETCH_CATEGORIES_PENDING });
    const json = await antradeWorker.getCategories({ level: 1 });

    if (json === undefined || json.error) {
      toast(Languages.ErrorMessageRequest);
      if (json.error && json.error.status === 0) {
        NetInfoActions.renewConnectionStatus(dispatch);
      }
      dispatch(actions.fetchCategoriesFailure(Languages.GetDataError));
    } else {
      dispatch(actions.fetchCategoriesSuccess(json));
    }
  },
  fetchCategoriesSuccess: items => {
    return { type: types.FETCH_CATEGORIES_SUCCESS, items };
  },
  fetchCategoriesFailure: error => {
    return { type: types.FETCH_CATEGORIES_FAILURE, error };
  },
  fetchTopCategories: async dispatch => {
    dispatch({ type: types.FETCH_TOP_CATEGORIES_PENDING });
    const json = await antradeWorker.getTopCategories();

    if (json === undefined || json.error) {
      dispatch(actions.fetchTopCategoriesFailure(Languages.GetDataError));
    } else {
      dispatch(actions.fetchTopCategoriesSuccess(json));
    }
  },
  fetchTopCategoriesSuccess: items => {
    return { type: types.FETCH_TOP_CATEGORIES_SUCCESS, items };
  },
  fetchTopCategoriesFailure: error => {
    return { type: types.FETCH_TOP_CATEGORIES_FAILURE, error };
  },
  switchDisplayMode: mode => {
    return { type: types.SWITCH_DISPLAY_MODE, mode };
  },
  setSelectedCategory: category => {
    return { type: types.SET_SELECTED_CATEGORY, category };
  },
  setActiveLayout: value => {
    return { type: types.CATEGORY_SELECT_LAYOUT, value };
  },
  updateFilter: value => {
    return { type: types.UPDATE_CATEGORY_FILTER, value };
  },
};

const initialState = {
  isFetching: false,
  error: null,
  displayMode: DisplayMode.GridMode,
  list: [],
  flattenList: [],
  topList: [],
  selectedCategory: null,
  filters: {},
  selectedLayout: Config.CategoryListView,
};

export const reducer = (state = initialState, action) => {
  const { type, mode, error, items, category, value } = action;

  switch (type) {
    case types.FETCH_CATEGORIES_PENDING:
    case types.FETCH_TOP_CATEGORIES_PENDING:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case types.FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: items || [],
        flattenList: items ? flattenCategories(items) : [],
        error: null,
      };
    }
    case types.FETCH_TOP_CATEGORIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        topList: items || [],
        // flattenList: items ? flattenCategories(items) : [],
        error: null,
      };
    }
    case types.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        list: [],
        error,
      };
    case types.FETCH_TOP_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        topList: [],
        flattenList: [],
        error,
      };
    case types.SWITCH_DISPLAY_MODE: {
      return {
        ...state,
        displayMode: mode,
      };
    }
    case types.SET_SELECTED_CATEGORY: {
      // const { selectedCategory, filters } = state;
      return {
        ...state,
        selectedCategory: category,
        // filters: (!selectedCategory && !category && selectedCategory.slug === category.slug) ? filters : {}, // clear filter when new category is selected
        filters: {}, // reset filter when new category is selected
      };
    }
    case types.CATEGORY_SELECT_LAYOUT:
      return {
        ...state,
        isFetching: false,
        selectedLayout: value || false,
      };
    case types.UPDATE_CATEGORY_FILTER:
      return {
        ...state,
        filters: value || {},
      };

    default: {
      return state;
    }
  }
};
