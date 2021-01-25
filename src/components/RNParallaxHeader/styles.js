
import { StyleSheet, Dimensions } from 'react-native';

import Color from '../../common/Color';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const DEFAULT_NAVBAR_COLOR = 'white';
const DEFAULT_HEADER_MAX_HEIGHT = 170;
const DEFAULT_HEADER_MIN_HEIGHT = NAV_BAR_HEIGHT;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: DEFAULT_NAVBAR_COLOR,
    // overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: DEFAULT_HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    height: DEFAULT_HEADER_MIN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerTitle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: STATUS_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    // color: DEFAULT_TITLE_COLOR,
    textAlign: 'center',
    fontSize: 16,
  },
  dotActive: {
    width: 5,
    height: 5,
    backgroundColor: Color.primary,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#E5E5EA',
  },
  // navContainer: {
  //   height: HEADER_HEIGHT,
  //   marginHorizontal: 10,
  // },
  // statusBar: {
  //   height: STATUS_BAR_HEIGHT,
  //   backgroundColor: 'transparent',
  // },
  // navBar: {
  //   height: NAV_BAR_HEIGHT,
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   backgroundColor: 'transparent',
  // },
});

export default styles;