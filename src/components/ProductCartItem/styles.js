import { StyleSheet } from 'react-native';

import Constants from '../../common/Constants';
import Color from '../../common/Color';
import Styles from '../../common/Styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    borderTopWidth: 1,
    borderTopColor: '#d4dce1',
  },
  content: {
    flexDirection: 'row',
    margin: 10,
  },
  image: {
    width: 72,
    height: 48,
  },
  infoView: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Constants.fontFamily,
    color: Color.Text,
  },
  unit: {
    fontSize: 13,
    color: Color.blackTextSecondary,
  },
  quantity: {
    marginRight: 10,
  },
  addToCart: {
    width: 85,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addToCartButton: {
    marginTop: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    fontSize: 11,
    color: Color.blackTextSecondary,
    marginTop: 5,
  },
  seperator: {
    borderColor: Color.sectionSeparatorColor,
    width: 0,
    height: 50,
    borderWidth: 0.5,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  btnTrash: {
    position: 'absolute',
    right: 50,
    bottom: -9,
  },
  trashIcon: {
    fontSize: 15,
    margin: 10,
    color: '#b7c4cb',
  },
  price: {
    color: Color.primary,
    fontSize: Styles.FontSize.header,
    fontWeight: 'bold',
  },
});
