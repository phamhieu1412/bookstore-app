// import { AppEventsLogger as EventsLogger } from 'react-native-fbsdk';

// const _elLogs = () => { };
// // const _elLogs = (eventName, eventValues, value) => {
// //   console.log(eventName);
// //   console.log(eventValues);
// //   value && console.log(value);
// // };

// // const AppEventsLogger = {
// //   setUserID: () => {},
// //   setUserData: () => {},
// //   logEvent: () => {},
// //   logPurchase: () => {},
// //   logPushNotificationOpen: () => {},
// // };

// const AppEventsLogger = {
//   setUserID: phone => {
//     try {
//       _elLogs('setUserID', phone);
//       EventsLogger.setUserID(phone);
//     } catch (error) {
//       console.log('Error logging FB setUserID event', error);
//     }
//   },
//   setUserData: eventValues => {
//     try {
//       _elLogs('setUserData', eventValues);
//       EventsLogger.setUserData(eventValues);
//     } catch (error) {
//       console.log('Error logging FB setUserData event', error);
//     }
//   },
//   logEvent: (eventName, eventValues, value) => {
//     try {
//       _elLogs(eventName, eventValues, value);
//       EventsLogger.logEvent(eventName, eventValues, value);
//     } catch (error) {
//       console.log(`Error logging FB ${eventName} event`, error);
//     }
//   },
//   logPurchase: (paymentAmount, currency, eventValues) => {
//     try {
//       _elLogs('fb_mobile_purchase', eventValues, paymentAmount);
//       EventsLogger.logPurchase(paymentAmount, currency, eventValues);
//     } catch (error) {
//       console.log('Error logging FB fb_mobile_purchase event', error);
//     }
//   },
//   logPushNotificationOpen: eventValues => {
//     try {
//       _elLogs('fb_mobile_push_notification_open', eventValues);
//       EventsLogger.logEvent('fb_mobile_push_notification_open', eventValues);
//       EventsLogger.logPushNotificationOpen(eventValues);
//     } catch (error) {
//       console.log('Error logging FB fb_mobile_push_notification_open event', error);
//     }
//   },
// };

// export const logEventSetUser = userData => {
//   AppEventsLogger.setUserID(userData.phone);
//   const eventValues = {
//     // name: userData.name,
//     phone: userData.phone,
//     email: userData.email,
//   };
//   const gender = userData.gender.toLowerCase()[0];
//   if (gender === 'f' || gender === 'm') {
//     eventValues.gender = gender;
//   }
//   AppEventsLogger.setUserData(eventValues);
// };

// export const logEventClearUser = () => {
//   AppEventsLogger.setUserID(null);
// };

// export const logEventCompleteRegistration = userData => {
//   const eventValues = {
//     name: userData.name,
//     phone: userData.phone,
//     email: userData.email,
//     gender: userData.gender,
//   };

//   AppEventsLogger.logEvent('fb_mobile_complete_registration', eventValues);
// };

// export const logEventSearched = keyword => {
//   const eventValues = {
//     fb_search_string: keyword,
//   };

//   AppEventsLogger.logEvent('fb_mobile_search', eventValues);
// };

// export const logEventViewProduct = product => {
//   const categoryCode =
//     product && product.category && product.category.code
//       ? product.category.code
//       : product.categoryCode || undefined;

//   const eventValues = {
//     fb_currency: 'VND',
//     fb_content_id: product.code,
//     fb_content_category: categoryCode,
//     fb_content_type: 'product',
//   };

//   AppEventsLogger.logEvent(
//     'fb_mobile_content_view',
//     product.price && product.price.price ? product.price.price : 0,
//     eventValues
//   );
// };

// export const logEventViewCategory = category => {
//   const eventValues = {
//     fb_content_id: category.code,
//     fb_content_type: 'category',
//   };

//   AppEventsLogger.logEvent('fb_mobile_content_view', eventValues);
// };

// export const logEventAddToWishList = item => {
//   const categoryCode =
//     item.category && item.category.code ? item.category.code : item.categoryCode || undefined;

//   const eventValues = {
//     fb_currency: 'VND',
//     fb_content_id: item.code,
//     fb_content_category: categoryCode,
//     fb_content_type: 'product',
//   };

//   AppEventsLogger.logEvent(
//     'fb_mobile_add_to_wishlist',
//     item.price && item.price.price ? item.price.price : 0,
//     eventValues
//   );
// };

// export const logEventAddToCart = orderItem => {
//   const eventValues = {
//     fb_currency: 'VND',
//     fb_content_id: orderItem.productCode,
//     fb_content_category: orderItem.categoryCode,
//     fb_content_type: 'product',
//     fb_num_items: orderItem.quantity,
//   };

//   AppEventsLogger.logEvent('fb_mobile_add_to_cart', orderItem.selling_price, eventValues);
// };

// export const logEventInitiatedCheckout = orderData => {
//   const eventValues = {
//     fb_content_id: orderData.orderNumber,
//     fb_content_type: 'order',
//     fb_currency: 'VND',
//     fb_num_items: orderData.orderItems.length,
//   };

//   AppEventsLogger.logEvent('fb_mobile_initiated_checkout', orderData.paymentAmount, eventValues);
// };

// export const logEventPurchase = orderData => {
//   const eventValues = {
//     fb_content_id: orderData.orderNumber,
//     fb_content_type: 'order',
//     fb_currency: 'VND',
//     fb_num_items: orderData.orderItems.length,
//   };

//   AppEventsLogger.logPurchase(orderData.paymentAmount, 'VND', eventValues);
// };

// export const logEventNotificationOpen = notification => {
//   const eventValues = {
//     fb_notification_id: notification.notificationId,
//     fb_notificaiton_title: notification.title,
//     fb_notification_body: notification.body,
//   };

//   AppEventsLogger.logEvent('fb_mobile_push_notification_open', eventValues);
//   AppEventsLogger.logPushNotificationOpen(eventValues);
// };

// export const logEventCustom = (eventKey, values) => {
//   AppEventsLogger.logEvent(eventKey, values);
// };
