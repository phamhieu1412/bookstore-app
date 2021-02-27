import { StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Styles from '../../common/Styles';
import Constants from '../../common/Constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },

  // Empty
  emptyContainer: {
    flex: 1,
    backgroundColor: Color.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 80,
    color: Color.secondary,
  },
  title: {
    color: Color.Text,
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 230,
    lineHeight: 40,
    opacity: 0.8,
    fontFamily: Constants.fontHeader,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    color: Color.Text,
    width: 230,
    marginTop: 10,
    lineHeight: 25,
  },

  // List orders
  listView: {
    flex: 1,
    backgroundColor: Color.background,
  },
  flatlist: {},

  // Order item
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingLeft: 6,
  },
  rowLabel: {
    fontSize: 14,
    color: Color.Text,
    fontFamily: Constants.fontFamily,
  },
  labelView: {
    width: (90 * Constants.Window.width) / 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingLeft: 17,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelGroup: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  labelIcon: {
    fontSize: 14,
    color: Color.primary,
    marginRight: 10,
  },
  labelNextIcon: {
    fontSize: 25,
    color: Color.Text,
    // marginRight: 10,
  },
  label: {
    fontFamily: Constants.fontHeader,
    fontSize: 14,
    color: Color.Text,
    width: '95%',
    // marginLeft: 8,
  },
  orderDetailLabel: {
    fontSize: Styles.FontSize.tiny,
    // textDecorationLine: 'underline',
    color: Color.primary,
    fontFamily: Constants.fontFamily,
  },
});
