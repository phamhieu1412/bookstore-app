import { StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Constants from '../../common/Constants';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "'rgba(255, 255, 255, 1)'",
  },
  line: {
    borderBottomColor:"rgba(0,0,0,0.1)",
    borderBottomWidth: 1,
  },
  flexStart: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  viewNoRating: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
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
    marginBottom: 10,
    fontFamily: Constants.fontHeader,
  },
  flatlist: {
    flexDirection: 'row',
    //backgroundColor: "#fff",
    marginTop: 5,
    paddingTop: 5,
  },
  // flatlist item
  viewReview: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 15,
  },
  avatarUserReview: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  viewTitleRating: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderRadius: 14,
  },
  buttonShowAllBottom:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  }
});
