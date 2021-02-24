import { StyleSheet } from 'react-native';
import Color from '../../common/Color';
import Styles from '../../common/Styles';

export default StyleSheet.create({
  container: {
    backgroundColor: Color.background,
  },
  contentContainer: {
    paddingBottom: 30,
  },

  // Success message
  successMessage: {
    marginTop: 25,
    marginBottom: 10,
    height: 79,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 40,
    color: Color.secondary,
  },
  successText: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic',
    color: Color.productTitle,
  },

  // state indicator
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  singleStep: {
    width: '26%',
    // flex: 0.24,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  stepProgress: {
    position: 'absolute',
    width: '70%',
    right: '65%',
    top: 10,
    height: 1,
    borderWidth: 1,
    borderColor: '#D2D2D2',
  },
  stepIcon: {
    fontSize: 19,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 11,
    color: Color.Text,
    textAlign: 'center',
  },

  // order information
  informationContainer: {
    backgroundColor: '#FFF5EA',
    borderRadius: 7,
    marginHorizontal: 9,
    paddingTop: 15,
    paddingBottom: 9,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rowLabel: {
    width: 115,
    fontSize: 14,
    color: Color.Text,
  },
  rowText: {
    textAlign: 'left',
    fontSize: 14,
    color: Color.Text,
    lineHeight: 21,
    flex: 1,
  },
  toggleButton: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  toggleButtonRating: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    left: 15,
    width: 100,
    height: 30.5,
    backgroundColor: '#FFEBD7',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  toggleButtonOrderItems: {
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    right: 15,
    width: 132,
    height: 30.5,
    backgroundColor: '#FFEBD7',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  toggleShardow: {
    height: 1,
    backgroundColor: '#FFEBD7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  toggleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonText: {
    fontSize: Styles.FontSize.tiny,
    marginBottom: 8,
    color: Color.Text,
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  toggleButtonIcon: {
    color: Color.primary,
    top: -3.5,
    marginLeft: 5,
  },
  opacityButton: {
    opacity: 0.6
  },

  // order items
  itemContainer: {
    marginTop: 25,
  },

  // order single item
  lineItem: {
    position: 'relative',
    paddingVertical: 5,
    paddingLeft: 12,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineItemSeperator: {
    height: 1,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    borderWidth: 0.7,
  },
  imageWrapper: {
    justifyContent: 'flex-start',
    width: 65,
  },
  image: {
    width: 54,
    height: 36,
  },
  name: {
    fontSize: 14,
    color: Color.Text,
    marginTop: 2,
  },
  price: {
    fontSize: Styles.FontSize.tiny,
    color: Color.blackTextSecondary,
  },
  text: {
    fontSize: 14,
    color: Color.Text,
    // alignSelf: 'flex-end',
  },
  cancelledOverllay: {
    position: 'absolute',
    top: 1,
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  cancelledLineThrough: {
    marginHorizontal: 20,
    height: 1,
    backgroundColor: Color.Text,
    top: -14,
  },

  // orderMoney
  orderAmountWrapper: {
    flexDirection: 'row',
  },
  orderMessage: {
    width: '40%',
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 5,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  orderMessageText: {
    textAlign: 'right',
    color: Color.blackTextSecondary,
    fontStyle: 'italic',
    fontSize: 13,
    lineHeight: 21,
  },
  orderMoney: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  orderMoneyInfo: {
    flex: 1,
    padding: 10,
    paddingRight: 15,
    justifyContent: 'center',
    // alignItems: 'center',
  },

  // Bottom
  banner: {
    width: Styles.width,
    height: Styles.width / 2.82,
    marginTop: 20,
  },
  goToHome: {
    alignSelf: 'flex-end',
    marginTop: 15,
    marginRight: 15,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '40%',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
});
