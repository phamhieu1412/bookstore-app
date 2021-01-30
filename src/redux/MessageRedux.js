import antradeWorker from '../api/apiWorker';
import Constants from '../common/Constants';
import Languages from '../common/Languages';

const types = {
  FETCH_MY_MESSAGES_PENDING: 'FETCH_MY_MESSAGES_PENDING',
  FETCH_MY_MESSAGES_SUCCESS: 'FETCH_MY_MESSAGES_SUCCESS',
  FETCH_MY_MESSAGES_FAILURE: 'FETCH_MY_MESSAGES_FAILURE',
  FETCH_MY_MESSAGES_MORE: 'FETCH_MY_MESSAGES_MORE',
  // FETCH_SINGLE_MESSAGE_PENDING: 'FETCH_SINGLE_MESSAGE_PENDING',
  // FETCH_SINGLE_MESSAGE_SUCCESS: 'FETCH_SINGLE_MESSAGE_SUCCESS',
  // FETCH_SINGLE_MESSAGE_FAILURE: 'FETCH_SINGLE_MESSAGE_FAILURE',
  SET_MESSAGE_READ_PENDING: 'SET_MESSAGE_READ_PENDING',
  SET_MESSAGE_READ_SUCCESS: 'SET_MESSAGE_READ_SUCCESS',
  SET_MESSAGE_READ_FAILURE: 'SET_MESSAGE_READ_FAILURE',
  CLEAR_MY_MESSAGES: 'CLEAR_MY_MESSAGES',
  // INVALIDATE_MY_MESSAGES: 'INVALIDATE_MY_MESSAGES',
};

export const actions = {
  fetchMyMessages: async (dispatch, Page = 1, PageSize = Constants.pagingLimit) => {
    if (Page === 1) dispatch({ type: types.FETCH_MY_MESSAGES_PENDING });
    const payload = {
      Page,
      PageSize,
    };
    const json = await antradeWorker.getMyMessages(payload);
    if (json === undefined || json.error) {
      dispatch(actions.fetchMyMessagesFailure(Languages.GetDataError));
    } else {
      if (Page > 1) {
        dispatch(actions.fetchMyMessagesMore(json, Page));
      } else {
        dispatch(actions.fetchMyMessagesSuccess(json, Page));
      }
    }
  },
  fetchMyMessagesIfNeeded: (page = 1, pageSize = Constants.pagingLimit) => (dispatch, getState) => {
    const state = getState().myMessages;
    if (!state.isFetching && state.stillFetch && page === state.currentPage + 1) {
      actions.fetchMyMessages(dispatch, page, pageSize);
    }
  },
  // fetchSingleMessage: async (dispatch, messageCode) => {
  //   dispatch({ type: types.FETCH_SINGLE_MESSAGE_PENDING });
  //   const json = await antradeWorker.getSingleMessage(messageCode);

  //   if (json === undefined || json.error) {
  //     dispatch(actions.fetchSingleMessageFailure(Languages.GetDataError));
  //   } else {
  //     dispatch(actions.fetchSingleMessageSuccess(json));
  //   }
  // },
  setMessageRead: async (dispatch, notiId) => {
    dispatch({ type: types.SET_MESSAGE_READ_PENDING });
    const json = await antradeWorker.setMessageRead(notiId);

    if (json === undefined || json.error) {
      dispatch(actions.setMessageReadFailure(Languages.GetDataError));
    } else {
      dispatch(actions.setMessageReadSuccess(json, notiId));
    }
  },
  clearMyMessages: dispatch => {
    dispatch({
      type: types.CLEAR_MY_MESSAGES,
    });
  },
  fetchMyMessagesSuccess: (json, page) => {
    return { type: types.FETCH_MY_MESSAGES_SUCCESS, json, page };
  },
  fetchMyMessagesMore: (json, page) => {
    return { type: types.FETCH_MY_MESSAGES_MORE, json, page };
  },
  // invalidateMyMessages: () => {
  //   return { type: types.INVALIDATE_MY_MESSAGES };
  // },
  fetchMyMessagesFailure: error => {
    return { type: types.FETCH_MY_MESSAGES_FAILURE, error };
  },
  // fetchSingleMessageSuccess: json => {
  //   return { type: types.FETCH_SINGLE_MESSAGE_SUCCESS, json };
  // },
  // fetchSingleMessageFailure: error => {
  //   return { type: types.FETCH_SINGLE_MESSAGE_FAILURE, error };
  // },
  setMessageReadSuccess: (json, notiId) => {
    return { type: types.SET_MESSAGE_READ_SUCCESS, json, notiId };
  },
  setMessageReadFailure: error => {
    return { type: types.SET_MESSAGE_READ_FAILURE, error };
  },
};

const initialState = {
  messages: [],
  meta: {},
  numberOfUnread: 0,
  currentPage: 0,
  isFetching: false,
  stillFetch: true,
  didInvalidate: true,
};

export const reducer = (state = initialState, action) => {
  const { type, notiId } = action;
  let notiIndex;

  switch (type) {
    case types.FETCH_MY_MESSAGES_PENDING:
    case types.FETCH_SINGLE_MESSAGE_PENDING:
      return {
        ...state,
        isFetching: true,
      };

    case types.FETCH_MY_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.json.data,
        numberOfUnread:
          action.json.meta && action.json.meta.numberOfUnread ? action.json.meta.numberOfUnread : 0,
        currentPage: action.page,
        stillFetch: !action.json.data || action.json.data.length !== 0,
        meta: action.json.meta,
        isFetching: false,
        didInvalidate: false,
      };

    case types.FETCH_MY_MESSAGES_MORE:
      return {
        ...state,
        messages: state.messages.concat(action.json.data),
        numberOfUnread:
          action.json.meta && action.json.meta.numberOfUnread ? action.json.meta.numberOfUnread : 0,
        currentPage: action.page,
        stillFetch: action.json.data.length !== 0,
        meta: action.json.meta,
        isFetching: false,
        didInvalidate: false,
      };

    case types.FETCH_MY_MESSAGES_FAILURE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      };

    case types.SET_MESSAGE_READ_SUCCESS:
      notiIndex = state.messages.findIndex(item => item.id === notiId);
      if (notiIndex >= 0) {
        state.messages[notiIndex].read = 'Read';
      }
      return {
        ...state,
        isFetching: false,
        numberOfUnread:
          action.json.meta && action.json.meta.numberOfUnread ? action.json.meta.numberOfUnread : 0,
      };
    case types.CLEAR_MY_MESSAGES:
      return { ...initialState };

    // case types.INVALIDATE_MY_MESSAGES: {
    //   return {
    //     ...state,
    //     didInvalidate: true,
    //     currentPage: 0,
    //   };
    // }
    case types.SET_MESSAGE_READ_PENDING:
    case types.SET_MESSAGE_READ_FAILURE:
      return state;
    default:
      return state;
  }
};
