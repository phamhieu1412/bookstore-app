import { StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Styles from '../../common/Styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundLightGrey,
  },

  profileSection: {
    // margin: 15,
    // backgroundColor: 'transparent',
  },
  sectionBody: {
    marginTop: 7,
    backgroundColor: Color.backgroundLightGrey,
    // borderRadius: 5,
    overflow: 'hidden',
  },

  addressContainer: {
    backgroundColor: Color.background,
    marginBottom: 10,
    padding: 10,
  },

  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addressName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },

  addressDefault: {
    fontSize: 16,
    fontWeight: '300',
    color: Color.primary,
    marginBottom: 5,
  },

  addressInfo: {
    fontSize: 15,
    fontWeight: '400',
    color: Color.lightGrey,
    marginBottom: 3,
  },

  // header: {
  //   flexDirection: 'row',
  //   minHeight: 48,
  //   // paddingTop: 18,
  //   // paddingBottom: 18,
  //   // borderColor: '#f1f1f1',
  //   // borderBottomWidth: 1,
  // },
  // headerLeft: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  //   marginLeft: 15,
  // },
  // headerRight: {
  //   flex: 1 / 3,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   marginRight: 5,
  //   flexDirection: 'row',
  // },
  // headerRightText: {
  //   fontSize: 14,
  //   marginRight: 10,
  //   marginTop: 2,
  //   marginLeft: 2,
  //   color: Color.primary,
  //   // fontFamily: Constants.fontFamily,
  // },
  // rightText: {
  //   fontSize: 14,
  //   color: Color.Text,
  //   fontWeight: '400',
  //   alignSelf: 'flex-start',
  //   marginLeft: 30,
  //   textAlign: 'right',
  // },
  // phoneNumber: {
  //   color: Color.blue,
  // },
  iconWrap: {
    padding: 3,
    borderRadius: 4,
    backgroundColor: Color.Text,
    marginRight: 10,
  },
  icon: {
    // marginRight: 4,
    // marginTop: 2,
    color: Color.Text,
    fontSize: 22,
    backgroundColor: 'transparent',
  },
  addressRightIcon: {
    // marginRight: 4,
    marginTop: -17,
    color: Color.Text,
    fontSize: 27,
    backgroundColor: 'transparent',
  },

  itemRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    backgroundColor: Color.background,
    paddingHorizontal: 15,
    // paddingTop: 18,
    // paddingBottom: 18,
    minHeight: 50,
  },
  // itemLeftIcon: color => ({
  //   color: color || Color.Text,
  //   fontSize: 22,
  //   marginRight: 16,
  // }),
  itemLeftText: color => ({
    color: color || Color.Text,
    fontSize: Styles.FontSize.small,
    fontWeight: '400',
  }),
  // itemRightContainer: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   marginRight: 5,
  // },
  itemRight: color => ({
    backgroundColor: color || Color.Text,
    padding: 5,
    borderRadius: 4,
    minWidth: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  // numberWrap: color => ({
  //   position: 'absolute',
  //   top: -9,
  //   right: -9,
  //   width: 19,
  //   height: 19,
  //   borderRadius: 100,
  //   backgroundColor: color || Color.Text,
  //   borderColor: Color.white,
  //   borderWidth: 2,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }),
  // numberText: {
  //   fontSize: 9,
  //   color: Color.white,
  //   fontWeight: 'bold',
  // },
  // button: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: 48,
  //   marginHorizontal: 10,
  //   borderRadius: 50,
  //   backgroundColor: Color.primary,
  //   borderWidth: 1,
  //   borderColor: 'transparent',
  //   marginBottom: 15,
  // },
  // altButton: {
  //   backgroundColor: Color.background,
  //   borderColor: Color.primary,
  // },
});
