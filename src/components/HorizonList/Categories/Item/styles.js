import { StyleSheet, Dimensions } from 'react-native';

import Styles from '../../../../common/Styles';
import Color from '../../../../common/Color';

const { width } = Dimensions.get('window');
const itemWidth = (width - 25) / 4 - 10;

export default StyleSheet.create({
  container: {
    marginHorizontal: 5,
    paddingLeft: 5,
    paddingRight: 6,
    width: itemWidth,
    marginTop: 20,
  },
  wrap: {
    alignItems: 'center',
  },
  iconView: {},
  imageIcon: {
    width: itemWidth - 10,
    height: itemWidth - 10,
    marginBottom: 5,
  },
  title: {
    fontSize: Styles.FontSize.small,
    color: Color.Text,
    letterSpacing: -0.2,
    textAlign: 'center',
  },
});
