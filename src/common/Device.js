import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const isIphoneX =
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height >= 812 || width >= 812);

export default {
  isIphoneX,
  ToolbarHeight: Platform.OS === 'ios' ? (isIphoneX ? 35 : 0) : 0,
  HeaderHeight: Platform.OS === 'ios' ? (isIphoneX ? 44 : 44) : 56,
};
