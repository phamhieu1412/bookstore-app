// import firebase from 'react-native-firebase';
// import messaging from '@react-native-firebase/messaging';
import { getUserAgent } from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import uaParser from 'ua-parser-js';
import { toast } from '../Omni';
import { actions as WishListActions } from './WishListRedux';
import { actions as AppActions } from './AppRedux';
import { actions as CartActions } from './CartRedux';
import { actions as MessageActions } from './MessageRedux';
import { actions as OrderActions } from './OrderRedux';
import antradeWorker from '../api/apiWorker';
// import {
//   logEventSetUser,
//   logEventClearUser,
//   logEventCompleteRegistration,
// } from '../api/eventLogger';
import Languages from '../common/Languages';

const types = {
  LOGOUT: 'LOGOUT',

  LOGIN_PENDING: 'LOGIN_PENDING',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',

  LOAD_PROFILE_PENDING: 'LOAD_PROFILE_PENDING',
  LOAD_PROFILE_SUCCESS: 'LOAD_PROFILE_SUCCESS',
  LOAD_PROFILE_FAILURE: 'LOAD_PROFILE_FAILURE',

  LOAD_WALLET_PENDING: 'LOAD_WALLET_PENDING',
  LOAD_WALLET_SUCCESS: 'LOAD_WALLET_SUCCESS',
  LOAD_WALLET_FAILURE: 'LOAD_WALLET_FAILURE',

  REGISTER_PENDING: 'REGISTER_PENDING',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',

  LOAD_ADDRESS_PENDING: 'LOAD_ADDRESS_PENDING',
  LOAD_ADDRESS_SUCCESS: 'LOAD_ADDRESS_SUCCESS',
  LOAD_ADDRESS_FAILURE: 'LOAD_ADDRESS_FAILURE',
  ADD_ADDRESS_PENDING: 'ADD_ADDRESS_PENDING',
  ADD_ADDRESS_SUCCESS: 'ADD_ADDRESS_SUCCESS',
  ADD_ADDRESS_FAILURE: 'ADD_ADDRESS_FAILURE',
  UPDATE_ADDRESS_PENDING: 'UPDATE_ADDRESS_PENDING',
  UPDATE_ADDRESS_SUCCESS: 'UPDATE_ADDRESS_SUCCESS',
  UPDATE_ADDRESS_FAILURE: 'UPDATE_ADDRESS_FAILURE',

  SAVE_PROFILE_PENDING: 'SAVE_PROFILE_PENDING',
  SAVE_PROFILE_SUCCESS: 'SAVE_PROFILE_SUCCESS',
  SAVE_PROFILE_FAILURE: 'SAVE_PROFILE_FAILURE',

  UPDATE_DEFAULT_ADDRESS_PENDING: 'UPDATE_DEFAULT_ADDRESS_PENDING',
  UPDATE_DEFAULT_ADDRESS_SUCCESS: 'UPDATE_DEFAULT_ADDRESS_SUCCESS',
  UPDATE_DEFAULT_ADDRESS_FAILURE: 'UPDATE_DEFAULT_ADDRESS_FAILURE',

  SET_REFERRAL_CODE: 'SET_REFERRAL_CODE',
  CLEAR_REFERRAL_CODE: 'CLEAR_REFERRAL_CODE',

  GET_FIREBASE_REGISTRATION_TOKEN: 'GET_FIREBASE_REGISTRATION_TOKEN',
  REGISTER_FIREBASE_DEVICE_PENDING: 'REGISTER_FIREBASE_DEVICE_PENDING',
  REGISTER_FIREBASE_DEVICE_SUCCESS: 'REGISTER_FIREBASE_DEVICE_SUCCESS',
  REGISTER_FIREBASE_DEVICE_FAILURE: 'REGISTER_FIREBASE_DEVICE_FAILURE',

  REMOVE_FIREBASE_DEVICE_PENDING: 'REMOVE_FIREBASE_DEVICE_PENDING',
  REMOVE_FIREBASE_DEVICE_SUCCESS: 'REMOVE_FIREBASE_DEVICE_SUCCESS',
  REMOVE_FIREBASE_DEVICE_FAILURE: 'REMOVE_FIREBASE_DEVICE_FAILURE',

  GET_PROVINCE_PENDING: 'GET_PROVINCE_PENDING',
  GET_PROVINCE_SUCCESS: 'GET_PROVINCE_SUCCESS',
  GET_PROVINCE_FAILURE: 'GET_PROVINCE_FAILURE',

  SAVE_USER_PHONE_NUMBER: 'SAVE_USER_PHONE_NUMBER',
  FINISH_INTRO: 'FINISH_INTRO',
  SET_API_TOKEN: 'SET_API_TOKEN',
};

