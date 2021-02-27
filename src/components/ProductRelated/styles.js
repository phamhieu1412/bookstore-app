import { StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Constants from '../../common/Constants';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "'rgba(255, 255, 255, 1)'",
  },
  head: {
    alignSelf: 'flex-start',
    // paddingLeft: 15,
    // paddingRight: 10,
    marginLeft: 10,
    marginTop: 10,
    // borderBottomWidth: 2,
    // borderStyle: 'solid',
    // borderColor: Color.headerTintColor,
  },
  headTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    // marginBottom: 10,
    fontFamily: Constants.fontHeader,
  },
  flatlist: {
    flexDirection: 'row',
    //backgroundColor: "#fff",
    paddingTop: 5,
    paddingBottom: 20,
  },
});
