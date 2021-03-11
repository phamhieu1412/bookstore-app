import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform, Text, TouchableOpacity } from 'react-native';
// import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { NavigationActions } from '@react-navigation/compat';
// import firebase from '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';

import { toast } from './Omni';
import * as RootNavigation from './navigation/RootNavigation';
import apiWorker from './api/apiWorker';
// import { logEventSetUser, logEventNotificationOpen } from './api/eventLogger';
import { MyToast } from './containers/index';
// import AppIntro from './components/AppIntro/index';
import AppNavigator from './navigation/index';
import Languages from './common/Languages';
import Styles from './common/Styles';
import Color from './common/Color';

// async function onMessageReceived(message) {
//   const channelId = await notifee.createChannel({
//     id: 'importanNoti',
//     name: 'Default Channel',
//     importance: AndroidImportance.HIGH,
//   });
//   console.log('mes:', message);

//   // Display a notification
//   await notifee.displayNotification({
//     title: message.notification.title,
//     body: message.notification.body,
//     subtitle: 'Thông báo',
//     data: message.data,
//     android: {
//       channelId,
//       color: 'red',
//       largeIcon: require('./images/logo.png'),
//       smallIcon: 'ic_ubo_logo_small',
//       timestamp: Date.now(),
//       showTimestamp: true,
//       // style: {
//       //   type: AndroidStyle.BIGTEXT,
//       //   text: 'You are overdue payment on one or more of your accounts! You are overdue payment on one or more of your accounts!'
//       // },
//       importance: AndroidImportance.HIGH,
//     },
//   });
// }
// messaging().onMessage(onMessageReceived);
// messaging().setBackgroundMessageHandler(onMessageReceived);

