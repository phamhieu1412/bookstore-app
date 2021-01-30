import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import compareVersions from 'compare-versions';
import VersionNumber from 'react-native-version-number';
import { getAppstoreAppVersion } from 'react-native-appstore-version-checker';
import moment from 'moment';
import lodash from 'lodash';

import { actions as CartActions } from './CartRedux';
import antradeWorker from '../api/apiWorker';
import Constants from '../common/Constants';
import Languages from '../common/Languages';

const types = {
  HAS_NEW_VERSION: 'HAS_NEW_VERSION',
  CHECK_NEW_APP_VERSION: 'CHECK_NEW_APP_VERSION',

  HOME_BANNER_FETCH_SUCCESS: 'HOME_BANNER_FETCH_SUCCESS',
  HOME_BANNER_FETCH_FAILURE: 'HOME_BANNER_FETCH_FAILURE',
  HOME_BANNER_FETCHING: 'HOME_BANNER_FETCHING',

  USER_POPUP_FETCH_SUCCESS: 'USER_POPUP_FETCH_SUCCESS',
  USER_POPUP_FETCH_FAILURE: 'USER_POPUP_FETCH_FAILURE',
  USER_POPUP_FETCHING: 'USER_POPUP_FETCHING',

  APP_CONFIG_FETCH_SUCCESS: 'APP_CONFIG_FETCH_SUCCESS',
  APP_CONFIG_FETCH_FAILURE: 'APP_CONFIG_FETCH_FAILURE',

  VIEWED_POPUP: 'VIEWED_POPUP',
  CLICKED_POPUP: 'CLICKED_POPUP',

  WATCHING_LOCATION: 'WATCHING_LOCATION',
  LOCATION_UPDATED: 'LOCATION_UPDATED',
  ERROR_CLEAR_LOCATION: 'ERROR_CLEAR_LOCATION',
};

