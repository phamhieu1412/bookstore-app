/**
 * Created by Anvita on 18/02/2017.
 *
 * @format
 */

import React, { Component } from 'react';
import { PermissionsAndroid, Platform, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
// import messaging from '@react-native-firebase/messaging';
import Geolocation from 'react-native-geolocation-service';

import { toast } from './src/Omni';
import store from './src/store/ConfigureStore';
import Router from './src/Router';
import { Languages } from './src/common';

const requestLocationPermission = () => {
  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    .then(granted => {
      if (!granted) {
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: 'Bookstore cần biết vị trí của bạn',
          message: 'Chúng tôi cần biết vị trí của bạn để xác định điểm giao hàng tốt nhất.',
          buttonNeutral: 'Để sau',
          buttonNegative: 'Không',
          buttonPositive: 'Cho phép',
        }).then(() => {
        });
      }

      return Promise.resolve();
    })
    .catch(() => {});
};

class BookstoreApp extends Component {
  async componentDidMount() {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested', // turn off the warning because the Parallax layout need it.
      'componentWillMount has been renamed', // turn off untill we upgrade/replace tcomb-form-native and react-native-fluid-slider.
      'componentWillReceiveProps has been renamed', // turn off untill we upgrade/replace tcomb-form-native and react-native-fluid-slider.
    ]);

    const language = 'vi'; // store.getState().language;
    // set default Language for App
    Languages.setLanguage(language);

    // messaging()
    //   .hasPermission()
    //   .then(enabled => {
    //     if (enabled >= 0) {
    //       // firebase
    //       //   .messaging()
    //       //   .getToken()
    //       //   .then(token => {
    //       //     log(`FCM Token: ${token}`);
    //       //   });
    //       // user has permissions
    //     } else {
    //       messaging()
    //         .requestPermission()
    //         .then(() => {
    //           toast('Bạn đã có thể nhận thông báo từ Ubofood');
    //         })
    //         .catch(() => {
    //           toast('Bạn sẽ không nhận được thông báo khi mua hàng');
    //           // User has rejected permissions
    //         });
    //     }
    //   });

    if (Platform.OS === 'ios') Geolocation.requestAuthorization('whenInUse');
    else if (Platform.OS === 'android') {
      requestLocationPermission();
    }
  }

  render() {
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default BookstoreApp;