class Router extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // appState: AppState.currentState,
      initialized: false,
      watchingLocation: false,
    };
    this.loginFormDisplayed = false;
  }

  static propTypes = {
    // introStatus: PropTypes.bool,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (!prevState.initialized) {
      const { token } = nextProps;
      if (token) {
        apiWorker.init({
          token,
        });
      }
    //   nextProps.renewConnectionStatus();
    //   nextProps.subscribeToConnectionStatus();
    //   nextProps.clearViewedProducts();
    //   nextProps.fetchHomeBanner();
    //   nextProps.fetchAppConfig();

      newState.initialized = true;
    }
    // if (nextProps.introStatus && !prevState.watchingLocation) {
      // only watch location after user finished the intro screen
      // it's to make sure that the permission is granted
    //   nextProps.watchLocation();

    //   newState.watchingLocation = true;
    // }

    return Object.keys(newState).length ? newState : null;
  }

  async componentDidMount() {
    this.fetchCommonData();

    notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        // case EventType.DISMISSED:
        // console.log('User dismissed notification11', detail.notification);
        // break;
        case EventType.PRESS:
          this.onViewNotification(detail.notification.data);
          break;
      }
    });
  }

  componentWillUnmount() {
  }

  fetchCommonData() {
    const {
      fetchCart,
      // fetchTopCategories,
      fetchCategories,
      // fetchWishList,
      // getTimeFrame,
      // loadAddressList,
      // createCartFromItems,
      // refetchMyOrders,
      // refetchMyMessages,
      // getFirebaseRegistrationToken,
      // registerFirebaseDevice,
      // userInfo,
      // isConnected,
      refetchBooks,
      getBooksBestSeller,
    } = this.props;

    // if (isConnected) {
    //   fetchTopCategories();
      fetchCategories();
    //   fetchWishList();
    //   getTimeFrame();
    //   loadAddressList();
    //   createCartFromItems();
    //   refetchMyOrders();
    //   refetchMyMessages();
    //   getFirebaseRegistrationToken();
    //   registerFirebaseDevice();
    //   if (userInfo && userInfo.name) {
    //     logEventSetUser(userInfo);
    //   }
    // } else {
    //   toast(Languages.noConnection);
    // }
    refetchBooks();
    getBooksBestSeller();
    fetchCart();
  }

  onViewNotification = item => {
    if (item.notificationId) this.props.setMessageRead(item.notificationId);
    if (item.orderNumber) {
      this.goToScreen('OrderDetailScreen', {
        orderNumber: item.orderNumber,
      });
    } else if (!item.type) {
      this.goToScreen('MyMessagesScreen');
    } else if (item.type === 'promotion') {
      this.goToScreen('ListAllScreen', {
        config: { name: 'hotDeal', predefined: 'hot-deal' },
        index: 1,
      });
    } else if (item.type === 'cart') {
      this.goToScreen('CartScreen');
    } else if (item.type === 'product') {
      this.goToScreen('DetailScreen', { product: { slug: `fake-${item.code}` } });
    } else if (item.type === 'category') {
      const { allCategories } = this.props;
      const findCategory = allCategories.find(cat => cat.code === item.code);
      if (findCategory) {
        this.goToScreen('CategoryScreen', {
          mainCategory: findCategory,
        });
      } else {
        this.goToScreen('MyMessagesScreen');
      }
    }
  };

  // handleAppStateChange = nextAppState => {
  //   if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
  //     if (Platform.OS === 'ios') {
  //       eventLogger.trackAppLaunch();
  //     }
  //   }

  //   this.setState({ appState: nextAppState });
  // };

  goToScreen = (routeName, params) => {
    RootNavigation.navigate(routeName, params);
  };

  render() {
    // if (!this.props.introStatus) {
    //   return <AppIntro />;
    // }

    return (
      <View style={[Styles.app, { backgroundColor: Color.background }]}>
        <MyToast />
        <AppNavigator ref={comp => (this.navigator = comp)} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // introStatus: state.user.finishIntro,
  userInfo: state && state.user && state.user.user,
  token: state && state.user && state.user.token,
  netInfo: state.netInfo,
  isConnected: state && state.netInfo && state.netInfo.isConnected,
  allCategories: state && state.categories && state.categories.flattenList,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { actions: AppActions } = require('./redux/AppRedux');
  const { actions: NetInfoActions } = require('./redux/NetInfoRedux');
  const { actions: CategoryAction } = require('./redux/CategoryRedux');
  const { actions: WishListActions } = require('./redux/WishListRedux');
  const { actions: CartActions } = require('./redux/CartRedux');
  const { actions: MessageActions } = require('./redux/MessageRedux');
  const { actions: OrderActions } = require('./redux/OrderRedux');
  const { actions: UserActions } = require('./redux/UserRedux');
  const { actions: ProductActions } = require('./redux/ProductRedux');

  const { token } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    login: code => {
      dispatch(UserActions.login(code));
    },
    watchLocation: () => {
      dispatch(AppActions.watchLocation());
    },
    // updateConnectionStatus: isConnected =>
    //   dispatch(NetInfoActions.updateConnectionStatus(isConnected)),
    renewConnectionStatus: () => NetInfoActions.renewConnectionStatus(dispatch),
    subscribeToConnectionStatus: () => dispatch(NetInfoActions.subscribeToConnectionStatus()),
    fetchHomeBanner: () => {
      dispatch(AppActions.fetchHomeBanner());
    },
    fetchAppConfig: () => {
      dispatch(AppActions.fetchAppConfig());
    },
    fetchTopCategories: () => CategoryAction.fetchTopCategories(dispatch),
    fetchCategories: () => CategoryAction.fetchCategories(dispatch),
    fetchWishList: () => WishListActions.fetchWishList(dispatch),
    createCartFromItems: () => dispatch(CartActions.createCartFromItems()),
    getTimeFrame: () => dispatch(CartActions.getTimeFrame()),
    refetchMyOrders: () => {
      OrderActions.fetchMyOrder(dispatch, 1);
    },
    refetchMyMessages: () => {
      // MessageActions.clearMyMessages(dispatch);
      MessageActions.fetchMyMessages(dispatch, 1);
    },
    setMessageRead: notiId => {
      if (token) {
        MessageActions.setMessageRead(dispatch, notiId);
      }
    },
    // clearMyMessages: () => MessageActions.clearMyMessages(dispatch),
    loadAddressList: () => {
      dispatch(UserActions.loadAddressList());
    },
    findAndSetReferral: () => dispatch(UserActions.findAndSetReferral()),
    getFirebaseRegistrationToken: () => UserActions.getFirebaseRegistrationToken(dispatch),
    registerFirebaseDevice: () => dispatch(UserActions.registerFirebaseDevice()),
    clearViewedProducts: () => dispatch(ProductActions.clearViewedProducts()),
    
    refetchBooks: () => {
      // ProductActions.clearBooks(dispatch); // phan trang
      ProductActions.fetchAllBooks(dispatch, 1);
    },
    getBooksBestSeller: () => ProductActions.getBooksBestSeller(dispatch, 1),
    fetchCart: () => {
      dispatch(CartActions.fetchCart());
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Router);
