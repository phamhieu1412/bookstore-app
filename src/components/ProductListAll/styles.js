import { StyleSheet, Platform, Dimensions } from 'react-native';

import Constants from '../../common/Constants';
import Color from '../../common/Color';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  flatlist: {
    flexDirection: 'column',
    paddingBottom: 40,
    paddingTop: 10,
  },
  more: {
    width,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  spinView: {
    width,
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
    height: Constants.Window.headerHeight,
  },
  headerText: {
    fontSize: 22,
    fontFamily: Constants.fontHeader,
    width,
    marginBottom: 20,
    marginTop: 50,
    marginLeft: 15,
  },

  bannerImage: {
    width: width - 40,
    marginLeft: 20,
    borderRadius: 6,
    flex: 1,
    height: (25 * height) / 100,
    // resizeMode: 'cover',
  },
  headerView: {
    ...Platform.select({
      ios: {
        marginBottom: 20,
      },
      android: {
        marginBottom: 10,
      },
    }),
  },
  listView: {
    flex: 1,
    backgroundColor: Color.background,
    ...Platform.select({
      android: {
        marginTop: 0,
      },
    }),
  },
});