export const actions = {
  checkNewAppVersion: () => (dispatch, getState) => {
    const { app: appState } = getState();

    const now = Date.now();
    const interval = 28800000; // 8 hours

    if (now > appState.lastCheckTime + interval) {
      const currentVersion = VersionNumber.appVersion;

      const appId = Platform.OS === 'ios' ? Constants.appStoreId : Constants.bundleId;
      getAppstoreAppVersion(appId)
        .then(appVersion => {
          const hasUpdate =
            currentVersion && appVersion
              ? compareVersions(currentVersion, appVersion) === -1
              : false;
          dispatch({
            type: types.HAS_NEW_VERSION,
            hasNewVersion: hasUpdate,
            now,
          });
        })
        .catch(() => {
          // console.log('error occurred', err);
        });
    } else {
      dispatch({
        type: types.HAS_NEW_VERSION,
        hasNewVersion: false,
        now: appState.lastCheckTime,
      });
    }
  },
  fetchAppConfig: () => async dispatch => {
    const json = await antradeWorker.getAppConfig();

    if (json === undefined || json.error || !json.data || !json.data.configContent) {
      dispatch({ type: types.APP_CONFIG_FETCH_FAILURE });
    } else {
      const configContent = JSON.parse(json.data.configContent);
      dispatch({ type: types.APP_CONFIG_FETCH_SUCCESS, configContent });
    }
  },
  fetchHomeBanner: () => async (dispatch, getState) => {
    dispatch({ type: types.HOME_BANNER_FETCHING });
    const { user } = getState();
    const posCode = user.token && user.user ? user.user.defaultPosCode : '';
    const json = await antradeWorker.getHomeBanner(posCode);

    if (json === undefined || json.error) {
      dispatch(actions.fetchHomeBannerFailure(Languages.GetDataError));
    } else {
      dispatch(actions.fetchHomeBannerSuccess(json));
    }
  },
  fetchHomeBannerSuccess: banners => {
    return { type: types.HOME_BANNER_FETCH_SUCCESS, banners };
  },
  fetchHomeBannerFailure: error => {
    return { type: types.HOME_BANNER_FETCH_FAILURE, error };
  },
  fetchUserPopup: () => async (dispatch, getState) => {
    const { user, app } = getState();
    if (user.token && user.user && user.user.defaultPosCode) {
      dispatch({ type: types.USER_POPUP_FETCHING });
      const json = await antradeWorker.getUserPopups(user.user.defaultPosCode);

      if (json === undefined || json.error) {
        dispatch(actions.fetchUserPopupFailure(Languages.GetDataError));
      } else {
        let popups = [];
        if (json.popups && json.popups.length) {
          const checkingTime = moment().subtract(1, 'hours');
          json.popups.forEach(popup => {
            if (!app.viewedPopupsList || !app.viewedPopupsList[popup.id]) {
              if (popup.forOnlyNewCustomer) {
                const userCreatedAt = user.user.createdAt ? moment(user.user.createdAt) : false;
                if (!userCreatedAt || userCreatedAt.isBefore(checkingTime)) {
                  return;
                }
              }

              popups.push(popup);
            } else {
              const viewedPopup = app.viewedPopupsList[popup.id];
              if (popup.startTime && popup.endTime) {
                if (
                  !viewedPopup.clicked &&
                  (!viewedPopup.viewedTime || viewedPopup.viewedTime < checkingTime.valueOf())
                ) {
                  // re check start time & and time
                  const startTime = moment(popup.startTime);
                  const endTime = moment(popup.endTime);
                  if (startTime.isBefore(moment()) && endTime.isAfter(moment())) {
                    popups.push(popup);
                  }
                }
              }
            }
          });

          if (popups.length > 1) {
            const randomItem = popups[Math.floor(Math.random() * popups.length)];
            popups = [randomItem];
          }
        }

        dispatch(actions.fetchUserPopupSuccess(popups));
      }
    }
  },
  fetchUserPopupSuccess: popups => {
    return { type: types.USER_POPUP_FETCH_SUCCESS, popups };
  },
  fetchUserPopupFailure: error => {
    return { type: types.USER_POPUP_FETCH_FAILURE, error };
  },
  setViewedPopup: popup => {
    return { type: types.VIEWED_POPUP, popup };
  },
  setClickedPopup: popup => {
    return { type: types.CLICKED_POPUP, popup };
  },
  watchLocation: () => (dispatch, getState) => {
    const { app } = getState();
    const watchId = Geolocation.watchPosition(
      position => {
        const coords = position.coords || false;
        if (coords) {
          const newLocation = {
            latitude: Math.round(coords.latitude * 10000) / 10000, // fixed 4 decimals to have...
            longitude: Math.round(coords.longitude * 10000) / 10000, // ...accuracy of 11m
          };
          const { location } = app;
          if (
            !location ||
            newLocation.latitude !== location.latitude ||
            newLocation.longitude !== location.longitude
          ) {
            dispatch(actions.updateLocation(newLocation));
            dispatch(CartActions.fetchCart());
          }
        }
      },
      error => {
        // See error code charts below.
        // log('location error');
        // log(error.code);
        // log(error.message);
        dispatch(actions.errorClearLocation(error));
      },
      { enableHighAccuracy: true, interval: 30000, distanceFilter: 50 }
    );
    if (watchId !== app.watchingLocationId) {
      Geolocation.clearWatch(app.watchingLocationId);
    }
    dispatch(actions.watchingLocation(watchId));
  },
  watchingLocation: watchId => {
    return { type: types.WATCHING_LOCATION, watchId };
  },
  updateLocation: location => {
    return { type: types.LOCATION_UPDATED, location };
  },
  errorClearLocation: error => {
    return { type: types.ERROR_CLEAR_LOCATION, error };
  },
};

