import { persistCombineReducers } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import AsyncStorage from '@react-native-community/async-storage';
import getStoredState from 'redux-persist/es/getStoredState';

import { reducer as ToastReducer } from './ToastRedux';

// You have to import every reducers and combine them.
import { log } from '../Omni';
import Constants from '../common/Constants';

const isStateEmpty = state => {
  return !state || !state.user || !state.user.finishIntro;
};

const migrate = async state => {
  // Migrate from default storage to fs https://github.com/robwalkerco/redux-persist-filesystem-storage#migration-from-previous-storage
  // log('Attempting migration');
  if (isStateEmpty(state)) {
    // if state from fs storage is empty try to read state from previous storage
    log('FS state empty');
    try {
      const oldState = await getStoredState({
        key: 'root',
        storage: AsyncStorage,
      });
      if (!isStateEmpty(oldState)) {
        log('Old state not empty. Attempting migration.');
        // if data exists in `OldStorage` - rehydrate fs persistor with it
        return oldState;
      }
    } catch (getStateError) {
      log('getStoredState error', getStateError);
    }
  }
  // log('FS state not empty');
  return state;
};

const config = {
  key: `${Constants.bundleId}-root`,
  storage: FilesystemStorage,
  blacklist: ['toast'],
  migrate,
  timeout: 60000, // 1 minute timeout
};

export default persistCombineReducers(config, {
    toast: ToastReducer,
});
