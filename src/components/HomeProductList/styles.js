import { StyleSheet } from 'react-native';

import Constants from '../../common/Constants';
import Styles from '../../common/Styles';
import Color from '../../common/Color';

export default StyleSheet.create({
  // header: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: 'rgba(255, 255, 255, 0.5)',
  //   overflow: 'hidden',
  //   height: Constants.Window.headerHeight,
  // },
  headerLabel: {
    flexDirection: 'row',
    marginBottom: 22,
    // marginTop: 18,
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  tagHeader: {
    fontSize: Styles.FontSize.header,
    color: Color.Header,
    fontWeight: '900',
    fontFamily: Constants.fontHeader,
  },
  titleCategory: {
    marginTop: 15,
    paddingVertical: 10,
    paddingLeft: 10,
    width: 150,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    overflow: 'hidden',
  },
});
