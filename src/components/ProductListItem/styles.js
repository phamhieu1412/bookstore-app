import { StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Styles from '../../common/Styles';
import Constants from '../../common/Constants';

export default StyleSheet.create({
  itemTitle: {
    color: Color.productTitle,
    fontSize: Styles.FontSize.default,
    fontWeight: '600',
    lineHeight: 16,
    height: 35,
    fontFamily: Constants.fontHeader,
  },
  itemInfo: {
    color: Color.blackTextSecondary,
    fontSize: Styles.FontSize.tiny,
    fontWeight: '600',
    lineHeight: 15,
    letterSpacing: -0.2,
  },
});
