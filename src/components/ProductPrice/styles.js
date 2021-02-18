import { StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Styles from '../../common/Styles';

export default StyleSheet.create({
  priceWrapper: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
  },
  price: {
    color: Color.primary,
    fontSize: Styles.FontSize.header,
    fontWeight: 'bold',
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
    marginLeft: 5,
    marginTop: 2,
  },
});
