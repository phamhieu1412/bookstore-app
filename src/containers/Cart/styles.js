import { Platform, StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Config from '../../common/Config';
import Constants from '../../common/Constants';
import Device from '../../common/Device';

export default StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: Color.background,
    ...Platform.select({
      android: {
        paddingTop: Config.showStatusBar ? 12 : 0,
      },
    }),
  },
  container: {
    flex: 1,
    backgroundColor: Color.background,
    // elevation: 5,
  },
  content: {
    flex: 1,
  },

  // field style
  fieldContainer: {
    backgroundColor: '#FFF5EA',
    padding: 11,
    paddingLeft: 0,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'transparent',
    minHeight: 65,
    justifyContent: 'center',
  },
  fieldContainerError: {
    borderColor: Color.red,
  },
  fieldTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingLeft: 15,
    width: 72,
  },
  fieldIconWithText: {
    alignItems: 'center',
    width: 70,
    paddingLeft: 2,
  },
  fieldIcon: {
    color: Color.primary,
  },
  editableText: {
    color: Color.primary, // '#555555',
    fontSize: 12,
    marginTop: 10,
  },
  editableIndicatorIcon: {
    color: '#555555',
    position: 'absolute',
    top: 5,
    right: 5,
  },
  fieldSeparator: {
    borderColor: Color.sectionSeparatorColor,
    width: 0,
    height: 60,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  fieldContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.black,
    letterSpacing: -0.09,
  },
  fieldInfo: {
    fontSize: 13,
    color: '#555555',
    letterSpacing: 0,
  },

  bottomView: {
    // flex: 1,
    height: Device.isIphoneX ? 130 : 115,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingBottom: Device.isIphoneX ? 20 : 5,
    shadowColor: '#171717',
    shadowOffset: {
      width: 9,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,

    ...Platform.select({
      android: {
        borderTopWidth: 1,
        borderTopColor: Color.product.InfoBorder,
      },
    }),
    // elevation: 8,
  },
  floatView: {
    width: Constants.Window.width,
    position: 'absolute',
    bottom: 0,
  },
  bottomInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    justifyContent: 'space-around',
    // backgroundColor: 'yellow',
  },
  bottomCountLabel: {
    flex: 0.5,
    color: Color.black,
    paddingRight: 15,
    paddingTop: 9,
    fontSize: 15,
    fontWeight: '600',
    justifyContent: 'flex-end',
    textAlign: 'right',
    marginRight: 1,
    // backgroundColor: 'red',
    height: 35,
  },
  seperator: {
    borderColor: Color.sectionSeparatorColor,
    width: 0,
    height: 30,
    borderWidth: 0.75,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  bottomAmountLabel: {
    flex: 0.5,
    paddingLeft: 15,
    paddingTop: 9,
    marginLeft: 1,
    fontSize: 17,
    fontWeight: '600',
    height: 35,
    // backgroundColor: 'blue',
  },

  buttonContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {
    height: 47,
    width: '90%',
    borderRadius: 50,
    backgroundColor: Color.primary,
    // textAlign: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.white,
    letterSpacing: -0.1,
    // textAlign: 'center',
  },

  // buttonContainer: {
  //   flex: 0.5,
  //   backgroundColor: 'white',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: '#CED7DD',
  },

  rowEmpty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },

  label: {
    fontSize: 18,
    color: Color.Text,
    fontFamily: Constants.fontHeader,
    textAlign: 'left',
  },
  value: {
    fontSize: 16,
    color: Color.headerTintColor,
    fontFamily: Constants.fontHeader,
  },

  contentEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 80,
    color: Color.secondary,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 230,
    lineHeight: 40,
    opacity: 0.8,
    color: Color.Text,
    fontFamily: Constants.fontHeader,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    color: '#758692',
    width: Constants.Window.width,
    marginTop: 10,
    lineHeight: 25,
    fontFamily: Constants.fontFamily,
  },
});
