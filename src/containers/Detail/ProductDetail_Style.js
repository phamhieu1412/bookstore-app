import { StyleSheet, Dimensions } from 'react-native';

import Constants from '../../common/Constants';
import Color from '../../common/Color';
import Styles from '../../common/Styles';

const { width, height } = Dimensions.get('window');
const imageWidth = width - 20;
const criterionWidth = (width * 96) / 100;
const criterionMargin = (width * 2) / 100;
const criterionPaddingTop = (height * 7) / 100;
const criterionHeight = (criterionWidth / 19) * 27;
const criterionMaxHeight = (height * 80) / 100;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  lineGray: {
    height: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  naviBar: {
    height: 64,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  naviTitle: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBack: {
    zIndex: 2,
    position: 'absolute',
    top: 20,
    left: 10,
  },
  btnBackImage: {
    height: 30,
    width: 30,
  },
  listContainer: {
    flex: 1,
  },
  productInfo: {
    alignItems: 'center',
    backgroundColor: '#f6f6f8',
  },
  imageSlider: {
    flex: 1,
    marginTop: 0,
  },
  imageWrapper: {
    // padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
    width: imageWidth - 20,
    height: imageWidth * 0.75 - 18,
    overflow: 'hidden',
  },
  imageProduct: {
    flex: 1,
  },

  imageCriteria: {
    width: 114,
    height: 162,
    margin: 10,
  },
  imageCriteriaFull: {
    // flex: 1,
    top: 20,
    marginLeft: 0,
    marginRight: criterionMargin,
    marginTop: 4,
    marginBottom: 4,
    width: criterionWidth,
    height: criterionHeight,
  },

  infoLeft: {
    height: 85,
    paddingLeft: 10,
    paddingRight: 7,
    justifyContent: 'center',
    width: width / 2 - 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Color.product.InfoBorder,
  },
  infoRight: {
    // padding: 10,
    width: width / 2 - 2,
    borderTopWidth: 1,
    borderColor: Color.product.InfoBorder,
  },
  infoRightRow: {
    height: 28,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 3,
    borderBottomWidth: 1,
    borderColor: Color.product.InfoBorder,
  },
  productName: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 21,
    color: Color.productTitle,
    marginBottom: 3,
    fontFamily: Constants.fontHeader,
  },
  productSubtext: {
    marginBottom: 2,
    fontSize: Styles.FontSize.tiny,
    color: Color.blackTextSecondary,
  },
  infoText: {
    fontSize: 14,
    // color: Color.organge,
    letterSpacing: -0.25,
  },
  tabButton: {
    flexDirection: 'row',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: Color.blackTextSecondary,
  },
  tabItem: {
    flex: 0.5,
  },
  textTab: {
    color: '#C7C7C7',
    fontSize: 15,
    letterSpacing: -0.27,
  },
  tabButtonHead: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    opacity: 0,
  },

  bottomView: {
    height: 50,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f3f7f9',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  quantitySelect: {
    // flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 163,
    marginRight: 10,
    height: 44.5,
    borderColor: Color.border,
    borderWidth: 1,
    borderRadius: 40,
  },
  minusLeft: {
    width: 38.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: Color.border,
    borderRightWidth: 1,
  },
  plusRight: {
    width: 38.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: Color.border,
    borderLeftWidth: 1,
  },
  quantityNumber: {
    textAlign: 'center',
    alignSelf: 'center',
  },

  description: {
    padding: 10,
    fontSize: 12,
    color: Color.blackTextSecondary,
    // paddingTop: 10,
    // backgroundColor: 'rgba(255,255,255,1)',
    alignItems: 'flex-start',
  },

  modalBoxWrap: {
    position: 'absolute',
    paddingTop: criterionPaddingTop,
    width: criterionWidth,
    marginLeft: criterionMargin,
    height: criterionMaxHeight,
    maxHeight: criterionMaxHeight,
    zIndex: 9999,
  },
  iconZoom: {
    position: 'absolute',
    top: (height * 7) / 100 - 20,
    right: 0,
    backgroundColor: Color.darkGrey,
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    zIndex: 9999,
  },
  textClose: {
    color: Color.white,
    fontWeight: '600',
    fontSize: 10,
    margin: 4,
    zIndex: 9999,
  },
  image: {
    width,
    height: height - 40,
    zIndex: 9999,
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
  tabView: {
    // minHeight: height / 2,
    marginTop: 20,
    marginBottom: 10,
  },

  // price
  productPrice: {
    // flexDirection: 'row',
    alignItems: 'flex-start',
    width: '42%',
    // marginLeft: 30,
    fontSize: 18,
    color: Color.blackTextSecondary,
    fontFamily: Constants.fontFamily,
  },
  priceText: {
    color: Color.organge,
    fontSize: 18,
    fontWeight: '600',
  },
  priceSymbol: {
    color: Color.organge,
    fontSize: Styles.FontSize.tiny,
    fontWeight: 'bold',
    textAlign: 'right',
    lineHeight: 16,
    marginLeft: 0,
  },
  salePrice: {
    textDecorationLine: 'line-through',
    color: Color.blackTextSecondary,
    fontSize: Styles.FontSize.tiny,
    letterSpacing: -0.2,
    textAlign: 'right',
    marginLeft: 0,
    marginTop: 2,
  },
  // weightSeperator: {
  //   alignSelf: 'center',
  // },
  productWeight: {
    alignSelf: 'center',
    color: Color.productTitle,
    fontSize: 14,
  },

  // specifications
  specifications: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: Color.product.ViewBorder,
  },
  specificationItem: {
    padding: 8,
    margin: 8,
    borderWidth: 1,
    borderColor: Color.product.ViewBorder,
    borderRadius: 7,
  },
  activeSpecification: {
    backgroundColor: Color.primary,
    borderColor: Color.primary,
  },
  specificationText: {
    fontSize: 14,
    lineHeight: 17,
    color: Color.productTitle,
  },
  activeSpecificationText: {
    color: 'white',
    fontWeight: '600',
  },
  disabledSpecification: {
    borderColor: Color.blackTextDisable,
  },
});
