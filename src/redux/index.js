import { persistCombineReducers } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import AsyncStorage from '@react-native-community/async-storage';
import getStoredState from 'redux-persist/es/getStoredState';

// You have to import every reducers and combine them.
import { log } from '../Omni';
import { reducer as AppReducer } from './AppRedux';
import { reducer as CategoryReducer } from './CategoryRedux';
import { reducer as ProductRedux } from './ProductRedux';
import { reducer as NetInfoReducer } from './NetInfoRedux';
import { reducer as ToastReducer } from './ToastRedux';
import { reducer as UserRedux } from './UserRedux';
import { reducer as CartRedux } from './CartRedux';
import { reducer as OrderRedux } from './OrderRedux';
import { reducer as MessageRedux } from './MessageRedux';
import { reducer as WishListRedux } from './WishListRedux';
// import { reducer as POSRedux } from './POSRedux';
import { reducer as LayoutRedux } from './LayoutRedux';
import Constants from '../common/Constants';
// import { reducer as AddressRedux } from './AddressRedux';
// import { reducer as FilterRedux } from './FilterRedux';

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
        // if data exists in `AsyncStorage` - rehydrate fs persistor with it
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
  blacklist: ['netInfo', 'toast', 'nav', 'layouts', 'sideMenu', 'filters'],
  migrate,
  timeout: 60000, // 1 minute timeout
};

export default persistCombineReducers(config, {
  // app: AppReducer,
  // categories: CategoryReducer,
  products: ProductRedux,
  // netInfo: NetInfoReducer,
  toast: ToastReducer,
  // user: UserRedux,
  // carts: CartRedux,
  // myOrders: OrderRedux,
  // myMessages: MessageRedux,
  // wishList: WishListRedux,
  // pos: POSRedux,
  // layouts: LayoutRedux,
});
