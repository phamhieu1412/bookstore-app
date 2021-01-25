import reactotron from 'reactotron-react-native';
import { Platform, Linking } from 'react-native';
import _EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import _Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _IconIO from 'react-native-vector-icons/Ionicons';
import _IconAntd from 'react-native-vector-icons/AntDesign';
import _IconMI from 'react-native-vector-icons/MaterialIcons';
import _IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import _IconFA from 'react-native-vector-icons/FontAwesome';
import _IconFeather from 'react-native-vector-icons/Feather';
import _Timer from 'react-timer-mixin';

import _Validate from './ultils/Validate';
import _BlockTimer from './ultils/BlockTimer';
import Constants from './common/Constants';

export const Icon = _Icon;
export const IconIO = _IconIO;
export const UboIcon = _IconAntd;
export const IconMI = _IconMI;
export const IconSLI = _IconSLI;
export const IconFA = _IconFA;
export const IconFeather = _IconFeather;
export const EventEmitter = new _EventEmitter();
export const Timer = _Timer;
export const Validate = _Validate;
export const BlockTimer = _BlockTimer;
export const Reactotron = reactotron;

const _log = values => {
  if (__DEV__) {
    reactotron.log(values);
    if (Platform.OS === 'android') {
      console.log(values);
    }
  }
};
// const _log = values => __DEV__ && reactotron.log(values);
const _warn = values => __DEV__ && reactotron.warn(values);
const _error = values => __DEV__ && reactotron.error(values);
export function connectConsoleToReactotron() {
  // console.log = _log;
  // console.warn = _warn;
  // console.error = _error;
}
export const log = _log;
export const warn = _warn;
export const error = _error;

/**
 * Display the message toast-like (work both with Android and iOS)
 * @param msg Message to display
 * @param duration Display duration
 */
const _toast = (msg, duration = 3000) => EventEmitter.emit(Constants.EmitCode.Toast, msg, duration);

export const toast = _toast;

export const callPhone = number => {
  let phoneLink = number;
  if (Platform.OS !== 'android') {
    phoneLink = `telprompt:${number}`;
  } else {
    phoneLink = `tel:${number}`;
  }
  Linking.canOpenURL(phoneLink)
    .then(supported => {
      if (!supported) {
        _toast('Có lỗi khi gọi điện');
      } else {
        return Linking.openURL(phoneLink);
      }
    })
    .catch(err => log(err));
};
