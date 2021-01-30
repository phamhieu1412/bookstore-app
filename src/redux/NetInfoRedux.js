
import NetInfo from '@react-native-community/netinfo';
import { toast } from '../Omni';
import Languages from '../common/Languages';

const types = {
  UPDATE_CONNECTION_STATUS: 'UPDATE_CONNECTION_STATUS',
  SUBSCRIBED_CONNECTION_STATUS: 'SUBSCRIBED_CONNECTION_STATUS',
};

export const actions = {
  updateConnectionStatus: isConnected => {
    return { type: types.UPDATE_CONNECTION_STATUS, isConnected };
  },
  renewConnectionStatus: dispatch => {
    // dispatch({ type: types.RENEWING_CONNECTION_STATUS });
    NetInfo.fetch().then(status => {
      return dispatch({ type: types.UPDATE_CONNECTION_STATUS, isConnected: status.isConnected });
    });
  },
  subscribeToConnectionStatus: () => (dispatch, getState) => {
    const { netInfo } = getState();
    if (!netInfo.subscribed) {
      NetInfo.addEventListener(status => {
        if (netInfo.isConnected !== status.isConnected) {
          if (!status.isConnected) {
            toast(Languages.noConnection);
          }
          dispatch(actions.updateConnectionStatus(status.isConnected));
        }
      });
      dispatch(actions.subscribedToConnectionStatus);
    }
  },
  subscribedToConnectionStatus: {
    type: types.SUBSCRIBED_CONNECTION_STATUS,
  },
};

const initialState = {
  isConnected: true,
  subscribed: false,
};

export const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case types.UPDATE_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: action.isConnected,
      };
    case types.SUBSCRIBED_CONNECTION_STATUS:
      return {
        ...state,
        subscribed: true,
      };
    default:
      return state;
  }
};
