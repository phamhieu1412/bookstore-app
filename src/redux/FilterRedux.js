import { createActions, handleActions } from 'redux-actions';
import Constants from '../common/Constants';

const types = {
  UPDATE_FILTER: 'UPDATE_FILTER',
};

export const { updateFilter } = createActions(types.UPDATE_FILTER);

export const actions = {
  updateFilter,
};

const defaultState = {
  category: null,
  // brand: null,
  // tag: null,
  maxPrice: Constants.Filter.defaultPrice,
};

export const reducer = handleActions(
  {
    [updateFilter]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  defaultState
);
