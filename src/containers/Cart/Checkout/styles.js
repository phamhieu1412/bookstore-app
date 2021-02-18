import { StyleSheet } from 'react-native';

import Color from '../../../common/Color';
import Device from '../../../common/Device';

// const vh = height / 100;
export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  formContainer: {
    paddingHorizontal: 10,
  },

  // coupon
  couponCodeWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  couponCode: {
    flexDirection: 'row',
    height: 22,
    minWidth: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  couponCodeValue: {
    fontSize: 14,
    color: Color.white,
    fontWeight: '600',
    marginLeft: 3,
  },
  closeIcon: {
    paddingHorizontal: 2,
  },
  couponCodeDesc: {
    flex: 1,
    marginLeft: 13,
    fontSize: 13,
    color: '#555555',
    letterSpacing: 0,
  },
  giftCode: {
    backgroundColor: Color.secondary,
    borderRadius: 7,
    padding: 7,
    marginBottom: 10,
    marginRight: 10,
  },
  giftCodeValue: {
    fontSize: 14,
    // color: Color.Text,
    color: Color.white,
    fontWeight: '600',
    letterSpacing: 0,
    textAlign: 'center',
  },
  scrollIndicator: {
    position: 'absolute',
    right: 5,
    bottom: Device.isIphoneX ? 165 : 135,
    color: Color.Text,
    fontSize: 20,
  },
  divider: {
    marginVertical: 5,
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: Color.product.InfoBorder,
  },

  // Bottom actions
  bottomCartInfo: {
    flex: 1,
    alignItems: 'center',
  },
  infoRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkoutBottomInfoLabel: {
    fontSize: 14,
    color: Color.Text,
    letterSpacing: 0,
  },
  seperator: {
    borderColor: Color.sectionSeparatorColor,
    width: 0,
    height: 60,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  uboWalletWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignSelf: 'flex-end',
    // width: 120,
    height: 41,
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 20.5,
    borderRightWidth: 13,
    borderBottomWidth: 20.5,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: Color.secondary,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    shadowOffset: {
      width: -3,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 0,

    zIndex: 2,
  },
  triangleReversed: {
    width: 0,
    height: 0,
    borderTopWidth: 20.5,
    borderRightWidth: 0,
    borderBottomWidth: 20.5,
    borderLeftWidth: 13,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#EFEFF4',
    shadowOffset: {
      width: 3,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 0,

    zIndex: 2,
  },
  uboWallet: {
    height: 41,
    minWidth: 85,
    justifyContent: 'center',
    textAlign: 'right',
    paddingVertical: 3,
    paddingRight: 15,
    paddingLeft: 7,
    backgroundColor: Color.secondary,
    borderColor: 'transparent',
    shadowOffset: {
      width: -3,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,

    zIndex: 1,
  },
  uboWalletResevered: {
    backgroundColor: '#EFEFF4',
    paddingLeft: 15,
    paddingRight: 7,
    shadowOffset: {
      width: 3,
      height: 2,
    },
  },
  uboWalletLabel: {
    fontSize: 13,
    marginBottom: -2,
    fontWeight: '600',
    color: Color.white,
    textAlign: 'center',
    justifyContent: 'center',
  },

  // SimplePrice
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    // textAlign: 'right',
  },
  priceLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Color.Text,
  },
  priceSymbol: {
    fontSize: 11,
    fontWeight: '600',
    color: Color.organge,
    // textAlign: 'right',
    marginTop: 1,
  },

  // Button
  button: {
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  buttonLabel: {
    flex: 0.3,
    fontSize: 15,
    fontWeight: '600',
    color: Color.white,
    textAlign: 'center',
  },
  buttonAmount: {
    flex: 0.5,
    color: Color.white,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonNote: {
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 2,
    marginLeft: 7,
    color: Color.white,
  },

  // Request ship:
  requestShip: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  requestShipAction: {
    // flexDirection: 'row',
    width: '50%',
    paddingLeft: 15,
  },
  requestShipSwitch: {
    // height: 20,
  },
  requestShipLabel: {
    color: Color.Text,
    fontSize: 14,
    lineHeight: 25,
  },
  requestShipPolicy: {
    width: '50%',
  },
  shippingAddressInput: {
    paddingTop: 5,
    minHeight: 45,
    fontStyle: 'italic',
    color: '#555',
  },
  useAsDefaultAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 3,
  },
  useAsDefaultAddressText: {
    fontSize: 13,
  },
  useAsDefaultAddressCheckbox: {
    fontSize: 20,
  },
});
