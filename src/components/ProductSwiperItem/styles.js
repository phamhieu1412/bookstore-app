import { StyleSheet } from 'react-native';

import Color from '../../common/Color';
import Styles from '../../common/Styles';

const imageWidth = 133; // width / 2.5 - 15;

export default StyleSheet.create({
  twoAndHalfCol: {
    width: imageWidth,
    height: (imageWidth * 2) / 3,
  },
  itemTitle: {
    color: Color.productTitle,
    fontSize: Styles.FontSize.default,
    fontWeight: '600',
    lineHeight: 16,
    height: 35,
  },
  itemInfo: {
    color: Color.primary,
    fontSize: Styles.FontSize.tiny,
    fontWeight: '300',
    lineHeight: 15,
    letterSpacing: -0.2,
  },
  checkedIcon: {
    color: Color.primary,
    fontSize: 18,
    position: 'absolute',
    top: (imageWidth * 2) / 3 - 10,
    right: 0,
  },
});