export const actions = {
  loginBookstore: (payload, meta) => async (dispatch, getState) => {
    dispatch({ type: types.LOGIN_PENDING });

    const json = await antradeWorker.loginBookstore(payload);

    if (json.code === 200 && json.data) {
      dispatch(actions.loginSuccessActions(json.data));
      dispatch(actions.loadUserProfile());
      toast(Languages.LoginSuccess);
      meta.onSuccess();
    } else {
      dispatch(actions.loginFailure(Languages.ErrorMessageRequest));
      meta.onError();
    }
  },
  registerBookstore: (payload, meta) => async (dispatch, getState) => {
    dispatch({ type: types.REGISTER_PENDING });
    const json = await antradeWorker.registerBookstore(payload);

    if (json.code === 200 && json.data && json.data.data) {
      dispatch({ type: types.REGISTER_SUCCESS });
      meta.onSuccess();
    } else {
      dispatch({ type: types.REGISTER_FAILURE });
      meta.onError();
    }
  },
  changePassword: (id, payload, meta) => async (dispatch, getState) => {
    const json = await antradeWorker.changePassword(id, payload);

    if (json.id) {
      meta.onSuccess();
    } else {
      meta.onError();
    }
  },
  ///////////////////////////////////////////////////////////////////
  login: code => async (dispatch, getState) => {
    dispatch({ type: types.LOGIN_PENDING });
    const { user } = getState();
    let firebaseToken = user.firebaseToken ? user.firebaseToken : await getFirebaseToken();
    firebaseToken = firebaseToken || undefined;
    const json = await antradeWorker.login(code, firebaseToken);

    if (json === undefined || json.error || !json.token) {
      dispatch(actions.loginFailure(Languages.ErrorMessageRequest));
    } else {
      dispatch(actions.loginSuccessActions(json));
    }
  },
  loginSuccessActions: json => dispatch => {
    antradeWorker.setToken(json.accessToken);
    dispatch(actions.loginSuccess(json));
    // if (json.customer.defaultPosCode) {
    //   dispatch(CartActions.createCartFromItems());
    //   dispatch(AppActions.fetchUserPopup());
    // } else {
    //   // eventLogger
    //   logEventSetUser(json.customer);
    // }

    WishListActions.fetchWishList(dispatch);
    MessageActions.fetchMyMessages(dispatch);
    dispatch(OrderActions.clearMyOrders());
    dispatch(actions.loadWalletIfNeeded());
    dispatch(actions.registerFirebaseDevice());
  },
  loadUserProfile: () => async dispatch => {
    dispatch({ type: types.LOAD_PROFILE_PENDING });
    const json = await antradeWorker.getUserProfile();

    if (json.code === 200 && json.data) {
      dispatch(actions.loadProfileSuccess(json.data));
      // dispatch(actions.loadWalletIfNeeded());
    } else {
      dispatch(actions.loadProfileFailure(Languages.ErrorMessageRequest));
      if (json && json.error && json.error.status === 401) {
        actions.logout(dispatch);
      }
    }
  },
  updateUserProfile: (payload, meta) => async dispatch => {
    const json = await antradeWorker.updateUserProfile(payload);

    if (json.code === 200 && json.data && json.data.data) {
      meta.onSuccess();
    } else {
      meta.onFailure();
    }
  },
  saveUserProfile: (userId, payload, meta) => async dispatch => {
    dispatch({ type: types.SAVE_PROFILE_PENDING });
    const json = await antradeWorker.setUserProfile(userId, payload);

    if (json.id) {
      dispatch(actions.saveProfileSuccess(json));
    } else {
      dispatch(actions.saveProfileFailure(Languages.ErrorMessageRequest));
    }
  },
  updateDefaultShippingAddress: async (dispatch, address) => {
    dispatch({ type: types.UPDATE_DEFAULT_ADDRESS_PENDING });
    const json = await antradeWorker.updateDefaultShippingAddress(address);

    if (json === undefined || json.error) {
      dispatch({ type: types.UPDATE_DEFAULT_ADDRESS_FAILURE, error: json.error });
    } else {
      dispatch({ type: types.UPDATE_DEFAULT_ADDRESS_SUCCESS });
      // don't need to refetch profile. Infact the logic on Checkout screen require not reload profile
      // dispatch(actions.loadUserProfile());
    }
  },
  loadWallet: async dispatch => {
    dispatch({ type: types.LOAD_WALLET_PENDING });
    const json = await antradeWorker.getWallet();

    if (json === undefined || json.error || !json.customerCode) {
      dispatch(actions.loadWalletFailure(Languages.ErrorMessageRequest));
    } else {
      dispatch(actions.loadWalletSuccess(json));
    }
  },
  loadWalletIfNeeded: () => (dispatch, getState) => {
    const { user } = getState();
    if (user.token && !user.isFetchingWallet && user.didInvalidateWallet) {
      actions.loadWallet(dispatch);
    }
  },
  getProvinces: () => async (dispatch, getState) => {
    const json = await antradeWorker.getProvinces();

    if (json.provinces) {
      dispatch({
        type: types.GET_PROVINCE_SUCCESS,
        json
      })
    } else {
      dispatch({
        type: types.GET_PROVINCE_FAILURE
      })
    }
  },
  loadAddressList: () => async (dispatch, getState) => {
    const { carts } = getState();
    dispatch({ type: types.LOAD_ADDRESS_PENDING });
    const json = await antradeWorker.getAddressShip();

    if (json.data && json.code === 200) {
      if (json.data.length && (!carts.shipping || !carts.shipping.shippingAddressId)) {
        // set shippingAddressId if it's blank
        const defaultAddress = json.data.find(item => item.default) || json.data[0];
        dispatch(CartActions.updateCart({ ShippingAddressId: defaultAddress.id }));
      }
      dispatch(actions.loadAddressSuccess(json.data.data));
    } else {
      dispatch(actions.loadAddressFailure(Languages.ErrorMessageRequest));
    }
  },
  addAddress: (payload, meta) => async dispatch => {
    const json = await antradeWorker.addAddressShip(payload);

    if (json.data && json.code === 200) {
      dispatch(actions.addAddressFailure(Languages.ErrorMessageRequest));
      meta.onSuccess();
    } else {
      dispatch(actions.addAddressSuccess(json));
      dispatch(actions.loadAddressList());
      meta.onFailure();
    }
  },
  updateAddressUser: (userId, payload, meta) => async dispatch => {
    // const { carts } = getState();
    dispatch({ type: types.SAVE_PROFILE_FAILURE });
    const json = await antradeWorker.updateAddressUser(userId, payload);

    if (json.id) {
      dispatch(actions.saveProfileSuccess(json));
      meta.onSuccess();
    } else {
      dispatch(actions.saveProfileFailure(Languages.ErrorMessageRequest));
      meta.onError();
    }
  },
  setDefaultAddress: (addressId) => async dispatch => {
    const json = await antradeWorker.setDefaultAddress(addressId);

    if (json.data && json.code === 200) {
      toast('Đặt địa chỉ mặc định thành công');
    } else {
      dispatch(actions.saveProfileFailure(Languages.ErrorMessageRequest));
    }
    dispatch(actions.loadAddressList());
  },
  updateAddress: (addressId, payload) => async dispatch => {
    // const { carts } = getState();
    dispatch({ type: types.UPDATE_ADDRESS_PENDING });
    const json = await antradeWorker.updateAddress(addressId, payload);

    // if (json === undefined || json.error) {
    //   dispatch(actions.updateAddressFailure(Languages.ErrorMessageRequest));
    // } else {
    //   dispatch(actions.updateAddressSuccess(json));
    //   dispatch(actions.loadAddressList());
    //   // // set shippingAddress if we're using this address for cart
    //   // if (carts.selectedAddressId === addressId) {
    //   //   dispatch(CartActions.setSelectedAddress(addressId, toCamelCase(payload)));
    //   // }
    // }
  },
  registerFirebaseDevice: () => async (dispatch, getState) => {
    const { user } = getState();
    if (user.token) {
      dispatch({ type: types.REGISTER_FIREBASE_DEVICE_PENDING });

      let fcmToken = user.firebaseToken ? user.firebaseToken : await getFirebaseToken();
      if (fcmToken) {
        antradeWorker.registerFirebaseDevice(fcmToken).then(json => {
          if (json === undefined || json.error) {
            dispatch(actions.registerFirebaseDeviceFailure(Languages.ErrorMessageRequest));
          } else {
            dispatch(actions.registerFirebaseDeviceSuccess(json, fcmToken));
          }
        });
        if (user.user && user.user.defaultPosCode)
          messaging().subscribeToTopic(`topic.pos.${user.user.defaultPosCode}`);
      } else {
        dispatch(actions.registerFirebaseDeviceFailure('No device token'));
      }
    }
  },
  getFirebaseRegistrationToken: async dispatch => {
    const firebaseToken = await getFirebaseToken();
    if (firebaseToken) {
      dispatch({ type: types.GET_FIREBASE_REGISTRATION_TOKEN, firebaseToken });
    }
  },
  removeFirebaseDevice: () => async (dispatch, getState) => {
    const { user } = getState();
    const { token, firebaseToken } = user;
    const defaultPosCode = user.user.defaultPosCode;
    if (token && firebaseToken) {
      dispatch({ type: types.REMOVE_FIREBASE_DEVICE_PENDING });

      defaultPosCode && messaging().unsubscribeFromTopic(`topic.pos.${defaultPosCode}`);
      antradeWorker.removeFirebaseDevice(firebaseToken, token).then(json => {
        if (json === undefined || json.error) {
          dispatch(actions.removeFirebaseDeviceFailure(Languages.ErrorMessageRequest));
        } else {
          dispatch(actions.removeFirebaseDeviceSuccess(json));
        }
      });
    }
  },
  savePhoneNumber: phoneNumber => {
    return { type: types.SAVE_USER_PHONE_NUMBER, phoneNumber };
  },
  loginSuccess: user => {
    return { type: types.LOGIN_SUCCESS, user };
  },
  loginFailure: error => {
    toast(Languages.LoginFailed);
    return { type: types.LOGIN_FAILURE, error };
  },
  loadProfileSuccess: user => {
    return { type: types.LOAD_PROFILE_SUCCESS, user };
  },
  loadProfileFailure: error => {
    return { type: types.LOAD_PROFILE_FAILURE, error };
  },
  saveProfileSuccess: user => {
    toast('Lưu thành công');
    return { type: types.SAVE_PROFILE_SUCCESS, user };
  },
  saveProfileFailure: error => {
    toast(Languages.SaveProfileFailed);
    return { type: types.SAVE_PROFILE_FAILURE, error };
  },
  loadWalletSuccess: wallet => {
    return { type: types.LOAD_WALLET_SUCCESS, wallet };
  },
  loadWalletFailure: error => {
    return { type: types.LOAD_WALLET_FAILURE, error };
  },
  loadAddressSuccess: addressList => {
    return { type: types.LOAD_ADDRESS_SUCCESS, addressList };
  },
  loadAddressFailure: error => {
    return { type: types.LOAD_ADDRESS_FAILURE, error };
  },
  addAddressSuccess: json => {
    return { type: types.ADD_ADDRESS_SUCCESS, json };
  },
  addAddressFailure: error => {
    return { type: types.ADD_ADDRESS_FAILURE, error };
  },
  updateAddressSuccess: json => {
    return { type: types.UPDATE_ADDRESS_SUCCESS, json };
  },
  updateAddressFailure: error => {
    return { type: types.UPDATE_ADDRESS_FAILURE, error };
  },

  logout: dispatch => {
    antradeWorker.clearToken();
    dispatch(CartActions.clearCart());
    WishListActions.emptyWishList(dispatch);
    MessageActions.clearMyMessages(dispatch);
    dispatch(OrderActions.clearMyOrders());
    dispatch(actions.removeFirebaseDevice());
    dispatch({ type: types.LOGOUT });
    // logEventClearUser();
    toast(Languages.LoggedOut);
  },
  setReferralCode: (referralCode, referralId) => {
    return { type: types.SET_REFERRAL_CODE, referralCode, referralId };
  },
  clearReferralCode: () => {
    return { type: types.CLEAR_REFERRAL_CODE };
  },
  registerFirebaseDeviceSuccess: (json, firebaseToken) => {
    return { type: types.REGISTER_FIREBASE_DEVICE_SUCCESS, json, firebaseToken };
  },
  registerFirebaseDeviceFailure: error => {
    // toast(Languages.SaveProfileFailed);
    return { type: types.REGISTER_FIREBASE_DEVICE_FAILURE, error };
  },
  removeFirebaseDeviceSuccess: json => {
    return { type: types.REMOVE_FIREBASE_DEVICE_SUCCESS, json };
  },
  removeFirebaseDeviceFailure: error => {
    // toast(Languages.SaveProfileFailed);
    return { type: types.REMOVE_FIREBASE_DEVICE_FAILURE, error };
  },
  finishIntro: () => {
    return { type: types.FINISH_INTRO };
  },
  setAPIToken: () => {
    return { type: types.SET_API_TOKEN };
  },
  findAndSetReferral: () => (dispatch, getState) => {
    const { user } = getState();
    if (user.finishIntro || user.referralCode || user.referralId) {
      return;
    }

    Promise.all([publicIP(), getUserAgent()])
      .then(([ip, userAgent]) => {
        if (ip && userAgent) {
          const ua = uaParser(userAgent);
          const deviceType = ua.device.type || '';
          const deviceModel = ua.device.model || '';
          const deviceVendor = ua.device.vendor || '';
          const deviceOS = ua.os.name || '';
          const osVersion = ua.os.version || '';
          // DeviceType-DeviceModel-DeviceVendor-DeviceOS-OSVersion
          const deviceKey = `${deviceType}-${deviceModel}-${deviceVendor}-${deviceOS}-${osVersion}`;
          antradeWorker.findReferrer(ip, deviceKey).then(res => {
            if (res.success && res.data) {
              const { referralCode, id } = res.data;
              if (referralCode && id) {
                dispatch(actions.setReferralCode(referralCode, id));
                return antradeWorker.setReferralAppInstalled(id);
              }
            }
          });
        }
      })
      .catch(() => {});
  },
  setAutoReferralCode: (userData, referredCustomer) => (dispatch, getState) => {
    const { user: userProfile } = getState();
    const { referralCode, referralId } = userProfile;
    if (referralCode && referralId) {
      const user = {
        ...userData,
        ReferralCode: referralCode,
      };
      actions.saveUserProfile(dispatch, user);
      dispatch(actions.clearReferralCode());
      return antradeWorker.setReferralUserRegistered(referralId, referredCustomer);
    }
  },
};