const initialState = {
  hasNewVersion: false,
  lastCheckTime: 0,
  homeBanner: {},
  userPopups: [],
  viewedPopupsList: {},
  isBannerFetching: false,
  watchingLocationId: -1,
  location: null,
  locationError: {},
  config: {
    app: {
      homeLayout: [
        {
          title: '',
          predefined: 'category-bubbles',
        },
        {
          title: 'Khuyến mại POS mới',
          predefined: 'pos-based-promotion',
        },
        {
          title: 'Ưu đãi',
          predefined: 'hot-deal',
        },
        {
          title: 'Bán chạy',
          predefined: 'most-purchased',
        },
      ],
      searchKeywords: [
        'Thịt lợn sinh học',
        'Trứng gà ác',
        'Sữa chua nếp cẩm',
        'Nem chay',
        'Cá ngừ salat',
        'Bột canh Hải châu',
        'Dầu ăn hướng dương',
      ],
    },
    web: {},
  },
};

export const reducer = (state = initialState, action) => {
  const { type } = action;
  let newBanner = null;

  switch (type) {
    case types.HAS_NEW_VERSION:
      return {
        ...state,
        hasNewVersion: action.hasNewVersion,
        lastCheckTime: action.now,
      };

    case types.HOME_BANNER_FETCH_SUCCESS:
      newBanner = action.banners
        ? action.banners.reduce((filtered, item) => {
            if (item.appImage) {
              const appImage = JSON.parse(item.appImage);
              if (appImage.ImageUrl) {
                filtered.push({
                  type: item.type,
                  code: item.code,
                  imageUrl: appImage.ImageUrl,
                });
              }
            }

            return filtered;
          }, [])
        : [];
      if (lodash.isEqual(newBanner, state.homeBanner)) {
        return {
          ...state,
          isBannerFetching: false,
        };
      }

      return {
        ...state,
        homeBanner: newBanner || state.homeBanner,
        isBannerFetching: false,
      };

    case types.HOME_BANNER_FETCHING:
      return {
        ...state,
        isBannerFetching: true,
      };
    case types.HOME_BANNER_FETCH_FAILURE:
      return {
        ...state,
        isBannerFetching: false,
      };

    case types.APP_CONFIG_FETCH_SUCCESS:
      if (!action.configContent || lodash.isEqual(action.configContent, state.config)) {
        return state;
      }
      return {
        ...state,
        config: action.configContent || state.configContent,
      };

    case types.APP_CONFIG_FETCH_FAILURE:
      return state;

    case types.USER_POPUP_FETCH_SUCCESS:
      return {
        ...state,
        userPopups: action.popups,
      };

    case types.USER_POPUP_FETCHING:
      return {
        ...state,
      };
    case types.USER_POPUP_FETCH_FAILURE:
      return {
        ...state,
        userPopups: [],
      };
    case types.VIEWED_POPUP:
      state.viewedPopupsList[action.popup.id] = {
        id: action.popup.id,
        viewedTime: Date.now(),
        clicked: false,
      };
      return {
        ...state,
        // userPopups: state.userPopups.filter(item => item.id !== action.popupId),
        userPopups: [], // only one popup so we clear all
        viewedPopupsList: state.viewedPopupsList,
      };
    case types.CLICKED_POPUP:
      state.viewedPopupsList[action.popup.id] = {
        id: action.popup.id,
        viewedTime: Date.now(),
        clicked: true,
      };
      return {
        ...state,
        // userPopups: state.userPopups.filter(item => item.id !== action.popupId),
        userPopups: [], // only one popup so we clear all
        viewedPopupsList: state.viewedPopupsList,
      };

    case types.LOCATION_UPDATED:
      return {
        ...state,
        location: action.location || null,
      };

    case types.WATCHING_LOCATION:
      return {
        ...state,
        watchingLocationId: action.watchId,
      };

    case types.ERROR_CLEAR_LOCATION:
      return {
        ...state,
        location: null,
        locationError: action.error,
      };
    default:
      return state;
  }
};