const initialState = {
  isFetching: false,
  user: null,
  phoneNumber: '',
  wallet: null,
  didInvalidateWallet: true,
  isFetchingWallet: false,
  token: null,
  referralId: '',
  referralCode: '',
  firebaseToken: '',
  finishIntro: null,
  addressList: [],
  defaultAddress: null,
  isFetchingAddress: false,
  provincesObject: {}
};

export const reducer = (state = initialState, action) => {
  const { type, user } = action;

  switch (type) {
    case types.SAVE_PROFILE_PENDING:
    case types.LOAD_PROFILE_PENDING:
    case types.LOGIN_PENDING:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case types.LOAD_WALLET_PENDING:
      return {
        ...state,
        isFetchingWallet: true,
        error: null,
      };
    case types.LOGOUT:
      return {
        ...initialState,
        phoneNumber: state.phoneNumber, // save phone number to use when user want to login again
        finishIntro: state.finishIntro,
        referralId: state.referralId,
        referralCode: state.referralCode,
      };
    case types.SAVE_USER_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: user.accessToken,
        isFetching: false,
        didInvalidateWallet: true,
      };
    case types.SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        user: user,
        isFetching: false,
        didInvalidateWallet: true,
      };
    case types.LOAD_PROFILE_SUCCESS:
      return { ...state, user: user.data, isFetching: false, didInvalidateWallet: true };
    case types.LOAD_WALLET_SUCCESS:
      return {
        ...state,
        wallet: action.wallet,
        isFetchingWallet: false,
        didInvalidateWallet: false,
      };
    case types.GET_PROVINCE_SUCCESS:
      return {
        ...state,
        provincesObject: action.json.provinces
      };
    case types.GET_PROVINCE_FAILURE:
      return {
        ...state,
        provincesObject: {},
      };

    case types.LOAD_ADDRESS_SUCCESS:
      const { addressList } = action;
      const defaultAddress = addressList.length
        ? addressList.find(item => item.default) || addressList[0]
        : null;
      return {
        ...state,
        addressList,
        defaultAddress,
        isFetchingAddress: false,
      };

    case types.ADD_ADDRESS_SUCCESS:
    case types.UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        isFetchingAddress: false,
      };

    case types.LOAD_ADDRESS_PENDING:
    case types.ADD_ADDRESS_PENDING:
    case types.UPDATE_ADDRESS_PENDING:
      return {
        ...state,
        isFetchingAddress: true,
      };
    case types.LOAD_ADDRESS_FAILURE:
    case types.ADD_ADDRESS_FAILURE:
    case types.UPDATE_ADDRESS_FAILURE:
      return { ...state, isFetchingAddress: false };

    case types.LOAD_PROFILE_FAILURE:
    case types.LOGIN_FAILURE:
    case types.SAVE_PROFILE_FAILURE:
      return { ...state, isFetching: false };

    case types.REGISTER_PENDING:
      return { ...state, isFetching: true };
    case types.REGISTER_SUCCESS:
      return { ...state, isFetching: false };
    case types.REGISTER_FAILURE:
      return { ...state, isFetching: false };

    case types.UPDATE_DEFAULT_ADDRESS_PENDING:
    case types.UPDATE_DEFAULT_ADDRESS_FAILURE:
    case types.UPDATE_DEFAULT_ADDRESS_SUCCESS:
      return state;

    case types.LOAD_WALLET_FAILURE:
      return { ...state, isFetchingWallet: false, didInvalidateWallet: false };
    case types.INVALIDATE_WALLET: {
      return {
        ...state,
        isFetchingPromotionCodes: true,
      };
    }
    case types.SET_REFERRAL_CODE:
      return {
        ...state,
        referralId: action.referralId,
        referralCode: action.referralCode,
      };
    case types.CLEAR_REFERRAL_CODE:
      return {
        ...state,
        referralId: '',
        // keep referralCode so that this device can't be referred unless uninstall and reinstall
        // referralCode: '',
      };
    case types.GET_FIREBASE_REGISTRATION_TOKEN:
    case types.REGISTER_FIREBASE_DEVICE_SUCCESS:
      return { ...state, firebaseToken: action.firebaseToken };
    case types.REMOVE_FIREBASE_DEVICE_SUCCESS:
      return { ...state, firebaseToken: '' };
    case types.REGISTER_FIREBASE_DEVICE_PENDING:
    case types.REGISTER_FIREBASE_DEVICE_FAILURE:
    case types.REMOVE_FIREBASE_DEVICE_PENDING:
    case types.REMOVE_FIREBASE_DEVICE_FAILURE:
      return state;
    case types.FINISH_INTRO:
      return { ...state, finishIntro: true };
    case types.SET_API_TOKEN:
      if (!antradeWorker.authzToken && state.token) {
        antradeWorker.setToken(state.token);
      }
      return state;
    default:
      return state;
  }
};

const getFirebaseToken = () => {
//   return messaging()
//     .getToken()
//     .catch(() => undefined);
};
